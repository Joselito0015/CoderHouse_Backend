const { Router } = require('express');
const UserDao = require('../dao/class/UserDao')

const userDao = new UserDao()


const router = Router()

router.get('/login', async (req, res) => {
    //login form from handlebars file login.handlebars
    res.render('login.handlebars')
}
)


//post login
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    try {
        const user = await userDao.findOne({ "email": email })
        console.log(user,"user")
        if (user && password == user.password) {
            //Seteamos los atributos de la session para guardar el email y el rol del usuario
            req.session.email = user.email
            req.session.rol = user.rol
            //Redireccionamos a productos
            res.redirect("/api/users/register")

        } else {
            res.status(400).send("Usuario o contraseña incorrectos")
        }
    } catch (e) {
        res.status(500).send("Error al loguear users: ", e)
    }
});


router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password, age } = req.body
        const findUser = await userDao.findOne({ email: email })
        if (findUser) {
            res.status(400).send("Ya existe un usuario con este mail")
        } else {
            await userDao.create({ first_name, last_name, email, age, password })
            res.status(200).send("usuario creado correctamente")
        }
    } catch (e) {
        res.status(500).send("Error al registrar users: ", e)
    }
});

router.get('/register', async (req, res) => {
    //register form from handlebars file register.handlebars
    res.render('register.handlebars')
}
);



router.get('/logout', (req, res) => {
    req.session.destroy(function (e) {
        if (e) {
            console.log(e)
        } else {
            res.status(200).redirect("/api/users/login")
        }
    })
})

router.get('/session', (req, res) => {
    console.log(req.session)
    if (req.session.counter) {
        req.session.counter++
        res.send(`Sos el usuario N° ${req.session.counter} en ingresar a la pagina`)
    } else {
        req.session.counter = 1
        res.send("Sos el primer usuario que ingresa a la pagina")
    }
})


module.exports = router