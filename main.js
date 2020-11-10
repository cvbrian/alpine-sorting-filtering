



function app() {
    return {
        results: [],
        // NOTE - Initialize data
        init: function () {
            const data = [];
            const results = [];
            const items = this.$el.querySelectorAll('[data-a-type="item"]');
            items.forEach((item, index) => {
                // NOTE - create data array with all data
                const items = item.querySelectorAll('[data-a-type]');
                const itemData = {
                    id: item.id,
                    text: item.innerText,
                };
                // NOTE Find all types and values
                items.forEach( (i) => {
                    // console.log(i.dataset.aType);
                    const type = i.dataset.aType;
                    const value = i.innerText;
                    itemData[type] = value;
                });
                // NOTE - fill results arrays with initial values
                data.push(itemData);
            });
            // console.log(data);
            // TODO - Find all options for districts 
            const districts = data.map(i => i.district).filter((value, index, array) => array.indexOf(value) === index);
            // TODO - Find all options for grade levels
            // NOTE - push data to main object
            // console.log(districts);
            this.data = data;
            this.districts = districts;
            this.searchResults = results;
            this.gradeLevelResults = results;
            this.results = results;
        },
        // NOTE - Search
        searchResults: [],
        search: "",
        searchClasses: function () {
            let searchResults = [];
            const searchTerm = this.search;
            const result = this.data.filter(i => i.text.toLowerCase().includes(searchTerm.toLowerCase()));
            result.forEach(i => searchResults.push(i.id));
            this.searchResults = [...searchResults];
            this.compileResults();
        },
        // NOTE - filter grade levels
        gradeLevels: [{
            name: 'Upper',
            order: 3,
            show: false,
        },
        {
            name: 'Middle',
            order: 2,
            show: false,
        },
        {
            name: 'Lower',
            order: 1,
            show: false,
        },
        ],
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
        // Compile results array
        compileResults: function () {
            const gradeLevelResults = [...this.gradeLevelResults];
            const searchResults = [...this.searchResults];
            const resultsArray = [gradeLevelResults, searchResults];
            const results = resultsArray.reduce((acc, current) => acc.filter(i => current.includes(i)));
            console.log('start compile');
            console.log(results);
            console.log('end compile');
            this.results = [...results];
        },
        isVisible: function (id) {
            return this.results.includes(id);
        },
    }
}