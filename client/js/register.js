/* =================================
   TJ CENTER PRO
   REGISTER JAVASCRIPT
================================= */



const registerForm = document.getElementById("registerForm");





if(registerForm){



registerForm.addEventListener(

"submit",

async function(e){



e.preventDefault();






const name = document

.getElementById("name")

.value.trim();





const email = document

.getElementById("email")

.value.trim();





const phone = document

.getElementById("phone")

.value.trim();





const address = document

.getElementById("address")

.value.trim();





const password = document

.getElementById("password")

.value.trim();





const confirmPassword = document

.getElementById("confirmPassword")

.value.trim();








/*
CHECK EMPTY
*/


if(

name === "" ||

email === "" ||

phone === "" ||

address === "" ||

password === "" ||

confirmPassword === ""

){


alert(

"Please fill all fields"

);


return;


}








/*
PASSWORD CHECK
*/


if(password !== confirmPassword){



alert(

"Passwords do not match"

);



return;


}









try{



const response = await fetch(


"http://localhost:5000/api/auth/register",


{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


name:name,


email:email,


phone:phone,


address:address,


password:password


})


}



);








const data = await response.json();







if(response.ok){



alert(

"Registration Successful"

);





window.location.href =

"login.html";



}




else{



alert(

data.message ||

"Registration Failed"

);



}





}

catch(error){



console.log(error);



alert(

"Server connection failed"

);



}





}



);



}