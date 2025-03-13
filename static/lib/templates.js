function loadTemplate(url, selector) {
	fetch(url)
		.then(response => response.text())
		.then(html => {
			document.querySelector(selector).innerHTML = html
		})
		.catch(error => {
			console.error('Error loading template:', error)
		})
}

function insertPage(url) {
	loadTemplate(url, '#page')
}

function insertComponents() {
	setTimeout(() => {
		const components = document.querySelectorAll('component')
		console.log(components)
	}, 1000)
}

export {
	insertComponents,
	insertPage,
	loadTemplate
}