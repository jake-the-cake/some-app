function loadTemplate(templateUrl, targetSelector) {
	fetch(templateUrl)
		.then(response => response.text())
		.then(html => {
			document.querySelector(targetSelector).innerHTML = html
		})
		.catch(error => {
			console.error('Error loading template:', error)
		})
}

export { loadTemplate }