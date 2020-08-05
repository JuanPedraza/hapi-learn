'use strict'

const firebase = require('firebase-admin')
const serviceAccount = require('../config/firebase.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://overflow-a1342.firebaseio.com/'
})

const db = firebase.database()
const Users = require('./users')

module.exports = {
    users: new Users(db)
}