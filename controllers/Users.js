const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CreateUser = async (req,res) =>{
    const {fullname,email,password,username} = req.body

    if(!email || !password || !username ||!fullname){
        res.status(400).json({"message":"A User Must Have Fullname, Email,Username,Password"})
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    // generating webtokens
    const token = await jwt.sign({userId:username,email:email},process.env.JWT_SECRET,{expiresIn:'30d'}) 

    // Update the user with hashed password
    const updatedUser = {...req.body,password:hashPassword}
    
    // Create User or Check for error messgae in the console
    try{

        const user = await (await User.create(updatedUser))
        res.status(201).json({user,token})   

    } catch(error){

        const {email, username} = error.keyValue

        if(email){
            res.status(400).json({"message":"Email Already Exists, try another Email"})
        }

        if(username){
            res.status(400).json({"message":"Username Already Exist"})
        }
        
    }

}


const LoginUser = async (req,res) =>{
    const {email, password } = req.body
    // Check if the user provide any valid data
    if(!email || !password ){
        res.send({"messgae":"You cannot Login without providing any valid details"})
    }
    // find the user from the database
    const user = await User.findOne({email:email})
    //If the user does not exist

    if(user==null){

        res.status(404).send({message:"User Login Details Mismacth"})
    }

    if(user){

        const result = await bcrypt.compare(password,user.password)
        if(result === true){
            const token = await jwt.sign({userId:user.username,email:user.email},process.env.JWT_SECRET,{expiresIn:'30d'}) 
            // send the access token and email address
            res.json({email:user.email,token})
        }
    }
    // Check if the user does not exist


    // generate access token for the user
}

const UpdateUser = (req,res) =>{
    res.send('Profile Updated')
}

const DeleteUser = (req,res) =>{
    res.send('Profile Deleted')
}


module.exports = {
    CreateUser, UpdateUser, DeleteUser, LoginUser
}