/* =================================
   TJ CENTER PRO
   USER ROUTES
================================= */


const express = require("express");

const router = express.Router();



const User = require("../models/User");

const Order = require("../models/Order");

const Product = require("../models/Product");



const {protect} = require("../middleware/authMiddleware");

const {admin} = require("../middleware/adminMiddleware");








/*
=================================
GET ALL USERS
ADMIN ONLY
=================================
*/


router.get(

"/",

protect,

admin,

async(req,res)=>{


try{


const users = await User.find()

.select("-password")

.sort({

createdAt:-1

});




res.json(users);



}

catch(error){


res.status(500).json({

message:error.message

});


}



}

);








/*
=================================
GET SINGLE USER
=================================
*/


router.get(

"/:id",

protect,

admin,

async(req,res)=>{


try{


const user = await User.findById(

req.params.id

)

.select("-password");






if(!user){


return res.status(404).json({

message:"User not found"

});


}






res.json(user);



}


catch(error){


res.status(500).json({

message:error.message

});


}



}

);









/*
=================================
DASHBOARD STATISTICS
=================================
*/


router.get(

"/dashboard",

protect,

admin,

async(req,res)=>{


try{



const customersCount = await User.countDocuments({

$or:[

{

role:"customer"

},

{

isAdmin:false

}

]

});






const productsCount = await Product.countDocuments();






const ordersCount = await Order.countDocuments();






const completedOrders = await Order.find({

status:"Completed"

});






const totalSales = completedOrders.reduce(

(total,order)=> total + order.total,

0

);







res.json({


customers:customersCount,

products:productsCount,

orders:ordersCount,

sales:totalSales


});



}



catch(error){


res.status(500).json({

message:error.message

});


}



}

);








module.exports = router;