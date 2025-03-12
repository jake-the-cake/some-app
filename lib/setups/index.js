const apiRoutes = require('../api')
const Express   = require('express')
const path      = require('path')

/**
 * Sets up the Express server with middleware for JSON parsing, URL-encoded data parsing, using api routes, and serving static files.
 * 
 * @param {Object} app - The Express application instance.
 */
function setupExpressServer(app) {
	app.use(Express.json())
	app.use(Express.urlencoded({ extended: true }))
	app.use('/static', Express.static(path.join(__dirname, '../../static')))
	app.use('/api', apiRoutes)
}

module.exports = { setupExpressServer }
