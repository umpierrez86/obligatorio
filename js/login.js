function login(){
    let usuario = {};
    usuario.correo = document.getElementById('email').value;
    usuario.contrasena = document.getElementById('contra').value;
    
    if(usuario.correo != "" && usuario.contrasena != ""){
        sessionStorage.setItem('user',JSON.stringify(usuario));
        location.href = "index.html";
    }else{
        alert("Usuario y clave son requeridos")
    }
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById('enter').addEventListener("click", ()=>{
        login();
    });
});