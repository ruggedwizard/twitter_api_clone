const CreateUser = (req,res) =>{
    res.send('Profile Created')
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