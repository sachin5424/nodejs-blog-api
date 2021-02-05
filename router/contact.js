const express = require('express')
const router = express.Router()
const contect = require('../models/contect')
var validator = require("email-validator");

router.post('/add',(req,res)=>{
     console.log(req.body);
     var name = req.body.name
     var phone = req.body.phone
     var email = req.body.email
     var messsage = req.body.messsage
     var valid_email = validator.validate(email)
     if(name.length < 3){
        return res.status(400).json({
            messsage: "name length 3 characters "
         })
     }
     if(!valid_email){
         return res.status(400).json({
            massage: "please validate your email address "
         })
     }
     console.log(typeof phone);

     if(typeof phone==='string'){
        return res.status(400).json({
            messsage: "Place valid number"
         })
     }
     if(messsage.length < 3){
        return res.status(400).json({
            messsage: "messsage length 3 characters "
         })
     }
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
})
router.get('/list',async(req,res)=>{
    console.log('ok');
   const userDetails = await contect.find()
   return res.status(200).send(userDetails)
})

router.delete('/delete/:id',async(req,res)=>{
    _id = req.params.id
    const contect_delete = await contect.findByIdAndDelete(_id)
    return res.status(200).json({
        messsage:"done"
    })
})

module.exports = router