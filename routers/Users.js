const express = require('express');
const router = express.Router()
const {CreateUser,UpdateUser,DeleteUser} = require('../controllers/Users')


router.post('/',CreateUser)


router.patch('/:userId',UpdateUser)

router.delete('/:userId',DeleteUser)