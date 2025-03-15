window.addEventListener('DOMContentLoaded', () => {
	const dropdown = document.querySelector('.sys-dropdown')
	dropdown.addEventListener('mouseover', (e) => {
		// e.target
		const menu = document.querySelector('.sys-menu')
		console.log(menu)
		menu.classList.add('dropped')
	})
	const [app, route] = parseApplicationRoute(new URLSearchParams(window.location.search))
	history.pushState({}, '', `/${app}${route}`)
	bindScript(app)
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