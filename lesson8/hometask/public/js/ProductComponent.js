Vue.component('products', {
    data() {
        return {
            filtered: [],
            products: []
        }
    },
    mounted() {
        if (this.$vnode.data.staticClass == 'items-grid_index') {
            this.$parent.getJson(`/api/products`)
                .then(data => {
                    for (let item of data) {
                        this.$data.products.push(item);
                        this.$data.filtered.push(item);
                    }
                });
        }
        else if (this.$vnode.data.staticClass == 'items-grid_catalog container') {
            this.$parent.getJson(`/api/men-catalog`)
                .then(data => {
                    for (let item of data) {
                        this.$data.products.push(item);
                        this.$data.filtered.push(item);
                    }
                });
        }
        else if (this.$vnode.data.staticClass == 'items-grid_product container') {
            this.$parent.getJson(`/api/recommended`)
                .then(data => {
                    for (let item of data) {
                        this.$data.products.push(item);
                        this.$data.filtered.push(item);
                    }
                });
        }
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="items-grid">
                <product v-for="item of filtered" :key="item.id_product" 
                    :product="item" @add-product="$parent.$refs.cart.addProduct">
                </product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <div class="item-grid-box">
        <a href="product.html" class="item">
            <img loading="lazy" v-bind:src="product.img" alt="item1" class="item-img">
            <h4 class="item-header">{{product.product_name}}</h4>
            <p class="item-text">Known for her sculptural takes on&nbsp;traditional tailoring,
                 Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with Moda Operandi.</p>
            <p class="item-price">\${{product.price}}</p>
        </a>
        <div class="item-cart">
            <a @click="$emit('add-product', product)" class="button item-cart-add__button button_add-item-to-cart">
                <i class="fas fa-shopping-cart"></i>
                <p class="item-cart__add-txt">Add&nbsp;to&nbsp;cart</p>
            </a>
        </div>
    </div>
    `
});