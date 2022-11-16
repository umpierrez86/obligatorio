const forms = document.querySelectorAll('.needs-validation');
let emailRegrex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
let email = document.getElementById('email');

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

function emailCorrecto(){
    let validity = true;
    
    if(emailRegrex.test(email.value)){
        email.setCustomValidity('');
    }else{
        email.setCustomValidity(false);
        validity = false;
    }

    return validity;
}

function guardarDatos(){
    let primerNombre = document.getElementById('pNombre').value;
    let segundoNombre = document.getElementById('sNombre').value;
    let primerApellido = document.getElementById('pApellido').value;
    let segundoApellido = document.getElementById('sApellido').value;
    let numero = document.getElementById('telefono').value;


    if(sessionStorage.getItem('informacion') == null){
        /*let primerNombre = document.getElementById('pNombre').value;
        let segundoNombre = document.getElementById('sNombre').value;
        let primerApellido = document.getElementById('pApellido').value;
        let segundoApellido = document.getElementById('sApellido').value;
        let numero = document.getElementById('telefono').value;*/

        let datos = {
            firstName: primerNombre,
            secondName: segundoNombre,
            lastname: primerApellido,
            secondSurname: segundoApellido,
            number: numero
        };

        sessionStorage.setItem('informacion',JSON.stringify(datos));
    }else{
        let data = JSON.parse(sessionStorage.getItem('informacion'))
        if(data.firtsName != primerNombre){
            data.firstName = primerNombre
        }
        if(data.secondName != segundoNombre){
            data.secondName = segundoNombre
        }
        if(data.lastName != primerApellido){
            data.lastName = primerApellido
        }
        if(data.secondSurname != segundoApellido){
            data.secondSurname = segundoApellido
        }
        if(data.firtsName != primerNombre){
            data.number = numero
        }

        sessionStorage.removeItem('informacion');
        sessionStorage.setItem('informacion',JSON.stringify(datos));

    }

}

function mostrarDatos(){
    if(sessionStorage.getItem('informacion') != null){
        let datos = JSON.parse(sessionStorage.getItem('informacion'));
        document.getElementById('pNombre').value = datos.firstName;
        document.getElementById('sNombre').value = datos.secondName;
        document.getElementById('pApellido').value = datos.lastname;
        document.getElementById('sApellido').value = datos.secondSurname;
        document.getElementById('telefono').value = datos.number;
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
        
    let usuario = JSON.parse(sessionStorage.getItem('user'));
    if(usuario == null){
        alert('Debe hacer login para ingresar');
        location.href = "login.html";
    }

    dropdown(usuario.correo);

    mostrarDatos();
    document.getElementById('email').value = usuario.correo;
        
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                emailCorrecto();
            }else{
                event.preventDefault()
                let validacion = emailCorrecto();
                if(validacion){
                    guardarDatos();
                }
            }
            form.classList.add('was-validated')
        }, false)
    })
})