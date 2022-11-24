import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');
        //   btns = document.querySelectorAll('[data-btn]');

    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElems (elem, event, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if (document.querySelector('#width').value && document.querySelector('#height').value) { // если в ширине и высоте есть значение - кнопка активна
                            document.querySelector('.popup_calc_button').disabled = false;

                            if (!i) {
                                document.querySelector('.popup_calc_profile_button').disabled = true; // если пользователь не выбрал профиль - кнопка блокирована
                            }
                        }
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Тёплое';
                            if (state[prop] == 'Холодное' || state[prop] == 'Тёплое') {
                                document.querySelector('.popup_calc_profile_button').disabled = false; // если пользователь выбрал профиль - кнопка активна
                            }
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }
                // btns.forEach(btn => {
                //     if (windowWidth.value === '' && windowHeight) {
                //         btn.setAttribute('disabled');
                //     } else {
                //         btn.removeAttribute('disabled');
                //     }
                // });

                console.log(state);
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