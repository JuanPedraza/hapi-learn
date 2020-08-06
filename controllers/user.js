'use strict'

const { func } = require('joi')

const Boom = require('@hapi/boom')

const users = require('../models/index').users

async function createUser (req, h) {
    let result
    try {
        result = await users.create(req.payload)
    } catch (error) {
        console.error(error)
        return h.response('Problemas creando el usuario').code(500)
    }
    return h.response(`Usuario creado ID: ${result}`)
}

function logout(req,h) {
    return h.redirect('/login').unstate('user')
    
}

async function validateUser(req,h) {
    let result
    try {
        result = await users.validateUser(req.payload)
        if(!result){
            return h.response('email y/o contraseña incorrecta').code(401)
        }
    } catch (error) {
        console.error(error)
        return h.response('Problemas validando el usuario').code(500)
    }

    return h.redirect('/').state('user', {
        name: result.name,
        email: result.email
    })
    
}

function failValidation(req,h, err) {
    let error = Boom.badRequest('Falló la validación', req.payload)
    throw error

    
}

module.exports = {
    createUser,
    logout,
    validateUser,
    failValidation
}
