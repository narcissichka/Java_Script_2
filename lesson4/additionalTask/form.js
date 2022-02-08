const number = /^\+7\([\d]{3}\)[\d]{3}-[\d]{4}$/;
const mail = /^[\w-.]+@[\w-.]+\.[a-z]{2,4}$/;
const name_ = /^[a-zа-яё]+$/i;
let valid = false;
let form = document.querySelector('#form');

window.onload = () => {
    form.addEventListener('submit', e => {
        for (let input of form.children) {
            check(input);
        }
        if (!valid) {
            e.preventDefault();
        }
    });
}
function check(element) {
    switch (element.id) {
        case 'name':
            if (!name_.test(element.value)) {
                element.classList.add('wrong');
                if (!document.querySelector('.error-name'))
                    element.insertAdjacentHTML('afterend', '<p class="error-text error-name">Wrong name input</p>');
                watchField(element, name_, 'error-name', 'name');
            }
            break;
        case 'phone':
            if (!number.test(element.value)) {
                element.classList.add('wrong');
                if (!document.querySelector('.error-phone'))
                    element.insertAdjacentHTML('afterend', '<p class="error-text error-phone">Wrong phone input</p>');
                watchField(element, number, 'error-phone', 'phone');
            }
            break;
        case 'email':
            if (!mail.test(element.value)) {
                element.classList.add('wrong');
                if (!document.querySelector('.error-email'))
                    element.insertAdjacentHTML('afterend', '<p class="error-text error-email">Wrong email input</p>');
                watchField(element, mail, 'error-email', 'email');
            }
            break;
        default:
            break;
    }
    if (![...form.querySelectorAll('.wrong')].length) {
        valid = true;
    }

}

function watchField(field, pattern, errorClass, fieldName) {
    field.addEventListener('input', () => {
        let error = field.parentNode.querySelector(`.${errorClass}`);
        if (pattern.test(field.value)) {
            field.classList.remove('wrong');
            if (error) {
                error.remove();
            }
        } else {
            field.classList.add('wrong');
            if (!error) {
                field.insertAdjacentHTML('afterend', `<p class="error-text ${errorClass}">Wrong ${fieldName} input</p>`);
            }
        }
    })
}