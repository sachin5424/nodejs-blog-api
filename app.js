var express = require('express');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser')
const cors = require('cors')
const Port = 3002
const path = require('path')
const mongoose = require('mongoose');
const mongose_port = 'mongodb://localhost:27017/blogs';
const multer = require('multer');
const categories_router = require('./router/categories')
const blog_router = require('./router/blog')
// --------------- app -------------------
app.use(bodyparser.json());
app.use(cors());
app.use('/',router);
app.use('/upload/images/',express.static('upload/images/'))
app.use(bodyparser.json())
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));



// ----------------- End app ---------------


//   models
// const userDetails = require('./models/user_register')
// const signUp = require('./models/sign_up')
const categories =require('./models/categories')
const blog = require('./models/blog')
const contect =require('./models/contect')
const contect_router = require('./router/contact')


mongoose.connect(mongose_port,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
    
});


// ------------ multer ------------------

// const storage = multer.diskStorage({
//     destination:'../upload/images/',
//     filename:(req,file,cd)=>{
//         return cd(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })
// const upload = multer({
//     storage:storage,
//     limit:{fileSize:1}
// })
// --------------- End multer ---------------


// ------------- categories ------------------ 

app.use('/categories',categories_router)
app.use('/blog',blog_router)
app.use('/contact',contect_router)
// router.get('/categories-list',async(req,res)=>{
    
//     try {
        
//         const user = await categories.find({});
//         res.send(user)
//         console.log(new Date(dt.now()));
//     } catch (error) {
//         res.send(error)
//     }
// });


// router.get('/categories/:id',async(req,res)=>{
//     try {
        
//         if(!req.params.id){
//            return res.status(404).send()
//         }
//         else{
//             const cat = await categories.findById(req.params.id)
//             res.status(200).send(cat)
//         }
        
//     } catch (error) {
//         res.send(error)
//     }   
// })


// router.delete('/categories/:id',async(req,res)=>{
//     try {
//         var _id = req.params.id;
//         const demo = await blog.find()
//          const get_blog_id = await blog.find({categories:_id});
//          if (get_blog_id) {
//             for( var key in get_blog_id){
//                 console.log(  get_blog_id[key]._id)
//                 const delt = await blog.findByIdAndDelete({_id:get_blog_id[key]._id})
//             }      
//         }
//         const delt = await categories.findByIdAndDelete(req.params.id)   
//         if(!req.params.id){
//             res.status(404).send()
//         }
//         else{
//             res.status(200).send(delt)
//              res.status(200).send(demo)
//         }
        
//     } catch (error) {
//         res.status(500).send(error)
//     }
    
// })

// router.put('/categories/:id',async(req,res)=>{
//     try {
//         const _id = req.params.id
//         const update = await categories.findByIdAndUpdate(_id,req.body,{new:true});
//         if (!req.params.id) {
//             res.status(404).send()
//         } else {
//             res.status(200).send(update)
//         }
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })



// router.post('/categories',(req,res)=>{
     
//     var get_categories = new categories(req.body)
//     console.log(get_categories);
//     get_categories.save()

// })

// ------------- End categories ------------------ 


// ---------- contect ----------------
// router.get('/contect',async(req,res)=>{
    
//     try {
//         console.log('jkh');
//         const user = await contect.find({});
//         res.send(user)
//         console.log(new Date(dt.now()));
//     } catch (error) {
//         res.send(error)
//     }
// });


// router.post('/contect',(req,res)=>{
     
//     var get_contect = new contect(req.body)
//     console.log(get_contect);
//     get_contect.save()
//     // g.save()


// })
// router.delete('/contect/:id',async(req,res)=>{
//     try {
//         const delt = await contect.findByIdAndDelete(req.params.id)   
//         if(!req.params.id){
//             res.status(404).send()
//         }
//         else{
//             res.status(200).send(delt)
//              res.status(200).send(demo)
//         }
        
//     } catch (error) {
//         res.status(500).send(error)
//     }
    
// })

// -----------End contect ------------------

// ------------- Post -------------------------

// router.post('/upload',upload.single('Image'),(req,res)=>{
//     console.log(res.file);
//     var title = req.body.Title;
//     var image = req.file.path;
//     var categories = req.body.categories; 
//     var description = req.body.Description;
//     var active = req.body.Active;
//     var featured = req.body.Featured
//     const kk = new blog({
//         Title:title,
//         Image:image,
//         categories:categories,
//         Description:description,
//         Active:active,
//         Featured:featured,
//     }) 
//     kk.save()
//     res.json({
//        success:1,
//        profile:`http://localhost:4002/Image/${req.file.filename}`
//    })
// })


// router.get('/',async(req,res)=>{
//    try {
//     const data = await blog.find().populate('categories')
//     res.status(200).send(data)
//    } catch (error) {
//        res.status(500).send(error)
//    }
// })



// router.delete('/blog/:id',async(req,res)=>{
//     try {
//         const delt = await blog.findByIdAndDelete(req.params.id)   
//         if(!req.params.id){
//             res.status(404).send()
//         }
//         else{
//             res.status(200).send(delt)
//              res.status(200).send(demo)
//         }
        
//     } catch (error) {
//         res.status(500).send(error)
//     }
    
// })

// -------------- End Post -----------------------
app.listen(Port)
