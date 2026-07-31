/* =================================
   TJ CENTER PRO
   CHECKOUT JAVASCRIPT
================================= */


const API = "http://localhost:5000/api";



const token = localStorage.getItem("token");



let cart = null;







if(!token){


window.location.href="login.html";


}









/*
=================================
LOAD CART TOTAL
=================================
*/


async function loadCheckout(){



try{



const response = await fetch(

API+"/cart",

{


headers:{


Authorization:

"Bearer "+token


}


}

);





cart = await response.json();






let total = 0;






cart.items.forEach(item=>{


total += item.price * item.quantity;


});








document.getElementById(

"checkoutTotal"

).innerHTML = total;





}



catch(error){



console.log(error);


}



}








loadCheckout();











/*
=================================
CREATE ORDER
=================================
*/


document.getElementById(

"checkoutForm"

)

.addEventListener(

"submit",

async(e)=>{


e.preventDefault();







try{





let total = 0;






cart.items.forEach(item=>{


total += item.price * item.quantity;


});









const products = cart.items.map(item=>(

{


product:item.product._id,


name:item.name,


price:item.price,


quantity:item.quantity


}


));









const orderData = {


products:products,


total:total,


address:

document.getElementById("address").value,


phone:

document.getElementById("phone").value



};









const response = await fetch(

API+"/orders",

{


method:"POST",


headers:{


"Content-Type":"application/json",


Authorization:

"Bearer "+token


},


body:JSON.stringify(orderData)


}



);








const data = await response.json();







if(response.ok){






await fetch(

API+"/cart/clear",

{


method:"DELETE",


headers:{


Authorization:

"Bearer "+token


}


}


);







alert(

"Order Created Successfully"

);






window.location.href=

"customer-dashboard.html";





}

else{



alert(

data.message || "Order Failed"

);



}





}

catch(error){



console.log(error);



alert(

"Server Error"

);



}



});









/*
=================================
BACK
=================================
*/


function goBack(){


window.location.href=

"cart.html";


}