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

  // Editions Slider config
  new Swiper('.editions-slider', {
    preloadImages: true,
    pagination: {
      el: '.editions-slider__fraction',
      type: 'fraction',
    },
    spaceBetween: 50,
    slidesPerView: 3,
    // slidesPerGroup: 3,
    navigation: {
      nextEl: '.editions-slider__btn-next',
      prevEl: '.editions-slider__btn-prev',
    },
  });

  // Change catalog lang
  const catalogLangBtn = document.querySelectorAll('.language-picker__btn');

  catalogLangBtn.forEach((btn) => btn.addEventListener('click', () => {
    const selectedLang = btn.dataset.lang;
    const selectedBtn = document.querySelector('.language-picker__btn.selected');

    selectedBtn.classList.remove('selected');
    btn.classList.add('selected');

    console.log(`Selected catalog lang is '${selectedLang}'`);
  }));

  /**
   * Accordion init function
   * @param {string} el some number
   */
  function accordion(el) {
    if (el.length <= 0) {
      console.error('[Accordion] \'element\' param is empty');
      return;
    }

    const accordionItems = document.querySelectorAll(`${el}__item`);

    accordionItems.forEach((item) => {
      const btn = item.querySelector(`${el}__btn`);
      // const body = item.querySelector(`${el}__body`);

      item.setAttribute('tabindex', '0'); // Чтобы не перехватывал фокус таба

      btn.onclick = () => {
        item.classList.toggle(`${el.slice(1)}__item--opened`);
      };
    });

    /**
     * Collapsing section
     * @param {string} element
     */
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

    /**
     * Collapsing section
     * @param {string} element
     */
    function expandSection(element) {
      const sectionHeight = element.scrollHeight;
      element.style.height = `${sectionHeight}px`;

      element.addEventListener('transitionend', function transitionEnd(e) {
        element.removeEventListener('transitionend', transitionEnd.callee);
        element.style.height = null;
      });
    }
  }

  accordion('.accordion');
});


