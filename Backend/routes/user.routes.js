const express=require('express');
const router=express.Router();
const {signUpHandler,loginHandler,getUserInfo,updateAddress, logout}=require('../controllers/user.controller')
const {isAuthenticated}=require('../middleware/userAuth.middleware')



//defining the router

//signup
router.post('/signup',signUpHandler)
router.post('/login',loginHandler)
router.get('/logout',logout)
router.get('/getuser',isAuthenticated,getUserInfo);
router.put('/updateaddress',isAuthenticated,updateAddress);

module.exports=router;