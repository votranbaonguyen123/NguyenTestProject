
const { sendVerificationEmail } = require('../services/emailService');
const { generateToken } = require('../utils/generateToken');
const { firebase } = require('../../firebase')
const crypto = require('crypto');
const {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where
} = require('firebase/firestore')

const db = getFirestore(firebase)
const signup = async (req, res) => {
    const { email } = req.body;
    try {
        let verificationCode = crypto.randomBytes(4).toString('hex');
        verificationCode = crypto
            .createHash('sha256')
            .update(verificationCode)
            .digest('hex');
        // Save verificationCode to Firestore (for demo purposes)
        let newUser = await addDoc(collection(db, 'users'), { email, verificationCode })
        await sendVerificationEmail(email, verificationCode);
        res.status(201).json({ id: newUser.id, email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const signin = async (req, res) => {
    const { email, verificationCode } = req.body;
    try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('email', '==', email))
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc);
        });
        if (users.length === 0 || users[0].data().verificationCode !== verificationCode) {
            return res.status(401).json({ error: 'Invalid email or verification code' });
        }


        const token = generateToken({ id: users[0].id, email: users[0].data().email });
        res.status(200).json({ accessToken: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { signup, signin };