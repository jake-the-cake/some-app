import { changeTitle } from '../../lib/meta.js'
import { loadTemplate, insertPage, insertComponents } from '../../lib/templates.js'

class Application {

	constructor(name) {
		this.name = name
		loadTemplate(`/static/apps/${ name }/template.html`, '#root')
		insertPage(`/static/apps/${ name }/pages/home.html`)
		insertComponents()
	}

}

new Application('topics')
changeTitle('Topics')

