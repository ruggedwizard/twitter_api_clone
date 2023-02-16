const express = require('express');
const router = express.Router()
const {CreateUser,UpdateUser,DeleteUser,LoginUser} = require('../controllers/Users')


router.post('/register',CreateUser)

router.post('/login',LoginUser)

router.patch('/:userId',UpdateUser)

router.delete('/:userId',DeleteUser)


module.exports = router