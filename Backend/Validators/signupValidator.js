const {body}=require( 'express-validator')

const signupValidator=[
    body('name','Name cannot be empty').not().isEmpty(),
    body('password','Minimum length is 8 characters').isLength({min:8}),
    body('email','Enter valid email').isEmail()
]
module.exports=signupValidator