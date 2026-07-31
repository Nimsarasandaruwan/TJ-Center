/* =================================
   TJ CENTER PRO
   CART MODEL
================================= */


const mongoose = require("mongoose");





const cartSchema = mongoose.Schema(


{


user:{


type:mongoose.Schema.Types.ObjectId,


ref:"User",


required:true


},






items:[


{


product:{


type:mongoose.Schema.Types.ObjectId,


ref:"Product",


required:true


},





name:{


type:String,


required:true


},





price:{


type:Number,


required:true


},





image:{


type:String


},





quantity:{


type:Number,


default:1


}



}


]



},



{


timestamps:true


}



);






module.exports = mongoose.model(

"Cart",

cartSchema

);