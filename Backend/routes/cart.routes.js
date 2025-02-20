const express = require("express");
const router = express.Router();
const {addCart,removeCart,getCartDetail} =require('../controllers/cart.controller');
const {isAuthenticated}=require("../middleware/userAuth.middleware")



router.put('/add-cart/:id',isAuthenticated,addCart);
router.put('/remove-cart/:id',isAuthenticated,removeCart);
router.get('/getall-cart',isAuthenticated,getCartDetail);






module.exports=router;