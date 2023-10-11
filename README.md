# Trading Platform (120-dreamers-forex-trading)

A trading platform built with quasar framework

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```



### Build the app for production
```bash
quasar build
```

### Installing firebase cli
```bash
npm i -g firebase-tools
```

### Login to firebase to use cli, note: email must be added to main firebase project
```bash
firebase login
```

### Deploy the app to firebase hosting
```bash
npm run deploy:prod
```

### Deploy the functions to cloud
```bash
firebase deploy --only functions
```

### Install dependencies for firebase functions
```bash
cd functions
npm install
```

### Start firebase emulator for testing cloud functions locally
```bash
firebase emulators:start
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
