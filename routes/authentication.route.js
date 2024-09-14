const express = require('express')
const router = express.Router()
const {register,login} = require('../controllers/authentication.controller')
const {authenticationValidation} = require('../middleware/authentication.validation')


router.post('/register',authenticationValidation,register)

router.post('/login',login)

module.exports = router