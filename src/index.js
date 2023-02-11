const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const es6Renderer = require('express-es6-template-engine')
require('dotenv').config({path: 'config/.env'})
require('./db/mongoose.js')
const User = require('./models/user')
const Chat = require('./models/chat')
const userRouter = require('./routers/user')
const chatRouter = require('./routers/chat')
const auth = require('./middleware/auth')
const { generateMessage} = require('./utils/messages')
const  {addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')
const { error } = require('console')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded());
app.use(express.json())
// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')

app.engine('html', es6Renderer)
app.set('view engine', 'html')
app.set('views', viewsPath)

app.use(userRouter)
app.use(chatRouter)

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/chat', (req, res) => { // can add middle auth, some front-end issue is there.
    res.render('chat')
})

let count = 0
io.on('connection', (socket) => {
    console.log('New Websocket coonection')
    var user = '';
    socket.on('join', ( username, callback) => {
        user = username
        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.emit('message', generateMessage('Admin', `${username} has joined`))
    })
    
    socket.on('sendMessage', (message, username, callback) => {
        io.emit('message', generateMessage(username, message))
        callback()
    })

    socket.on('disconnect', () => {
            io.emit('message', generateMessage('Admin', `${user} has left`))  
    })
})





server.listen(port, () => {
    console.log('Server is up and running at '+port)
})