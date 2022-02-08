Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            showCart: false,
            isEmptyCart: true,
            sum: 0
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
                this.calcSum();

                if (this.$data.cartItems.length) {
                    this.isEmptyCart = false;
                    document.querySelector('.cart-amount').innerText = +this.$data.cartItems.length;
                } else {
                    this.isEmptyCart = true;
                }
            });
    },
    methods: {
        addProduct(item, img) {
            this.isEmptyCart = false;
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                        }
                        // document.querySelector('.cart-amount').innerText = this.$data.cartItems.length;
                    });
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                if (img) prod.img = img;
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                        document.querySelector('.cart-amount').innerText = +this.$data.cartItems.length;
                    });
            }
            this.calcSum();
        },
        remove(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            this.$parent.deleteJson(`/api/cart/${find.id_product}`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                        this.calcSum();

                        if (!this.$data.cartItems.length) {
                            this.isEmptyCart = true;
                        } else {
                            document.querySelector('.cart-amount').innerText = +this.$data.cartItems.length;
                        }
                    }
                });
        },
        delete(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            this.$parent.deleteJson(`/api/cart-page/${find.id_product}`)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        this.calcSum();
                        if (!this.$data.cartItems.length) {
                            this.isEmptyCart = true;
                        } else {
                            document.querySelector('.cart-amount').innerText = +this.$data.cartItems.length;
                        }
                    }
                });
        },
        changeQuantity(item, nQuantity) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart-page/${find.id_product}`, { quantity: nQuantity })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity = nQuantity;
                            this.calcSum();

                        }
                    });
            }
        },
        calcSum() {
            this.sum = 0;
            for (let item of this.cartItems) {
                this.sum += item.price * item.quantity;
            }
        },
        clearCart() {//неправильно работает, нужно еще один запрос на сервер
            this.$parent.postJson(`/api/cart-page`)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.splice(0, this.cartItems.length);
                        this.calcSum();
                        this.isEmptyCart = true;
                    }
                });

        }
    },
    template: `<div class="cart">
            <button class="btn-cart" type="button" @click="showCart = !showCart">
                <img class="carticon" src="image/cart.svg" alt="cart">
                <div v-show="!this.isEmptyCart" class="cart-amount"></div>
            </button>
        <div class="cart-block" v-show="showCart">
            <cart-item v-for="item of cartItems" :key="item.id_product" :cart-item="item" @remove="remove">
            </cart-item>
            <p v-show="this.isEmptyCart" class="cart-empty_text product-title">Your cart is empty</p>
            <a href="cart.html" v-show="!this.isEmptyCart" class="button button_cart">Go to cart</a>
        </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img v-bind:src="cartItem.img" class="cart-item-img" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <button class="button del-btn" @click="$emit('remove', cartItem)">&times;</button>
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}$</div>
                    </div>
                </div>
    `
});

Vue.component('cart-page', {
    template: `
    <section class="cart-content">
        <div class="cart-content__items">
            <cart-page-item v-for="item of this.$parent.$refs.cart.cartItems" :key="item.id_product" :cart-item="item" @remove="$parent.$refs.cart.delete" @ch-quant="$parent.$refs.cart.changeQuantity">
            </cart-page-item>
            <p v-show="$parent.$refs.cart.isEmptyCart" class="cart-content__item-info__header">Your cart is empty</p>
        </div>
        <p v-show="this.isEmptyCart" class="cart-empty_text product-title">Your cart is empty</p>
                        <div class="cart-content__buttons">
                            <button @click="$parent.$refs.cart.clearCart()" type="button" class="button button_cartpage">clear
                                shopping cart</button>
                            <a href="catalog.html" class="button button_cartpage">continue shopping</a>
                        </div>
                        </section>
    `
});
Vue.component('cart-page-item', {
    props: ['cartItem'],
    data() {
        return {
            newQuantity: ''
        }
    },
    methods: {
        changeBackground() {
            this.$el.classList.toggle('background');
        }
    },
    template: `
    <div class="cart-content__item">
        <button @mouseover="changeBackground()" @mouseout="changeBackground()" 
        @click="$emit('remove', cartItem)" class="cart-content__item-close"><img src="image/close-cart.svg"
                alt="close icon"></button>
        <img v-bind:src="cartItem.img" class="cart-content__item-img" alt="">
        <div class="cart-content__item-info">
            <h2 class="cart-content__item-info__header">{{ cartItem.product_name }}
            </h2>
            <p class="cart-content__item-info__details">
                price: <span class="cart-content__item-info__details-price">{{ cartItem.price*cartItem.quantity }} $</span> <br>
                color: <span class="cart-content__item-info__details-item">red</span> <br>
                size: <span class="cart-content__item-info__details-item">xl</span> <br>
                quantity: <input v-model="newQuantity" @input="$emit('ch-quant', cartItem, newQuantity)" type="number" v-bind:placeholder="cartItem.quantity" max="1000" min="1">
            </p>
        </div>
        
        
    </div>
    `
});

Vue.component('checkout', {
    template: `
    <div class="cart-info__checkout">
        <p class="cart-info__checkout-sub">sub
            total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ {{$root.$refs.cart.sum}}
        </p>
            <br>
        <h3 class="cart-info__checkout-header">grand
            total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
        class="cart-info__checkout-grand">$ {{$root.$refs.cart.sum}}</span>&nbsp;
        </h3>
        <span class="cart-info__checkout-hline"></span>
        <button type="submit" class="button button_checkout" value="checkout">
            proceed to checkout
        </button>
    </div>
    `
});