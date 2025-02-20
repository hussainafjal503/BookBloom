const User = require("../Models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


/***********************************************
 * 			signup function
 */
async function signUpHandler(req, res) {
  try {
    const { email, userName, password, address } = req.body;

    if (!email || !userName || !password || !address) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    if (userName.length < 4) {
      return res.status(400).json({
        success: false,
        message: "Name should be greater 3 character",
      });
    }

    //validating the email already present or not
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    //validating the username exist or not

    const existingUser = await User.findOne({ userName: userName });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User name should be unique",
      });
    }

    //validating the password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be greater than 5 digit",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName: userName,
      email: email,
      password: hashedPassword,
      address: address,
    });

    await newUser.save();

    //returning the status

    res.status(200).json({
      success: true,
      message: "User Registered Successfully..  :)",
    });
  } catch (err) {
    console.log(`Error occured while singup ${err}`);
    res.status(500).json({
      success: false,
      message: "unable to register",
    });
  }
}

/***************************************************
 * 				login
 *
 */

async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required..",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Doesn't Exists please Signup..",
      });
    }

    //validating the password

    const isValidPassword = bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials..",
      });
    }

    const jwtOptions = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(jwtOptions, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    user.token = token;
    user.password = undefined;

    res
      .cookie("token", token, {
        expiresIn: Date.now() + 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in Successfully",
        user,
        token,
      });
  } catch (err) {
    console.log(`Error occured while login ${err}`);
    res.status(500).json({
      success: false,
      message: "unable to login",
    });
  }
}

/**********************************************
 *        getUser information
 */

async function getUserInfo(req, res) {
  try {
    const id = req.user.id || req.body;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user find or please login",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Fetched successfully",
      user,
    });
  } catch (err) {
    console.log(`error occured while getting the user ${err}`);
    return res.status(500).json({
      success: false,
      message: "unable to get user :",
    });
  }
}

/***********************************************************
 *  update address
 */


async function updateAddress(req,res){
  try{
    const id=req.user.id
    console.log (id);

    if(!id){
      return response.status(400).json({
        success:false,
        message:"unable to find user"
      })
    }
    const{address}=req.body;

    if(!address){
      return res.status(400).json({
        success:false,
        message:"All fields are Required.."
      })
    }

    const updatedDetails=await User.findByIdAndUpdate({_id:id},{
      address:address
    },{new:true}).select("-password");

    return res.status(201).json({
      success:true,
      message:"address Updated successfully..",
      updatedDetails
    })

  }catch(err){
    console.log(`Error occured while updating the address ${err}`);
    return res.staus(500).json({
      success:false,
      message:"unable to update the address, try again"
    })

  }
}


/**********************************************
 *    update the password
 */




/**********************
 *  logout
 */

async function logout(req,res){
  try{
    // const userId=req.user.id;
    // if(!userId){
    //   return res.status(200).json({
    //     success:false,
    //     message:"User not login please login",
    //   });
    // }

    const token=req.cookies.token;
    if(!token){
      return res.status(200).json({
        success:false,
        message:"User not login please login",
      });
    }

    res.cookie("token","",{
      expiresIn: Date.now(),
      httpOnly: true,
    }).status(200).json({
      success:true,
      message:"logout Successfully.. :)"
    });

  }catch(err){
    console.log(`error occured while logout : ${err}`);
  }
}




module.exports = { signUpHandler, loginHandler, getUserInfo,updateAddress,logout };
