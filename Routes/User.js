const express = require('express')


const { SignUp, SignIn } = require('../Controllers/User');

const { Validation, validationRegister } = require('../Middlewares/Validator');
const { isAuth } = require('../Middlewares/isAuth');

const userRouter= express.Router()


userRouter.post('/SignUp', validationRegister, Validation, SignUp)


userRouter.post('/SignIn', SignIn)


userRouter.get('/CurrentUser', isAuth, (req,res)=>{res.send(req.user)})










module.exports = userRouter
