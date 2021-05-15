const Users = require('../models/user')
const {check,validationResult} = require('express-validator');
const { email_send } = require('../middleware/email.send');
const User_verfiy = require('../models/User.verfiy');
const bcrypt = require('../middleware/password.hash')
const bcrypts = require('bcrypt');
var jwt = require('jsonwebtoken');
exports.register_user = async (req,res)=>{
    try {
        console.log(req.body);
        const errors =  validationResult(req)
        console.log(errors);
        if(!errors.isEmpty()){
            res.status(400).json({
                errors:errors
            })
            console.log(errors);
        }
        else{
            const hashPassword = await bcrypt.hashPassword(req.body.Password)
            
             const data = new Users({
                Username:req.body.Username,
                Email:req.body.Email,
                Phone:req.body.Phone,
                Password:hashPassword
            })
            const get_data = await data.save()
            var val = Math.floor(1000 + Math.random() * 9000);
            const user_verfiy = new User_verfiy({
                Username:get_data._id,
                Otp:val

            })
            const otp_send = await user_verfiy.save()
            const mail = await email_send(get_data.Email,val)
            console.log(mail);
             res.status(201).json({
                message:"sussfuly create your account",
                otp_send:"check your email"+get_data.Email,
                data:get_data.Username
            })
        }
    } catch (error) {
         res.status(500).send(error)
    }
}

exports.User_list = async (req,res)=>{
    try {
        const data = await Users.find()
        return res.status(200).json({
            message:"your list ",
            data:data
        })

    } catch (error) {
        res.status(500).json({
            message:"somthing worng place try agin",
            error:error
        })
    }
}
exports.User_delete = async (req,res)=>{
    try {
        _id = req.params.id
        const data = await Users.findByIdAndDelete(_id)
        return res.status(200).json({
            message:"succfuly delete your account",
            data:data.Username
        })
    } catch (error) {
        return res.status(500).json(
            {
                message:"somthing worng place try agin",
                error:error
            }
        )
    }
}
exports.Verfiy_register_account = async (req,res)=>{
    try {
        const check_user = await Users.findOne({'Email':req.body.Email})
        const all_list = await User_verfiy.findOne({'Username':check_user._id}).populate('Username')
        if(all_list.Otp == req.body.Otp){
            const User_update = await Users.findByIdAndUpdate({'_id':check_user._id},{
                is_Active:true
            }, {
                new:true
            })
            console.log(User_update);
            return res.status(200).json({
                message:"Active your account "+check_user.Username
            })
        }
        else{
         return res.status(404).json({
             message:"place valid otp"
         })
        }
        res.send(all_list)
       
        
    } catch (error) {
        return res.status(500).json(
            {
                message:"somthing worng place try agin",
                error:error
            }
        )
    
    }
}


exports.User_login = async (req,res)=>{
    try {
        const user = await Users.findOne({'Email':req.body.Email})
        console.log(user);
        const valid_pass = await bcrypts.compare(req.body.Password,user.Password)
       
        if(valid_pass==true){
            var token= await jwt.sign({
                        userID:user._id,
                        username:user.Username
 
                   }, 'sagar',)
               return res.status(200).json({
                    token:token
 
                })
            }
            if(valid_pass==false){
             return res.status(400).json({
                 massage: "please validate password "
             })
         }
         
    } catch (error) {
        res.status(500).json(
            {
            message:"somthing worng place try agin",
            error:error
             })
    }
}