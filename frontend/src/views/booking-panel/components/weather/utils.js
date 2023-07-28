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

export function tempToString(temp) {
    return `${temp}°`;
}

export function wmoToString(wmo) {
   switch (wmo) {
       case 0: return "Cielo sereno"
       case 1: return "Principalmente sereno"
       case 2: return "Parzialmente nuvoloso"
       case 3: return "Coperto"
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

export function wmoToIcon(wmo) {
    switch (wmo) {
        case 0: case 1: return "mdi-weather-sunny"
        case 2: return "mdi-weather-partlycloudy"
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

export function wmoToCustomIcon(wmo) {
    const iconsPath = "/weather-icons"
    let icon = ""
    switch (wmo) {
        case 0: icon = "sun.png"; break;
    }
    return [iconsPath, icon].join("/");
}