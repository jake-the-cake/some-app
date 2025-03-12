const path          = require('path')
const { DECORATOR } = require('../env')

function accessApplication(reqPath) {
	const [application, ...route] = reqPath.split('/').slice(1)
	return [application, decorateApplicationRoute(route)]
}

function decorateApplicationRoute(route) {
	console.log(route)
	if (route.length === 1 && route[0] === '') 
		return DECORATOR + '/'
	return DECORATOR + '/' + path.join(...route)
}

module.exports = {
	accessApplication,
	decorateApplicationRoute
}