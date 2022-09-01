let id = localStorage.getItem("catID");
const direccion = PRODUCTS_URL+id+EXT_TYPE;
//localStorage.setItem('hola',direccion);
const ascendente = "ASC";
const descendente = "DESC";
const relevancia = "REL";

let prodArray = [];

function ordenar(ordenamiento,array){
    if(ordenamiento == "ASC"){
        array.sort(function(a,b){
            if(a.cost > b.cost){
                return 1
            }else if(a.cost < b.cost){
                return -1;
            }else{
                return 0;
            }
        })
    }

    if(ordenamiento == "DESC"){
        array.sort(function(a,b){
            if(a.cost < b.cost){
                return 1
            }else if(a.cost > b.cost){
                return -1;
            }else{
                return 0;
            }
        });
    }

    if(ordenamiento == "REL"){
        array.sort(function(a,b){
            if(a.soldCount < b.soldCount){
                return 1
            }else if(a.soldCount > b.soldCount){
                return -1;
            }else{
                return 0;
            }
        })
    }
   
    return array;
}


function limpiar(){
    mostrarListas(prodArray);
}

function mostrarListas(array){
    let contenido = "";

    for(let i = 0; i < array.length; i++){
        let productos = array[i];
        contenido += `
        <div class="list-group-item list-group-item-action">
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
    
    document.getElementById("listas").innerHTML = contenido; 
    document.getElementById("pro").innerHTML = nombres;
}       

function productordenados(criterio){
    /*let auxlistaProductos = prodArray;*/
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
    
        document.getElementById('rangeFilterCount').addEventListener('click', ()=>{
            let min = document.getElementById('rangeFilterCountMin').value;
            let max = document.getElementById('rangeFilterCountMax').value;
            let array = prodArray
            let filtrado = array.filter(array => array.cost >= min && array.cost <= max);
            mostrarListas(filtrado);
        });
    
        document.getElementById('Asc').addEventListener('click', ()=>{
            productordenados(ascendente);
        });
        
        document.getElementById('Desc').addEventListener('click', ()=>{
            productordenados(descendente);
        });
        
        document.getElementById('Rel').addEventListener('click', ()=>{
            productordenados(relevancia);
        });

        document.getElementById('clearRangeFilter').addEventListener('click',()=>{
            limpiar();
        })
});