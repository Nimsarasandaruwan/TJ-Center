/* =================================
   TJ CENTER PRO
   LOGIN JAVASCRIPT
================================= */


const loginForm = document.getElementById("loginForm");



if(loginForm){


loginForm.addEventListener(

"submit",

async function(e){


e.preventDefault();



const email = document

.getElementById("email")

.value.trim();



const password = document

.getElementById("password")

.value.trim();





if(email === "" || password === ""){


alert(

"Please enter email and password"

);


return;


}





try{


const response = await fetch(


"http://localhost:5000/api/auth/login",


{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


email:email,


password:password


})


}


);





const data = await response.json();





if(response.ok){



// Save JWT Token

localStorage.setItem(

"token",

data.token

);





// Save User Data

localStorage.setItem(

"user",

JSON.stringify(data.user)

);







// Admin Redirect

if(data.user.isAdmin === true){



window.location.href =

"admin-dashboard.html";



}







// Customer Redirect

else{



window.location.href =

"customer-dashboard.html";



}





}

else{



alert(

data.message || "Login Failed"

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