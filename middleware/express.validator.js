const {check , validationResult} = require('express-validator')

module.exports = {
    blog_add:[
        check('title','min length 3 characters title' ).isLength({min:3}),
 
        check('categories','min length 3 characters').isLength({min:3}),
        check('description','min length 3 characters').isLength({min:3}),
        check('active','Only true and false').isBoolean(),
        check('featured','Only true and false').isBoolean(),
    ],
    contact_form :[
        check('name','min length 3 characters name').isLength({min:3}),
        check('phone','Valid phone Number ').isNumeric({min:9}),
        check('email','Place valid Email ').isEmail(),
        check('messsage',' min length 10 characters name').isLength({min:10}),

    ]
}
