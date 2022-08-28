let id = localStorage.getItem("catID");
const direccion = PRODUCTS_URL+id+EXT_TYPE;
//localStorage.setItem('hola',direccion);

let prodArray = [];

function ordenar(ordenamiento,array){
    if(ordenamiento === ASCENDENTE){
        /*let listaFiltrada = array
        listaFiltrada.sort((ini,sig)=>ini.cost-sig.cost);
        mostrarListas(listaFiltrada);*/
        let listaFiltrada = array.sort(function(a,b){
            if(a.cost > b.cost){
                return 1
            }else if(a.cost < b.cost){
                return -1;
            }else{
                return 0;
            }
        })
        mostrarListas(listaFiltrada);
    }

    if(ordenamiento === DESCENDENTE){
        let listaFiltrada = array.sort((ini,sig)=>sig.cost-ini.cost);
        mostrarListas(listaFiltrada);
    }

    if(ordenamiento === RELEVANCIA){
        let listaFiltrada = array.sort((ini,sig)=>ini.soldCount-sig.soldCount);
        mostrarListas(listaFiltrada);
    }
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
    document.getElementById("pro").innerHTML = prodArray.catName;
}       

document.addEventListener('DOMContentLoaded', ()=>{
    
    getJSONData(direccion).then(function(resultObj){
        if(resultObj.status === "ok"){
            prodArray = resultObj.data;
            mostrarListas(prodArray.products);
        }
      });
    
        document.getElementById('rangeFilterCount').addEventListener('click', ()=>{
            let min = document.getElementById('rangeFilterCountMin').value;
            let max = document.getElementById('rangeFilterCountMax').value;
            let array = prodArray.products
            let filtrado = array.filter(array => array.cost >= min && array.cost <= max);
            mostrarListas(filtrado);
        });
    
        document.getElementById('Asc').addEventListener('click', ()=>{
            ordenar(ASCENDENTE);
        });
        
        document.getElementById('Desc').addEventListener('click', ()=>{
            ordenar(DESCENDENTE);
        });
        
        document.getElementById('Rel').addEventListener('click', ()=>{
            ordenar(RELEVANCIA);
        });
});