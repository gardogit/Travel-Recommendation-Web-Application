fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        const searchInput = document.querySelector('.search-bar input[type="text"]');
        const searchButton = document.querySelector('.btn.buscar');
        const clearButton = document.querySelector('.btn.limpiar');
        const resultsContainer = document.querySelector('#results');

        // Evento para buscar recomendaciones
        searchButton.addEventListener('click', () => {
            const keyword = searchInput.value.toLowerCase();
            resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

            let results = [];

            // Filtrar resultados según la palabra clave
            if (keyword === 'beaches') {
                results = data.beaches.slice(0, 2); // Obtener las dos primeras playas
            } else if (keyword === 'temples') {
                results = data.temples.slice(0, 2); // Obtener los dos primeros templos
            } else if (keyword === 'countries') {
                results = data.countries.map(country => country.cities[0]).slice(0, 2); // Obtener las dos primeras ciudades de los países
            } else {
                resultsContainer.innerHTML = '<p>No hay resultados para esa búsqueda.</p>';
                return;
            }

            // Mostrar resultados
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

        // Evento para limpiar la búsqueda
        clearButton.addEventListener('click', () => {
            searchInput.value = ''; // Limpiar el input
            resultsContainer.innerHTML = ''; // Limpiar resultados
        });
    })
    .catch(error => console.error('Error cargando el archivo JSON:', error));