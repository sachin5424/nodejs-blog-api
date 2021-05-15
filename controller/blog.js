const blog = require('../models/blog')
const {check , validationResult} = require('express-validator')

exports.add =  (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({
            message:errors.msg,
            errors:errors
        })
        
    }
    else{
        console.log(req.file);
        const data = new blog({
            Title:req.body.title,
            Image:req.file.path,
            categories:req.body.categories,
            Description:req.body.description,
            Active:req.body.active,
            Featured:req.body.featured,
        }) 
        console.log(data);
        data.save()
        return res.json({
           messsage:"successfully Item Create",
           success:1,
           profile:`http://localhost:3002/${req.file.filename}`
       })
    }
   
} 
exports.list = async(req,res)=>{
    try {
     
     const all_list = await blog.find().populate('categories')
      return res.status(200).send(all_list)
    } catch (error) {
        res.status(500).send(error)
    }
 }
exports.single_list = async(req,res)=>{
    try {
        _id=req.params.id;
        console.log(_id)
        const item = await blog.findById(_id)
        res.status(200).send(item)
 
    } catch (error) {
        res.status(500).send(error)
    }
 }
 exports.filter_categroies = async(req,res)=>{
    try {
        console.log(req.params.id)
         var _id = req.params.id
         const find_cat_post = await blog.find({categories:_id})
        return res.status(200).send(find_cat_post)
    } catch (error) {
        res.status(500).send(error)
    }
}
 exports.delete = async(req,res)=>{
    try {
        var _id = req.params.id
        const delete_blog = await blog.findByIdAndDelete(_id)
        return res.status(200).json({
            messsage:"successfully Item Delete"
        })
    } catch (error) {
        res.status(500).send(error)
    }
 }