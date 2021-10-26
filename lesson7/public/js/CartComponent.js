Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
            isEmptyCart: true
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }

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
        },
        remove(item) {
            this.$parent.deleteJson(`/api/cart`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                        if (!this.$data.cartItems.length) {
                            this.isEmptyCart = true;
                        } else {
                            document.querySelector('.cart-amount').innerText = +this.$data.cartItems.length;
                        }
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
})