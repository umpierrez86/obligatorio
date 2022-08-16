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

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById('enter').addEventListener("click", ()=>{
        login();
    });
});