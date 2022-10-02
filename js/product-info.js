let id = localStorage.getItem('prodId');
let direccion = PRODUCT_INFO_URL+id+EXT_TYPE;
let comentarios = PRODUCT_INFO_COMMENTS_URL+id+EXT_TYPE;
let c = [];

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

function cambiarPag(id){
    localStorage.removeItem('prodId');
    localStorage.setItem('prodId',id);
    location.reload();
}

function mostrarRel(pro){
    let relacion = "";
    for(rel of pro){
        relacion += `
            <div class="col-md-4" onclick="cambiarPag(${rel.id})">
            <div class="card mt-3" class="card mb-4 shadow-sm custom-card cursor-active">
                <div class="card-img-top">
                    <img class="card-img" src="`  + rel.image + `" alt="related image">
                </div>
                <div class="body">
                    <h4 class="card-title">${rel.name}</h4>
                </div>
            </div>
            </div>
            `   
    }

    document.getElementById('relacion').innerHTML = relacion
}

function estrellas(puntos){
    let estre = "";
    for(let i = 0; i < 5; i++){
        if(i<=parseInt(puntos)-1){
            estre += `<span class="fa fa-star checked" ></span>`;
        }else{
            estre += `<span class="fa fa-star"></span>`
        }
    }
    return estre;
}

function mostrarCom(com){
    //console.log(com);
    let comentarios = "";
    for(let i = 0; i < com.length; i++ ){
        comment = com[i];
        comentarios += 
        `<div> 
            <div class="list-group-item list-group-item-action cursor-active">
                <p><strong>${comment.user}</strong></p>
                <p>${comment.dateTime}</p>
                <p>${comment.description}</p>
                ${estrellas(comment.score)}
            </div>
             
        </div>`
    };
    document.getElementById('comentarios').innerHTML = comentarios;
}

function mostrarImg(prod){
    let imagenes = "";
    for(let i = 0; i < prod.images.length; i++){
        if(i==0){
            imagenes += `
            <div class="carousel-item active">
                <img class="d-block w-100" src="${prod.images[i]}">
            </div>
            `
        }else{
            imagenes += `
            <div class="carousel-item">
                <img class="d-block w-100" src="${prod.images[i]}">
            </div>
            `
        }
    }
    document.getElementById('slides').innerHTML = imagenes;
}

function mostrarProd(prod){
    
    let imagenes = "";
    for(let i = 0; i < prod.images.length; i++){
        imagenes += `
        <img class="prodImg" src="${prod.images[i]}">
        `
    }

    let contenido = `
    <div>
        <div>
            <h4 style="margin-top : 20px">${prod.name}</h4>
        </div>
        <hr>
        <div>
            <div>
                <h5 id="hola">Precio</h5>
                <p class="text-muted">${prod.currency} ${prod.cost}</p>
            </div>
            <div>
                <h5>Descripcion</h5>
                <p class="text-muted">${prod.description}</p>
            </div>
            <div>
                <h5>Categoria</h5>
                <p class="text-muted">${prod.category}</p>
            </div>
            <div>
                <h5>Cantidad de vendidos</h5>
                <p class="text-muted">${prod.soldCount}</p>
            </div>
        </div>
        
    </div>
    `;
    document.getElementById('cat-list-container').innerHTML = contenido;
    mostrarImg(prod) 
}

function agregar(){
    let fecha = new Date();
    let usuario = JSON.parse(sessionStorage.getItem('user'));
    let dato = {};
    dato.user = usuario.correo;
    dato.description = document.getElementById('descript').value;
    document.getElementById('descript').value = "";
    dato.dateTime = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDay()} ${fecha.toLocaleTimeString()}`
    dato.score = document.getElementById('star').value;
    c.push(dato);
    mostrarCom(c);

}

document.addEventListener('DOMContentLoaded',()=>{
    getJSONData(comentarios).then(function(resultObj){
        if(resultObj.status === "ok"){
            com = resultObj.data;
            c = com;
            mostrarCom(com);
        }
      });
    
    getJSONData(direccion).then(function(resultObj){
        if(resultObj.status === "ok"){
            prod = resultObj.data;
            mostrarProd(prod);
            mostrarRel(prod.relatedProducts);
        }
      });

      document.getElementById('enviar').addEventListener('click',()=>{
        agregar();
      })

      let usuario = JSON.parse(sessionStorage.getItem('user'));
      if(usuario == null){
          alert('Debe hacer login para ingresar');
          location.href = "login.html";
      }

      dropdown(usuario.correo);

})