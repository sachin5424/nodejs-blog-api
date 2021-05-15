const express = require('express')
const router = express.Router()

const controller = require('../controller/user')
const {User} = require('../middleware/express.validator')

router.post('/register',User,controller.register_user),
router.get('/list',controller.User_list)
router.delete('/:id',controller.User_delete)
router.post('/verfiy-account',controller.Verfiy_register_account)
router.post('/login',controller.User_login)

module.exports = router