class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.#fetchProducts();
        this.render();//вывод товаров на страницу
        this.sum = 0;
    }
    #fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for (let i in this.goods) {
            const item = new ProductItem(this.goods[i], i);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }
    getSum() {
        for (let item of this.goods) {
            this.sum += item.price;
        }
        return this.sum;
    }
}

class ProductItem {
    constructor(product, i = 0) {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.images = ['images/product1.png', 'images/product2.png', 'images/product3.png', 'images/product4.png'];
        this.img = this.images[i];
    }
    render() {
        return `<div class="product-item">
                <img src="${this.img}" class="pic">
                <h3>${this.title}</h3>
                <p>${this.price}$</p>
                <button class="buy-btn">Купить</button>
            </div>`;
    }
}

class Cart {
    constructor() {

    }
    calculateSum() {

    }
    addItem(item) {

    }
    removeItem(item) {

    }
    checkout() {

    }
    render() {

    }
}
class CartItem {
    constructor() {

    }
    changeAmount(n) {

    }
    addItem(cart) {//addSelf

    }
    removeItem(cart) {//removeSelf

    }
    render() {

    }
}

let list = new ProductList();
console.log(list.getSum());
