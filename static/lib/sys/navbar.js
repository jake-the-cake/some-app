class Navbar {

	appDataUrl = '/static/data/apps.json'

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
	
	async setupMenu() {
		this.isDropped = false
		await this.setupMenuLinks()
		this.menuHeight = this.menu.offsetHeight
		this.setMenuUp()
		this.createMenuListeners()
	}

	async setupMenuLinks() {
		this.menuLinks = await this.addNenuLinks()
	}

	addAppLink(data) {
		Object.keys(data).forEach(app => {
			const link = document.createElement('li')
			link.innerText = data[app].label
			link.onclick = () => {
				this.system.changeApp(app)
				this.setMenuUp()
			}
			this.menu.appendChild(link)
		})
	}

	addNonAppLink(data) {
		Object.keys(data).forEach(app => {
			const link = document.createElement('li')
			link.classList.add('non-app')
			link.innerText = data[app].label
			link.onclick = () => {
				this.system.changeApp(app)
				this.setMenuUp()
			}
			this.menu.appendChild(link)
		})
	}

	async addNenuLinks() {
   await fetch(this.appDataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${ this.appDataUrl }: ${response.statusText}`)
            }
            return response.json()
        })
        .then(appData => {
					this.addAppLink(appData.apps)
					this.addNonAppLink(appData.nonapps)
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

	async setup(object) {
		this.object = object
		this.name.innerText = this.object.name
		await this.setupMenu()
		this.setupTabs()
	}
}

export { Navbar }