/* =================================
   TJ CENTER PRO
   ADD PRODUCT JAVASCRIPT
================================= */


const API = "http://localhost:5000/api";



const token = localStorage.getItem("token");



const user = JSON.parse(

localStorage.getItem("user")

);







/*
=================================
CHECK ADMIN LOGIN
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


image.style.display="block";


}



}









/*
=================================
ADD PRODUCT
=================================
*/


const form = document.getElementById(

"productForm"

);






form.addEventListener(

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

API+"/products",

{

method:"POST",

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

"Product Added Successfully"

);



window.location.href=

"admin-dashboard.html";



}

else{



alert(

data.message || "Product add failed"

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
BACK BUTTON
=================================
*/


function goBack(){


window.location.href=

"admin-dashboard.html";


}