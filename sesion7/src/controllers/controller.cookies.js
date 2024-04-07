const { Router } = require('express');

const router = Router()

//Routes Cookies
router.get('/setCookie', (req, res) => {
    res.cookie('CookieCookie', 'Esto es una cookie :)', { maxAge: 3000000, signed: true }).send("Cookie creada")
})

router.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})

router.get('/deleteCookie', (req, res) => {
    res.clearCookie('CookieCookie').send("Cookie eliminada")
    //res.cookie('CookieCokie', '', { expires: new Date(0) })
})

module.exports = router