Vue.component('single-product', {
    data() {
        return {
            product: {}
        }
    },
    mounted() {
        this.$parent.getJson(`/api/product`)
            .then(data => {
                this.$data.product = data[0];
            });
    },
    template: `<div class="product-information container">
    <h3 class="product-information__collection-header">{{product.collection}}</h3>
    <span class="product-information__pink-line"></span>
    <h2 class="product-information__header">{{product.product_name}}</h2>
    <p class="product-information__description">
        Compellingly actualize fully researched processes before proactive outsourcing.
        Progressively syndicate collaborative architectures before cutting-edge services. Completely
        visualize parallel core competencies rather than exceptional portals.
    </p>
    <p class="product-information__price">\${{product.price}}</p>
    <span class="product-information__grey-line"></span>
    <div class="filters filters-product">
        <details class="color">
            <summary class="filters-summary">choose color</summary>
            <ul class="filters-variants">
                <li class="color-variant"><input class="custom-checkbox" type="checkbox"
                        name="black" id="custom-checkbox15"><label
                        for="custom-checkbox15">black</label>
                </li>
                <li class="color-variant"><input class="custom-checkbox" type="checkbox"
                        name="white" id="custom-checkbox16"><label
                        for="custom-checkbox16">white</label></li>
                <li class="color-variant"><input class="custom-checkbox" type="checkbox"
                        name="dark-grey" id="custom-checkbox17"><label
                        for="custom-checkbox17">dark-grey</label></li>
            </ul>
        </details>
        <details class="choose-size">
            <summary class="filters-summary">choose size</summary>
            <ul class="filters-variants">
                <li class="size-variant"><input class="custom-checkbox" type="checkbox" name="xs"
                        id="custom-checkbox18"><label for="custom-checkbox18">xs</label>
                </li>
                <li class="size-variant"><input class="custom-checkbox" type="checkbox" name="s"
                        id="custom-checkbox19"><label for="custom-checkbox19">s</label></li>
                <li class="size-variant"><input class="custom-checkbox" type="checkbox" name="m"
                        id="custom-checkbox20"><label for="custom-checkbox20">m</label></li>
                <li class="size-variant"><input class="custom-checkbox" type="checkbox" name="l"
                        id="custom-checkbox21"><label for="custom-checkbox21">l</label></li>
                <li class="size-variant"><input class="custom-checkbox" type="checkbox" name="xl"
                        id="custom-checkbox22"><label for="custom-checkbox22">xl</label>
                </li>
            </ul>
        </details>
        <details class="quantity">
            <summary class="filters-summary">quantity</summary>
            <input class="quantity-input" id="number" type="number" min="1" placeholder="number">
        </details>
    </div>
    <div class="product-information__button-box">
        <a @click="$parent.$refs.cart.addProduct(product, product.img[0])" class="button product-information-add__button button_add-product-to-cart"><img
                src="image/cart.svg" alt="cart" class="product-information__add-cart">
            <p class="product-information__add-txt">Add to cart</p>
        </a>
    </div>
</div>
    `
});