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
    where
} = require('firebase/firestore')

const db = getFirestore(firebase)


const createOne = (collectionName) => async (req, res, next) => {
    try {
        let newDoc = await addDoc(collection(db, collectionName), req.body)
        res.status(201).send({
            status: 'ok',
            data: {
                "id": newDoc.id,
                ...req.body
            },
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

const findOne = (collectionName) => async (req, res, next) => {
    try {
        const id = req.params.id
        const docData = await getDoc(doc(db, collectionName, id))
        if (docData.exists()) {
            res.status(200).send(docData.data());
          } else {
            res.status(404).send('Data not found');
          }
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

const findAll = (collectionName) => async (req, res, next) => {
    try {
        const dataList = await getDocs(collection(db, collectionName));
        const dataArray = [];

        if (dataList.empty) {
            res.status(400).send('No Products found');
          } else {
            dataList.forEach((doc) => {
              const product = {
                ...doc.data()
              };
              dataArray.push(product);
            });
      
            res.status(200).send(dataArray);
          }
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

const updateOne = (collectionName) => async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const product = doc(db, collectionName, id);
        let updatedDoc = await updateDoc(product,data);
        res.status(200).send({
            status: 'ok',
            data: {
                "id": product.id
            },
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

const deleteOne = (collectionName) => async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteDoc(doc(db, collectionName, id));
        res.status(200).send('deleted successfully');
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

module.exports = {
    createOne,
    deleteOne,
    updateOne,
    findOne,
    findAll
};