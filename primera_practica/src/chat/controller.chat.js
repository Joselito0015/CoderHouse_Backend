const { Router } = require('express');
const messageDao = require('../dao/class/messageDao')

const Message = new messageDao

const router = Router()


router.get('/', async (req,res) =>{
    const messages= await Message.find()
    //sort oposite the messages
    messages.sort((a,b) => b.date - a.date)
    res.render('chat.handlebars',{messages: messages,script: '/js/chat.js'})
})


router.post('/', async  (req,res) =>{
    const {usermail,message} = req.body
    const newmessage= {   
        usermail : usermail,
        message : message
    }
    const response= await Message.create(newmessage)
    res.json({resolve: response})
})


module.exports = router