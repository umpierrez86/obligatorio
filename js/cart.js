const direccion = CART_INFO_URL+25801+EXT_TYPE;
let carrito = []
let alertaF = document.getElementById('CompraExistosa');
//let borrar = document.getElementsByName('borro');
const forms = document.querySelectorAll('.needs-validation');

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

function mostrarCompras(articulos){
    if(localStorage.getItem('carrito') != null){
        let nuevasCompras = JSON.parse(localStorage.getItem('carrito'));
        articulos = articulos.concat(nuevasCompras);
        carrito.articles = articulos;
        //console.log(carrito.articles);
        localStorage.removeItem('carrito')
    }

    let contenido = "";
    let total = 0;
    for(let i = 0; i < articulos.length; i++){
        let datos = articulos[i];
        contenido += `
        <tr>
            <td style="width: 100px; border: none;"><img src="${datos.image}"  style="height: 40px; width: 60px;"></td>
            <td style="text-align: left;">${datos.name}</td>
            <td style="text-align: left;">${datos.currency}</td>
            <td style="text-align: left;" class="precio"> ${datos.unitCost}</td>
            <td style="text-align: left;"><input onchange="cambiar()" id="cant${i}" class="inp" type="number" value="${datos.count}" min="1"></td>
            <td id="${i}" style="text-align: left;" class="subtotal">${datos.unitCost * datos.count}</td>
            <td><span type="button" onclick="eliminar(${i})" class="fa fa-trash-o fa-2x" aria-hidden="true"></span></td>
        </tr>
        `
        total = total + (datos.unitCost * datos.count);
    }

    let envio = document.getElementsByClassName('form-check-input');
    for(let i = 0; i < envio.length; i++){
        envio[i].addEventListener('change', ()=>{
            imp(envio[i].value)
        })
    }
    document.getElementById('cuerpo').innerHTML = contenido;
    document.getElementById('subt').innerHTML =  total;
    imp("premium")
    
    //impuestos();

    /*let modal = docuemnt.getElementsByClassName('mod');
    for(let i = 0; i < modal.length; i++){
        modal[i].addEventListener('change', ()=>{
            desabilitar(modal[i].value);
        })
    }*/
}

function cambiar(){
    let precios = document.getElementsByClassName('precio');
    let cantidades = document.getElementsByTagName('input');
    let subtotales = document.getElementsByClassName('subtotal');
    let sub = document.getElementById('subt');
    let total = 0;

    for(let i = 0; i < precios.length; i++){
        //console.log(parseInt(precios[i].innerHTML));
        subtotales[i].innerHTML = parseInt(precios[i].innerHTML) * parseInt(cantidades[i].value);
        total = total + parseInt(precios[i].innerHTML) * parseInt(cantidades[i].value);
        console.log(total)
    }

    console.log(total);
    sub.innerHTML = total;
    //impuestos();
    let envio = document.getElementsByClassName('form-check-input');
    for(let i=0; i < envio.length; i++){
        if(envio[i].checked){
            impuesto = envio[i].value;
        }
    }
    imp(impuesto);

}

function eliminar(index){
    carrito.articles.splice(index,1);
    console.log(carrito.articles);
    mostrarCompras(carrito.articles);
}

/*function impuestos(){
    let impuesto = "premium";
    let subtotal = document.getElementById('subt').innerHTML;
    //console.log(subtotal);
    let envio = document.getElementsByClassName('form-check-input');
    for(let i=0; i < envio.length; i++){
        if(envio[i].checked){
            impuesto = envio[i].value;
        }
    }
    if(impuesto == "premium"){
        document.getElementById('env').innerHTML = parseInt(subtotal) * 0.15;
        document.getElementById('tot').innerHTML = (parseInt(subtotal) * 0.15) + parseInt(subtotal);
        console.log(parseInt(subtotal) * 0,15)
    }else if(impuesto == "express"){
        document.getElementById('env').innerHTML = parseInt(subtotal) * 0.07;
        document.getElementById('tot').innerHTML = (parseInt(subtotal) * 0.07) + parseInt(subtotal);
    }else{
        document.getElementById('env').innerHTML =  parseInt(subtotal) * 0.05;
        document.getElementById('tot').innerHTML = (parseInt(subtotal) * 0.05) + parseInt(subtotal);
    }

}*/

function imp(tipo_impuesto){
    let subtotal = document.getElementById('subt').innerHTML;
    if(tipo_impuesto == "premium"){
        document.getElementById('env').innerHTML = (parseInt(subtotal) * 0.15).toFixed(0);
        document.getElementById('tot').innerHTML = ((parseInt(subtotal) * 0.15) + parseInt(subtotal)).toFixed(0);
        console.log(parseInt(subtotal) * 0,15)
    }else if(tipo_impuesto == "express"){
        document.getElementById('env').innerHTML = (parseInt(subtotal) * 0.07).toFixed(0);
        document.getElementById('tot').innerHTML = ((parseInt(subtotal) * 0.07) + parseInt(subtotal)).toFixed(0);
    }else{
        document.getElementById('env').innerHTML =  (parseInt(subtotal) * 0.05).toFixed(0);
        document.getElementById('tot').innerHTML = ((parseInt(subtotal) * 0.05) + parseInt(subtotal)).toFixed(0);
    }
}

function deshabilitar(){
    let numTarjeta = document.getElementById('inputNum');
    let codigo = document.getElementById('inputCod');
    let ven = document.getElementById('inputFecha');
    let numCuenta = document.getElementById('inputCuenta');
    
    if(document.getElementById('cred').checked){
        numTarjeta.disabled = false;
        codigo.disabled = false;
        ven.disabled = false;
        numCuenta.disabled = true;
   }else{
        numTarjeta.disabled = true;
        codigo.disabled = true;
        ven.disabled = true;
        numCuenta.disabled = false;
   }
}

function validacion(){
    let bandera = true;
    let credito = document.getElementById('cred');
    let banco = document.getElementById('bank');
    let numTarjeta = document.getElementById('inputNum');
    let codigo = document.getElementById('inputCod');
    let ven = document.getElementById('inputFecha');
    let numCuenta = document.getElementById('inputCuenta');

    if((credito.checked || banco.checked)){
        document.getElementById("feedback").innerHTML = "";
    }else{
        document.getElementById("feedback").innerHTML = "Debe seleccionar una forma de pago";
        bandera = false;
    }

    if(((numTarjeta === "") && (codigo.value === "") && (ven.value === "")) || (numCuenta.value === "")){
        bandera = false;
    }
    
    return bandera;
}

function seVende(){
    let bandera = true;
    let inputCalle = document.getElementById('calle');
    let inputNumero = document.getElementById('number');
    let inputEsquina = document.getElementById('esq');
    

    if((inputCalle.value === "") || (inputNumero.value === "") || (inputEsquina.value === "")){
        bandera = false;
    }
    return bandera;
}


document.addEventListener('DOMContentLoaded', ()=>{
    getJSONData(direccion).then(function(resultObj){
        if(resultObj.status === "ok"){
            carrito = resultObj.data;
            mostrarCompras(carrito.articles);
        }
      });

      let usuario = JSON.parse(sessionStorage.getItem('user'));
      if(usuario == null){
          alert('Debe hacer login para ingresar');
          location.href = "login.html";
      }

      dropdown(usuario.correo);

      Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                  event.preventDefault()
                  event.stopPropagation()
                  validacion();
                }else{
                    event.preventDefault()
                    let prueba1 = seVende();
                    let prueba2 = validacion();
                    if(prueba1 && prueba2){
                        alertaF.classList.add('alert-success');
                        alertaF.innerHTML = '¡Has comprado con exito!';
                    }
                }
                form.classList.add('was-validated')
              }, false)
        })
    
    document.getElementById('cred').addEventListener('click', ()=>{
        deshabilitar();
        validacion();
    })

    document.getElementById('bank').addEventListener('click', ()=>{
        deshabilitar();
        validacion();
    })

    /*document.getElementById('finalizar').addEventListener('click', event =>{
        let prueba1 = seVende();
        let prueba2 = validacion();
        //event.preventDefault()
        event.stopPropagation()
        console.log(prueba1,prueba2)
        if(prueba1 && prueba2){
            alertaF.classList.add('alert-success');
            alertaF.innerHTML = 'Has comprado con exito';
        }
    }, false)*/
})
