import { boot } from 'quasar/wrappers'
import * as apis from 'src/firebase/apis'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const fireApi = apis

export default boot(({ app }) => {
    // Set as global Configurable Function
    app.config.globalProperties.$fireApi = fireApi
})
  
export { fireApi }
