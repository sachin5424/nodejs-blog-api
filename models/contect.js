const mongoose = require('mongoose')

const contect = mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    messsage:String
})
module.exports=mongoose.model('contects',contect)