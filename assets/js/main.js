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
    navigation: {
      prevEl: '.editions-slider__btn-prev',
      nextEl: '.editions-slider__btn-next',
    },
  });

  // Partners slider
  new Swiper('.projects-partners__slider-container', {
    spaceBetween: 50,
    slidesPerView: 3,
    pagination: false,
    loop: true,
    navigation: {
      prevEl: '.projects-partners__btn--prev',
      nextEl: '.projects-partners__btn--next',
    },
  });

  // Map

  const createMap = () => {
    const container = document.querySelector('.contact__map');
    const map = document.createElement('div');

    map.id = 'map';
    map.style.width = '1230px';
    map.style.height = '700px';

    container.append(map);

    ymaps.ready(() => {
      const myMap = new ymaps.Map(map.id, {
        center: [55.759253, 37.625019],
        zoom: 15,
        controls: [],
      });

      // Добавляем круг на карту.
      const myCircle = new ymaps.Circle([[55.758463, 37.601079], 22], {}, {
        fillColor: '#9d5cd0',
        strokeWidth: 0,
      });

      myMap.geoObjects.add(myCircle);
    });
  };

  createMap();

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


