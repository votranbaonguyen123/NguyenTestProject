const { firebase } = require('../../firebase')
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
    where,
    serverTimestamp
} = require('firebase/firestore')

const db = getFirestore(firebase)

const createCard = async (req, res, next) => {
    try {
        const boardId = req.params.boardId
        const { name, description, createdAt } = req.body;
        const boardDoc = await getDoc(doc(db, 'boards', boardId));
        if (!boardDoc.exists()) {
        return res.status(404).json({ error: 'Board not found' });
        }

        const cardData = {
            name,
            description,
            createdAt: createdAt || serverTimestamp()
        };

        const cardDocRef = await addDoc(collection(db, 'boards', boardId, 'cards'), cardData);
        res.status(201).json({
            id: cardDocRef.id,
            ...cardData
          });
        res.status(200).send('Success');
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

const findOneCard = async (req, res, next) => {
    try {
        const boardId = req.params.boardId
        const cardId = req.params.id
        const { name, description, createdAt } = req.body;
        const boardDoc = await getDoc(doc(db, 'boards', boardId));
        if (!boardDoc.exists()) {
        return res.status(404).json({ error: 'Board not found' });
        }

        const cardData = {
            name,
            description,
            createdAt: createdAt || serverTimestamp()
        };

        const cardDocRef = await addDoc(collection(db, 'boards', boardId, 'cards'), cardData);
        res.status(201).json({
            id: cardDocRef.id,
            ...cardData
          });
        res.status(200).send('Success');
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

module.exports = {
    createCard,
    findOneCard
}