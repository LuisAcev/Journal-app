
import { db } from "../firebase/firebaseConfig"
import { collection , getDocs } from "firebase/firestore";

export const  loadNotes = async (uid) =>{
    const docRef = collection(db, `${uid}/journal/notes` );
    const notesSnap = await getDocs(docRef);
    
    const notes = [];
    notesSnap.forEach(snapSon => {
        notes.push ({
            id: snapSon.id,
            ...snapSon.data()
        })
    })
       

    return notes;
}