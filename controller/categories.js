const categories = require('../models/categories')
const blog = require('../models/blog')


exports.list = async (req,res)=>{
    try {
        const categories_list = await categories.find()
        res.status(200).send(categories_list)
    } catch (error) {
        res.status(500).send(error)
    }
}
exports.single_list = async (req, res) => {
    try {

        if (!req.params.id) {
            return res.status(404).send()
        }
        else {
            const cat = await categories.findById(req.params.id)
            res.status(200).send(cat)
        }

    } catch (error) {
        res.send(error)
    }
}
exports.add = async (req,res)=>{
    try {
        let title = req.body.title

        if (title.length < 3) {
            return res.status(400).json({
                messsage: "categorie length 3 characters "
            })
        }
        var cat = new categories({
            title: title
        })

        let unique = await categories.findOne({ 'title': title })

        if (!unique) {
            cat.save()
            return res.status(200).json({
                messsage: "categorie successfully Create " + title
            })
        }
        if (unique.title == title) {
            return res.status(400).json({
                messsage: "place try different name"
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.delete = async(req,res)=>{
    try {
         var _id = req.params.id;
         const get_blog_id = await blog.find({categories:_id});
         if (get_blog_id) {
            for( var key in get_blog_id){
                const delt = await blog.findByIdAndDelete({_id:get_blog_id[key]._id})
            }      
        }
        const delt = await categories.findByIdAndDelete(req.params.id)   
        if(!req.params.id){
           return res.status(404).json({
            messsage:"Not Found"
           })
        }
        else{
            return res.status(200).json({
                messsage:"successfully Item Delete"
            })
           
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
    
}