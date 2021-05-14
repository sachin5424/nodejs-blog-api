const {check , validationResult} = require('express-validator')

module.exports = {
    blog_add:[
        check('title','min length 3 characters title' ).isLength({min:3}),
 
        check('categories','min length 3 characters').isLength({min:3}),
        check('description','min length 3 characters').isLength({min:3}),
        check('active','Only true and false').isBoolean(),
        check('featured','Only true and false').isBoolean(),
    ]
}
