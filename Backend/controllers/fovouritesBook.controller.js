const Book = require("../Models/book.models");
const User = require("../Models/user.models");

/*************************************************
 *     adding book as  favourites
 */

async function addFavouritesBooks(req, res) {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    if (!bookId || !userId) {
      return res.status(400).json({
        success: false,
        message: "book id and user id required..",
      });
    }

    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "invalid user id ",
      });
    }

    const idBookFavourites = userDetails.favourites.includes(bookId);
    // console.log(idBookFavourites)
    if (idBookFavourites) {
      return res.status(200).json({
        success: false,
        message: "book is already favourite",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          favourites: bookId,
        },
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Added in Favourites successfully..",
      updatedUser,
    });
  } catch (err) {
    console.log(`Error occured while add favourites : ${err}`);
    return res.status(500).json({
      success: false,
    });
  }
}

/**************************************
 * 		deleting from favourites
 */

async function deleteFavourites(req, res) {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    if (!bookId || !userId) {
      return res.status(400).json({
        success: false,
        message: "book id is required to delete from favourites..",
      });
    }

    const userDetail = await User.findById(userId);

    const isNotFavourites = userDetail.favourites.includes(bookId);
    if (!isNotFavourites) {
      return res.status(400).json({
        success: false,
        message: "Book is not in your favourite list..",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          favourites: bookId,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "book deleted from favourites successfully ... :)",
    });
  } catch (err) {
    console.log(`Error Occured while deleting favourites : ${err}`);
    return res.status(500).json({
      success: false,
      message: "unable to delete from favourites ...",
    });
  }
}

/*******************************************
 * 		fetching all favourites book of customers
 */
const getFavouriteBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId).populate("favourites");

    const favouritesBook = userData.favourites;
    // console.log(favouritesBook);

    if (favouritesBook.length === 0) {
      return res.status(200).json({
        sucess: true,
        message: "There is no favourite book in your list... :)",
      });
    }
    return res.status(200).json({
      success: true,
      message: "favourites book fetched successfully.. :)",
      data: favouritesBook,
    });
  } catch (err) {
    console.log(`Error occured while getting favourites Book : ${err}`);
    return res.status(500).json({
      success: false,
      message: "unable to get favourites book..",
    });
  }
};











module.exports = { addFavouritesBooks, deleteFavourites, getFavouriteBooks };
