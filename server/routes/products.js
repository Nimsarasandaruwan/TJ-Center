/* =================================
   TJ CENTER PRO
   PRODUCT ROUTES
================================= */


const express = require("express");

const router = express.Router();


const Product = require("../models/Product");


const {protect} = require("../middleware/authMiddleware");

const {admin} = require("../middleware/adminMiddleware");

const upload = require("../middleware/uploadMiddleware");








/*
=================================
GET ALL PRODUCTS
=================================
*/


router.get("/",async(req,res)=>{


try{


const products = await Product.find();


res.json(products);



}

catch(error){


res.status(500).json({

message:error.message

});


}


});








/*
=================================
GET SINGLE PRODUCT
=================================
*/


router.get("/:id",async(req,res)=>{


try{


const product = await Product.findById(req.params.id);




if(!product){


return res.status(404).json({

message:"Product not found"

});


}




res.json(product);



}


catch(error){


res.status(500).json({

message:error.message

});


}


});









/*
=================================
ADD PRODUCT ADMIN
=================================
*/


router.post(

"/",

protect,

admin,

(req,res,next)=>{


upload.single("image")(req,res,(error)=>{


if(error){


return res.status(400).json({

message:error.message

});


}


next();


});


},


async(req,res)=>{


try{


const {


name,

description,

price,

category,

stock


}=req.body;






if(

!name ||

price === undefined ||

!category

){


return res.status(400).json({

message:"Please fill required fields"

});


}







const product = await Product.create({



name,


description,


price:Number(price),


category,


stock:Number(stock || 0),



image:req.file

?

`/uploads/${req.file.filename}`

:

"/uploads/default-product.png"



});






res.status(201).json(product);



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
UPDATE PRODUCT
=================================
*/


router.put(

"/:id",

protect,

admin,

(req,res,next)=>{


upload.single("image")(req,res,(error)=>{


if(error){


return res.status(400).json({

message:error.message

});


}


next();


});


},


async(req,res)=>{


try{


const product = await Product.findById(

req.params.id

);





if(!product){


return res.status(404).json({

message:"Product not found"

});


}






Object.keys(req.body).forEach(key=>{


if(key==="price" || key==="stock"){


product[key]=Number(req.body[key]);


}

else{


product[key]=req.body[key];


}



});






if(req.file){


product.image =

`/uploads/${req.file.filename}`;


}






const updatedProduct = await product.save();



res.json(updatedProduct);



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
DELETE PRODUCT
=================================
*/


router.delete(

"/:id",

protect,

admin,

async(req,res)=>{


try{


const product = await Product.findById(

req.params.id

);





if(!product){


return res.status(404).json({

message:"Product not found"

});


}






await product.deleteOne();





res.json({

message:"Product deleted"

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