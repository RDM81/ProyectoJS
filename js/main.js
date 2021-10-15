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
}

const musicas = [];

// musicas.push(new Vinilo(1, "Kosheen vs Lange vs Andy Moor - Stadium Catch Four (Roberto Di Maggio & Damian Dp Mashup)", 250, "../assets/Imagenes/Fotos/vinilo.jpg"));
// musicas.push(new Vinilo(2, "Wippenberg vs Mark Vision - Chakarita Gate (Roberto Di Maggio & Damian Dp Mashup)", 350, "../assets/Imagenes/Fotos/vinilo.jpg"));
// musicas.push(new Vinilo(3, "Roc Project vs. Reflekt - Never Need To Feel Loved (Roberto Di Maggio Mashup)", 350, "../assets/Imagenes/Fotos/vinilo.jpg"));
// musicas.push(new Vinilo(4, "Darude vs Cirez D - On Sandstorm (Roberto Di Maggio Mashup)", 200, "../assets/Imagenes/Fotos/vinilo.jpg"));
// musicas.push(new Vinilo(5, "Bissen vs Albert Vorme - Washout Falling What (Roberto Di Maggio Mashup)", 150, "../assets/Imagenes/Fotos/vinilo.jpg"));
// musicas.push(new Vinilo(6, "Tiesto vs. Andy Moor - Lethal Stadium Four (Roberto Di Maggio Mashup)", 450, "../assets/Imagenes/Fotos/vinilo.jpg"));
// musicas.push(new Vinilo(7, "Roberto Di Maggio @ SH Party 2021", 100, "../assets/Imagenes/Fotos/vinilo.jpg"));
// musicas.push(new Vinilo(8, "Roberto Di Maggio @ MBP Abril 2021", 150, "../assets/Imagenes/Fotos/vinilo.jpg"));

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
    $(id).append(`<div class="card mb-4 shadow-sm">
                                <div class="card-body">
                                    <img src=${Vinilo.img} class="card-img-top" alt="Vinilo">
                                    <h5 class="card-text">${Vinilo.nombre}</h5>
                                    <p class="card-text"> Precio: $ ${Vinilo.precio}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <a href="#" id=' ${Vinilo.id} ' class="btn btn-sm btn-outline-secondary btnBUY">BUY</a>
                                </div>
                                    <small class="text-muted">Stock 3</small>
                                </div>
                            </div>`);


}
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
                                    
                                    
                                    </p>`);
        
    }

    $('#carritoProducto').append(`<button id="btnConfirmar">Confirmar</button>`);
    $("#btnConfirmar").on("click",enviarCompra);
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
    
    $(".btnBUY").click(comprarVinilo);


    
});
$(window).on('load',function () {    
    $("#espera").remove();    
});