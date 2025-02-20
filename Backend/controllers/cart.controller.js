const User = require("../Models/user.models");

/****************************************
 * 		add to cart
 */
const addCart = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Fields are Required..",
      });
    }

    const userData = await User.findById(userId);

    const isInCart = userData.cart.includes(bookId);

    if (isInCart) {
      return res.status(200).json({
        success: false,
        message: "Book is Already in cart..",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          cart: bookId,
        },
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Book added in Cart..  :)",
      updatedUser,
    });
  } catch (err) {
    console.log(`Error Occured while add to cart : ${err}`);
    return res.status(500).json({
      success: false,
      message: "Unable to add in cart ",
    });
  }
};

/****************************************
 * 		remove from cart
 */
const removeCart = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Fields are Required..",
      });
    }

    const userData = await User.findById(userId);

    const isInCart = userData.cart.includes(bookId);

    if (!isInCart) {
      return res.status(400).json({
        success: false,
        message: "Book is not in your cart",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          cart: bookId,
        },
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Book removed from Cart..  :)",
      updatedUser,
    });
  } catch (err) {
    console.log(`Error Occured while removing from cart : ${err}`);
    return res.status(500).json({
      success: false,
      message: "Unable to remove from cart ",
    });
  }
};

/****************************************
 * 		remove from cart
 */
const getCartDetail = async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await User.findById(userId).populate("cart");
    const cartDetail = userData.cart.reverse();
    // console.log(cartDetail);
    if (cartDetail.length === 0) {
      return res.status(200).json({
        success: false,
        message: "There is no book available in  your cart",
      });
    }

    return res.status(200).json({
    	success:true,
    	message:"cart book fetched..  :)",
    	cartDetail
    })
  } catch (err) {
    console.log(`Error Occured while getting cart : ${err}`);
    return res.status(500).json({
      success: false,
      message: "Unable to get all cart ",
    });
  }
};

module.exports = { addCart, removeCart,getCartDetail };
