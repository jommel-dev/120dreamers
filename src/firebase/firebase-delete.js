import { db } from './index.js'
import { doc, deleteDoc } from 'firebase/firestore'
import { Loading, Notify } from 'quasar'

const deleteDocument = async (collectionName, docId) => {
  return new Promise((resolve, reject) => {
    Loading.show()

    try {
      const docRef = doc(db, collectionName, docId)
      deleteDoc(docRef).then(() => {
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

export default deleteDocument
