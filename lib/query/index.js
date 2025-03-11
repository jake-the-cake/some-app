/**
 * Filters an array to find a specific value.
 * 
 * @param {Array} array - The array to search through.
 * @param {*} value - The value to search for in the array.
 * @returns {*} - The found value, or null if not found.
 */
function queryArray(array, value) {
	const query = array.filter(a => a === value)
	return checkQuery(query)
}

function isInPath(path, value, position = null) {
	const values = splitPath(path)
	if ((typeof(position) === 'number'
				&& values.length > position
				&& values[position] === value)
			|| (position === null
				&& checkQuery(values.filter(v => v === value)))) {
					return true
				}
	return false
}

function queryPathByPosition(path, position) {
	const values = splitPath(path)
	if (typeof(position) !== 'number')
		throw TypeError('Position must be an integer.')
	if (values.length <= position)
		throw RangeError('Index out of range in the array.')
	return values[position]
}

function checkQuery(query) {
	if (query.length === 0) return null
	return query[0]
}

function splitPath(path) {
	return path.split('/').slice(1)
}

module.exports = {
	isInPath,
	queryArray,
	queryPathByPosition,
}