import { db } from './index.js'
import { doc, getDoc } from 'firebase/firestore'
import { Loading, Notify } from 'quasar'

const getDocument = async (collectionName, uid) => {
  return new Promise(async (resolve, reject) => {
    Loading.show()

    try {
        const docRef = doc(db, collectionName, `${uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            Loading.hide()
            resolve(docSnap.data())
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (err) {
      Loading.hide()
      Notify.create({
        type: 'negative',
        message: err.message
      })
      reject(err.message)
    }
  })
}

export default getDocument
