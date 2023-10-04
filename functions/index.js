const functions = require('firebase-functions')
const getTradesModule = require('./getTrades')

const logger = require('firebase-functions/logger')
const admin = require('firebase-admin')
const cors = require('cors')
admin.initializeApp()

const firestore = admin.firestore()

const corsHandler = cors({ origin: true })

exports.getTrades = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    getTradesModule.handler(req, res, logger, admin, firestore)
  })
})
