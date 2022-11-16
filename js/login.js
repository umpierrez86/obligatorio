const forms = document.querySelectorAll('.needs-validation');
let emailRegrex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


function login(){
    let usuario = {};
    usuario.correo = document.getElementById('email').value;
    usuario.contrasena = document.getElementById('contra').value;
    
    if(usuario.correo != "" && usuario.contrasena != "" && usuario.correo.length >= 6){
        sessionStorage.setItem('user',JSON.stringify(usuario));
        location.href = "index.html";
    }else{
        alert("Usuario y clave son requeridos")
    }
}

function emailCorrecto(correo){
    
    if(emailRegrex.test(correo.value)){
        correo.setCustomValidity('');
    }else{
        correo.setCustomValidity('Email valido requerido');
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById('enter').addEventListener("click", ()=>{
        let email = document.getElementById('email');
        emailCorrecto(email);
        login();
    });

    /*Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                emailCorrecto();
            }else{
                emailCorrecto();
            }
            form.classList.add('was-validated')
        }, false)
    })*/
});