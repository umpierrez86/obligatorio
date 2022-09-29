function cerrar(){
    sessionStorage.removeItem('user')
}

function dropdown(usuario){
    let contenido = "";
    contenido = `
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                ${usuario}
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
                <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
                <li onclick="cerrar()"><a class="dropdown-item" href="login.html">Cerrar sesión</a></li>
            </ul>
        </div>
    `
    document.getElementById("correo").innerHTML = contenido;
} 

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

    dropdown(usuario.correo);
    //document.getElementById("correo").innerHTML = usuario.correo

});