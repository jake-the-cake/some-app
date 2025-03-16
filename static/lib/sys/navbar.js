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
		this.isDropped = false
		this.menuHeight = this.menu.offsetHeight
		this.setMenuUp()
		this.createMenuListeners()
	}

	menuToggleListener(e) {
		if (this.isDropped) this.setMenuUp()
		else this.setMenuDown()
		this.isDropped = !this.isDropped
	}

	menuBlurListener(e) {
		if (!this.isDropped) return
		if (!this.menu.contains(e.target) && !this.dropdown.contains(e.target)) {
			this.setMenuUp()
			this.isDropped = false
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