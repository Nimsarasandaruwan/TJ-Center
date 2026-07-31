/* =================================
   TJ CENTER PRO
   MAIN WEBSITE JAVASCRIPT v3

   DATABASE PRODUCT SYSTEM
================================= */


const API_URL = "http://localhost:5000/api";

const IMAGE_URL = "http://localhost:5000";


let products = [];

let currentCategory = "All";





/*
=================================
LOAD PRODUCTS
=================================
*/


async function loadProducts(){


try{


const response = await fetch(

API_URL + "/products"

);



if(!response.ok){

throw new Error("Product API Error");

}



products = await response.json();



console.log(products);



displayProducts();



}

catch(error){


console.log(

"Product loading error:",

error

);


}

}





/*
=================================
DISPLAY PRODUCTS
=================================
*/


function displayProducts(){



const area = document.getElementById(

"productList"

);



if(!area) return;



area.innerHTML="";





products.forEach(product=>{


if(

currentCategory==="All"

||

product.category===currentCategory

){



area.innerHTML += `


<div class="card">


<img

src="${IMAGE_URL}${product.image}"

onerror="this.src='${IMAGE_URL}/uploads/default-product.png'"

>



<h3>

${product.name}

</h3>



<p>

${product.description || ""}

</p>



<h4 class="price">

Rs.${product.price}

</h4>



<p>

Stock : ${product.stock}

</p>



<button

onclick="addProductToCart('${product._id}')"

>

Add To Cart

</button>



</div>


`;



}


});



}





/*
=================================
ADD TO CART
=================================
*/


function addProductToCart(id){



const product = products.find(

p=>p._id===id

);



if(!product)return;



if(typeof addToCart === "function"){


addToCart(product);


alert(

product.name+" Added To Cart"

);


}

else{


console.log(

"cart.js not loaded"

);


}



}





/*
=================================
SEARCH
=================================
*/


function searchProduct(){


const text = document

.getElementById("search")

.value

.toLowerCase();



const area=document.getElementById(

"productList"

);



area.innerHTML="";





products.filter(product=>

product.name

.toLowerCase()

.includes(text)

)

.forEach(product=>{


area.innerHTML += `


<div class="card">


<img src="${IMAGE_URL}${product.image}">


<h3>

${product.name}

</h3>


<p>

Rs.${product.price}

</p>


<button

onclick="addProductToCart('${product._id}')"

>

Add To Cart

</button>


</div>


`;



});


}





/*
=================================
CATEGORY
=================================
*/


function filterCategory(category){


currentCategory=category;


displayProducts();


}





/*
=================================
CART
=================================
*/


function toggleCart(){


const box=document.getElementById(

"cartBox"

);



if(!box)return;



box.style.display =

box.style.display==="block"

?

"none"

:

"block";



if(typeof renderCart==="function"){

renderCart();

}


}






/*
=================================
CHECKOUT
=================================
*/


function goCheckout(){


let cart=[];


if(typeof getCart==="function"){

cart=getCart();

}



if(cart.length===0){


alert(

"Your cart is empty"

);


return;


}



window.location.href="checkout.html";


}





window.goCheckout=goCheckout;



window.toggleCart=toggleCart;

window.addProductToCart=addProductToCart;





loadProducts();