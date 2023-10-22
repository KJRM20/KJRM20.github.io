$(document).ready(function() {
    // Cuando se hace clic en un enlace con la clase "nav-link"
    $('.droptop').click(function(event) {
        // Evita la navegación predeterminada
        event.preventDefault();

        // Obtén el valor del atributo href del enlace
        var target = $(this).attr('href');

        // Desplázate suavemente a la posición de destino
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 20);
    });
});

$(document).ready(function() {
    var carousels = $(".carousel-container .carousel");

    // Pausa cada carrusel cuando el mouse está sobre él
    carousels.on("mouseenter", function () {
        $(this).carousel("cycle");
      });
  
    // Reanuda cada carrusel cuando el mouse deja de estar sobre él
    carousels.on("mouseleave", function () {
        $(this).carousel("pause");
    });
});