const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  isAdmin,
} = require("../middleware/userAuth.middleware");
const {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getRecentBooks,
  getBookDetails
} = require("../controllers/Book.controller");

/*****************************
 * 	addmin role for adding book
 */

router.post("/addbook", isAuthenticated, isAdmin, addBook);
router.put("/updatebook/:id", isAuthenticated, isAdmin, updateBook);
router.delete("/deletebook/:id", isAuthenticated, isAdmin, deleteBook);


router.get('/getallbooks',getAllBooks);
router.get('/getrecent-book',getRecentBooks)
router.get('/getsingle-book/:id',getBookDetails);

module.exports = router;
