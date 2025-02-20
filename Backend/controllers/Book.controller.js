const Book = require("../Models/book.models");
const User = require("../Models/user.models");



/***********************************
 * 			add book
 */

async function addBook(req, res) {
  try {
    const { title, price, author, desc, language, url } = req.body;

    if (!title || !price || !author || !desc || !language || !url) {
      return res.status(200).json({
        success: false,
        message: "All fields are required..",
      });
    }

    const bookDetails = await Book.create({
      title,
      price,
      author,
      desc,
      language,
      url,
    });

    return res.status(201).json({
      success: true,
      message: "Book Added successfully .. :)",
      bookDetails,
    });
  } catch (Err) {
    console.log(`Error occured while add book : ${Err}`);
    return res.status(500).json({
      success: false,
      message: "unable to add book, please try again..",
    });
  }
}

/************************************
 *      update Book
 */

async function updateBook(req, res) {
  try {
    // console.log(req.params);

    const bookId = req.params.id;
    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "book id required to update",
      });
    }

    const { title, price, author, desc, language, url } = req.body;

    if (!title || !price || !author || !desc || !language || !url) {
      return res.status(400).json({
        success: false,
        message: "All fields are required..",
      });
    }

    const updatedBookDetails = await Book.findByIdAndUpdate(
      { _id: bookId },
      {
        title: title,
        price: price,
        author: author,
        desc: desc,
        language: language,
        url: url,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Book updated Successfully..",
      data: updatedBookDetails,
    });
  } catch (err) {
    console.log(`Error occured while updating the book : ${err}`);
    return res.status(500).json({
      success: false,
      message: "unable to update the book, please try again.",
    });
  }
}

/***************************************
 *     delete book
 */

async function deleteBook(req, res) {
  try {
    const bookId = req.params.id;
    console.log(bookId);

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "book id required to delete the book",
      });
    }

    await Book.findByIdAndDelete(bookId);
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully.",
    });
  } catch (err) {
    console.log(`Error occured while deleting the book : ${err}`);
    return res.status(500).json({
      success: false,
      message: "Unable to delete book, please try again..",
    });
  }
}

/*******************************
 *      get all books
 */

async function getAllBooks(req, res) {
  try {
    const allBooks = await Book.find().sort({ createdAt: -1 });
    if (!allBooks) {
      return res.status(400).json({
        success: false,
        message: "unable to find book",
      });
    }

    if (allBooks.length === 0) {
      return res.status(200).json({
        success: true,
        message: "There is no Book Available ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book fetched successfully...",
      allBooks,
    });
  } catch (err) {
    console.log(`Error occured while getting all books : ${err}`);

    return res.status(500).json({
      success: false,
      message: "unable to get all book, please try again..",
    });
  }
}

/****************************
 *          get recent book
 */

async function getRecentBooks(req, res) {
  try {
    const recentBook = await Book.find({}).sort({ createdAt: -1 }).limit(3);
    if (recentBook.length === 0) {
      return res.status(200).json({
        success: true,
        message: "There is no recent book Available",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Recent Book fetched Successfully.. :)",
      recentBook,
    });
  } catch (err) {
    console.log(`Error occured while getting recent book ${err}`);
    return res.status(500).json({
      success: false,
      message: "Unabe to get recent book",
    });
  }
}

/*******************************************
 *            get book details
 */

async function getBookDetails(req, res) {
  try {
    const bookId = req.params.id;
    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "book id required to fetch to details",
      });
    }

    const singleBookDetails = await Book.findOne({ _id: bookId });

    if (!singleBookDetails) {
      return res.status(400).json({
        success: false,
        message: "unable to find book using this id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book detail fetched successfully... :)",
      singleBookDetails,
    });
  } catch (err) {
    console.log(`Error occured while getting single book details : ${err}`);
    return res.status(500).json({
      success: false,
      message: "Unable to get book details..",
    });
  }
}







module.exports = {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getRecentBooks,
  getBookDetails,
};
