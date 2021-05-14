const express = require('express')
const router = express.Router()
var path = require('path')
const blog = require('../models/blog')
const controller_blog = require('../controller/blog')
const upload = require('../middleware/milter')
const validator = require('../middleware/express.validator')

router.post('/add',upload.single('Image'),validator.blog_add,controller_blog.add)

router.get('/list',controller_blog.list)

router.delete('/delete/:id',controller_blog.delete)

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

router.get('/details/:id',controller_blog.single_list)

router.get('/categroies/:id',)

module.exports = router