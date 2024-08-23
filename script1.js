document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(countries => {
            const container = document.getElementById('country-container');
            countries.forEach((country, index) => {

                const countryCard = document.createElement('div');
                countryCard.className = 'country-card';

                countryCard.innerHTML = 
                `
                    <img src="${country.flags.png}">
                    <h2>${country.name}</h2>
                    <p>Population: ${country.population}</p>
                    <p><b>Region:</b> ${country.region}</p>
                    <p><b>Capital:</b> ${country.capital}</p>
                `;

                container.appendChild(countryCard);
            });
        })
        .catch(error => console.error('Error loading countries:', error));
});
