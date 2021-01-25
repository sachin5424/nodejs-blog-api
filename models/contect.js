const mongoose = require('mongoose')

const contect = mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    msg:String
})
module.exports=mongoose.model('contects',contect)