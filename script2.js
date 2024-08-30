document.addEventListener('DOMContentLoaded', () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const countryCode = urlParams.get('code');

    fetch('data.json')
        .then(response => response.json())
        .then(countries => {
            const country = countries.find(c => c.alpha3Code === countryCode);
            const countryDetails = document.getElementById('country-details');

            const borderCountries = country.borders?.map(borderCode => {
                const borderCountry = countries.find(c => c.alpha3Code === borderCode);
                return borderCountry ? `<button class="country-button" data-country="${borderCountry.alpha3Code}">${borderCountry.name}</button>` : '';
            }).join(' ');

            countryDetails.innerHTML = `
                <div class="country-img">
                    <img src="${country.flags?.png || 'default-flag.png'}">
                </div>
                <div>
                    <h1 id="country-name">${country.name}</h1>
                    <div class="country-info">
                        <div>
                            <p><b>Native Name:</b> ${country.nativeName || 'N/A'}</p>
                            <p><b>Population:</b> ${country.population ? country.population.toLocaleString() : 'N/A'}</p>
                            <p><b>Region:</b> ${country.region || 'N/A'}</p>
                            <p><b>Sub Region:</b> ${country.subregion || 'N/A'}</p>
                            <p><b>Capital:</b> ${country.capital || 'N/A'}</p>
                        </div>
                        <div>
                            <p><b>Top Level Domain:</b> ${country.topLevelDomain?.[0] || 'N/A'}</p>
                            <p><b>Currencies:</b> ${country.currencies?.[0]?.name || 'N/A'}</p>
                            <p><b>Languages:</b> ${country.languages?.map(lang => lang.name).join(', ') || 'N/A'}</p>
                        </div>
                    </div>
                    ${borderCountries ? `
                    <div class="border-countries">
                        <p><b>Border Countries:</b> ${borderCountries}</p>
                    </div>` : ''}
                </div>
            `;
            
            document.querySelectorAll('.country-button').forEach(button => {
                button.addEventListener('click', function() {
                    const selectedCountryCode = this.getAttribute('data-country');
                    window.location.href = `?code=${selectedCountryCode}`;
                });
            });
        });

    const body = document.body;
    const toggleButton = document.getElementById('darkmode-toggle');
    const savedMode = localStorage.getItem('mode') || 'dark';

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
});
