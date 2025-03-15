function valueTypeError(expectedType, value) {
	return TypeError(`Expected ${ expectedType } but received ${ typeof(value) }`)
}

function notString(value) {
	if (typeof(value) !== 'string') return true
	return false
}

class Navbar {

	constructor() {
		this.element = document.querySelector('nav')
		if (this.element === null) throw Error('No "nav" element found.')
		this.name = this.element.querySelector('#sys-name')
		if (this.name === null) throw Error('No navbar element with id "sys-name".')
		this.dropdown = this.element.querySelector('#sys-dropdown')
		if (this.dropdown === null) throw Error('No navbar element with id "sys-dropdown".')
		this.menu = this.element.querySelector('#sys-menu')
		if (this.menu === null) throw Error('No navbar element with id "sys-menu".')
	}	
	
	setMenuDown() {
		this.menu.style.top = `${ this.element.offsetHeight }px`
	}
	
	setMenuUp() {
		this.menu.style.top = `-${ this.menuHeight }px`
	}
	
	setupMenu() {
		this.menuHeight = this.menu.offsetHeight
		this.setMenuUp()
		this.createMenuListener()
		// this.setMenuDown()
	}

	createMenuListener() {
		this.dropdown.addEventListener('mouseenter', (e) => {
			this.setMenuDown()
		})
	}

	setupTabs() {
		return
	}

	setup(object) {
		this.object = object
		this.name.innerText = this.object.name
		this.setupMenu()
		// load tabs
	}
}





class System {

	constructor(name) {
		if (notString(name)) throw valueTypeError('string', name)
		this.name = name
		this.isHealthy = true
		this.load()

		
		
		
		if (this.isHealthy === true) this.start()
		}
	
	handleNavbar() {
		this.navbar = new Navbar()
		this.navbar.setup(this)
		

		// check for open tabs
		
	}
	
	load() {
		try {
			// start loader
		
			// handle nav
			this.handleNavbar()
		
			// handle footer
			// this.handleFooter()
		} catch(e) {

			// todo: set main section to error
			console.log(e)
			throw Error('Could not load system interface.')
		}
	}

	start() {
		// search for app
	
		// setup app route
	
		// load content
	}
}

const settings = {
	name: 'Nameless System'
}










window.addEventListener('DOMContentLoaded', () => {
	const system = new System(settings.name)
	// const [app, route] = parseApplicationRoute(new URLSearchParams(window.location.search))
	// history.pushState({}, '', `/${app}${route}`)
	// bindScript(app)
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