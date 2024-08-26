document.addEventListener('DOMContentLoaded', () => {
    // Handle country details fetch and display
    const urlParams = new URLSearchParams(window.location.search);
    const countryCode = urlParams.get('code');

    fetch('data.json')
        .then(response => response.json())
        .then(countries => {
            const country = countries.find(c => c.alpha3Code === countryCode);
            const countryDetails = document.getElementById('country-details');

            const countryImg = document.createElement('div');
            countryImg.className = 'country-img';
            countryImg.innerHTML = `<img src="${country.flags.png}">`;
            countryDetails.appendChild(countryImg);

            const countryInfo = document.createElement('div');
            countryInfo.className = 'country-info';
            countryInfo.innerHTML = `
                <h2>${country.name}</h2>
                <p><b>Population:</b> ${country.population}</p>
                <p><b>Region:</b> ${country.region}</p>
                <p><b>Capital:</b> ${country.capital}</p>
            `;
            countryDetails.appendChild(countryInfo);
        });

    // Dark mode toggle functionality
    const toggleButton = document.getElementById('darkmode-toggle');
    const body = document.body;

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        toggleButton.textContent = body.classList.contains('light-mode') ? '🌙 Dark Mode' : '☀️ Light Mode';
    });
});
