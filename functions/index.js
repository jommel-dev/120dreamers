const functions = require('firebase-functions')
const getTradesModule = require('./getTrades')

const logger = require('firebase-functions/logger')
const admin = require('firebase-admin')

admin.initializeApp()

const firestore = admin.firestore()

exports.getTrades = functions.https.onRequest((req, res) => {
  getTradesModule.handler(req, res, logger, admin, firestore)
})
