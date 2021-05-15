const controller = require('../controller/user')
const express = require('express')
const router = express.Router()
const {User} = require('../middleware/express.validator')
router.post('/register',User,controller.register_user)


module.exports = router