

musicas.push(new Vinilo(1, "Kosheen vs Lange vs Andy Moor - Stadium Catch Four (Roberto Di Maggio & Damian Dp Mashup)", 250, "../assets/Imagenes/Fotos/vinilo.jpg"));
musicas.push(new Vinilo(2, "Wippenberg vs Mark Vision - Chakarita Gate (Roberto Di Maggio & Damian Dp Mashup)", 350, "../assets/Imagenes/Fotos/vinilo.jpg"));
musicas.push(new Vinilo(3, "Roc Project vs. Reflekt - Never Need To Feel Loved (Roberto Di Maggio Mashup)", 350, "../assets/Imagenes/Fotos/vinilo.jpg"));
musicas.push(new Vinilo(4, "Darude vs Cirez D - On Sandstorm (Roberto Di Maggio Mashup)", 200, "../assets/Imagenes/Fotos/vinilo.jpg"));
musicas.push(new Vinilo(5, "Bissen vs Albert Vorme - Washout Falling What (Roberto Di Maggio Mashup)", 150, "../assets/Imagenes/Fotos/vinilo.jpg"));
musicas.push(new Vinilo(6, "Tiesto vs. Andy Moor - Lethal Stadium Four (Roberto Di Maggio Mashup)", 450, "../assets/Imagenes/Fotos/vinilo.jpg"));
musicas.push(new Vinilo(7, "Roberto Di Maggio @ SH Party 2021", 100, "../assets/Imagenes/Fotos/vinilo.jpg"));
musicas.push(new Vinilo(8, "Roberto Di Maggio @ MBP Abril 2021", 150, "../assets/Imagenes/Fotos/vinilo.jpg"));

productosUI(musicas, '#cardsMusica');

$(document).ready(function () {
    console.log('Dom Listo');  
    
    $(".btnBUY").click(comprarVinilo);


    
});
$(window).on('load',function () {    
    $("#espera").remove();    
});