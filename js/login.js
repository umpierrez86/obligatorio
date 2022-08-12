function login(){
    let usuario = document.getElementById('name').value;
    let contrasena = document.getElementById('contra').value;
    
    if(usuario != "" && contrasena != ""){
        sessionStorage.setItem('user',usuario);
        location.href = "index.html";
    }else{
        alert("Usuario y clave son requeridos")
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById('enter').addEventListener("click", ()=>{
        login();
    });
});