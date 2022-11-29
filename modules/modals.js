const modals = () => {
    function bindModal (triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) { // Передача в функцию через аргументы необходимые кнопки и селекторы для вызова определённых модальных окон, closeClickOverlay отвечает за закрытие модального окна при клике на подложку 
        const trigger = document.querySelectorAll(triggerSelector), // Получение необходимых элементов со страницы
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll(); // Переменная с функцией подсчёта пикселей для полосы прокрутки, которая исчезает при открытии модального окна. Чтобы страница не "прыгала".

        trigger.forEach(item =>{ // Перебираем все кнопки    
            item.addEventListener('click', (e) => { // и навешиваем на них обработчик события. e - объект события
                if (e.target) { // Ловим событие на определённой кнопке, если оно произошло, то
                    e.preventDefault(); // мы отменяем стандартное поведение браузера
                }

                if (document.querySelector('#width').value && document.querySelector('#height').value) { // если ширина и высота уже введены,
                    document.querySelector('.popup_calc_button').disabled = false; // то кнопка активна
                } else {
                    document.querySelector('.popup_calc_button').disabled = true; // иначе заблокирована
                }

                windows.forEach(item => { // Для каждого модального окна
                    item.style.display = 'none'; // устанавливаем, чтобы оно не отображалось при открытии сайта
                });
    
                modal.style.display = 'block'; // иначе при клике на кнопку отображаем окно
                document.body.style.overflow = 'hidden'; // Скрываем полосу прокрутки и убирается возможность листать сайт дальше, если модальное окно открыто
                document.body.style.marginRight = `${scroll}px`; // устанавливаем отступ справа на кол-во scroll пикселей (полоса прокрутки)
                // document.body.classList.add('modal-open');
            });
        });

        close.addEventListener('click', () => { // Навешиваем обработчик события на все кнопки закрывающие модальное окно
            windows.forEach(item => { // Если кнопка закрытия была нажата устанавливаем стиль отображения всех модальных окон (закрываем их)
                item.style.display = 'none'; 
            });

            modal.style.display = 'none'; // Если кнопка закрытия была нажата устанавливаем стиль отображения модального окна (закрываем его)
            document.body.style.overflow = ''; // и снова отображаем полосу прокрутки
            document.body.style.marginRight = `0px`; // убираем отступ справа
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => { // Навешиваем обработчик события на открытое модальное окно
            if (e.target === modal && closeClickOverlay) { // Если событие отработало на модальном окне (true) и аргумент closeClickOverlay у данного окна выставлен в позицию true
                windows.forEach(item => {
                    item.style.display = 'none'; // Закрываем все модальные окна при клике на подложку
                });

                modal.style.display = 'none'; // Закрываем все модальные окна при клике на подложку
                document.body.style.overflow = ''; // и снова отображаем полосу прокрутки
                document.body.style.marginRight = `0px`; // убираем отступ справа
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) { // Функция отображения модального окна через определённый промежуток времени
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block'; // Для определённого окна (selector) установить стиль отображения
            document.body.style.overflow = 'hidden'; // Скрываем полосу прокрутки и убирается возможность листать сайт дальше, если модальное окно открыто
        }, time); // time - время, через которое будет открыто модальное окно. Передаётся как аргумент функции (в миллисекундах)
    }

    function calcScroll() { // Функция подсчёта ширины полосы прокрутки
        let div = document.createElement('div'); // Вместо полосы прокрутки создём контейнер

        div.style.width = '50px'; // Задаём ему определённую высоту и ширину
        div.style.height = '50px';
        div.style.overflowY = 'scroll'; // Размещаем блок в области полоы прокрутки
        div.style.visibility = 'hidden'; // Устанавливаем ему отображение в "скрыто"

        document.body.appendChild(div); // Добавляем элемент на странциу
        let scrollWidth = div.offsetWidth - div.clientWidth; // Вычисляем ширину полосы прокрутки у пользователя. offsetWidth - полная ширина блока. clientWidth - ширина элемена внутри границ (включает ширину содержимого и padding, но не включает border и прокрутку)
        div.remove(); // Удаляем элемент со страницы после полученных значений

        return scrollWidth; // Возвращаем полученное значение
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false);
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000);
};

export default modals;