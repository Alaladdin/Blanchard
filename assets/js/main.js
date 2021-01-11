document.addEventListener('DOMContentLoaded', () => {

    const homePageSlider = new Swiper('.gallery__slider', {
        preloadImages: true,
        pagination: {
            el: '.gallery__fraction',
            type: 'fraction',
            // currentClass: 'asd',
            // totalClass: 'asdd',
            // renderFraction: (currentClass, totalClass) => {
            //     return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
            // },
        },
        spaceBetween: 50,
        slidesPerColumn: 2,
        slidesPerView: 3,
        slidesPerGroup: 3,
        navigation: {
            nextEl: '.gallery__btn-next',
            prevEl: '.gallery__btn-prev',
        },


        // breakpoints: {
        //     768: {
        //
        //     },
        //     1024: {},
        // },
        // autoplay: {
        //     delay: 3000,
        // },

    });


});



