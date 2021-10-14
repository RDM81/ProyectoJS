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
                                    
                                    
                                    </p>`)
        
    }

}
