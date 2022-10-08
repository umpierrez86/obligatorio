const direccion = CART_INFO_URL+25801+EXT_TYPE;
let carrito = []
//let borrar = document.getElementsByName('borro');

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
    for(let i = 0; i < articulos.length; i++){
        let datos = articulos[i];
        contenido += `
        <tr>
            <td style="width: 100px; border: none;"><img src="${datos.image}"  style="height: 40px; width: 60px;"></td>
            <td style="text-align: left;">${datos.name}</td>
            <td style="text-align: left;">${datos.currency}</td>
            <td style="text-align: left;" class="precio"> ${datos.unitCost}</td>
            <td style="text-align: left;"><input onchange="cambiar()" id="cant${i}" class="inp" type="number" value="${datos.count}"></td>
            <td id="${i}" style="text-align: left;" class="subtotal">${datos.unitCost * datos.count}</td>
            <td><span type="button" onclick="eliminar(${i})" class="fa fa-trash-o fa-2x" aria-hidden="true"></span></td>
        </tr>
        `
    }

    document.getElementById('cuerpo').innerHTML = contenido;
}

function cambiar(){
    let precios = document.getElementsByClassName('precio');
    let cantidades = document.getElementsByTagName('input');
    let subtotales = document.getElementsByClassName('subtotal');

    for(let i = 0; i < precios.length; i++){
        //console.log(parseInt(precios[i].innerHTML));
        subtotales[i].innerHTML = parseInt(precios[i].innerHTML) * parseInt(cantidades[i].value);
    }
}

function eliminar(index){
    carrito.articles.splice(index,1);
    console.log(carrito.articles);
    mostrarCompras(carrito.articles);
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
      
    
    /*document.getElementById('cantidad').addEventListener('change', ()=>{
        let cuantos = document.getElementById('cantidad').value;
        document.getElementById('subtotal').innerHTML = cuantos * carrito.articles.unitCost;
      })*/
})