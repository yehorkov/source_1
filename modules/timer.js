const timer = (id, deadLine) => { // Передача в функцию таймера с аргументами самого таймера и его deadline'ом
    const addZero = (num) => { // Функция добавления 0 перед числом
        if (num <= 9) { // Если число меньше или равно 9
            return '0' + num; // Вернуть модифицированное значение
        } else { // Иначе
            return num; // Вернуть только значение
        }
    };

    const getTimeRemaining = (endTime) => { // Функция получения времени до deadline и показывает время до конца акции
        const time = Date.parse(endTime) - Date.parse(new Date()), // Получаем разницу между deadline и текущим временем
              seconds = Math.floor((time/1000) % 60), // Получаем секудны
              minutes = Math.floor((time/1000/60) % 60), // Получаем минуты
              hours = Math.floor((time/(1000 * 60 * 60)) % 24), // Получаем часы
              days = Math.floor((time/(1000 * 60 * 60 * 24))); // Получаем дни

        return { // Возвращаем
            'total': time, // Общее время
            'days': days, // Общее кол-во дней
            'hours': hours, // часов
            'minutes': minutes, // минут
            'seconds': seconds // секунд
        };
    };

    const setClock = (selector, endTime) => { // Функция инициализации таймера
        const timer = document.querySelector(selector), // Получаем элементы со страницы
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); // Устанавливаем интервал обновления таймера

              updateClock(); // Первичный вызов функции обновления таймера (чтобы при загрузке сайта таймер начинал работу сразу)

        function updateClock() { // Функция работы таймера
            const time = getTimeRemaining(endTime); // Запускаем таймер с deadlineом

            days.textContent = addZero(time.days); // Добавляем на страницу кол-во оставшихся дней
            hours.textContent = addZero(time.hours); // Добавляем на страницу кол-во оставшихся часов
            minutes.textContent = addZero(time.minutes); // Добавляем на страницу кол-во оставшихся минут
            seconds.textContent = addZero(time.seconds); // Добавляем на страницу кол-во оставшихся секунд

            if (time.total <= 0) { // Если общее время меньше или рано 0
                days.textContent = '00'; // Устанавливаем все значения в 00
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

                clearInterval(timeInterval); // Обнуляем интервал работы функции
            }
        }
    };
    
    setClock(id, deadLine); // Запускам таймер
};

export default timer;