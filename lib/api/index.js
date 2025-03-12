const Express = require('express')
const router  = Express.Router()

router.get('/', (req, res) => {
	res.send('Hello World!')
})

module.exports = router