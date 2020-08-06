'use strict'

function register(req,h) {
    return h.view('register', {
        title: 'Registro'
    })
}

function home(req,h) {
    return h.view('index', {
        title: 'home'
    })
}

function login(req,h) {
    return h.view('login', {
        title: 'Ingrese'
    })
}


module.exports = {
    register,
    home,
    login

}