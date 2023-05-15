
const app = require('./index')
const { Server } = require('socket.io')
const {port} = require('./config')


const httpserver = app.listen(port, ()=>{
    console.log('listening on port ' + port)
})

  
const io = new Server(httpserver)

io.on('connection', socket => {
  console.log(`New client with id: ${socket.id}`)

  socket.on('newUser', user => {
    socket.broadcast.emit('newUserConnected', user)
    socket.emit('allChats', messages)
  })

  socket.on('addProductFromClient', data => {
    io.emit('newProductFromServer', data)
    
  })
  
  socket.on('messagefromcliente', message => {
    io.emit('chat', message)
    
  })

})
  
console.log("ga")