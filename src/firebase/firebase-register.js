/* #version=0.0.0-1#1 rf 2023-11-07T12:14:53 400D2C82DFC836CF */
/* #version=0.0.0-1 rf 2023-11-07T12:12:07 C23ED082845F2AB6 */
import { auth, db } from './index.js'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, collection } from 'firebase/firestore'
import { Loading, Notify } from 'quasar'

const register = (data) => {
  return new Promise((resolve, reject) => {
    Loading.show()

    createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password,
      data.first_name,
      data.last_name
    )
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: data.first_name + ' ' + data.last_name
        })

        const user = userCredential.user

        console.log(user.uid)

        // Save user data to Firestore
        const docRef = doc(db, 'userProfile', user.uid)

        const userData = {
          firstName: data.first_name,
          lastName: data.last_name
          // Add other user-specific data here
        }

        return setDoc(docRef, userData).then(() => {
          Loading.hide()
          resolve(userCredential.user)
        })

        // Loading.hide()
        // resolve(userCredential.user)
      })
      .catch((err) => {
        Loading.hide()
        Notify.create({
          type: 'negative',
          message: err.message
        })
        reject(err.message)
      })
  })
}

export default register
