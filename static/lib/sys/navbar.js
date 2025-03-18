class Navbar {

	constructor(system) {
		this.element = document.querySelector('nav')
		if (this.element === null) throw Error('No "nav" element found.')
		this.name     = this.findElement('#sys-name')
		this.menu     = this.findElement('#sys-menu')
		this.dropdown = this.findElement('#sys-dropdown')
		this.system   = system
	}

	findElement(selector) {
		const element =  this.element.querySelector(selector)
		if (element === null) throw Error(`No navbar element with selector "${selector}".`)
		return element
	}
	
	setMenuDown() {
		this.menu.style.top = `${ this.element.offsetHeight }px`
		this.isDropped = true
	}
	
	setMenuUp() {
		this.menu.style.top = `-${ this.menuHeight }px`
		this.isDropped = false
	}
	
	setupMenu() {
		this.isDropped = false
		this.setupMenuLinks()
		this.menuHeight = this.menu.offsetHeight
		this.setMenuUp()
		this.createMenuListeners()
	}

	setupMenuLinks() {
		this.menuLinks = this.addNenuLinks()
	}

	addNenuLinks() {
    fetch('/static/data/apps.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load apps.json: ${response.statusText}`)
            }
            return response.json()
        })
        .then(appData => {
            Object.keys(appData.apps).forEach(app => {
                const link = document.createElement('li')
                link.innerText = appData['apps'][app].label
                link.onclick = () => {
                    this.system.changeApp(app)
                    this.setMenuUp()
                }
                this.menu.appendChild(link)
            })
        })
        .catch(error => {
            console.error('Error loading apps.json:', error)
        })
	}

	menuToggleListener(e) {
		if (this.isDropped) this.setMenuUp()
		else this.setMenuDown()
	}

	menuBlurListener(e) {
		if (!this.isDropped) return
		if (!this.menu.contains(e.target) && !this.dropdown.contains(e.target)) {
			this.setMenuUp()
		}
	}

	createMenuListeners() {
		this.dropdown.addEventListener('click', this.menuToggleListener.bind(this))
		document.addEventListener('click', this.menuBlurListener.bind(this))
	}

	setupTabs() {
		console.log('Tab functions coming soon')
		return
	}

	setup(object) {
		this.object = object
		this.name.innerText = this.object.name
		this.setupMenu()
		this.setupTabs()
	}
}

export { Navbar }