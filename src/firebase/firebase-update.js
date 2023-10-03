import { db } from './index.js'
import { doc, updateDoc } from 'firebase/firestore'
import { Loading, Notify } from 'quasar'

const updateDocument = async (collectionName, docId, data) => {
  return new Promise((resolve, reject) => {
    Loading.show()

    try {
      const docRef = doc(db, collectionName, docId)
      updateDoc(docRef, data).then(() => {
        Loading.hide()
        resolve()
      })
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

export default updateDocument
