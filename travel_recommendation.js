fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        const searchInput = document.querySelector('.search-bar input[type="text"]');
        const searchButton = document.querySelector('.btn.buscar');
        const clearButton = document.querySelector('.btn.limpiar');
        const resultsContainer = document.querySelector('#results');

        searchButton.addEventListener('click', () => {
            const keyword = searchInput.value.toLowerCase();
            resultsContainer.innerHTML = ''; 

            let results = [];

            const beachesRegex = /^beach(es)?$/; 
            const templesRegex = /^temple(s)?$/; 
            const countriesRegex = /^countr(y|ies)$/;

            if (beachesRegex.test(keyword)) {
                results = data.beaches.slice(0, 2); 
            } else if (templesRegex.test(keyword)) {
                results = data.temples.slice(0, 2); 
            } else if (countriesRegex.test(keyword)) {
                results = data.countries.map(country => country.cities[0]).slice(0, 2); 
            } else if (keyword.startsWith('beach')) {
                results = data.beaches.slice(0, 2); 
            } else if (keyword.startsWith('temple')) {
                results = data.temples.slice(0, 2); 
            } else if (keyword.startsWith('countr')) {
                results = data.countries.map(country => country.cities[0]).slice(0, 2); 
            } else {
                resultsContainer.innerHTML = '<p>There are no results for that search.</p>';
                return;
            }

            results.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('recommendation');

                const img = document.createElement('img');
                img.src = item.imageUrl;
                img.alt = item.name;

                const title = document.createElement('h3');
                title.textContent = item.name;

                const description = document.createElement('p');
                description.textContent = item.description;

                itemDiv.appendChild(img);
                itemDiv.appendChild(title);
                itemDiv.appendChild(description);
                resultsContainer.appendChild(itemDiv);
            });
        });

        clearButton.addEventListener('click', () => {
            searchInput.value = ''; 
            resultsContainer.innerHTML = ''; 
        });
    })
    .catch(error => console.error('JSON error:', error));
