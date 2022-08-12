

let prodArray = [];

function mostrarAutos(array){
    let contenido = "";

    for(let i = 0; i < array.products.length; i++){
        let productos = array.products[i];
        contenido += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="`  + productos.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` + productos.name +  " - " + + productos.currency +  " "  + productos.cost + `</h4> 
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
}       

document.addEventListener('DOMContentLoaded', ()=>{
    getJSONData(direccion).then(function(resultObj){
        if(resultObj.status === "ok"){
            prodArray = resultObj.data;
            mostrarAutos(prodArray);
        }
    });
});