// SECTION Todos
// TODO Generic search function
// TODO Generic Filter function
// TODO Filter And/Or
// TODO Multiple query options
// TODO Set up sorting
// !SECTION



function app() {
    return {
        // SECTION - Initialize data
        data: [],
        options: {},
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
                };
                // NOTE Find all types and values
                items.forEach((i) => {
                    // console.log(i.dataset.aType);
                    const type = i.dataset.aType;
                    const value = i.innerText;
                    itemData[type] = value;
                    // NOTE Find all options for all the types
                    // NOTE check if options object has type and add if not
                    if (!(type in this.options)) {
                        this.options[type] = [];
                    }
                    // NOTE check if option type has value and push if not. 
                    if (!this.options[type].includes(value)) {
                        // console.log(value);
                        this.options[type].push(value);
                    }
                });
                // NOTE - fill data array with initial values
                this.data.push(itemData);
                count++;
            });
            console.log(`count: ${count}`);
        },
        // !SECTION
        // SECTION - Search
        searchResults: [],
        searchTerm: '',
        searchItems: function () {
            let searchResults = [];
            // const searchTerm = this.search;
            const result = this.data.filter(i => i.text.toLowerCase().includes(this.searchTerm.toLowerCase()));
            result.forEach(i => searchResults.push(i.id));
            this.results.search = [...searchResults];
            // console.log(this.results.search)
            this.compileResults();
        },
        // !SECTION
        // SECTION Filter function
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
        },
        finalResults: [],
        // Compile results array
        compileResults: function () {
            const resultsArray = Object.values(this.results);
            console.log(resultsArray);
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