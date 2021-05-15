const mongoose = require('mongoose')
const User_verfiy = mongoose.Schema({
    Username:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'users',
    },
    Otp:{
       type:String,
       required:true 
    },
    created_at    : { type: Date, required: true, default: Date.now() }
  
})
module.exports=mongoose.model('User_verfiy',User_verfiy)