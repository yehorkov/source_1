const images = () => { // Создание функции увеличения изображений по клику
    const imgPopup = document.createElement('div'), // Получаем элементы со страницы
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img'); // Создаём элемент увеличенно картинки

    imgPopup.classList.add('popup'); // Для картинки добавляем необходимый класс
    workSection.appendChild(imgPopup); // Добавляем элемент на страницу

    imgPopup.style.justifyContent = 'center'; // Изменяем стили картинки
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImage); // Добавляем увеличенное изображение на страницу

    workSection.addEventListener('click', (e) => { // На все картинки работ навешиваем обработчик события с объектом события
        e.preventDefault(); // Отменяем стандартное поведения браузера

        let target = e.target;

        if (target && target.classList.contains('preview')) { // Если объект события и объект события содержит в классе preview
            imgPopup.style.display = 'flex'; // Установить стиль размещения элемента
            const path = target.parentNode.getAttribute('href'); // Указываем именно ту картинку, на которую кликнул пользователь
            bigImage.setAttribute('src', path); // Устанавливаем необходимые атрибуты для большого изображения
        }

        if (target && target.matches('div.popup')) { // Если объект события и объект события содержит div.popup (подложка), и пользователь кникнул на него
            imgPopup.style.display = 'none'; // Закрыть модальное окно с увеличенным изображением
        }
    });
};

export default images;