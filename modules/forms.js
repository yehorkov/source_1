import checkNumInputs from "./checkNumInputs";

const forms = (state) => { // Передача в функцию через аргумент первоначальные значения формы (выбран профиль, материал). Данные переданы в main.js
    const form = document.querySelectorAll('form'), // Получаем элементы со страницы
          inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]'); // Используем форму ввода только чисел в определённой форме (номер телефона)
          
    const message = { // Переменная с сообщениями для статуса формы (загрузка, отправлено, ошибка отправки формы)
        loading: 'Загрузка',
        succes: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => { // Функция отправки формы на сервер
        document.querySelector('.status').textContent = message.loading; // Устанавливаем первичный статус отправки сообщения (загрука) после нажатия кнопки отправить форму
        let res = await fetch(url, { //  Создаём переменную со способом отправки формы (fetch),
            method: 'POST', // устанавливаем метод отправки
            body: data // выбираем, что будет отправлено на сервер
        });

        return await res.text(); // Функция возвращает результат отправки в виде текста
    };

    const clearInputs = () => { // Функция очистки формы после её отправки
        inputs.forEach(item => { // Перебираем все поля ввода
            item.value = ''; // Устанавливаем им значение пустой строки
        });
    };

    form.forEach(item => { // Перебираем все формы
        item.addEventListener('submit', (e) => { // На каждую форму навешиваем обработчик события submit
            e.preventDefault(); // Отменяем стандартное поведения браузера, используется, чтобы после отправки формы страница не перезагружалась

            let statusMessage = document.createElement('div'); // Создаём элемент на страницу
            statusMessage.classList.add('status'); // Добавляем этому элементу необходимый класс для оспользования сообщения о статусе отправки
            item.appendChild(statusMessage); // Добавляем элемент на страницу

            const formData = new FormData(item); // Собираем данные, которые есть в форме
            if (item.getAttribute('data-calc') === 'end') { // Проверяем дошел ли пользователь до последнего окна модального окна калькулятора
                for (let key in state) { // Для каждого значения формы
                    formData.append(key, state[key]); // Добавляем в данные отправки информацию в виде объекта (ключ: значение). Например, 'Тип': 'tree'
                }
            }

            postData('assets/server.php', formData) // Используем функцию отправки на сервер. Первый аргумент - сервер, куда происходит отправка, второй - данные для отправки
                .then(res => { // Возвращаем результат отправки
                    console.log(res); // выводим его в консоль
                    statusMessage.textContent = message.succes; // Устанавливаем сообщение об успешной отправке пользователя
                    document.querySelectorAll('.checkbox').forEach(item => { // После отправки формы убираются галочки
                        item.checked = false; // Убираем все галочки с выбранных чекбоксов
                    })
                })
                .catch(() => { // Обрабатываем ошибку при отправке
                    statusMessage.textContent = message.failure; // Устанавливаем сообщение об ошибке при отправке формы
                })
                .finally(() => { // После отправки формы (положительный или отрицательный результат)
                    clearInputs(); // Очищаем форму
                    setTimeout(() => {
                        statusMessage.remove(); // Убираем сообщение о статусе отправки через 5 секунд
                    }, 5000);
                });
        });
    });
}

export default forms;