const Express = require('express')
const path = require('path')

const { setupExpressServer } = require('./lib/setups')
const { queryArray, isInPath, queryPathByPosition } = require('./lib/query')
const { applications } = require('./lib/config')
const { DECORATOR, PORT } = require('./lib/env')

const app = Express()	

setupExpressServer(app)


app.get('*', (req, res) => {
	
	// handle serving the app
	if (isInPath(req.path, 'apps', 0)) {
		const currentApp = queryPathByPosition(req.path, 1)
		if (queryArray(applications, currentApp) === null)
			return res.sendStatus(404)
		if (queryPathByPosition(req.originalUrl, 2).slice(0, DECORATOR.length) === DECORATOR)
			return res.send('Glory Be')
		return res.sendStatus(500)
	}

	// handle parsing urls
	const [application, route] = accessApplication(req.path)
	if (!queryArray(applications, application))
		return res.sendStatus(404)
	return res.redirect('/' + path.join('apps', application, route))

})

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${ PORT }`)
})

function accessApplication(reqPath) {
	const [application, ...route] = reqPath.split('/').slice(1)
	return [application, decorateApplicationRoute(route)]
}

function decorateApplicationRoute(route) {
	return DECORATOR + '"/' + path.join(...route) + '"'
}