document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    let usuario = JSON.parse(sessionStorage.getItem('user'));
    if(usuario == null){
        alert('Debe hacer login para ingresar');
        location.href = "login.html";
    }

    document.getElementById("correo").innerHTML = usuario.correo

});