/* =================================
   TJ CENTER PRO
   CART ROUTES
================================= */


const express = require("express");

const router = express.Router();



const Cart = require("../models/Cart");

const Product = require("../models/Product");



const {protect} = require("../middleware/authMiddleware");









/*
=================================
GET MY CART
=================================
*/


router.get(

"/",

protect,

async(req,res)=>{


try{


let cart = await Cart.findOne({

user:req.user._id

})

.populate("items.product");





if(!cart){


cart = await Cart.create({

user:req.user._id,

items:[]

});


}





res.json(cart);



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
ADD TO CART
=================================
*/


router.post(

"/add",

protect,

async(req,res)=>{


try{



const {productId,quantity}=req.body;





const product = await Product.findById(productId);





if(!product){


return res.status(404).json({

message:"Product not found"

});


}








let cart = await Cart.findOne({

user:req.user._id

});






if(!cart){



cart = new Cart({

user:req.user._id,

items:[]

});


}







const existing = cart.items.find(

item =>

item.product.toString()

===

productId

);







if(existing){



existing.quantity += Number(quantity || 1);



}

else{



cart.items.push({



product:product._id,

name:product.name,

price:product.price,

image:product.image,

quantity:Number(quantity || 1)



});



}






await cart.save();





res.json(cart);



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
UPDATE QUANTITY
=================================
*/


router.put(

"/update/:id",

protect,

async(req,res)=>{


try{



const cart = await Cart.findOne({

user:req.user._id

});





const item = cart.items.id(

req.params.id

);





if(!item){


return res.status(404).json({

message:"Item not found"

});


}






item.quantity = Number(

req.body.quantity

);





await cart.save();





res.json(cart);



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
REMOVE ITEM
=================================
*/


router.delete(

"/remove/:id",

protect,

async(req,res)=>{


try{



const cart = await Cart.findOne({

user:req.user._id

});





cart.items = cart.items.filter(

item =>

item._id.toString()

!==

req.params.id

);






await cart.save();





res.json(cart);



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
CLEAR CART
=================================
*/


router.delete(

"/clear",

protect,

async(req,res)=>{


try{



await Cart.findOneAndUpdate(

{

user:req.user._id

},

{

items:[]

}

);





res.json({

message:"Cart cleared"

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