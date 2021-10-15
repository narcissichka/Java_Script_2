const number = /^\+7\([\d]{3}\)[\d]{3}-[\d]{4}$/;
const mail = /^[\w-\.]+@[\w-\.]+\.[a-z]{2,4}$/;
const name_ = /[a-zа-яё]/i;
let form = document.querySelector('#form');

form.addEventListener('submit', e => {
    e.preventDefault();
    for (let input of form.children) {
        check(input);
    }
}, true);
function check(element) {
    switch (element.id) {
        case 'name':
            if (!name_.test(element.value)) {
                element.classList.add('wrong');
                if (!document.querySelector('.error-name'))
                    element.parentElement.insertAdjacentHTML('afterend', '<p class="error-text error-name">Wrong name input</p>');
            } else {
                element.classList.remove('wrong');
                if (document.querySelector('.error-name'))
                    document.body.removeChild(document.querySelector('.error-name'));
            }
            break;
        case 'phone':
            if (!number.test(element.value)) {
                element.classList.add('wrong');
                if (!document.querySelector('.error-phone'))
                    element.parentElement.insertAdjacentHTML('afterend', '<p class="error-text error-phone">Wrong phone input</p>');
            } else {
                element.classList.remove('wrong');
                if (document.querySelector('.error-phone'))
                    document.body.removeChild(document.querySelector('.error-phone'));
            }
            break;
        case 'email':
            if (!mail.test(element.value)) {
                element.classList.add('wrong');
                if (!document.querySelector('.error-email'))
                    element.parentElement.insertAdjacentHTML('afterend', '<p class="error-text error-email">Wrong email input</p>');
            } else {
                element.classList.remove('wrong');
                if (document.querySelector('.error-email'))
                    document.body.removeChild(document.querySelector('.error-email'));
            }
            break;
        default:
            break;
    }

}