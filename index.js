const Express = require('express')
const path = require('path')

const { setupExpressServer } = require('./lib/setups')
const { queryArray, isInPath, queryPathByPosition } = require('./lib/query')
const { applications } = require('./lib/config')
const { PORT } = require('./lib/config/env')
const config = require('./lib/config/vars')
const { accessApplication } = require('./lib/routing')
const { DECORATOR } = config

const app = Express()	

setupExpressServer(app)
console.log(config)

app.get('*', (req, res) => {	
	console.log(req.path)
	// handle serving the app
	if (isInPath(req.path, 'apps', 0)) {
		if (queryArray(applications, queryPathByPosition(req.path, 1)) === null)
			return res.sendStatus(404)
		if (queryPathByPosition(req.originalUrl, 2).slice(0, DECORATOR.length) === DECORATOR)
			return res.sendFile('/static/server/index.html', { root: __dirname })
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