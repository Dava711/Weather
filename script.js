const cityInput = document.getElementById('search');
const citySelect = document.getElementById('search1');
const searchBtn = document.getElementById('sub');
const result = document.getElementById('wet');

async function getIpWeat() {
    const ip1 = await fetch('https://httpbin.org/ip');
    const ip2 = await ip1.json();
    const ip3 = ip2.origin;
    try {
        if (ip3) {
            Weather(ip3)
        } else {
            alert("Что то не так");
        }
    } catch (error) {
        result.innerHTML = `<p style="color: red;">Ошибка</p>`;
        Weather()
    }
}

async function Weather(IpCity = "") {
    let city = "";
    if (IpCity) {
        city = IpCity
    }
    else if (cityInput.value.trim() !== "") {
        city = cityInput.value.trim();
    } else {
        city = citySelect.value;
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=f0a04f8304fd4aa59ab122347260306&q=${city}&days=9&lang=ru`;

    try {
        const r = await fetch(url);
        if (!r.ok) {
            alert("Что то пошло не так");
        }

        const data = await r.json();

        const weatherCode = data.current.condition.code;

        Background(weatherCode);

        result.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p>Температура сейчас: <b>${data.current.temp_c}°C</b></p> 
            <p>Ветер сейчас: <b>${data.current.wind_kph}kph</b></p>
            <p>Погода: <b>${data.current.condition.text}</b></p>
            <p>Влажность: <b>${data.current.humidity}%</b></p>
            <img src="https:${data.current.condition.icon}" alt="">
                     <hr>
            <div id="fl" style="
            display: grid;
            grid-template-columns: 3; 
            gap: 15px;
            width: 100%;
            margin: 20px;"></div>`;


        const thre = document.getElementById('fl');

        const days = data.forecast.forecastday;



        for (let i = 0; i < days.length; i++) {
            thre.innerHTML += `
                <div class="blocks">
                    <p><b>День ${i + 1}</b></p>
                    <p>Днем: <b>${days[i].day.maxtemp_c}°C</b></p>
                    <p>Ночью: <b>${days[i].day.mintemp_c}°C</b></p>
                </div>`;
        }

    } catch (error) {
        result.innerHTML = `<p style="color: red;">Ошибка</p>`;
    }
}


function Background(code) {
    document.body.className = "";

    if (code == 1000) {
        document.body.classList.add('clear');
    } else if ([1003, 1006, 1009].includes(code)) {
        document.body.classList.add('cloudy');
    } else if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243].includes(code)) {
        document.body.classList.add('rainy');
    } else if ([1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) {
        document.body.classList.add('snowy');
    } else if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
        document.body.classList.add('thunder');
    } else {
        document.body.classList.add('cloudy');
    }
}



searchBtn.addEventListener('click', function pustota() {
    Weather()
});

citySelect.addEventListener('change', () => {
    cityInput.value = "";
    Weather();
});

getIpWeat();
