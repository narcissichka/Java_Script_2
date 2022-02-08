Vue.component('carousel', {
    data() {
        return {
            curId: 0,
            images: [],
            currentImg: "image/product-carousel1.png"
        }
    },
    mounted() {
        this.$parent.getJson(`/api/product`)
            .then(data => {
                for (let item of data[0].img) {
                    this.$data.images.push(item);
                }
            });
    },
    methods: {
        next() {
            (this.$data.curId == 2) ? this.$data.curId = 0 : this.$data.curId++;
            this.$data.currentImg = this.$data.images[this.$data.curId];
        },
        previous() {
            (this.$data.curId == 0) ? this.$data.curId = 2 : this.$data.curId--;
            this.$data.currentImg = this.$data.images[this.$data.curId];
        }
    },
    template: `
            <div class="product-carousel">
                <div class="product-carousel__inner">
                    <div class="product-carousel__item" curId="carousel__slide1">
                        <img v-bind:src="this.$data.currentImg" class="d-block" alt="...">
                        <div class="carousel__snapper">
                            <button type="button" @click="previous()" class="carousel__prev"></button>
                            <button type="button" @click="next()" class="carousel__next"></button>
                        </div>
                    </div>
                </div>
            </div>
    `
});