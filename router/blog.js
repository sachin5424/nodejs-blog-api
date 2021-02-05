const express = require('express')
const router = express.Router()
var path = require('path')
const blog = require('../models/blog')
const multer = require('multer');

// ------------ multer ------------------
const storage = multer.diskStorage({
    destination:'./upload/images/',
   
    filename:(req,file,cd)=>{
        return cd(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage:storage,
    limit:{fileSize:1}
})
// --------------- End multer ---------------


router.post('/add',upload.single('Image'),(req,res)=>{
    var title = req.body.title;
    if(title.length < 3){
        return res.status(400).json({
            messsage: "title length 3 characters "
        })
    }
    var image = req.file.path;
    var categories = req.body.categories; 
    var description = req.body.Description;
    if(!categories){
        return res.status(400).json({
            messsage:"categorie required"
        })
    }
    if(!description){
        return res.status(400).json({
            messsage:"place valid  key "
        })
    }
    var active = req.body.Active;
    if(!active){
        return res.status(400).json({
            messsage:"place valid  key "
        })
    }
    var featured = req.body.Featured
    if(!featured){
        return res.status(400).json({
            messsage:"place valid  key "
        })
    }
    const kk = new blog({
        Title:title,
        Image:image,
        categories:categories,
        Description:description,
        Active:active,
        Featured:featured,
    }) 
    kk.save()
    return res.json({
       messsage:"successfully Item Create",
       success:1,
       profile:`http://localhost:3002/${req.file.filename}`
   })
})

router.get('/list',async(req,res)=>{
    try {
     
        const all_list = await blog.find().populate('categories')
      return res.status(200).send(all_list)
    } catch (error) {
        res.status(500).send(error)
    }
 })
 



router.delete('/delete/:id',async(req,res)=>{
    try {
        var _id = req.params.id
        const delete_blog = await blog.findByIdAndDelete(_id)
        return res.status(200).json({
            messsage:"successfully Item Delete"
        })
    } catch (error) {
        res.status(500).send(error)
    }
 })

 router.put('/update/:id',upload.single('Image'),(req,res)=>{
    console.log(req.body);
    _id = req.params.id

    var title = req.body.Title;
    if (!title){
        return res.status(404).json({
            messsage:"place valid  key title"
        })
    }
    var image = req.file.path;
    if (!image){
        return res.status(404).json({
            messsage:"place valid  key image"
        })
    }
    var categories = req.body.categories; 
    if (!categories){
        return res.status(404).json({
            messsage:"place valid  key categories"
        })
    }
    var description = req.body.Description;
    if (!description){
        return res.status(404).json({
            messsage:"place valid  key description"
        })
    }
    var featured = req.body.Featured
    if (!featured){
        return res.status(404).json({
            messsage:"place valid  key featured"
        })
    }
    var active = req.body.Active;
    if (!active){
        return res.status(404).json({
            messsage:"place valid  key "+active
        })
    }
   
    const blog_update =  blog.findByIdAndUpdate(_id,
        {
            Title:title,
            categories:categories,
            Image:image,
            Description:description,
            Active:active,
            Featured:featured,
        },
        {
            new:true
        }
        )
    console.log(blog_update);
    return res.send(blog_update)
    //  console.log('ok');
    // var title = req.body.title;
    // console.log(title);
   
    // var image = req.file.path;
    // var categories = req.body.categories; 
    // var description = req.body.Description;
    // console.log(title);
    // const kk = new blog({
    //     Title:title,
    //     Image:image,
    //     categories:categories,
    //     Description:description,
    //     Active:active,
    //     Featured:featured,
    // }) 
    // kk.save()
//     return res.json({
//        success:1,
//        profile:`http://localhost:3002/${req.file.filename}`
//    })
})

router.get('/details/:id',async(req,res)=>{
   try {
       _id=req.params.id;
       console.log(_id)
       const item = await blog.findById(_id)
       res.status(200).send(item)

   } catch (error) {
       res.status(500).send(error)
   }
})

router.get('/categroies/:id',async(req,res)=>{
    try {
        console.log(req.params.id)
         var _id = req.params.id
         const find_cat_post = await blog.find({categories:_id})
        return res.status(200).send(find_cat_post)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router