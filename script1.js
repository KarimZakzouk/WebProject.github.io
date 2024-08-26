function loadRegions(region) {
    fetch('data.json')
        .then(response => response.json())
        .then(countries => {

            localStorage.setItem('allCountries', JSON.stringify(countries));
            filterCountries(region, localStorage.getItem('searchTerm') || '');
        })
}

function filterCountries(region, searchTerm) {
    const allCountries = JSON.parse(localStorage.getItem('allCountries')) || [];
    const filteredCountries = allCountries.filter(country => 
        (region === '' || country.region === region) &&
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const container = document.getElementById('country-container');
    container.innerHTML = '';

    filteredCountries.forEach(country => {
        const countryCard = document.createElement('a');
        countryCard.className = 'country-card';
        const countryDetailUrl = `details.html?code=${country.alpha3Code}`;
        countryCard.href = countryDetailUrl;
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
    const savedRegion = localStorage.getItem('selectedRegion') || '';
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';

    loadRegions(savedRegion);

    document.getElementById('regionSelect').value = savedRegion;
    document.getElementById('countrySearch').value = savedSearchTerm;

    const regionSelect = document.getElementById('regionSelect');
    const countrySearch = document.getElementById('countrySearch');
    const toggleButton = document.getElementById('darkmode-toggle');
    const body = document.body;

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            toggleButton.textContent = '🌙 Dark Mode';
        } else {
            toggleButton.textContent = '☀️ Light Mode';
        }
    });

    regionSelect.addEventListener('change', function() {
        const selectedRegion = regionSelect.value;
        localStorage.setItem('selectedRegion', selectedRegion);
        filterCountries(selectedRegion, localStorage.getItem('searchTerm') || '');
    });

    countrySearch.addEventListener('input', function() {
        const searchCountry = countrySearch.value;
        localStorage.setItem('searchTerm', searchCountry);
        filterCountries(localStorage.getItem('selectedRegion') || '', searchCountry);
    });
    
});
