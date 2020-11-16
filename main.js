// SECTION Todos
// !SECTION



function app() {
    return {
        // SECTION - Initialize data
        data: [],
        init: function () {
            const data = [];
            const results = [];
            let count = 0;
            const items = this.$el.querySelectorAll('[data-a-type="item"]');
            items.forEach((item, index) => {
                // NOTE - create data array with all data
                const items = item.querySelectorAll('[data-a-type]');
                const itemData = {
                    id: item.id,
                    text: item.innerText,
                    sort: ++count,
                };
                // NOTE Find all types and values
                items.forEach((i) => {
                    const type = i.dataset.aType;
                    const value = i.innerText;
                    itemData[type] = value;
                    // NOTE Find all options for all the types
                    // NOTE check if options object has type and add if not
                    if (!(type in this.filters)) {
                        this.filters[type] = [];
                    }
                    // NOTE check if option type has value and push if not. 
                    const words = value.split(', ');
                    words.forEach(word => {
                        if (!this.filters[type].some(i => i.name === word)) {
                            const option = {
                                name: word,
                                show: false,
                            }
                            this.filters[type].push(option);
                        }
                    });
                });
                // NOTE - fill data array with initial values
                this.data.push(itemData);
                this.results.all.push(itemData.id);
            });
            this.searchItems();
        },
        // !SECTION
        // SECTION - Search
        searchResults: [],
        searchTerm: '',
        searchItems: function () {
            let searchResults = [];
            const result = this.data.filter(i => i.text.toLowerCase().includes(this.searchTerm.toLowerCase()));
            result.forEach(i => searchResults.push(i.id));
            this.results.search = [...searchResults];
            this.compileResults();
        },
        // !SECTION
        // SECTION Filter function
        filters: {},
        filterItems: function (type, and = false) {
            if (!and) {
                const results = this.data.filter(i => {
                    this.filters[type].every(filter => {
                        if (filter.show) {
                            i[type].includes(filter.name)
                        }
                    });
                });
            } else {
                const result = this.data.filter(i => {
                    this.filters[type].some(filter => {
                        if (filter.show) {
                            i[type].includes(filter.name)
                        }
                    });
                });
            }
            // NOTE Update results array
            this.results[type] = [...result];
        },
        // !SECTION
        // SECTION Sort function
        sort: {
            by: undefined,
            order: undefined,
        },
        // NOTE sort function - sorts data array
        sortItems: function (item, number = false) {
            const order = this.sort.order === 'asc' ? 'desc' : 'asc';
            if (number) {
                // NOTE number sort function
                this.data.sort((a, b) => order === 'asc' ? a[item] - b[item] : b[item] - a[item]);
                console.log('number sort')
            } else {
                // NOTE word sort function
                this.data.sort((first, second) => {
                    const a = order === 'asc' ? first[item].toLowerCase() : second[item].toLowerCase();
                    const b = order === 'asc' ? second[item].toLowerCase() : first[item].toLowerCase();
                    if (a < b) {return -1;}
                    if (a > b) {return 1;}
                    return 0;
                });
                console.log('word sort')
            }
            // NOTE set sort object values
            this.sort.by = item;
            this.sort.order = order;
        },
        // NOTE function to find index for item sort. Returns style attribute contents
        sortOrder: function (id) {
            const index = this.data.findIndex(i => i.id == id);  
            return `order:${index};`;
        },
        // !SECTION
        // SECTION Results
        results: {
            search: [],
            all: [],
        },
        finalResults: [],
        // Compile results array
        compileResults: function () {
            const resultsArray = Object.values(this.results);
            const results = resultsArray.reduce((acc, current) => acc.filter(i => current.includes(i)));
            this.finalResults = [...results];
        },
        isVisible: function (id) {
            return this.finalResults.includes(id);
        },
        // !SECTION
    }
}