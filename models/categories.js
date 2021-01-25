const mongoose = require('mongoose')

const categorie = mongoose.Schema({
    title:String,
})
module.exports=mongoose.model('categories',categorie)