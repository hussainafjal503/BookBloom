const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
	userName:{
		type:String,
		required:true,
		unique:true,
	},
	email:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true,
	},
	address:{
		type:String,
		required:true,
	},
	avatar:{
		type:String,
		default:"https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"
	},
	role:{
		type:String,
		default:"User",
		enum:["User","Admin"],
	},
	favourites:[
		{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Books"
		}
		
	],
	cart:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Books"
		}
	],
	orders:[
			{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Order"
			}
	],

},{timestamps:true})



module.exports=mongoose.model("User",userSchema);