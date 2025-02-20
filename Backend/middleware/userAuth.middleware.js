const jwt = require("jsonwebtoken");
require("dotenv").config();
const User=require("../Models/user.models")

/**********************************
 * 			authentication
 */
function isAuthenticated (req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Authentication Token Required ..",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "User not authenticated...",
        });
      }

      req.user = user;
      next();
    });
  } catch (err) {
    console.log(`error occured while authenticating : ${err}`);
  }
}

/****************************
 * 		iscustomer
 */

/****************************
 * 		is admin
 */

async function isAdmin (req,res,next){
  try{
    const userId=req.user.id;
    if(!userId){
      return res.status(400).json({
        success:fasle,
        message:"user id not found "
      })
    }

    const userDetails=await User.findById(userId);

    if(userDetails.role!=='Admin'){
      return res.status(400).json({
        success:false,
        message:`${userDetails.role} is not authorized to perform this operations`
      })
    }
  
    next()
  }catch(Err){
    console.log(`Error occured while verify the admin's role :  ${Err}`);
  }
}

module.exports = {isAuthenticated,isAdmin}
