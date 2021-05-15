const Users = require('../models/user')
const {validationResult} = require('email-validator')

exports.register_user = async (req,res)=>{
    try {
        console.log("ok");
        console.log(req.body);
        let errors = await validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                errors:errors
            })
            console.log(errors);
        }
        else{
         
            const data = new Users({
                Username:req.body.Username,
                Email:req.body.Email,
                Phone:req.body.Phone,
                Password:req.body.Password
            })
            const get_data = await data.save()
             res.status(201).json({
                message:"sussfuly create your account",
                data:get_data
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"smothing worng try agin",
            error:error
        })
    }
}