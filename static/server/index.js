import { Navbar } from '../lib/sys/navbar.js'

function newDiv(classList = []) {
	const element = document.createElement('div')
	if (Array.isArray(classList)) element.classList = classList
	return element
}

function valueTypeError(expectedType, value) {
	return TypeError(`Expected ${ expectedType } but received ${ typeof(value) }`)
}

function notString(value) {
	if (typeof(value) !== 'string') return true
	return false
}

class LoadScreen {

	constructor() {
		this.element = newDiv(['sys-loader'])
		this.spinnerBg = newDiv(['background'])
		this.spinner = newDiv(['container'])
	
		this.element.appendChild(this.spinnerBg)
		this.spinnerBg.appendChild(this.spinner)
		this.spinner.appendChild(newDiv(['arm']))
		this.spinner.appendChild(newDiv(['arm']))
		this.spinner.appendChild(newDiv(['arm']))
		this.spinner.appendChild(newDiv(['arm']))
		this.spinner.appendChild(newDiv(['center']))
	}
	
	start() {
		this.interval =	setInterval(() => {
			this.spinner.style.rotate = parseInt(this.spinner.style.rotate || 0) + 24 + 'deg'
			this.spinnerBg.style.rotate = parseInt(this.spinnerBg.style.rotate || 0) - 16 + 'deg'
		}, 100)
	}

	addLoader(element = null) {
		if (!element) element = document
		this.parent = element
		this.parent.appendChild(this.element)
		this.start()
	}
	
	stop() {
		clearInterval(this.interval)
		this.parent.removeChild(this.element)
	}
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
		this.navbar = new Navbar()
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

	start() {
		[this.app, this.route] = parseApplicationRoute(new URLSearchParams(window.location.search))
		history.pushState({}, '', `/${ this.app }${ this.route }`)
		bindScript(this.app)

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
}

const settings = {
	name: 'Nameless System'
}










window.addEventListener('DOMContentLoaded', () => {
	const system = new System(settings.name)
})

function parseApplicationRoute(params) {
	return [
		window.location.pathname.split('/')[2],
		params.get('route')
	]
}

function bindScript(app) {
	const script = document.createElement('script')
	script.src = `/static/apps/${app}/index.js`
	script.type = 'module'
	document.body.appendChild(script)
}