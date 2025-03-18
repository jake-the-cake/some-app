function newDiv(classList = []) {
	const element = document.createElement('div')
	if (Array.isArray(classList)) element.classList = classList
	return element
}

export {
	newDiv
}