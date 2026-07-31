/* =================================
   TJ CENTER PRO
   PRODUCT MODEL
================================= */


const mongoose = require("mongoose");





const productSchema = new mongoose.Schema(

{


name:{


type:String,


required:true,


trim:true


},





description:{


type:String,


default:""


},





price:{


type:Number,


required:true,


min:0


},





category:{


type:String,


required:true,


trim:true


},





image:{


type:String,


default:"/uploads/default-product.png"


},





stock:{


type:Number,


default:0,


min:0


},





status:{


type:String,


enum:[

"available",

"out-of-stock"

],


default:"available"


},





brand:{


type:String,


default:""


},





discount:{


type:Number,


default:0,


min:0,


max:100


}



},


{


timestamps:true


}

);







module.exports = mongoose.model(

"Product",

productSchema

);