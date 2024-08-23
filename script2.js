const urlParams = new URLSearchParams(window.location.search);
const countryCode = urlParams.get('code');

fetch('data.json')
                .then(response => response.json())
                .then(countries => {
                    const country = countries.find(c => c.alpha3Code === countryCode);
                });