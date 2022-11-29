import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => { // Передача в функцию через аргумент первоначальные значения формы (выбран профиль, материал). Данные переданы в main.js
    const windowForm = document.querySelectorAll('.balcon_icons_img'), // Получаем элементы со страницы
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');
        //   btns = document.querySelectorAll('[data-btn]');

    checkNumInputs('#width'); // Устанавливаем проверку вводимых символов в поле ширины
    checkNumInputs('#height'); // и высоты

    function bindActionToElems (elem, event, prop) { // Создаём функцию, которая будет собирать информацию о вводимых значениях и выбранных типах данных (тип и материал окна)
        elem.forEach((item, i) => { // Перебираем все элементы функции
            item.addEventListener(event, () => { // Для каждого события навешиваем обработчик события, event (тип события) передаётся аргументом функции
                switch(item.nodeName) { // Проверяем тип поля, в которое пользователь вводит информацию
                    case 'SPAN': // Если поле SPAN
                        state[prop] = i; // Изменяем его значение на то, что вводит пользователь и записываем его в отдельную переменную
                        break;
                    case 'INPUT': // Если поле инпут
                        if (document.querySelector('#width').value && document.querySelector('#height').value) { // Проверяем есть ли в ширине и высоте значения - кнопка активна
                            document.querySelector('.popup_calc_button').disabled = false;

                            if (!i) {
                                document.querySelector('.popup_calc_profile_button').disabled = true; // если пользователь не выбрал профиль - кнопка блокирована
                            }
                        }
                        if (item.getAttribute('type') === 'checkbox') { // Если поле выбора типа (чекбокс)
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Тёплое'; // В зависимости от выбора запомнить один из элементов
                            if (state[prop] == 'Холодное' || state[prop] == 'Тёплое') {
                                document.querySelector('.popup_calc_profile_button').disabled = false; // если пользователь выбрал профиль - кнопка активна
                            }
                            elem.forEach((box, j) => { // Перебираем все чекбоксы
                                box.checked = false; // Устанавливаем отображение галочки при первой инициализации (не выбрана ни одна)
                                if (i == j) { // Если выбран один из чекбоксов 
                                    box.checked = true; // Установить ему отображение галочки
                                }
                            });
                        } else {
                            state[prop] = item.value; // Запомнить выбранные значения
                        }
                        break;
                    case 'SELECT': // Если поле селект
                        state[prop] = item.value; // Запомнить выбранное значение
                        break;
                }
                // btns.forEach(btn => {
                //     if (windowWidth.value === '' && windowHeight) {
                //         btn.setAttribute('disabled');
                //     } else {
                //         btn.removeAttribute('disabled');
                //     }
                // });

                console.log(state); // Показать в консоль итоговый резульат работы функции
            });
        });
    };

    bindActionToElems(windowForm, 'click', 'Форма');
    bindActionToElems(windowHeight, 'input', 'Высота');
    bindActionToElems(windowWidth, 'input', 'Ширина');
    bindActionToElems(windowType, 'change', 'Тип');
    bindActionToElems(windowProfile, 'change', 'Профиль');
};

export default changeModalState;