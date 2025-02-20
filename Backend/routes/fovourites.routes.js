const express=require('express');
const router=express.Router();
const {isAuthenticated}=require('../middleware/userAuth.middleware');


const {addFavouritesBooks,deleteFavourites,getFavouriteBooks} = require('../controllers/fovouritesBook.controller')


/*************************** */
router.put('/add-favourites/:id',isAuthenticated,addFavouritesBooks);

router.put('/delete-favourites/:id',isAuthenticated,deleteFavourites);
router.get('/getfavourites-book',isAuthenticated,getFavouriteBooks)




module.exports=router;