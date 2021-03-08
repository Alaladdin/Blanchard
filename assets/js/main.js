document.addEventListener('DOMContentLoaded', () => {
  const activeToggler = () => document.querySelector('.dropdown__header.active');
  const activeDropdown = () => document.querySelector('.dropdown__list.show');
  const dropdowns = document.querySelectorAll('.dropdown');
  const catalogLangBtn = document.querySelectorAll('.language-picker__btn');

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
      nextEl: '.gallery__btn--next',
      prevEl: '.gallery__btn--prev',
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
      prevEl: '.editions-slider__btn--prev',
      nextEl: '.editions-slider__btn--next',
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
    map.style.width = '1238px';
    map.style.height = '700px';

    container.append(map);

    ymaps.ready(() => {
      const myMap = new ymaps.Map(map.id, {
        center: [55.759253, 37.625019],
        zoom: 15,
        controls: [],
      });

      const myCircle = new ymaps.Circle([[55.758463, 37.601079], 22], {}, {
        fillColor: '#9d5cd0',
        strokeWidth: 0,
      });

      myMap.geoObjects.add(myCircle);
    });
  };

  // Change catalog lang
  catalogLangBtn.forEach((btn) => btn.addEventListener('click', () => {
    const selectedLang = btn.dataset.lang;
    const selectedBtn = document.querySelector('.language-picker__btn.selected');

    selectedBtn.classList.remove('selected');
    btn.classList.add('selected');

    console.log(`Selected catalog lang is '${selectedLang}'`);
  }));

  // Dropdowns
  document.addEventListener('click', (e) => {
    const allowedClasses = ['dropdown', 'dropdown__header', 'dropdown__list'];

    // if clicked inside allowed classes -> do nothing
    if (!allowedClasses.includes(e.target.classList[0])) {
      if (activeToggler()) hideDropdown();
    }
  });

  const hideDropdown = () => {
    if (activeToggler()) activeToggler().classList.remove('active');
    if (activeDropdown()) activeDropdown().classList.remove('show');
  };

  dropdowns.forEach((dropdown) => {
    const toggler = dropdown.querySelector('.dropdown__header');
    const dropdownList = dropdown.querySelector('.dropdown__list');

    toggler.addEventListener('click', function(e) {
      if (this !== activeToggler()) hideDropdown();

      dropdownList.classList.toggle('show');
      toggler.classList.toggle('active');
    });
  });

  const accordionInit = () => {
    const accordionItems = document.querySelectorAll('.accordion__item');

    // accordion items
    accordionItems.forEach((item) => {
      const toggler = item.querySelector('.accordion__btn');
      const accordionOptions = item.querySelectorAll('.accordion__option');

      // item onclick
      toggler.addEventListener('click', () => {
        item.classList.toggle('accordion__item--opened');
      });

      // change option
      accordionOptions.forEach((option) => {
        option.addEventListener('click', () => {
          const selectedClass = 'accordion__option--selected';
          const selectedOption = document.querySelector(`.${selectedClass}`);

          if (selectedOption) selectedOption.classList.remove(selectedClass);
          option.classList.add(selectedClass);
        });
      });
    });
  };

  // gallery dropdown filter
  const galleryFilterInit = () => {
    const filter = document.querySelector('.filter');
    const filterHeader = filter.querySelector('.filter__header');
    const filterBody = filter.querySelector('.filter__body');
    const filterOptions = filterBody.querySelectorAll('.filter__option');

    // toggle filter
    const toggleFilter = () => {
      const isOpened = filterBody.classList.contains('is-opened');

      filterHeader.classList.toggle('is-active');
      filterBody.classList.toggle('is-opened');
      filter.setAttribute('aria-expanded', (!isOpened).toString());
    };

    // change option
    const changeOption = (option) => {
      filter.querySelectorAll('.filter__option.selected').forEach((optionSelected) => {
        optionSelected.removeAttribute('aria-selected');
        optionSelected.classList.remove('selected');
      });

      option.setAttribute('aria-selected', 'true');
      option.classList.add('selected');

      filterHeader.textContent = option.textContent;
    };

    document.querySelectorAll('[role="option"]').forEach(function(button) {
      button.addEventListener('keydown', function(e) {
        if (e.keyCode === 13) button.click();
      });
    });

    // filter header onclick
    filterHeader.addEventListener('click', () => {
      toggleFilter();
    });

    // filter options
    filterOptions.forEach((option) => {
      option.setAttribute('tabindex', '0');
      option.addEventListener('click', () => {
        changeOption(option);
        toggleFilter();
      });
    });
  };

  // Init
  galleryFilterInit();
  accordionInit();
  createMap();
});
