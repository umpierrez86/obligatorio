let id = localStorage.getItem('prodId');
let direccion = PRODUCT_INFO_URL+id+EXT_TYPE;
let comentarios = PRODUCT_INFO_COMMENTS_URL+id+EXT_TYPE;
let c = [];

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
    console.log(com);
    let comentarios = "";
    for(let i = 0; i < com.length; i++ ){
        comment = com[i];
        /*let estre = "";
        for(let i = 0; i < 5; i++){
            if(i<=parseInt(comment.score)-1){
                estre += `<span class="fa fa-star checked" ></span>`;
            }else{
                estre += `<span class="fa fa-star"></span>`
            }
        }*/
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
                <h6>Precio</h6>
                <p class="text-muted">${prod.currency} ${prod.cost}</p>
            </div>
            <div>
                <h6>Descripcion</h6>
                <p class="text-muted">${prod.description}</p>
            </div>
            <div>
                <h6>Categoria</h6>
                <p class="text-muted">${prod.category}</p>
            </div>
            <div>
                <h6>Cantidad de vendidos</h6>
                <p class="text-muted">${prod.soldCount}</p>
            </div>
            <div calss="container">
                <h6>Imagenes ilustrativas</h6>
                ${imagenes}
            </div>
        </div>
        
    </div>
    `;
    document.getElementById('cat-list-container').innerHTML = contenido; 
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
        }
      });

      /*document.getElementById('enviar').addEventListener('click',()=>{
        let borrar = document.getElementById('descript');
        borrar.value = "";
      })*/

      document.getElementById('enviar').addEventListener('click',()=>{
        agregar();
      })

})