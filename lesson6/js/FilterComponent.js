Vue.component('search', {
    props: ['searchLine'],
    data() {
        return {
            userInput: this.searchline
        }
    },
    template: `
        <form action="#" class="search-form" @submit.prevent="onUserChange">
        <input type="text" class="search-field" v-model="userInput" @input="onUserChange">
            <button type="submit" class="btn-search">
                <i class="fas fa-search"></i>
            </button>
        </form>`,
    methods: {
        onUserChange() {
            this.$emit('filtrate', this.userInput);
        }
    }
});
