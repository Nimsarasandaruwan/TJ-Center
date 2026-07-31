/* =================================
   TJ CENTER PRO
   PROFESSIONAL CART JAVASCRIPT
================================= */


const API = "http://localhost:5000/api";



const token = localStorage.getItem("token");





if(!token){


window.location.href="login.html";


}









let cartData = null;







/*
=================================
LOAD CART
=================================
*/


async function loadCart(){



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





cartData = await response.json();





displayCart();



}

catch(error){



console.log(error);



}



}









/*
=================================
DISPLAY CART
=================================
*/


function displayCart(){



const area = document.getElementById(

"cartContainer"

);




if(!area)return;





area.innerHTML="";






let total = 0;





if(!cartData.items || cartData.items.length===0){



area.innerHTML = `


<h3>

Your cart is empty

</h3>


`;



document.getElementById(

"total"

).innerHTML=0;



return;


}









cartData.items.forEach(item=>{



total += item.price * item.quantity;





area.innerHTML += `



<div class="cart-card">





<img src="http://localhost:5000${item.image}">






<div>


<h3>

${item.name}

</h3>


<p>

Price : Rs.${item.price}

</p>



<div class="quantity">


<button onclick="updateQuantity('${item._id}',${item.quantity-1})">

-

</button>



<span>

${item.quantity}

</span>



<button onclick="updateQuantity('${item._id}',${item.quantity+1})">

+

</button>


</div>




<button 

class="remove"

onclick="removeItem('${item._id}')"

>

Remove

</button>



</div>




</div>


`;



});







document.getElementById(

"total"

).innerHTML = total;



}









/*
=================================
UPDATE QUANTITY
=================================
*/


async function updateQuantity(id,qty){



if(qty < 1){

return;

}






await fetch(

API+"/cart/update/"+id,

{


method:"PUT",


headers:{


"Content-Type":"application/json",

Authorization:

"Bearer "+token


},



body:JSON.stringify({


quantity:qty


})



}

);




loadCart();



}









/*
=================================
REMOVE ITEM
=================================
*/


async function removeItem(id){



await fetch(

API+"/cart/remove/"+id,

{


method:"DELETE",


headers:{


Authorization:

"Bearer "+token


}



}

);



loadCart();



}









/*
=================================
CHECKOUT
=================================
*/


function checkout(){



if(!cartData.items.length){



alert(

"Cart is empty"

);



return;


}





window.location.href=

"checkout.html";



}









loadCart();