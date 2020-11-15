// SECTION Todos
// TODO Set up sorting
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
        sortItems: function (item) {
            const order = this.sort.order === 'asc' ? 'desc' : 'asc';
            this.data.sort((a, b) => {
                const first = a[item].toLowerCase();
                const second = b[item].toLowerCase();
                if (first < second) {
                    return -1;
                }
                if (first > second) {
                    return 1;
                }
                return 0;
            });
        },
        // !SECTION
        // SECTION Old filtering functions
        // NOTE - filter grade levels
        gradeLevelResults: [],
        filterGradeLevels: function () {
            let filteredGradeLevels = this.gradeLevels.filter(i => i.show === true).map(i => i.name);
            let gradeLevelResults = [];
            const data = this.data;
            if (filteredGradeLevels.length) {
                const result = data.filter(i => i.gradeLevels.some(i => filteredGradeLevels.includes(i)));
                result.forEach(i => gradeLevelResults.push(i.id));
                // console.log('start grade level filter');
                // console.log(result);
                // console.log('end grade level filter');
            } else {
                data.forEach(i => gradeLevelResults.push(i.id));
            }
            this.gradeLevelResults = [...gradeLevelResults];
            // console.log('start grade levels');
            // console.log(gradeLevelResults);
            // console.log('end grade levels')
            this.compileResults();
        },
        // TODO filter by district

        allDistricts: [],
        filteredDistricts: [],
        districtResults: [],
        filterDistricts: function () {

        },
        // TODO filter by status
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
            // console.log(id);
            // debugger;
            return this.finalResults.includes(id);
        },
        // !SECTION
    }
}