const mongoose = require('mongoose')

const Users = mongoose.Schema({
    Username:{
        type:String,
        required: true
        
    },
    Email:{
        type:String,
        required: true
    },
    Email_Verfiy:{
        type:Boolean,
        default:false,
       
    },
    Phone:{
        type:String,
        required: true
    },
    Phone_Verfiy:{
        type:Boolean,
        default:false,
        
    },
    is_Active:{
        type:Boolean,
        default:false,
        
    },
    is_Admin:{
        type:Boolean,
        default:false,
    },
    Password:{
        type:String,
        required:true
    },
    created_at    : { type: Date, required: true, default: Date.now() }
  
})
module.exports=mongoose.model('users',Users)