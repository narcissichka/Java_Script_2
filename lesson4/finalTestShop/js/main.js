const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
    constructor(url, container, list = list2) {
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.filtered = [];
        this._init();
    }
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    handleData(data) {
        this.goods = [...data];
        this.render();
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let i in this.goods) {
            const productObj = new this.list[this.constructor.name](this.goods[i], i);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    filt(value) {
        const regexp = new RegExp(value, 'i');

        this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            // console.log(this.filtered.includes(el));
            
            if (!this.filtered.includes(el)) {
                block.classList.add('hide');
            } else {
                block.classList.remove('hide');
            }
        });
    }
    _init() {
        return false
    }
}
class Item {
    constructor(el, i = 0) {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.images = ['images/product1.png', 'images/product2.png', 'images/product3.png', 'images/product4.png'];
        this.img = this.images[i];
    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
            </div>`
    }
}

class ProductList extends List {
    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                let el = this.goods.find((element) => { return element.product_name == e.target.parentElement.children[1].innerText; });
                this.cart.addItem(el);
            }
        });
        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.filt(document.querySelector('.search-field').value)
        })
    }
    // getSum() {
    //     this.#getProducts()
    //         .then(data => {
    //             for (let item of data) {
    //                 this.sum += item.price;
    //             }
    //             console.log(this.sum);
    //         });
    // }
}

class ProductItem extends Item { }

class Cart extends List {
    constructor(container = '.cart-block', url = "/getBasket.json") {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
        this.sum = 0;
    }
    addItem(item) {
        let existingItem, idx;
        existingItem = this.goods.find((it, i) => { idx = i; return it.product_name == item.product_name });

        const block = document.querySelector(this.container);
        block.innerHTML = '';

        if (existingItem != undefined) {
            this.goods[idx].quantity++;
        } else {
            item.quantity = 1;
            this.goods.push(item);
        }
        this.render();
    }
    removeItem(item) {
        const block = document.querySelector(this.container);
        block.innerHTML = '';
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            this.goods.splice(this.goods.indexOf(item), 1);
        }
        this.render();
    }
    render() {
        this.sum = 0;
        const block = document.querySelector(this.container);
        for (let i in this.goods) {
            const cartItem = new CartItem(this.goods[i], i);
            this.sum += this.goods[i].price * this.goods[i].quantity;
            block.insertAdjacentHTML("beforeend", cartItem.render());
        }
        block.insertAdjacentHTML("beforeend", '<p class="price">Total price: ' + this.sum + '$</p>');
    }
    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('hide');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('remove-btn')) {
                let el = this.goods.find((element) => { return element.product_name == e.target.parentElement.children[1].innerText; });
                this.removeItem(el);
            }
        })
    }
}
class CartItem extends Item {
    constructor(el, i) {
        super(el, i);
        this.quantity = el.quantity;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
        <img class="cart-img" src="${this.img}" alt="Some image">
        <h3>${this.product_name}</h3>
        <p>${this.price}$</p>
        <p>${this.quantity} шт</p>
        
            <p style="text-align: right;" class="product-price">$${this.quantity * this.price}</p>
            <button  class="remove-btn button">&times;</button>
        
        </div>`;
    }
}
const list2 = {
    ProductList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();
let products = new ProductList(cart);
