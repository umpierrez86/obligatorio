let id = localStorage.getItem("catID");
const direccion = PRODUCTS_URL+id+EXT_TYPE;
const ascendente = "ASC";
const descendente = "DESC";
const relevancia = "REL";
let min = undefined;
let max = undefined;
let busqueda = undefined;

let prodArray = [];

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
    localStorage.setItem('prodId',id);
    location.href = "product-info.html";
}

function ordenar(ordenamiento,array){
    if(ordenamiento == "ASC"){
        array.sort(function(a,b){
            if(parseInt(a.cost) > parseInt(b.cost)){
                return -1
            }else if(parseInt(a.cost) < parseInt(b.cost)){
                return 1;
            }else{
                return 0;
            }
        })
    }

    if(ordenamiento == "DESC"){
        array.sort(function(a,b){
            if(parseInt(a.cost) < parseInt(b.cost)){
                return -1
            }else if(parseInt(a.cost) > parseInt(b.cost)){
                return 1;
            }else{
                return 0;
            }
        });
    }

    if(ordenamiento == "REL"){
        array.sort(function(a,b){
            if(parseInt(a.soldCount) < parseInt(b.soldCount)){
                return 1
            }else if(parseInt(a.soldCount) > parseInt(b.soldCount)){
                return -1;
            }else{
                return 0;
            }
        })
    }
   
    return array;
}

function filtrar(){
    min = parseInt(document.getElementById('minimo').value);
    max = parseInt(document.getElementById('maximo').value);
    if((!(Number.isNaN(min))) && (!(Number.isNaN(max)))){
        let array = prodArray
        let filtrado = array.filter(array => array.cost >= min && array.cost <= max);
        mostrarListas(filtrado);
    }
}

function limpiar(){
    mostrarListas(prodArray);
}

function mostrarListas(array){
    let contenido = "";

    for(let i = 0; i < array.length; i++){
        let productos = array[i];
        if(productos.name.toLowerCase().includes(busqueda) || productos.description.toLowerCase().includes(busqueda) || busqueda == undefined){
            contenido += `
            <div onclick="cambiarPag(${productos.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="`  + productos.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>` + productos.name +  " - " + productos.currency +  " "  + productos.cost + `</h4> 
                            <p> ` + productos.description +`</p> 
                            </div>
                            <small class="text-muted">` + productos.soldCount + ` artículos</small>
                        </div> 
                    </div>
                </div>
            </div>
            `   
        }
    }
    
    document.getElementById("listas").innerHTML = contenido; 
    document.getElementById("pro").innerHTML = nombres;
}       

function productordenados(criterio){
    let auxCriterio;

    if(criterio != undefined){
        auxCriterio = criterio;
    }

    let ordenados = ordenar(auxCriterio, prodArray);
    mostrarListas(ordenados);
}

document.addEventListener('DOMContentLoaded', ()=>{
    
    getJSONData(direccion).then(function(resultObj){
        if(resultObj.status === "ok"){
            nombres = resultObj.data.catName;
            prodArray = resultObj.data.products;
            mostrarListas(prodArray);
        }
      });
    
        document.getElementById('filtrado').addEventListener('click', ()=>{
            filtrar();
        });
    
        document.getElementById('Desc').addEventListener('click', ()=>{
            productordenados(descendente);
        });
        
        document.getElementById('Asc').addEventListener('click', ()=>{
            productordenados(ascendente);
        });
        
        document.getElementById('Rel').addEventListener('click', ()=>{
            productordenados(relevancia);
        });

        document.getElementById('Borro').addEventListener('click',()=>{
            limpiar();
        })

        document.getElementById('search').addEventListener('input',()=>{
            busqueda = document.getElementById('search').value.toLowerCase();
            mostrarListas(prodArray);
        })

        let usuario = JSON.parse(sessionStorage.getItem('user'));
        if(usuario == null){
            alert('Debe hacer login para ingresar');
            location.href = "login.html";
        }

        dropdown(usuario.correo);
});