/* =================================
   TJ CENTER PRO
   EMAIL NOTIFICATION
================================= */


const nodemailer = require("nodemailer");








const sendEmail = async(options)=>{


try{



if(

!process.env.EMAIL_USER ||

!process.env.EMAIL_PASSWORD

){


console.log(

"Email configuration missing. Skipping email."

);


return;


}







const transporter = nodemailer.createTransport({



host:process.env.EMAIL_HOST,



port:Number(process.env.EMAIL_PORT),



secure:false,



auth:{



user:process.env.EMAIL_USER,



pass:process.env.EMAIL_PASSWORD



},




tls:{


rejectUnauthorized:false


}



});








const mailOptions = {



from:process.env.EMAIL_USER,



to:options.email,



subject:options.subject,



text:options.message



};








await transporter.sendMail(

mailOptions

);







console.log(

"Email sent successfully"

);






}

catch(error){



console.log(

"Email Error:",

error.message

);





}



};







module.exports = sendEmail;