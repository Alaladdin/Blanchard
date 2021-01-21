document.addEventListener('DOMContentLoaded', () => {
  // Gallery slider config
  new Swiper('.gallery__slider', {
    preloadImages: true,
    pagination: {
      el: '.gallery__fraction',
      type: 'fraction',

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


  // Change catalog lang
  const catalogLangBtn = document.getElementsByName('catalog__lang');

  catalogLangBtn.forEach((el) => el.onchange = () => {
    console.log(`Selected catalog lang is '${el.dataset.lang}'`);
  });

  /**
   * It returns test + 10
   * @params {html selector} el - some number
   */
  function accordion(el) {
    if (el.length <= 0) {
      console.error('[Accordion] \'element\' param is empty');
      return;
    }

    const accordionItems = document.querySelectorAll(`${el}__item`);

    accordionItems.forEach((item) => {
      const btn = item.querySelector(`${el}__btn`);
      const body = item.querySelector(`${el}__body`);

      item.setAttribute('tabindex', '0'); // Чтобы не перехватывал фокус таба

      btn.onclick = () => {
        // if (item.classList.contains(`${el.slice(1)}__item--opened`)) {
        //     // collapseSection(body);
        // } else {
        //     // expandSection(body);
        // }

        item.classList.toggle(`${el.slice(1)}__item--opened`);
      };
    });


    function collapseSection(element) {
      const sectionHeight = element.scrollHeight;
      const elementTransition = element.style.transition;

      element.style.transition = '';

      requestAnimationFrame(() => {
        element.style.height = `${sectionHeight}px`;
        element.style.transition = elementTransition;

        requestAnimationFrame(() => element.style.height = '0');
      });
    }

    function expandSection(element) {
      const sectionHeight = element.scrollHeight;
      element.style.height = `${sectionHeight}px`;

      element.addEventListener('transitionend', function (e) {
        element.removeEventListener('transitionend', arguments.callee);
        element.style.height = null;
      });
    }
  }

  accordion('.accordion');
});


