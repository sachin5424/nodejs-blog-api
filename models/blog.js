const mongoose = require('mongoose')

const blog = mongoose.Schema({
    Title:{
        type:String,
        required: true
        
    },
    Image:{
        type:String,
        required: true
    },
    categories:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'categories',
       
      
    },
    Active:{
        type:Boolean,
        default:false,
        required: true
    },
    Featured:{
        type:Boolean,
        default:false,
        required: true
    },
    Description:{
        type:String,
        required: true
    },
    created_at    : { type: Date, required: true, default: Date.now() }
  
})
module.exports=mongoose.model('Blogs',blog)