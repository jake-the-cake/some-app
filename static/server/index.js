import { LoadScreen } from '../lib/sys/loader.js'
import { Navbar } from '../lib/sys/navbar.js'


const settings = {
	name: 'Nameless System'
}

function valueTypeError(expectedType, value) {
	return TypeError(`Expected ${ expectedType } but received ${ typeof(value) }`)
}

function notString(value) {
	if (typeof(value) !== 'string') return true
	return false
}

class System {

	constructor(name) {
		if (notString(name)) throw valueTypeError('string', name)
		this.name = name
		this.isHealthy = true
		this.isLoading = false
		this.load()		
		if (this.isHealthy === true) this.start()
	}
	
	handleNavbar() {
		this.navbar = new Navbar(this)
		this.navbar.setup(this)
		console.log('TODO: check for open tabs')
	}
	
	load() {
		this.isLoading = true
		try {
			this.main = document.querySelector('main')
			this.root = this.main.querySelector('#root')

			this.loader = new LoadScreen()
			this.loader.addLoader(this.main)

			this.handleNavbar()
		
			// handle footer
			// this.handleFooter()
		} catch(e) {
			// todo: set main section to error
			this.loadErrorPage(500)
			throw Error('Could not load system interface.')
		}
	}
	
	loadErrorPage(status) {
		this.root.innerText = 'Oops'
	}

	recover() {
		console.warn('TODO: add recovery sytem')
	}

	parseApplicationRoute(params) {
		return [
			window.location.pathname.split('/')[2],
			params.get('route')
		]
	}

	getApp() {
		[this.app, this.route] = this.parseApplicationRoute(new URLSearchParams(window.location.search))
	}

	useLink(route) {
		this.route = route
		this.changeApp(this.app, this.route)
	}

	changeApp(app, route = '') {
		if (!this.isLoading) this.loader.addLoader(this.main)
		history.pushState({}, '', `/${ app }${ route }`)
		bindScript(app)
		this.startApp()
	}
	
	startApp() {
		if (!this.isHealthy) return this.recover()
		
		setTimeout(() => {
			this.isLoading = false
		}, 500)
		
		const interval = setInterval(() => {
			if (!this.isLoading) {
				this.loader.stop()
				clearInterval(interval)
			}
		}, 100)
	}
	
	start() {
		this.getApp()
		this.changeApp(this.app, this.route)
	}
}

window.addEventListener('DOMContentLoaded', () => {
	const system = new System(settings.name)
})


function bindScript(app) {
	const script = document.createElement('script')
	script.src = `/static/apps/${app}/index.js`
	script.type = 'module'
	document.body.appendChild(script)
}