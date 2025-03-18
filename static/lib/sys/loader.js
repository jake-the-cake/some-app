import { newDiv } from '../tools/elements.js'

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

export { LoadScreen }