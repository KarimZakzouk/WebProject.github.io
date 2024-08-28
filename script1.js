function loadRegions(region) {
    fetch('data.json')
        .then(response => response.json())
        .then(countries => {
            localStorage.setItem('allCountries', JSON.stringify(countries));
            filterCountries(region, localStorage.getItem('searchTerm') || '');
        });
}

function filterCountries(region, searchTerm) {
    const allCountries = JSON.parse(localStorage.getItem('allCountries')) || [];
    const filteredCountries = allCountries.filter(country =>
        (!region || country.region === region) &&
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const container = document.getElementById('country-container');
    container.innerHTML = '';

    filteredCountries.forEach(country => {
        const countryCard = document.createElement('a');
        countryCard.className = 'country-card';
        countryCard.href = `details.html?code=${country.alpha3Code}`;
        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name} flag">
            <h2>${country.name}</h2>
            <p><b>Population:</b> ${country.population.toLocaleString()}</p>
            <p><b>Region:</b> ${country.region}</p>
            <p><b>Capital:</b> ${country.capital}</p>
        `;
        container.appendChild(countryCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    const savedRegion = localStorage.getItem('selectedRegion') || '';
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    const savedMode = localStorage.getItem('mode') || 'dark';

    loadRegions(savedRegion);

    document.getElementById('regionSelect').value = savedRegion;
    document.getElementById('countrySearch').value = savedSearchTerm;

    const body = document.body;
    const toggleButton = document.getElementById('darkmode-toggle');

    if (savedMode === 'light') {
        body.classList.add('light-mode');
        toggleButton.textContent = '🌙 Dark Mode';
    }

    toggleButton.addEventListener('click', () => {
        const isLightMode = body.classList.toggle('light-mode');
        const mode = isLightMode ? 'light' : 'dark';
        localStorage.setItem('mode', mode);
        toggleButton.textContent = isLightMode ? '🌙 Dark Mode' : '☀️ Light Mode';
    });

    document.getElementById('regionSelect').addEventListener('change', () => {
        const selectedRegion = regionSelect.value;
        localStorage.setItem('selectedRegion', selectedRegion);
        filterCountries(selectedRegion, savedSearchTerm);
    });

    document.getElementById('countrySearch').addEventListener('input', () => {
        const searchCountry = countrySearch.value;
        localStorage.setItem('searchTerm', searchCountry);
        filterCountries(savedRegion, searchCountry);
    });
});
