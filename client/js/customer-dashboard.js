/* =================================
   TJ CENTER PRO
   CUSTOMER DASHBOARD JAVASCRIPT
================================= */


const API_URL = "http://localhost:5000/api";


const IMAGE_URL = "http://localhost:5000";



const token = localStorage.getItem("token");



if(!token){

window.location.href="login.html";

}





const user = JSON.parse(

localStorage.getItem("user")

);





if(user){


document.getElementById("customerName").innerHTML =
user.name || "Customer";


document.getElementById("name").innerHTML =
user.name || "";


document.getElementById("email").innerHTML =
user.email || "";


document.getElementById("phone").innerHTML =
user.phone || "";


document.getElementById("address").innerHTML =
user.address || "";


}








/* ===============================
LOAD PRODUCTS
================================ */


async function loadProducts(){


try{


const response = await fetch(

API_URL + "/products"

);



const products = await response.json();



const productList = document.getElementById(

"productList"

);



if(!productList)return;



productList.innerHTML="";





products.forEach(product=>{



productList.innerHTML += `



<div class="product-card">



<img

src="${IMAGE_URL}${product.image}"

width="200"

height="200"

style="object-fit:cover;border-radius:15px;"

onerror="this.src='${IMAGE_URL}/uploads/default-product.png'"

>



<h3>

${product.name}

</h3>



<p>

${product.description}

</p>



<h4>

Rs.${product.price}

</h4>



<p>

Stock: ${product.stock}

</p>



<button

onclick="addToCart('${product._id}')"

>

Add To Cart

</button>



</div>



`;



});



}

catch(error){


console.log(error);


}



}



loadProducts();









/* ===============================
CART
================================ */


function addToCart(id){


let cart = JSON.parse(

localStorage.getItem("cart")

) || [];



cart.push(id);



localStorage.setItem(

"cart",

JSON.stringify(cart)

);



alert(

"Product added to cart"

);



}









/* ===============================
LOAD ORDERS
================================ */


async function loadOrders(){


try{


const response = await fetch(

API_URL + "/orders/my-orders",

{

headers:{

Authorization:

"Bearer " + token

}

}

);



const orders = await response.json();



const orderList = document.getElementById(

"orderList"

);



if(!orderList)return;



orderList.innerHTML="";





orders.forEach(order=>{



let canCancel = checkCancelTime(

order.createdAt

);





orderList.innerHTML += `


<div class="order-card">


<h3>

Order #${order._id}

</h3>


<p>

Amount : Rs.${order.total}

</p>


<p>

Status :

${order.status}

</p>



${
canCancel && order.status==="Pending"

?

`

<button

class="cancel-btn"

onclick="cancelOrder('${order._id}')"

>

Cancel Order

</button>

`

:

`

<p>

Cancel unavailable

</p>

`

}


</div>


`;



});





document.getElementById(

"totalOrders"

).innerHTML = orders.length;



}

catch(error){


console.log(error);


}



}



loadOrders();









/* ===============================
CHECK CANCEL TIME
================================ */


function checkCancelTime(createdTime){


const orderTime = new Date(createdTime);


const currentTime = new Date();



const hours =

(currentTime-orderTime)

/

(1000*60*60);



return hours <= 24;


}









/* ===============================
CANCEL ORDER
================================ */


async function cancelOrder(orderId){



if(!confirm(

"Cancel this order?"

)){


return;


}



try{


const response = await fetch(

API_URL +

"/orders/cancel/" +

orderId,

{

method:"PUT",

headers:{

Authorization:

"Bearer " + token

}

}

);



const data = await response.json();



if(response.ok){


alert(

"Order cancelled"

);


loadOrders();


}

else{


alert(

data.message

);


}



}

catch(error){


console.log(error);


}



}









/* ===============================
LOGOUT
================================ */


function logout(){


localStorage.removeItem("token");


localStorage.removeItem("user");


localStorage.removeItem("cart");



window.location.href="login.html";


}