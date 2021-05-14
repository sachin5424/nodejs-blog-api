const contect = require('../models/contect')
const {check , validationResult} = require('express-validator')
exports.add = (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({
            message:errors.msg,
            errors:errors
        })
    }
    else{
        const userData = new contect({
            name:name,
            email:email,
            phone:phone,
            messsage:messsage
        })
        userData.save()
        console.log(userData);
        return res.status(200).json({
            messsage:" successfully sent"
            
        })
    }
   
}

exports.list = async(req,res)=>{
    console.log('ok');
   const userDetails = await contect.find()
   return res.status(200).send(userDetails)
}

exports.delete = async(req,res)=>{
    _id = req.params.id
    const contect_delete = await contect.findByIdAndDelete(_id)
    return res.status(200).json({
        messsage:"done"
    })
}