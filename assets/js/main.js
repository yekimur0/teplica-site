document.addEventListener('DOMContentLoaded', () => {
    tail.select('select#city-select', {
        strings: {
            all: "Все",
            none: "Ничего",
            placeholder: "Выберите город...",
            search: "Напишите для поиска...",
        }
    });
    if(isExist('.hits-swiper')){
        const hitsSwiper = new Swiper('.hits-swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            slidesPerView: 3,
            loop: true,
            spaceBetween: 20,

            // Navigation arrows
            navigation: {
                nextEl: '.hits-button-prev',
                prevEl: '.hits-button-next',
            },
        })
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
})