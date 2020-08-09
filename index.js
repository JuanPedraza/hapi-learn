'use strict'

const Hapi = require('@hapi/hapi');
const handlerbars = require('./lib/helpers')
const inert = require('@hapi/inert');
const methods = require('./lib/methods')
const path = require('path');
const site = require('./controllers/site')
const routes = require('./routes')
const vision = require('@hapi/vision')



const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public')
        }
    }
})

async function init (){
    
    try {

        await server.register(inert)
        await server.register(vision)

        server.method('setAnswerRight', methods.setAnswerRight)

        server.state('user', {
            ttl: 1000 * 60 * 60 * 24 * 7,
            isSecure: process.env.NODE_ENV === 'prod',
            encoding: 'base64json'

        })

        server.views({
            engines: {
                hbs: handlerbars
            },
            relativeTo: __dirname, 
            path: 'views',
            layout: true,
            layoutPath: 'views'
        })

        server.ext('onPreResponse', site.fileNotFound )

        server.route(routes)
        await server.start()
    } catch (error){
        console.error(error)
        process.exit(1)
    }
    console.log(`Servidor lanzado en: ${server.info.uri} `);
}

process.on('unhandleRejection', error => {
    console.error('unhandleRejection', error.message, error);
})

process.on('unhandleException', error => {
    console.error('unhandleException', error.message, error);
})

init();
