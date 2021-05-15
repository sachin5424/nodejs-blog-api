var jwt = require('jsonwebtoken');

module.exports  =  (req,res,next)=>{
  try {
       var bearer = req.headers.authentication.split(" ");
       
       token = bearer[1];
        var decode = jwt.verify(token,'sagar')
    req.userDe=decode
      next()
  } catch (error) {
      res.status(401).json({
          message:"Failed to authenticate token."
      }) 
  }
}