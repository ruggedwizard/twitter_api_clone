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
    const token = jwt.sign({userId:username,email:email},process.env.JWT_SECRET,{expiresIn:'30d'}) 

    // Update the user with hashed password
    const updatedUser = {...req.body,password:hashPassword}
    const user = await User.create(updatedUser)
    res.status(201).json({updatedUser,token})   
}

const UpdateUser = (req,res) =>{
    res.send('Profile Updated')
}

const DeleteUser = (req,res) =>{
    res.send('Profile Deleted')
}


module.exports = {
    CreateUser, UpdateUser, DeleteUser
}