'use stric'

const questions = require('../models/index').questions

async function createQuestion (req,h){
    let result
    try {
        result = await questions.create(req.payload, req.state.user)
        console.log(`Pregunta creada con el ID ${result}`)
    } catch (error) {
        console.error(`Ocurrió un error ${error}`)
        return h.view('ask', {
            title:'Crear pregunta',
            error: 'Problemas creando la pregunta'
        }).code(500).takeover(`Pregunta creada con el ID ${result}`)
        
    }
    return h.response()
        
}

module.exports = {
    createQuestion
}