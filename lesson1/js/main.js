const products = [
    { id: 1, title: 'Notebook', price: 2000, img: 'images/product1.png' },
    { id: 2, title: 'Mouse', price: 20, img: 'images/product2.png' },
    { id: 3, title: 'Keyboard', price: 200, img: 'images/product3.png' },
    { id: 4, title: 'Gamepad', price: 50, img: 'images/product4.png' },
];
const renderProduct = (product) => {
    return `<div class="product-item">
                <img src="${product.img}">
                <h3>${product.title}</h3>
                <p>${product.price}$</p>
                <button class="buy-btn">Купить</button>
            </div>`;
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join('');
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);