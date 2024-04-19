// import the db variable from firebaseConfig.js
import { app } from './firebaseConfig';

// importing the firestore functions that you need
import { doc, collection, addDoc, getDocs, getFirestore, deleteDoc } from "firebase/firestore";

const db = getFirestore(app);

const addVideoToFavorite = async (id, title) => {
    console.log(`id: ${id}, title: ${title}`)

    const documentToInsert = {
        id: id,
        title: title
    }

    try {
        const insertDoc = await addDoc(collection(db, "favorite"), documentToInsert)
        console.log(insertDoc)
    } catch (err) {
        console.log(err)
    }
}

const getAllFavorite = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "favorite"));
        // return querySnapshot.docs
        
        return querySnapshot

    } catch (err) {
        console.log(err.message)
    }
}

const removeAll = async() => {
    try{
        let listToRemove = []
        getAllFavorite().then().then((docs)=>{
            docs.forEach((data)=>{
                listToRemove.push({
                    documentID: data.id,
                    id: data.data().id,
                    title: data.data().title
                })
            })
            console.log(`listToRemove: ${listToRemove}`)
            listToRemove.forEach((item)=>{
                console.log(`Delete: ${item.documentID}`)
                deleteDoc(doc(db, "favorite", item.documentID))
            })
        })
    } catch (err) {
        console.log(`${err.message}`)
    }
}

export default { addVideoToFavorite, getAllFavorite, removeAll }