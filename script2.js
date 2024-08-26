const urlParams = new URLSearchParams(window.location.search);
const countryCode = urlParams.get('code');

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(countries => {
            const country = countries.find(c => c.alpha3Code === countryCode);
            console.log(country);
            const img = document.getElementById('country-details');
            const countryImg = document.createElement('div');
            countryImg.className = 'country-img';
            countryImg.innerHTML = 
            `
                <img src="${country.flags.png}">
            `
            img.appendChild(countryImg);

            const info = document.getElementById('country-details');
            const countryInfo = document.createElement('div');
            countryInfo.className = 'country-info';
            countryInfo.innerHTML = 
            `
                <h2>${country.name}</h2>
                <p><b>Population:</b> ${country.population}</p>
                <p><b>Region:</b> ${country.region}</p>
                <p><b>Capital:</b> ${country.capital}</p>
            `
            info.appendChild(countryInfo);

        })
});