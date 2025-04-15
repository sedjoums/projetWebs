var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Appliquer les animations lorsque la page est chargée
window.addEventListener('load', function() {
    let elements = document.querySelectorAll('.animate');
    elements.forEach(function(element, index) {
        setTimeout(function() {
            element.classList.add('animate');
        }, index * 200); // Déclenche l'animation avec un léger décalage
    });
});