const User = require('../models/Users')
const jwt = require('jsonwebtoken')


const auth = async (req,res,next) =>{
    // Check if the user has token in its headers
    const authHeaders = req.headers.authorization
    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        res.status(401).json({message:'You Are Not Authenticated'})
    }
    
    // get the tokens from the headers
    const token = authHeaders.split(' ')[1]

    if(token != null){

        try{
    
            // decode the token from the headers
            const payload = jwt.decode(token,process.env.JWT_SECRET)
            // find the user with the data from the token 
            const user = await User.findOne({email:payload.email}).select('-password')
        
            req.user = user
        
            req.user = {userId:user._id,email:payload.email,username:payload.userId}
        
            next()
        }catch(err){
    
            // res.status(401).send({"message":"Invalid Token"})
            
        }
    }
    
}

module.exports = auth