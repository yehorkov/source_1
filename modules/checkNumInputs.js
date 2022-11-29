const checkNumInputs = (selector) => { // Функция проверки ввода символов
    const numInputs = document.querySelectorAll(selector); // Получаем элемент со страницы

    numInputs.forEach(item => { // Перебираем все инпуты
        item.addEventListener('input', () => { // На каждое поле ввода навешиваем обработчик события
            item.value = item.value.replace(/\D/, ''); // Если пользователь вводит не числа - заменяем эти символы на пустоту (ничего не вводится в поле)
        });
    });
};

export default checkNumInputs;