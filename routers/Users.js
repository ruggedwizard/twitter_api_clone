const express = require('express');
const router = express.Router()
const {CreateUser,UpdateUser,DeleteUser,LoginUser} = require('../controllers/Users')
const authMiddleware = require('../middlewares/Authentication') 


router.post('/register',CreateUser)

router.post('/login',LoginUser)

router.patch('/',authMiddleware,UpdateUser)

router.delete('/',authMiddleware,DeleteUser)


module.exports = router