const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        filtered: [],
        cart: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        userSearch: "",
        show: false,
        isVisibleCart: false,
        isEmpty: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            let existingItem = this.cart.find((item) => { return item.id_product == product.id_product });
            if (existingItem) {
                this.cart[this.cart.indexOf(existingItem)].quantity++;
            } else {
                this.cart.push(Object.assign({ quantity: 1 }, product));
            }
        },
        removeProduct(product) {
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                this.cart.splice(this.cart.indexOf(product), 1);
            }
        },
        filterGoods() {
            const regExp = new RegExp(this.userSearch, 'i');
            const block = document.querySelectorAll('.product-item');

            this.filtered = this.products.filter(product => regExp.test(product.product_name));
            if (!this.filtered.length) {
                this.isEmpty = true;
            } else {
                this.isEmpty = false;
            }

            this.products.forEach((element, i) => {
                if (!this.filtered.includes(element)) {
                    block[i].classList.add('invisible');
                } else {
                    block[i].classList.remove('invisible');
                }
            });
        },
        productsEmpty() {
            if (!this.products.length) {
                this.isEmpty = true;
            } else {
                this.isEmpty = false;
            }
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data['contents']) {
                    this.cart.push(el);
                }
            });
    }
})
