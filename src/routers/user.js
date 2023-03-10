const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/users', async (req, res) => {
    const user = User(req.body)
    try {
        await user.save()
        const token = await user.gerateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.gerateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.send() 
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router 