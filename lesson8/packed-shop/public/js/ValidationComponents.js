Vue.component('form-checkout', {
    data() {
        return {
            patterns: {
                city: /^[a-zа-яё]+$/i,
                state: /^[a-zа-яё]+$/i,
                postcode: /^\d+$/i
            },
            errors: {
                city: 'Название города содержит только буквы',
                state: 'Название штата содержит только буквы',
                postcode: 'Почтовый индекс содержит только цифры'
            },
            errorClass: 'error-msg',
            valid: false,
            form: 'checkout-form'
        }
    },
    methods: {
        validateForm() {
            let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
            for (let error of errors) {
                error.remove();
            }
            let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
            for (let field of formFields) {
                this.validate(field);
            }
            if (![...document.getElementById(this.form).querySelectorAll('.invalid')].length) {
                this.valid = true;
            }
        },
        validate(field) {
            if (this.patterns[field.name]) {
                if (!this.patterns[field.name].test(field.value)) {
                    field.classList.add('invalid');
                    this.addErrorMsg(field);
                    this.watchField(field);
                }
            }
        },
        addErrorMsg(field) {
            let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div> `;
            field.parentNode.insertAdjacentHTML('beforeend', error);
        },
        watchField(field) {
            field.addEventListener('input', () => {
                let error = field.parentNode.querySelector(`.${this.errorClass}`);
                if (this.patterns[field.name].test(field.value)) {
                    field.classList.remove('invalid');
                    if (error) {
                        error.remove();
                    }
                } else {
                    field.classList.add('invalid');
                    if (!error) {
                        this.addErrorMsg(field);
                    }
                }
            });
        }

    },
    mounted() {
        document.getElementById(this.form).addEventListener('submit', e => {
            this.validateForm();
            if (!this.valid) {
                e.preventDefault();
            }
        })
    },
    template: `
    <section class="cart-info">
                        <form id="checkout-form" action="checkout.html">
                            <div class="cart-info__adress">
                                <h3 class="cart-info__adress-header">shipping adress</h3>
                                <input type="text" required name="city" class="input cart-info__input" placeholder="bangladesh">
                                <input type="text" required name="state" class="input input_dark cart-info__input" placeholder="state">
                                <input type="text" required name="postcode" class="input input_dark cart-info__input"
                                    placeholder="postcode / zip">
                                <a href="#" class="button button_cartpage button_quote">GET A QUOTE</a>
                            </div>
                            <checkout></checkout>
                        </form>
    </section>
    `
});


Vue.component('form-registration', {
    data() {
        return {
            patterns: {
                name: /^[a-zа-яё]+$/i,
                phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
                email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i,
                password: /[\w\-\.]{8,}/i
            },
            errors: {
                name: 'Имя содержит только буквы',
                phone: 'Телефон подчиняется шаблону +7(000)000-0000',
                email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru',
                password: '8 or more characters, with at least 1 number and a mixture of uppercase and lowercase letters'
            },
            errorClass: 'error-msg',
            valid: false,
            form: 'registration-form'
        }
    },
    methods: {
        validateForm() {
            let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
            for (let error of errors) {
                error.remove();
            }
            let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];

            for (let field of formFields) {
                this.validate(field);
            }
            if (![...document.getElementById(this.form).querySelectorAll('.invalid')].length) {
                this.valid = true;
            }
        },
        validate(field) {
            if (this.patterns[field.name]) {
                if (!this.patterns[field.name].test(field.value)) {
                    field.classList.add('invalid');
                    this.addErrorMsg(field);
                    this.watchField(field);
                }
            }
        },
        addErrorMsg(field) {
            let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div> `;
            field.insertAdjacentHTML('afterend', error);
        },
        watchField(field) {
            field.addEventListener('input', () => {
                let error = field.parentNode.querySelector(`.${this.errorClass}`);
                if (this.patterns[field.name].test(field.value)) {
                    field.classList.remove('invalid');
                    if (error) {
                        error.remove();
                    }
                } else {
                    field.classList.add('invalid');
                    if (!error) {
                        this.addErrorMsg(field);
                    }
                }
            });
        }

    },
    mounted() {
        document.getElementById(this.form).addEventListener('submit', e => {
            this.validateForm();
            if (!this.valid) {
                e.preventDefault();
            }
        })
    },
    template: `
    <form id="registration-form" action="#" class="registration-form">
        <h4 class="registration-heading">your name</h4>
        <input type="text" required name="name" class="input registration__input" placeholder="first name">
        <input type="text" required name="name" class="input registration__input" placeholder="last name">
         <input type="radio" required name="sex" value="male" id="radio-male"
                                class="custom-radio registration-radio">
            <label for="radio-male">male</label>
        <input type="radio" required name="sex" value="female" id="radio-female"
                                class="custom-radio registration-radio">
            <label for="radio-female">female</label>
        <input type="radio" required name="sex" value="other" id="radio-other"
                                class="custom-radio registration-radio">
            <label for="radio-other">other</label>
        <h4 class="registration-heading">login details</h4>
        <input type="email" required name="email" class="input registration__input" placeholder="email">
        <input type="password" name="password" required class="input registration__input" placeholder="password">
        <p class="registration-passwordParametersText">Please use 8 or more characters, with at
        least 1 number and a mixture of uppercase and lowercase letters</p>
        <button type="submit" class="button registration__button button_join">join now <img
                                    class="registration-button__img" src="image/arrow-join.svg" alt="join now"></button>
                        </form>
    `
});