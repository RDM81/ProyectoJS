class Vinilo {
    constructor(id, nombreVinilo, precioVinilo) {
        this.id = id;
        this.nombreVinilo = nombreVinilo;
        this.precioVinilo = precioVinilo;
        this.compraVinilos = function (valor) {
            return 'Nombre: ' + this.nombreVinilo + ' \n Precio: $' + this.precioVinilo;
        };
    }
}
const musicas=[
    { id: 1, nombreVinilo: 'Kosheen vs Lange vs Andy Moor - Stadium Catch Four (Roberto Di Maggio & Damian Dp Mashup)', precioVinilo: 250 } ,
    { id: 2, nombreVinilo: 'Wippenberg vs Mark Vision - Chakarita Gate (Roberto Di Maggio & Damian Dp Mashup)', precioVinilo: 350 },
    { id: 3, nombreVinilo: 'Roc Project vs. Reflekt - Never Need To Feel Loved (Roberto Di Maggio Mashup)', precioVinilo: 350 },
    { id: 4, nombreVinilo: 'Darude vs Cirez D - On Sandstorm (Roberto Di Maggio Mashup)', precioVinilo: 200 },
    { id: 5, nombreVinilo: 'Bissen vs Albert Vorme - Washout Falling What (Roberto Di Maggio Mashup)', precioVinilo: 150 },
    { id: 6, nombreVinilo: 'Tiesto vs. Andy Moor - Lethal Stadium Four (Roberto Di Maggio Mashup)', precioVinilo: 450 },
    { id: 7, nombreVinilo: 'Roberto Di Maggio @ SH Party 2021', precioVinilo: 100 },
    { id: 8, nombreVinilo: 'Roberto Di Maggio @ MBP Abril 2021', precioVinilo: 100 }, 
    ];

const carrito = [];

const contenedorMaestro = document.getElementById("cardsMusica");


for (const Vinilo of musicas) {
    let divProducto = document.createElement('div');
    divProducto.innerHTML = `<div class="card mb-4 shadow-sm">
                                <div class="card-body">
                                    <img src="../assets/Imagenes/Fotos/vinilo.jpg" class="card-img-top" alt="Vinilo">
                                    <h5 class="card-text">${Vinilo.nombreVinilo}</h5>
                                    <p class="card-text"> Precio: $ ${Vinilo.precioVinilo}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <a href="#" id=' ${Vinilo.id} ' class="btn btn-sm btn-outline-secondary btnBUY">BUY</a>
                                </div>
                                    <small class="text-muted">Stock 3</small>
                                </div>
                            </div>`;
contenedorMaestro.appendChild(divProducto);

}

let botonBuy= $(".btnBUY");

for (const boton of botonBuy) {
    boton.onclick = compraVinilo;

}

function compraVinilo(event) {
    event.preventDefault();

    let encontrado=musicas.find(Vinilo => Vinilo.id == event.target.id);
    localStorage.setItem('idProducto', JSON.stringify(encontrado));

    carrito.push(encontrado);
    carritoMusica(carrito);

}

function carritoMusica(carrito) {
    $("#carritoCantidad").html(carrito.length);
    $("#carritoProducto").empty();


    for (const Vinilo of carrito) {
        $("#carritoProducto").append(`<p> ${Vinilo.nombreVinilo}   </p>
                                    <p> Precio: ${Vinilo.precioVinilo}  </p>
                                    `);
        
    }

}



