class Vinilo {
    constructor(id, nombre, precio, img, genero) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.img = img;
        this.cantidad = 1;
        this.genero = genero;
        
    }
    agregarCantidad(valor){
        this.cantidad += valor;
        
    }

    subtotal(){
        return this.cantidad * this.precio;
    }
    
    precioTotal=()=>{
        let totalReduce = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
        
        return totalReduce;
    }

}

const musicas = [];
const generos = ['Trance', 'Progressive Trance', 'Oldshool', 'Progressive House'];
const carrito = [];


$.get("../data/musicas.json", function (respuesta, estado){

    if(estado == "success"){

    for (const objeto of respuesta) {
        musicas.push(new Vinilo(objeto.id, objeto.nombre, objeto.precio, objeto.img, objeto.genero, objeto.cantidad))
        
    }

    productosUI(musicas, '#cardsMusica');
}else{
    console.log('NO HAY CARGA DE DATOS');
}  
});

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
                        <p class="card-text">Genero: ${Vinilo.genero}</p>
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
    const idVinilo  = event.target.id;
    const existe=carrito.find(Vinilo => Vinilo.id ==idVinilo);

        if (existe == undefined) {
            
            const encontrado = musicas.find(Vinilo => Vinilo.id == idVinilo);
            
            carrito.push(encontrado);    
        }else{
            existe.agregarCantidad(1);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        carritoMusica(carrito);

            Toastify({
                text: "El producto se añadio al carrito",
                duration: 1500,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                background: "black",
                },
                onClick: function(){}
            }).showToast();
        };

// SELECTOR DE CATEGORIAS

function selectUI(lista,selector) {
    $(selector).empty();
    for (const genero of lista) {
        $(selector).append(`<option>${genero}</option>`);
    }
    
    $(selector).prepend(`<option selected>ALL</option>`);
}

selectUI(generos,"#seleccionGenero");

$("#seleccionGenero").on("change", buscarGenero)

function buscarGenero() {
    
    if(this.value != "ALL"){
        let seleccionados= musicas.filter(Vinilo => Vinilo.genero == this.value);
        productosUI(seleccionados,"#cardsMusica");

    }else{
        productosUI(musicas, "#cardsMusica");
    }
}

// INTERFAZ CARRITO

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
                                    <button id="${Vinilo.id}" class="btn btn-light btn-delete"> x </button>
                                    </p>`);
        
    }

    $('#carritoProducto').append(`<button id="btnConfirmar">Confirmar Compra</button>`);
    $("#btnConfirmar").on("click",enviarCompra,function () {
        
        Toastify({
            text: "Gracias por la compra",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
            background: "black",
            },
            onClick: function(){}
        }).showToast();
    });
}




    function enviarCompra() {
    
    $.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(carrito),function(respuesta,estado) {
        
        
        if(estado == "success"){
        
        $('#carritoProducto').empty();
        
        $('#carritoCantidad').html("0");
        }else{
            console.log('NO SE ENVIARON LOS DATOS');
        }    

    })  
    }

    $(document).ready(function () {
        if("carrito" in localStorage)
            // const datos= JSON.parse(localStorage.getItem('carrito'));
            for (const objeto of datos) {
                carrito.push(new Vinilo(objeto.id, objeto.nombre, objeto.precio, objeto.img, objeto.genero, objeto.cantidad))
                
            }
            carritoMusica(carrito);
        
    });

$(window).on('load',function () {    
    $("#espera").remove();    
});


