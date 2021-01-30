// Bibliotecas
const express = require('express')
const path = require('path')

// Configurando servidores HTTP e Socket
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// Configurações de projeto
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.set('html', require('ejs').renderFile)
app.set('view engine', 'html')

// Rotas
app.get('/', (req, res) => {
  res.render('index.html')
})

let messages = []

// Lógica do Socket
io.on('connection', socket => {

  socket.emit('savedMessages', messages)

  socket.on('sendMessage', messageObject => {
    messages.push(messageObject)
    socket.broadcast.emit('newMessage', messageObject)
  })

})

server.listen(3000)
