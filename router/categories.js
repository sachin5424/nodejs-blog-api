const express = require('express')
const router = express.Router()
const categories = require('../models/categories')

const controller_categories = require('../controller/categories')


router.get('/list',controller_categories.list)
router.post('/add',controller_categories.add)
router.delete('/delete/:id',controller_categories.delete)
router.get('/categories/:id', controller_categories.single_list)

module.exports = router