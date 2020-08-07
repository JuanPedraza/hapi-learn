'use strict'

const questions = require('../models/index').questions

function register(req,h) {
    if(req.state.user){
        return h.redirect('/')
    }
    return h.view('register', {
        title: 'Registro',
        user: req.state.user
    })
}

async function home(req,h) {
    let data
    try {
        data = await questions.getLast(10)
    } catch (error) {
        console.error(error);
    }
    return h.view('index', {
        title: 'home',
        user: req.state.user,
        questions: data
    })
}

function login(req,h) {
    if(req.state.user){
        return h.redirect('/')
    }
    return h.view('login', {
        title: 'Ingrese',
        user: req.state.user
    })
}

function notFound(req,h) {
    return h.view('404', {}, {
        layout: 'error-layout'
    }).code(404)
}

function fileNotFound(req,h) {
    const response = req.response
    if (response.isBoom && response.output.statusCode === 404){
        return h.view('404', {}, {
            layout: 'error-layout'
        }).code(404)
    }
    return h.continue
}

function ask(req,h) {
    if(!req.state.user){
        return h.redirect('/login')
    }

    return h.view('ask', {
        title: 'Formular pregunta',
        user: req.state.user
    })
}

module.exports = {
    register,
    fileNotFound,
    home,
    login,
    notFound,
    ask

}