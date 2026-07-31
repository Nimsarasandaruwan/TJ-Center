/* =================================
   TJ CENTER PRO
   ORDER MODEL
================================= */


const mongoose = require("mongoose");





const orderSchema = new mongoose.Schema(

{


user:{


type:mongoose.Schema.Types.ObjectId,


ref:"User",


required:true


},






products:[

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


required:true,


min:0


},



quantity:{


type:Number,


default:1,


min:1


}



}

],






total:{


type:Number,


required:true,


min:0


},






address:{


type:String,


required:true


},






phone:{


type:String,


required:true


},






status:{


type:String,


enum:[


"Pending",

"Processing",

"Shipped",

"Completed",

"Cancelled"


],


default:"Pending"


},






paymentStatus:{


type:String,


enum:[


"Pending",

"Paid"


],


default:"Pending"


},






paymentMethod:{


type:String,


enum:[


"COD",

"Card",

"Online"


],


default:"COD"


},






cancelledAt:{


type:Date,


default:null


}



},


{


timestamps:true


}

);






module.exports = mongoose.model(

"Order",

orderSchema

);