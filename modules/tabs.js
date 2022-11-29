const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => { // Передача в функцию через аргументы необходимые кнопки и селекторы для вызова определённых табов, устанавливаем по умолчанию CSS свойство display
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

    function hideTabContent() { // Функция скрытия табов
        content.forEach(item => { // Перебираем весь контент
            item.style.display = 'none'; // и устанавливаем ему свойство display
        });

        tab.forEach(item => { // Перебираем все табы на странице
            item.classList.remove(activeClass); // и убираем класс активности (разные стили каждого отдельного таба)
        });
    }

    function showTabContent(i = 0) { // Функция отображения табов (по-умолчанию отображается контент первого таба и на него же добавляется класс активности)
        content[i].style.display = display;
        tab[i].classList.add(activeClass);
    }

    hideTabContent(); // Первичная инициализация функции, скрываем весь контент табов на странице и убираем все классы активности
    showTabContent(); // Первичная инициализация функции, отображаем контент первого таба (0-й индекс, установлен по-умолчанию). Можно установить своё значение

    header.addEventListener('click', (e) => { // Определяем блок в который кликнул пользователь
        const target = e.target; // Переменная для сокращения кода, объёкт события (куда кликнул пользователь)
        if (target &&
            (target.classList.contains(tabSelector.replace(/\./, "")) || 
        target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) { // Проверяем, действительно ли пользователь кликнул в определённый таб (при помощи метода replace убираем точку от селектора)
            tab.forEach((item, i) => { // Перебираем все табы на странице
                if (target == item || target.parentNode == item) { // Если пользователь кликнул в таб или его ближайшего родителя (блок, в котором размещено название таба)
                    hideTabContent(); // Скрываем весь контент показанного ранее таба
                    showTabContent(i); // Отображаем контент таба, на который кликнул пользователь
                }
            });
        }
    });
};

export default tabs;