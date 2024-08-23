document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(countries => {
            const container = document.getElementById('country-container');
            countries.forEach((country, index) => {

                
                const countryCard = document.createElement('a');
                countryCard.className = 'country-card';
                
                const countryDetailUrl = `details.html?code=${country.alpha3Code}`;
                countryCard.href = countryDetailUrl;
                countryCard.innerHTML = 
                `
                    <img src="${country.flags.png}">
                    <h2>${country.name}</h2>
                    <p><b>Population:</b> ${country.population}</p>
                    <p><b>Region:</b> ${country.region}</p>
                    <p><b>Capital:</b> ${country.capital}</p>
                `;

                container.appendChild(countryCard);
            });
        })
});
