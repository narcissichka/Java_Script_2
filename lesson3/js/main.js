const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.sum = 0;
        this.#getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                this.render();
                addEventProduct();
            });

    }
    #getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        const block = document.querySelector(this.container);
        for (let i in this.goods) {
            const item = new ProductItem(this.goods[i], i);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }
    getSum() {
        this.#getProducts()
            .then(data => {
                for (let item of data) {
                    this.sum += item.price;
                }
                console.log(this.sum);
            });
    }
}

class ProductItem {
    constructor(product, i = 0) {
        this.product_name = product.product_name;
        this.id_product = product.id;
        this.price = product.price;
        this.images = ['images/product1.png', 'images/product2.png', 'images/product3.png', 'images/product4.png'];
        this.img = this.images[i];
    }
    render() {
        return `<div class="product-item">
                <img src="${this.img}" class="pic">
                <h3>${this.product_name}</h3>
                <p>${this.price}$</p>
                <button class="buy-btn button">Купить</button>
            </div>`;
    }
}

class Cart {
    constructor(container = '.cart') {
        this.container = container;
        this.cartItems = [];
        this.itemsCount = 0;
        this.sum = 0;

        this.#getCart()
            .then(data => {
                this.cartItems = data["contents"];
                this.itemsCount = data["countGoods"];
                this.render();
                addEventCart();
            });
    }
    #getCart() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(e => {
                console.log(e);
            });
    }
    addItem(item) {
        let existingItem, idx;
        existingItem = this.cartItems.find((it, i) => { idx = i; return it.product_name == item.product_name });

        const block = document.querySelector(this.container);
        block.innerHTML = '';

        if (existingItem != undefined) {
            this.cartItems[idx].quantity++;
        } else {
            item.quantity = 1;
            this.cartItems.push(item);
        }
        this.render();
        addEventCart();
    }
    removeItem(item) {
        const block = document.querySelector(this.container);
        block.innerHTML = '';
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            this.cartItems.splice(this.cartItems.indexOf(item), 1);
        }
        this.render();
        addEventCart();
    }
    render() {
        this.sum = 0;
        const block = document.querySelector(this.container);
        for (let item of this.cartItems) {
            const cartItem = new CartItem(item);
            this.sum += item.price * item.quantity;
            block.insertAdjacentHTML("beforeend", cartItem.render());
        }
        block.insertAdjacentHTML("beforeend", '<p class="price">Total price: ' + this.sum + '$</p>');
    }
}
class CartItem {
    constructor(cart) {
        this.id_product = cart.id_product;
        this.product_name = cart.product_name;
        this.price = cart.price;
        this.quantity = cart.quantity;
    }
    render() {
        return `<div class="cart-item">
        <h3>${this.product_name}</h3>
        <p>${this.price}$</p>
        <p>${this.quantity} шт</p>
        <button class="remove-btn button">Убрать из корзины</button>
        </div>`;
    }
}

let list = new ProductList();
list.getSum();
let cart = new Cart();
document.querySelector('.btn-cart').onclick = () => {
    document.querySelector('.cart').classList.toggle('hide');
}

function addEventProduct() {
    let buyButtons = document.querySelectorAll('.buy-btn');
    for (let button of buyButtons) {
        button.onclick = buttonEventAdd;
    }
}
function addEventCart() {
    let removeButtons = document.querySelectorAll('.remove-btn');
    for (let button of removeButtons) {
        button.onclick = buttonEventRemove;
    }
}
function buttonEventAdd(e) {
    let el = list.goods.find((element) => { return element.product_name == e.target.parentElement.children[1].innerText; });
    cart.addItem(el);
}
function buttonEventRemove(e) {
    let el = cart.cartItems.find((element) => { return element.product_name == e.target.parentElement.children[0].innerText; });
    cart.removeItem(el);
}