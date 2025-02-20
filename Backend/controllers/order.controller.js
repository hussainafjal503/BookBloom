const User = require("../Models/user.models");
const Books = require("../Models/book.models");
const Order = require("../Models/order.models");

/*********************************
 * 		placed order
 */
const createOrder = async (req, res) => {
  try {
    const {id}=req.user;
    const userId = id;
    // console.log(req.user)
    const { order } = req.body;

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "fields Required..",
      });
    }

    for (const ord of order) {
      const newOrder = new Order({ user: id, book: ord._id });
      const orderDataFromDb = await newOrder.save();

      //saving order in user model
      await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            orders: orderDataFromDb._id,
          },
        },
        { new: true }
      );

      //clearing cart

      await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            cart: ord._id,
          },
        },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "order Placed Successfully..",
    });
  } catch (err) {
    console.log(`Error Occured while creating order : ${err}`);
    return res.status(500).json({
      success: false,
      message: "unable to create the order..",
    });
  }
};

/*********************************
 * 		get order
 */
const getOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetail = await User.findById(userId).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const orderData = userDetail.orders.reverse();

    if (orderData.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Order Place yet.. :)",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your all orders are: ... :)",
      data: orderData,
    });
  } catch (err) {
    console.log(`Error Occured while getting order : ${err}`);
    return res.status(500).json({
      success: false,
      message: "unable to create the order..",
    });
  }
};

/*********************************
 * 		get all order
 */
const getAllOrder = async (req, res) => {
  try {
    const orderData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "all orders are: ... :)",
      data: orderData,
    });
  } catch (err) {
    console.log(`Error Occured while getting all order : ${err}`);
    return res.status(500).json({
      success: false,
      message: "unable to getting all order..",
    });
  }
};

/**********************************************
 * 			updated order 
 */

const updateOrder = async (req, res) => {
  try {
    // const orderid = req.params.id;
    const orderidd=req.headers["custom-header"];
	if(!orderidd){
		return res.status(400).json({
			success:false,
			message:"order id required"
		});
	}

    const updatedOrder=await Order.findByIdAndUpdate(orderidd, { status: req.body.status });

	return res.status(200).json({
		success:true,
		message:"Status updated Successfully.."
	})

  } catch (err) {
    console.log(`Error Occured while updating order : ${err}`);
    return res.status(500).json({
      success: false,
      message: "unable to update the order..",
    });
  }
};
module.exports = { createOrder, getOrder, getAllOrder,updateOrder };
