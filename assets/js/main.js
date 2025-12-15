document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e)=>{
        if(!e.target.closest('.dropdown')){
            document.querySelectorAll('.dropdown').forEach(dropdown=>{
                dropdown.classList.remove('active');
            })
        }
    })
    tail.select('select#city-select', {
        strings: {
            all: "Все",
            none: "Ничего",
            placeholder: "Выберите город...",
            search: "Напишите для поиска...",
        }
    });
    tail.select('select#theme-select', {
        strings: {
            all: "Все",
            none: "Ничего",
            placeholder: "Тема отзыва",
            search: "Напишите для поиска...",
        }
    });
    if(isExist('.hits-swiper')){
        const hitsSwiper = new Swiper('.hits-swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                991: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
            },

            // Navigation arrows
            navigation: {
                nextEl: '.hits-button-prev',
                prevEl: '.hits-button-next',
            },
        })
    }
    if(isExist('.additional-products-swiper')){
        const additionalProductsSwiper = new Swiper('.additional-products-swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                991: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
                1400: {
                    slidesPerView: 4,
                }
            },

            // Navigation arrows
            navigation: {
                nextEl: '.additional-products-button-prev',
                prevEl: '.additional-products-button-next',
            },
        })
    }
    if(isExist('.blog-swiper')){
        const blogSwiper = new Swiper('.blog-swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                991: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
                1400: {
                    slidesPerView: 4,
                }
            },

            // Navigation arrows
            navigation: {
                nextEl: '.blog-button-prev',
                prevEl: '.blog-button-next',
            },
        })
    }
    if(isExist('.slider__container')){
        let sliders = document.querySelectorAll('.slider__container');
        sliders.forEach(slider => {
            let slider_container = slider;
            slider_container.id = `slider${Math.floor(Math.random() * (0 - 999999)) + 0}`;

            let nextButton = slider.querySelector('.slider__controls .slider-button-next');
            let prevButton = slider.querySelector('.slider__controls .slider-button-prev');

            if(nextButton) nextButton.id = `next-${slider_container.id}`;
            if(prevButton) prevButton.id = `prev-${slider_container.id}`;
            if(slider.classList.contains('two-per-view')){
                sliderPerView = 1;
                breakpointsList = {
                    1200: {
                        slidesPerView: 2,
                    }
                }
            }else{
                sliderPerView = 1;
                breakpointsList = {
                    425: {
                        sliderPerView: 2,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 5,
                    },
                    1400: {
                        slidesPerView: 7,
                    }
                }
            }

            new Swiper(slider, {
                // Optional parameters
                direction: 'horizontal',
                loop: true,
                slidesPerView: sliderPerView,
                breakpoints: breakpointsList,
                spaceBetween: 20,

                // Navigation arrows
                navigation: {
                    nextEl: nextButton,
                    prevEl: prevButton,
                },
            })
        });

    }
    if(isExist('.polymap__map')){
        let allPoints = document.querySelectorAll('.map-point');

        // Функция активации точки
        function activatePoint(pointId){
            let caption = null;
            switch(pointId){
                case 'perm-point':
                    caption = 'Пермь';
                break;
                case 'city1-point':
                    caption = 'Город 1';
                break;
                case 'city2-point':
                    caption = 'Город 2';
                break;
            }

            if(!caption) return;

            allPoints.forEach(point=>{
                point.classList.remove('active');
                let existingCaption = point.querySelector('.point-caption');
                if(existingCaption){
                    existingCaption.closest('foreignObject').remove();
                }
            })

            let activePoint = document.getElementById(pointId);
            if(!activePoint) return;

            activePoint.classList.add('active');

            // Получаем координаты точки из первого rect
            let firstRect = activePoint.querySelector('rect');
            if(firstRect){
                let rectX = parseFloat(firstRect.getAttribute('x'));
                let rectY = parseFloat(firstRect.getAttribute('y'));
                let rectWidth = parseFloat(firstRect.getAttribute('width'));
                let rectHeight = parseFloat(firstRect.getAttribute('height'));

                // Центр точки
                let centerX = rectX + rectWidth / 2;
                let centerY = rectY + rectHeight / 2;

                // Размеры подписи (можно настроить)
                let captionWidth = 100;
                let captionHeight = 25;

                // Позиционируем foreignObject выше точки, центрируя по горизонтали
                let foreignX = centerX - captionWidth / 2;
                let foreignY = centerY - rectHeight - captionHeight + 5; // 5px отступ сверху

                let node = `<foreignObject class="point-caption__container" x="${foreignX}" y="${foreignY}" width="${captionWidth}" height="${captionHeight}"><div class="point-caption" xmlns="http://www.w3.org/1999/xhtml">${caption}</div></foreignObject>`;
                activePoint.insertAdjacentHTML('afterbegin', node);
            }
        }

        // Активируем perm-point при загрузке
        activatePoint('perm-point');

        // Обработчик клика
        document.addEventListener('click', (e) => {
            if(e.target.closest('.map-point')){
                let pointId = e.target.closest('.map-point').id;
                activatePoint(pointId);
            }
        })
    }
    if(isExist('.lazyvideo')){
        let videos = document.querySelectorAll('.lazyvideo');
        videos.forEach(video => {
            video.addEventListener('click', (e)=>{
                if(video.querySelector('.video__placeholder')){
                    let videoSrc = e.target.closest('.lazyvideo').dataset.videoSrc;
                    video.querySelector('.video__placeholder').remove();
                    video.insertAdjacentHTML('afterbegin', `<video src="${videoSrc}" autoplay playsinline controls></video>`);
                }
            })
        });
    }
    if(isExist('.tabs')){
        let tabs_modules = document.querySelectorAll('.tabs');
        tabs_modules.forEach(module => {

            let module_controls_container = module.querySelector('.tabs__controls');
            let module_controls_items = module_controls_container.querySelectorAll('.tabs__control');
            let module_tabs_container = module.querySelector('.tabs__tabs');
            let module_tabs = module_tabs_container.querySelectorAll('.tabs__tab');

            module_controls_items[0].classList.add('active');
            module_tabs[0].classList.add('active');

            module_controls_items.forEach(item=>{
                item.addEventListener('click', (e)=>{
                    let tabId = e.target.closest('.tabs__control').dataset.tabId;
                    module_controls_items.forEach(item => {
                        item.classList.remove('active');
                    })
                    module_controls_container.querySelector(`[data-tab-id="${tabId}"]`).classList.add('active');
                    module_tabs.forEach(tab => {
                        tab.classList.remove('active');
                    });
                    module_tabs_container.querySelector(`[data-tab-id="${tabId}"]`).classList.add('active');
                })
            })
        });
    }
    // Кнопка "Наверх"
    if(isExist('#scrollToTop')){
        const scrollToTopBtn = document.getElementById('scrollToTop');

        // Показываем/скрываем кнопку при прокрутке
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Плавная прокрутка вверх при клике
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    if(isExist('.dropdown')){
        let dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click',(e)=>{
                let isActive = e.target.closest('.dropdown').classList.contains('active');
                dropdowns.forEach(item=>{
                    item.classList.remove('active');
                })
                if(!isActive){
                    e.target.closest('.dropdown').classList.add('active');
                }
            })
        });
    }
    // Добавляем класс sticked к хедеру при прокрутке
    if(isExist('.header')){
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 0) {
                header.classList.add('sticked');
            } else {
                header.classList.remove('sticked');
            }
        });

        // Проверяем начальную позицию (на случай если страница уже прокручена)
        if (window.pageYOffset > 0) {
            header.classList.add('sticked');
        }
    }
    if(isExist('.menu__search-trigger')){
        let trigger = document.querySelector('.menu__search-trigger');
        trigger.addEventListener('click', (e)=>{
            let state = e.target.closest('.menu__search-trigger').classList.contains('active')?true:false;
            if(!state){
                e.target.closest('.menu__part-right').querySelector('.search-module').classList.add('active');
                e.target.closest('.menu__search-trigger').classList.add('active');
                document.querySelector('body').classList.add('locked-search');
            }else{
                e.target.closest('.menu__part-right').querySelector('.search-module').classList.remove('active');
                e.target.closest('.menu__search-trigger').classList.remove('active');
                document.querySelector('body').classList.remove('locked-search');
            }
        })
    }
    if(isExist('.menu__mobile-menu')){
        let trigger = document.querySelector('.menu__menu-trigger');
        trigger.addEventListener('click', (e)=>{
            let state = e.target.closest('.menu__menu-trigger').classList.contains('active')?true:false;
            if(!state){
                e.target.closest('.menu__container').querySelector('.menu__mobile-menu').classList.add('active');
                e.target.closest('.menu__menu-trigger').classList.add('active');
                document.querySelector('body').classList.add('locked-menu');
            }else{
                e.target.closest('.menu__container').querySelector('.menu__mobile-menu').classList.remove('active');
                e.target.closest('.menu__menu-trigger').classList.remove('active');
                document.querySelector('body').classList.remove('locked-menu');
            }
        })
    }
    if(isExist('[data-fancybox-trigger]')){
        let fTriggers = document.querySelectorAll('[data-fancybox-trigger]');
        fTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e)=>{
                e.preventDefault();
                Fancybox.show([{src: `${trigger.href}`, type: "inline"}]);
            })
        });
    }
    if(isExist('.interactive-image__map')){
        let points = document.querySelectorAll('.interactive-image__map .point');
        points.forEach(point => {
            point.addEventListener('click', (e)=>{
                points.forEach(point_to_disable => {
                    point_to_disable.classList.remove('active');
                });
                point.classList.add('active');
            })
        });
    }
    if(isExist('.faq-list')){
        let faqLists = document.querySelectorAll('.faq-list');
        if(isExist('.faq-list__item')){
            faqLists.forEach(list => {
                let faqListItems = list.querySelectorAll('.faq-list__item');
                faqListItems.forEach(item => {
                    let answer = item.querySelector('.answer');
                    // Вычисляем реальную высоту ответа
                    answer.style.maxHeight = 'none';
                    let realHeight = answer.scrollHeight;
                    answer.style.maxHeight = '0px';

                    // Если элемент уже активен при загрузке, устанавливаем высоту
                    if(item.classList.contains('active')){
                        answer.style.maxHeight = realHeight + 'px';
                    }

                    item.querySelector('.question').addEventListener('click', (e)=>{
                        let clickedItem = e.target.closest('.faq-list__item');
                        let clickedAnswer = clickedItem.querySelector('.answer');
                        let isActive = clickedItem.classList.contains('active');

                        faqListItems.forEach(currentListItem=>{
                            let currentAnswer = currentListItem.querySelector('.answer');
                            currentListItem.classList.remove('active');
                            currentAnswer.style.maxHeight = '0px';
                        })

                        if(!isActive){
                            clickedItem.classList.add('active');
                            // Вычисляем высоту для кликнутого элемента
                            clickedAnswer.style.maxHeight = 'none';
                            let clickedRealHeight = clickedAnswer.scrollHeight;
                            clickedAnswer.style.maxHeight = '0px';
                            setTimeout(() => {
                                clickedAnswer.style.maxHeight = clickedRealHeight + 'px';
                            }, 10);
                        }
                    })
                });
            });
        }
    }
    if(isExist('.catalog-controls-swiper')){
        let allCatalogControls = document.querySelectorAll('.catalog-controls-swiper');
        allCatalogControls.forEach(controls => {
            new Swiper(controls, {
                // Optional parameters
                direction: 'horizontal',
                loop: true,
                slidesPerView: 1.25,
                spaceBetween: 20,
                breakpoints: {
                    991: {
                        slidesPerView: 3.5,
                    },
                    1200: {
                        slidesPerView: 3.5,
                    },
                    1600: {
                        slidesPerView: 5,
                    }
                },
            })
        });
    }
    if(isExist('.history__slider')){
        let slider = document.querySelector('.history__slider');
        let nextButton = slider.closest('.history__container').querySelector('.history__controls .swiper-button-next');
        let prevButton = slider.closest('.history__container').querySelector('.history__controls .swiper-button-prev');
        const historySlider = new Swiper(slider, {
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints:{
                425: {
                    sliderPerView: 1,
                },
                991: {
                    slidesPerView: 1,
                },
                1200: {
                    slidesPerView: 'auto',
                },
            },

            // Navigation arrows
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
        })
    }
    Fancybox.bind("[data-fancybox]", {
        // Your custom options
      });
})