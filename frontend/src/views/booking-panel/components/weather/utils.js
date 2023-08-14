import store from "@/store";

export function range(from, to, step) {
    const numbers = [];
    for (let num = from; num <= to; num += step) {
        numbers.push(num);
    }
    return numbers;
}

export function numberToHour(number) {
    return `${number}:00`;
}

export function hourToNumber(hour) {
    return hour.split(":")[0];
}

export function tempToString(temp, suffix = "°") {
    return `${temp}${suffix}`;
}

export function getTodayDate() {
    const date = new Date(Date.now())
    const month = date.getMonth() + 1
    const day = date.getDate();
    return [date.getFullYear(),
        month >= 10 ? month : '0' + month,
        day >= 10 ? day : '0' + day].join("-");
}

export function getDayWmo(day, alg = "most_freq") {
    const dayHourlyWeather = getDayHourlyWeather(day);
    let wmo;
    if (alg === "most_freq") {
        const hashmap = dayHourlyWeather.wmo.reduce( (acc, val) => {
            acc[val] = (acc[val] || 0) + 1
            return acc
        },{})
        const maxValue = Math.max(...Object.values(hashmap));
        for (const [key, value] of Object.entries(hashmap)) {
            if (value === maxValue) {
                wmo = parseInt(key);
                break;
            }
        }
    } else if (alg === "average") {
        let wmoSum = 0;
        for (let i in dayHourlyWeather.wmo) {
            wmoSum += dayHourlyWeather.wmo[i];
        }
        const averageWmo = wmoSum / 24;
        const legitValues = [0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99];
        let lastDelta;
        legitValues.some(value => {
            let delta = Math.abs(averageWmo - value);
            if (delta >= lastDelta) return true;
            wmo = value;
            lastDelta = delta;
        });
        console.log("Average wmo: " + averageWmo + ", result: " + wmo)
    }
    return wmo;
}

function wmoToString(wmo, day, hour) {
    const dailyWeatherData = getDayDailyWeather(day);
    const isDay = hour > dailyWeatherData.sunrise && hour < dailyWeatherData.sunset;
    switch (wmo) {
       case 0: return isDay ? "Soleggiato" : "Sereno"
       case 1: return isDay ? "Principalmente soleggiato" : "Parzialmente sereno"
       case 2: return "Parzialmente nuvoloso"
       case 3: return "Nuvoloso"
       case 45: return "Nebbia"
       case 48: return "Brina"
       case 51: return "Pioviggine leggera"
       case 53: return "Pioviggine moderata"
       case 55: return "Pioviggine intensa"
       case 56: return "Pioviggine sopraffusa leggera"
       case 57: return "Pioviggine sopraffusa forte"
       case 61: return "Pioggia debole"
       case 63: return "Pioggia moderata"
       case 65: return "Pioggia forte"
       case 66: return "Pioggia sopraffusa leggera"
       case 67: return "Pioggia sopraffusa forte"
       case 71: return "Nevicate leggere"
       case 73: return "Nevicate moderate"
       case 75: return "Nevicate intense"
       case 77: return "Grandine"
       case 80: return "Rovesci di pioggia leggeri"
       case 81: return "Rovesci di pioggia moderati"
       case 82: return "Rovesci di pioggia violenti"
       case 85: return "Rovesci di neve moderati"
       case 86: return "Rovesci di neve intensi"
       case 95: return "Temporali"
       case 96: return "Temporali con grandinate moderate"
       case 99: return "Temporali con grandinate violente"
   }
}

export function wmoToIcon(wmo, hour, dayInfo) {
    let isDay = true;
    if (hour && dayInfo) {
        const _hour = hourToNumber(hour)
        isDay = _hour > dayInfo.sunrise && _hour < dayInfo.sunset;
    }
    switch (wmo) {
        case 0: case 1: return isDay ? "mdi-weather-sunny" : "mdi-weather-night"
        case 2: return isDay ? "mdi-weather-partly-cloudy" : "mdi-weather-night"
        case 3: return "mdi-weather-cloudy"
        case 45: return "mdi-weather-fog"
        case 51: case 53: case 55: case 56: case 57:
        case 61: case 63: case 65: case 66: case 67: return "mdi-weather-rainy"
        case 71: case 73: case 75: case 85: case 86: return "mdi-weather-snowy"
        case 77: return "mdi-weather-hail"
        case 80: case 81: case 82: return "mdi-weather-pouring"
        case 95: case 96: case 99: return "mdi-weather-lightning-rainy"
    }
}

export function getDayHourlyWeather(day) {
    const fullWeatherData = store.getters.hourlyWeather;
    let firstIndex = 0;
    for (let time in fullWeatherData.hourly.time) {
        if (fullWeatherData.hourly.time[time].includes(day)) {
            firstIndex = Number.parseInt(time);
            break;
        }
    }

    return {temp: fullWeatherData.hourly.temperature_2m.slice(firstIndex, firstIndex + 24).map(Math.round),
            wmo: fullWeatherData.hourly.weathercode.slice(firstIndex, firstIndex + 24)}
}

export function getDayDailyWeather(day) {
    const fullWeatherData = store.getters.dailyWeather;
    let index = 0;
    for (let time in fullWeatherData.daily.time) {
        if (fullWeatherData.daily.time[time].includes(day)) {
            index = Number.parseInt(time);
            break;
        }
    }

    let [ sunriseHour, sunriseMinute ] = fullWeatherData.daily.sunrise[index].split("T")[1].split(":");
    sunriseHour = parseInt(sunriseHour); sunriseMinute = parseInt(sunriseMinute);
    const sunrise = sunriseMinute > 30 ? sunriseHour + 1 : sunriseHour;
    let [ sunsetHour, sunsetMinute ] = fullWeatherData.daily.sunset[index].split("T")[1].split(":");
    sunsetHour = parseInt(sunsetHour); sunsetMinute = parseInt(sunsetMinute);
    const sunset = sunsetMinute > 30 ? sunsetHour + 1 : sunsetHour;

    return {temp_max: Math.round(fullWeatherData.daily.temperature_2m_max[index]),
            temp_min: Math.round(fullWeatherData.daily.temperature_2m_min[index]),
            sunrise: sunrise,
            sunset: sunset,
            wmo: fullWeatherData.daily.weathercode[index]}
}

export function getTemp(day, hour) {
    if (!hour) {
        const date = new Date(Date.now());
        hour = date.getHours();
    }
    const dayHourlyWeather = getDayHourlyWeather(day);
    return tempToString(Math.round(dayHourlyWeather.temp[hour]), "°C");
}

export function getWeatherCodeString(day, hour) {
    if (!hour) {
        const date = new Date(Date.now());
        hour = date.getHours();
    }
    const dayHourlyWeather = getDayHourlyWeather(day);
    return wmoToString(dayHourlyWeather.wmo[hour], day, hour);
}