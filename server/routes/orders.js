/* =================================
   TJ CENTER PRO
   ORDER ROUTES v3
================================= */


const express = require("express");

const router = express.Router();


const Order = require("../models/Order");

const Product = require("../models/Product");


const {protect} = require("../middleware/authMiddleware");

const {admin} = require("../middleware/adminMiddleware");


const sendWhatsapp = require("../utils/sendWhatsapp");









/*
=================================
CREATE ORDER
=================================
*/


router.post(

"/",

protect,

async(req,res)=>{


try{



const {


products,

total,

address,

phone


}=req.body;






if(!products || products.length===0){


return res.status(400).json({

message:"Cart is empty"

});


}







const orderProducts = [];





for(const item of products){



const product = await Product.findById(

item.product || item.productId

);






if(!product){


return res.status(404).json({

message:"Product not found"

});


}






if(product.stock < item.quantity){


return res.status(400).json({

message:

`${product.name} stock unavailable`

});


}







orderProducts.push({



product:product._id,


name:product.name,


price:Number(product.price),


quantity:Number(item.quantity)



});








/*

Reduce Stock

*/


product.stock -= Number(item.quantity);


await product.save();





}









const order = await Order.create({



user:req.user._id,


products:orderProducts,


total:Number(total),


address,


phone,


status:"Pending",


paymentMethod:"COD",


paymentStatus:"Pending"



});








/*

WhatsApp New Order Notification

*/


await sendWhatsapp(


`

🛒 TJ CENTER PRO

NEW ORDER

Order ID:
${order._id}


Customer:
${req.user.name}


Phone:
${phone}


Address:
${address}


Total:
Rs.${order.total}


Payment:
Cash On Delivery


`

);








res.status(201).json(order);




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
CUSTOMER MY ORDERS
=================================
*/


router.get(

"/my-orders",

protect,

async(req,res)=>{


try{



const orders = await Order.find({

user:req.user._id

})

.populate("products.product")

.sort({

createdAt:-1

});





res.json(orders);



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
ADMIN ALL ORDERS
=================================
*/


router.get(

"/all",

protect,

admin,

async(req,res)=>{


try{



const orders = await Order.find()

.populate("user")

.populate("products.product")

.sort({

createdAt:-1

});





res.json(orders);



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
CANCEL ORDER
=================================
*/


router.put(

"/cancel/:id",

protect,

async(req,res)=>{


try{



const order = await Order.findById(

req.params.id

);






if(!order){


return res.status(404).json({

message:"Order not found"

});


}






if(

order.user.toString()

!==

req.user._id.toString()

){


return res.status(403).json({

message:"Not allowed"

});


}







if(order.status !== "Pending"){



return res.status(400).json({

message:"Cannot cancel order"

});


}







/*

Restore Stock

*/


for(const item of order.products){



await Product.findByIdAndUpdate(

item.product,

{


$inc:{


stock:item.quantity


}


}


);


}








order.status="Cancelled";


order.cancelledAt=new Date();





await order.save();









await sendWhatsapp(

`

TJ CENTER PRO

ORDER CANCELLED


Order ID:

${order._id}



Customer:

${req.user.name}



Total:

Rs.${order.total}



`

);









res.json({

message:"Order cancelled"

});




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
ADMIN UPDATE ORDER STATUS
=================================
*/


router.put(

"/update/:id",

protect,

admin,

async(req,res)=>{


try{



const order = await Order.findById(

req.params.id

);






if(!order){


return res.status(404).json({

message:"Order not found"

});


}






order.status = req.body.status;





await order.save();






res.json(order);



}



catch(error){



res.status(500).json({

message:error.message

});


}



}

);









module.exports = router;