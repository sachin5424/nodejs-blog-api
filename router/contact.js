const express = require('express')
const router = express.Router()
const contect = require('../models/contect')
var validator = require("email-validator");
const controller_contact = require('../controller/contact')
const {contact_form} = require('../middleware/express.validator')

router.post('/add',contact_form,controller_contact.add)
router.get('/list',controller_contact.list)
router.delete('/delete/:id',controller_contact.delete)

module.exports = router