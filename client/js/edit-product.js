/* =================================
   TJ CENTER PRO
   EDIT PRODUCT JAVASCRIPT
================================= */


const API = "http://localhost:5000/api";



const IMAGE_URL = "http://localhost:5000";



const token = localStorage.getItem("token");



const user = JSON.parse(

localStorage.getItem("user")

);






/*
=================================
CHECK ADMIN
=================================
*/


if(

!token ||

!user ||

user.isAdmin !== true

){

window.location.href="login.html";

}







/*
=================================
GET PRODUCT ID
=================================
*/


const params = new URLSearchParams(

window.location.search

);



const productId = params.get("id");









/*
=================================
LOAD PRODUCT
=================================
*/


async function loadProduct(){


try{


const response = await fetch(

API+"/products/"+productId

);



const product = await response.json();






document.getElementById("name").value =

product.name;



document.getElementById("description").value =

product.description || "";



document.getElementById("price").value =

product.price;



document.getElementById("category").value =

product.category;



document.getElementById("brand").value =

product.brand || "";



document.getElementById("discount").value =

product.discount || 0;



document.getElementById("stock").value =

product.stock || 0;







const preview = document.getElementById(

"preview"

);



preview.src =

IMAGE_URL + product.image;



}



catch(error){


console.log(error);


}



}





loadProduct();









/*
=================================
IMAGE PREVIEW
=================================
*/


function previewImage(event){



const image = document.getElementById(

"preview"

);



const file = event.target.files[0];




if(file){



image.src = URL.createObjectURL(file);



}



}









/*
=================================
UPDATE PRODUCT
=================================
*/


document.getElementById(

"editProductForm"

)

.addEventListener(

"submit",

async(e)=>{


e.preventDefault();






try{



const formData = new FormData();




formData.append(

"name",

document.getElementById("name").value

);



formData.append(

"description",

document.getElementById("description").value

);



formData.append(

"price",

document.getElementById("price").value

);



formData.append(

"category",

document.getElementById("category").value

);



formData.append(

"brand",

document.getElementById("brand").value

);



formData.append(

"discount",

document.getElementById("discount").value

);



formData.append(

"stock",

document.getElementById("stock").value

);






const image = document.getElementById(

"image"

).files[0];





if(image){


formData.append(

"image",

image

);


}









const response = await fetch(

API+"/products/"+productId,

{

method:"PUT",


headers:{


Authorization:

"Bearer "+token


},


body:formData


}

);






const data = await response.json();







if(response.ok){



alert(

"Product Updated Successfully"

);



window.location.href=

"admin-dashboard.html";



}

else{



alert(

data.message || "Update failed"

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

"admin-dashboard.html";



}