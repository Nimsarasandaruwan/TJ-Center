/* =================================
   TJ CENTER PRO
   WHATSAPP NOTIFICATION
================================= */


const axios = require("axios");








const sendWhatsapp = async(message)=>{



try{



// Check WhatsApp Config


if(

!process.env.WHATSAPP_PHONE_ID ||

!process.env.WHATSAPP_NUMBER ||

!process.env.WHATSAPP_TOKEN

){



console.log(

"WhatsApp configuration missing. Skipping notification."

);



return;



}







await axios.post(



`https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_ID}/messages`,



{


messaging_product:"whatsapp",



to:process.env.WHATSAPP_NUMBER,



type:"text",



text:{


body:message


}



},



{


headers:{



Authorization:

`Bearer ${process.env.WHATSAPP_TOKEN}`,



"Content-Type":

"application/json"



}



}



);







console.log(

"WhatsApp notification sent"

);







}

catch(error){



console.log(

"WhatsApp Error:",

error.response?.data || error.message

);




// Do not break main system



return;



}



};








module.exports = sendWhatsapp;