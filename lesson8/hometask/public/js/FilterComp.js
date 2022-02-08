Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        };
    },
    template: `<form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                    <input @input="$parent.$refs.products.filter(userSearch)" class="search-input" type="text" placeholder="Searching on site..." v-model="userSearch">
                    <button class="search-button button button_search" type="submit"><img
                    class="search-icon" src="image/search.svg" alt="search"></button>
                </form>`
});