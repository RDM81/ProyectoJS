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



// Ingreso y Proceso de Datos 

let entradaUsuario= parseInt(prompt("Ingrese el numero del Vinilo elegido \n\n (1) Stadium Catch Four - Roberto Di Maggio & Damian Dp Mashup \n (2) Chakarita Gate - Roberto Di Maggio & Damian Dp Mashup \n (3) Never Need To Feel Loved - Roberto Di Maggio Mashup \n (4) On Sandstorm - Roberto Di Maggio Mashup \n (5) Washout Falling What - Roberto Di Maggio Mashup \n (6) Lethal Stadium Four - Roberto Di Maggio Mashup \n (7) SH Party 2021 \n (8) MBP Party 2021 \n\n (0) Salir"));

while (entradaUsuario >0) {

    if (entradaUsuario <=8) {

        const buscarVinilo = musicas.find(nombreVinilo => nombreVinilo.id === entradaUsuario);
        console.log(buscarVinilo);

        alert('El Vinilo Seleccionado es: \n' +  buscarVinilo.nombreVinilo + "\n Precio: $"+ buscarVinilo.precioVinilo);
    
    } else{
        alert("El Vinilo No Existe");
    }
    
    entradaUsuario= parseInt(prompt("Ingrese el numero del Vinilo elegido \n\n (1) Stadium Catch Four - Roberto Di Maggio & Damian Dp Mashup \n (2) Chakarita Gate - Roberto Di Maggio & Damian Dp Mashup \n (3) Never Need To Feel Loved - Roberto Di Maggio Mashup \n (4) On Sandstorm - Roberto Di Maggio Mashup \n (5) Washout Falling What - Roberto Di Maggio Mashup \n (6) Lethal Stadium Four - Roberto Di Maggio Mashup \n (7) SH Party 2021 \n (8) MBP Party 2021 \n\n (0) Salir"));

}