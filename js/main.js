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
        // document.getElementById('total').innerText = totalReduce;
        return totalReduce;
    }

}

const musicas = [];
const generos = ['Trance', 'Progressive Trance', 'Live Set', 'Progressive House'];
let carrito = [];


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
        $("#carritoProducto").append(`<table class="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col">Cantidad</th>
                                                
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>${Vinilo.nombre}</td>
                                                <td>$ ${Vinilo.precio}</td>
                                                <td><span class="badge badge-warning">${Vinilo.cantidad}</span><button id="${Vinilo.id}" class="btn-dark btn-mas"> + </button>
                                                <button id="${Vinilo.id}" class="btn-dark btn-res"> - </button>
                                                <button id="${Vinilo.id}" class="btn-dark btn-delete"> x </button>
                                                <span class="badge badge-warning">Subtotal: ${Vinilo.subtotal()}</span>
                                                </td>
                                                
                                            </tr>
                                            
                                            </tbody>
                                            
                                        </table>
                                            
                                            <div id='total'>total: ${Vinilo.precioTotal()}</div>`);
                                            
    }

    // for (const Vinilo of musicas) {
    //     $("#carritoProducto").append(`<p> ${Vinilo.nombre} 
    //                                 <span class="badge badge-warning">
    //                                 $ ${Vinilo.precio}</span>
    //                                 <span class="badge badge-warning">
    //                                 Cantidad: ${Vinilo.cantidad}</span>
    //                                 <span class="badge badge-warning">
    //                                 Subtotal: ${Vinilo.subtotal()}</span>                                
    //                                 <span class="badge badge-warning">
    //                                 Total: ${Vinilo.precioTotal()}</span>
    //                                 <button id="${Vinilo.id}" class="btn btn-dark btn-mas"> + </button>
    //                                 <button id="${Vinilo.id}" class="btn btn-dark btn-res"> - </button>
    //                                 <button id="${Vinilo.id}" class="btn btn-dark btn-delete"> x </button>
    //                                 </p>
    //                                 <div id="subtotal"> El SubTotal es de $ ${Vinilo.subtotal()}</div>
    //                                 <div id="total"> El Total es de $ ${Vinilo.precioTotal()}</div>`);
        
    // }

    
// // MOSTRAR PRECIO TOTAL

// $('#carritoProducto').append(`<div id="total">TOTAL</div>`);
//     precioTotal=()=>{
//     let totalReduce = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
//     document.getElementById('total').innerText = totalReduce;
//     };

// BOTON DE ELEMINAR

    $('.btn-delete').on('click', eliminarCarrito);
    function eliminarCarrito(event) {
        console.log(event.target.id);
        event.stopPropagation();
        carrito = carrito.filter(Vinilo => Vinilo.id != event.target.id);
        carritoMusica(carrito);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

// BOTON SUMAR CANTIDAD

    $('.btn-mas').on('click', agregarCarrito);
    function agregarCarrito(event) {
        event.stopPropagation();
        let Vinilo = carrito.find(Vinilo => Vinilo.id == event.target.id);
        Vinilo.agregarCantidad(1);
        $(this).parent().children()[0].innerHTML = Vinilo.cantidad;
        $(this).parent().children()[4].innerHTML = Vinilo.subtotal();
        $('#carritoProducto').append(`<div id="total">TOTAL</div>`).innerHTML = Vinilo.precioTotal();
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
    }

// BOTON RESTA

    $('.btn-res').on('click', restarCarrito);
    function restarCarrito(event) {
        event.stopPropagation();
        let Vinilo = carrito.find(Vinilo => Vinilo.id == event.target.id);
        if(Vinilo.cantidad > 1){
            Vinilo.agregarCantidad(-1);
            $(this).parent().children()[0].innerHTML = Vinilo.cantidad;
            $(this).parent().children()[4].innerHTML = Vinilo.subtotal();
            $('#carritoProducto').append(`<div id="total">TOTAL</div>`).innerHTML = Vinilo.precioTotal();
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    }




//BOTON CONFIRMAR COMPRA

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
        if("carrito" in localStorage){
            const datos= JSON.parse(localStorage.getItem('carrito'));
            for (const objeto of datos) {
                carrito.push(new Vinilo(objeto.id, objeto.nombre, objeto.precio, objeto.img, objeto.genero, objeto.cantidad))
                
            }
            carritoMusica(carrito);
        }
    });

$(window).on('load',function () {    
    $("#espera").remove();    
});


