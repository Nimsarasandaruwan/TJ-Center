/* =================================
   TJ CENTER PRO
   IMAGE UPLOAD MIDDLEWARE
================================= */


const multer = require("multer");

const path = require("path");

const fs = require("fs");






/*
=================================
CREATE UPLOAD FOLDER
=================================
*/


const uploadPath = path.join(

__dirname,

"../uploads"

);



if(!fs.existsSync(uploadPath)){


fs.mkdirSync(uploadPath);


}







/*
=================================
STORAGE CONFIGURATION
=================================
*/


const storage = multer.diskStorage({



destination:(req,file,cb)=>{


cb(

null,

uploadPath

);


},






filename:(req,file,cb)=>{


const uniqueName =

Date.now()

+

"-"

+

Math.round(Math.random()*999999)

+

path.extname(file.originalname);



cb(

null,

uniqueName

);



}



});







/*
=================================
FILE FILTER
=================================
*/


const fileFilter = (req,file,cb)=>{


const allowedTypes=[


"image/jpeg",

"image/png",

"image/jpg",

"image/webp"


];





if(

allowedTypes.includes(file.mimetype)

){


cb(null,true);


}

else{


cb(

new Error(

"Only JPG, PNG and WEBP images are allowed"

),

false

);


}



};








/*
=================================
MULTER CONFIG
=================================
*/


const upload = multer({


storage:storage,


fileFilter:fileFilter,


limits:{


fileSize:5 * 1024 * 1024


}



});







module.exports = upload;