const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'Hi pets with GET'})
})

router.post('/', (req, res) => {
    res.json({ message: 'Hi pets with POST'})
})

router.put('/', (req, res) => {
    res.json({ message: 'Hi pets with PUT'})
})

module.exports = router