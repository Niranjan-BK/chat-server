const express = require('express')
const Chat = require('../models/chat')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/chat', auth, async (req, res) => {
    //const task = Task(req.body)
    const task = Chat({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get('/chats', auth, async (req, res) => {

    try {
        await req.user.populate({
            path: 'messages',
        })
        res.send(req.user.messages) 
    } catch (error) {
        res.status(500).send()
    }
    
})

module.exports = router 