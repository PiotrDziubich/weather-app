function getWeather() {
    const kluczAPI = '41e3cced31b45fd6fba9c18edc616e94';
    const miasto = document.getElementById('miasto').value;

    console.log("Wprowadzone miasto:", miasto); // Debugowanie

    if (!miasto) {
        alert('Proszę wprowadzić miasto');
        return;
    }

    const linkPogoda = `https://api.openweathermap.org/data/2.5/weather?q=${miasto}&appid=${kluczAPI}`;
    const forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q=${miasto}&appid=${kluczAPI}`;

    fetch(linkPogoda)
        .then(response => response.json())
        .then(data => {
            displayWheather(data);
        })
        .catch(error => {
            console.error('Błąd przechwytywania obecnej pogody:', error);
            alert('Wystąpił błąd w trakcie przechwytywania pogody. Proszę spróbować ponownie');
        });

    fetch(forecastLink)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Błąd z pobieraniem pogody godzinnej:', error);
            alert('Błąd z pobieraniem pogody godzinnej. Proszę spróbować ponownie');
        });
}

function displayWheather(data) {
    const temperaturaDivInfo = document.getElementById('temperatura-div');
    const pogodaInfoDiv = document.getElementById('pogoda-info');
    const ikonaPogoda = document.getElementById('ikona-pogoda');
    const godzinaRozpiska = document.getElementById('godzina');

    // Czyszczenie zawartości
    pogodaInfoDiv.innerHTML = '';
    godzinaRozpiska.innerHTML = '';
    temperaturaDivInfo.innerHTML = '';

    if (data.cod == '404') {
        pogodaInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const nazwaMiasta = data.name;
        const temperatura = Math.round(data.main.temp - 273.15);
        const opis = data.weather[0].description;
        const ikona = data.weather[0].icon;
        const ikonaLink = `https://openweathermap.org/img/wn/${ikona}@4x.png`;

        const temperaturaHTML = `
            <p>${temperatura}°C</p>
        `;

        const pogodaHTML = `
            <p>${nazwaMiasta}</p>
            <p>${opis}</p>
        `;

        temperaturaDivInfo.innerHTML = temperaturaHTML;
        pogodaInfoDiv.innerHTML = pogodaHTML;
        ikonaPogoda.src = ikonaLink;
        ikonaPogoda.alt = opis;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const godzina = document.getElementById('godzina');
    const next24Hours = hourlyData.slice(0, 8);

    godzina.innerHTML = ''; // Wyczyść poprzednie dane

    next24Hours.forEach(item => {
        const dataTime = new Date(item.dt * 1000);
        const hour = dataTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="godzina-element">
                <span>${hour}:00</span>
                <img src="${iconURL}" alt="Godzinna Ikona Pogody">
                <span>${temperature}°C</span>
            </div>
        `;
        godzina.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('ikona-pogoda');
    weatherIcon.style.display = 'block';
}
