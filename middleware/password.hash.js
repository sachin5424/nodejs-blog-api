const bcrypt = require("bcrypt")
module.exports = {
    hashPassword:(value)=>{
        return new Promise((resolve, reject)=>{
            bcrypt.hash(value,10,(err,res)=>{
              if(err){
                reject(err)
              }
              else{
                  resolve(res)
              }
            })
        })
    }
}