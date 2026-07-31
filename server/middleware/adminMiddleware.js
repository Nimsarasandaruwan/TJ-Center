/* =================================
   TJ CENTER PRO
   ADMIN MIDDLEWARE
================================= */


const admin = (req,res,next)=>{


/*
    Check Admin User

    Support:
    1. isAdmin = true
    2. role = "admin"
*/


if(

req.user &&

(

req.user.isAdmin === true ||

req.user.role === "admin"

)

){


next();


}

else{


return res.status(403).json({

message:"Admin access required"

});


}



};






module.exports = {

admin

};