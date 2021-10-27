class Vinilo {
    constructor(id, nombre, precio, img) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.img = img;
        this.cantidad= 1;
        
    }
    agregarCantidad(valor){
        this.cantidad += valor;
        
    }

    subtotal(){
        return this.cantidad * this.precio;
    }
    
    precioTotal=()=>{
        let totalReduce = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
        document.getElementById('total').innerText = totalReduce
        return totalReduce;
    }

}

const musicas = [];



$.get("../data/musicas.json", function (respuesta, estado){
    for (const objeto of respuesta) {
        musicas.push(new Vinilo(objeto.id, objeto.nombre, objeto.precio, objeto.img, objeto.cantidad))
    }

    productosUI(musicas, '#cardsMusica');
});

const carrito = [];



function productosUI(musicas, id) {
    $(id).empty();

for (const Vinilo of musicas) {
    $(id).append(`<div data-aos="zoom-in" class="card mb-3">
                    <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src=${Vinilo.img} class="card-img" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${Vinilo.nombre}</h5>
                        <p class="card-text">Precio: $ ${Vinilo.precio}</p>
                        <p class="card-text"><small class="text-muted">Stock 4</small></p>
                        <div class="btn-group">
                            <a href="#" id=' ${Vinilo.id} ' class="btn btn-sm  btn-outline-secondary btnBUY">BUY</a>
                        </div>
                        </div>
                        
                    </div>
                    </div>
                </div>`);
}
$(".btnBUY").click(comprarVinilo);
}

function comprarVinilo(event) {
    event.preventDefault();
    const idVinilo   = event.target.id;
    const existe=carrito.find(Vinilo => Vinilo.id ==idVinilo);

        if (existe == undefined) {
            
            const encontrado = musicas.find(Vinilo => Vinilo.id == idVinilo);
            carrito.push(encontrado);    
        }else{
            existe.agregarCantidad(1);
        }
        
        carritoMusica(carrito);

}

// FUNCION INTERFAZ CARRITO

function carritoMusica(musicas) {
    $("#carritoCantidad").html(musicas.length);
    $("#carritoProducto").empty();


    for (const Vinilo of musicas) {
        $("#carritoProducto").append(`<p> ${Vinilo.nombre} 
                                    <span class="badge badge-warning">
                                    $ ${Vinilo.precio}</span>
                                    <span class="badge badge-warning">
                                    Cantidad: ${Vinilo.cantidad}</span>
                                    <span class="badge badge-warning">
                                    Subtotal: ${Vinilo.subtotal()}</span>                                
                                    <span class="badge badge-warning">
                                    Total: ${Vinilo.precioTotal()}</span>  
                                    
                                    </p>`);
        
    }

    $('#carritoProducto').append(`<button id="btnConfirmar">Confirmar</button>`);
    $("#btnConfirmar").on("click",enviarCompra,function () {
        alert("SHOPIN SE LA COME");
    });
}
    function enviarCompra() {
    
    $.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(carrito),function(respuesta,estado) {
        
        
        if(estado == "success"){
        
        $('#carritoProducto').empty();
        
        $('#carritoCantidad').html("0");
        }else{
        
        }    

    })  
    }

$(document).ready(function () {
    console.log('Dom Listo');  
    
    

    
});

$(window).on('load',function () {    
    $("#espera").remove();    
});


