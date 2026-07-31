/* =================================
   TJ CENTER PRO
   ADMIN DASHBOARD JAVASCRIPT v2
================================= */


const API = "http://localhost:5000/api";

const IMAGE_URL = "http://localhost:5000";


const adminToken = localStorage.getItem("token");


const adminUser = JSON.parse(
    localStorage.getItem("user")
);





/*
=================================
CHECK ADMIN
=================================
*/


if(
!adminToken ||
!adminUser ||
adminUser.isAdmin !== true
){

window.location.href="login.html";

}








/*
=================================
AUTH HEADER
=================================
*/


function authHeader(){

return {

Authorization:

"Bearer " + adminToken

};

}










/*
=================================
LOAD DASHBOARD STATS
=================================
*/


async function loadDashboard(){


try{


const res = await fetch(

API+"/users/dashboard",

{

headers:authHeader()

}

);


const data = await res.json();



if(res.ok){


document.getElementById("totalSales").innerHTML =

"Rs."+data.sales;



document.getElementById("totalOrders").innerHTML =

data.orders;



document.getElementById("totalCustomers").innerHTML =

data.customers;



document.getElementById("totalProducts").innerHTML =

data.products;


}



}

catch(err){

console.log(err);

}


}









/*
=================================
LOAD PRODUCTS
=================================
*/


async function loadProducts(){


try{


const res = await fetch(

API+"/products"

);


const products = await res.json();



const table = document.getElementById(

"productTable"

);



if(!table)return;



table.innerHTML="";





products.forEach(product=>{


table.innerHTML += `


<tr>


<td>

<img

src="${IMAGE_URL}${product.image}"

width="60"

height="60"

style="object-fit:cover;border-radius:10px"

onerror="this.src='${IMAGE_URL}/uploads/default-product.png'"

>


</td>



<td>

${product._id}

</td>



<td>

${product.name}

</td>



<td>

Rs.${product.price}

</td>



<td>

${product.stock}

</td>



<td>


<button

class="edit"

onclick="editProduct('${product._id}')"

>

Edit

</button>



<button

class="delete"

onclick="deleteProduct('${product._id}')"

>

Delete

</button>


</td>



</tr>


`;



});



}


catch(err){

console.log(err);

}


}









/*
=================================
DELETE PRODUCT
=================================
*/


async function deleteProduct(id){


if(!confirm(

"Delete this product?"

)) return;





try{


const res = await fetch(

API+"/products/"+id,

{

method:"DELETE",

headers:authHeader()

}

);



if(res.ok){


alert(

"Product Deleted"

);


loadProducts();


}



}

catch(err){

console.log(err);

}


}









/*
=================================
LOAD ORDERS
=================================
*/


async function loadOrders(){



try{


const res = await fetch(

API+"/orders/all",

{

headers:authHeader()

}

);



const orders = await res.json();



const table = document.getElementById(

"orderTable"

);



if(!table)return;



table.innerHTML="";





orders.forEach(order=>{





let customer="Unknown";



if(order.user){

customer = order.user.name;

}






table.innerHTML += `



<tr>



<td>

${order._id}

</td>




<td>

${customer}

</td>



<td>

Rs.${order.total}

</td>




<td>



<select

onchange="changeStatus('${order._id}',this.value)"

>


<option

${order.status==="Pending"?"selected":""}

>

Pending

</option>


<option

${order.status==="Processing"?"selected":""}

>

Processing

</option>



<option

${order.status==="Shipped"?"selected":""}

>

Shipped

</option>



<option

${order.status==="Completed"?"selected":""}

>

Completed

</option>



<option

${order.status==="Cancelled"?"selected":""}

>

Cancelled

</option>



</select>



</td>






<td>


<button

onclick="viewOrder('${order._id}')"

>

View

</button>


</td>



</tr>



`;





});



}


catch(err){

console.log(err);

}


}









/*
=================================
CHANGE ORDER STATUS
=================================
*/


async function changeStatus(id,status){



await fetch(

API+"/orders/update/"+id,

{

method:"PUT",

headers:{


"Content-Type":"application/json",

...authHeader()


},


body:JSON.stringify({

status:status

})


}

);



loadOrders();



}









/*
=================================
VIEW ORDER
=================================
*/


/*
=================================
VIEW ORDER DETAILS
=================================
*/


async function viewOrder(id){



try{



const response = await fetch(

API + "/orders/all",

{

headers:authHeader()

}

);



const orders = await response.json();



const order = orders.find(

item => item._id === id

);





if(!order){

alert(

"Order not found"

);

return;

}







const modal = document.getElementById(

"orderModal"

);



const details = document.getElementById(

"orderDetails"

);






let productsHTML = "";






order.products.forEach(product=>{



productsHTML += `


<p>

🛒 ${product.name}

<br>

Quantity : ${product.quantity}

<br>

Price : Rs.${product.price}

</p>


<hr>


`;



});







details.innerHTML = `



<h3>

Order ID

</h3>


<p>

${order._id}

</p>





<h3>

Customer

</h3>


<p>

${order.user.name}

</p>






<h3>

Phone

</h3>


<p>

${order.phone}

</p>







<h3>

Address

</h3>


<p>

${order.address}

</p>






<h3>

Products

</h3>


${productsHTML}






<h3>

Total

</h3>


<p>

Rs.${order.total}

</p>





<h3>

Status

</h3>


<p>

${order.status}

</p>



`;









modal.style.display="flex";





}



catch(error){


console.log(error);


}



}










/*
=================================
CLOSE MODAL
=================================
*/


function closeModal(){



document.getElementById(

"orderModal"

).style.display="none";



}








/*
=================================
LOAD CUSTOMERS
=================================
*/


async function loadCustomers(){


try{


const res = await fetch(

API+"/users",

{

headers:authHeader()

}

);



const users = await res.json();



const area=document.getElementById(

"customerList"

);



if(!area)return;



area.innerHTML="";





users.forEach(user=>{


area.innerHTML += `


<p>

👤 ${user.name}

|

📞 ${user.phone || "N/A"}

|

✉ ${user.email}

</p>


`;



});



}

catch(err){

console.log(err);

}


}









/*
=================================
INIT
=================================
*/


loadDashboard();

loadProducts();

loadOrders();

loadCustomers();








/*
=================================
LOGOUT
=================================
*/


function logout(){


localStorage.removeItem("token");


localStorage.removeItem("user");


window.location.href="login.html";


}

function editProduct(id){


window.location.href=

"edit-product.html?id="+id;


}