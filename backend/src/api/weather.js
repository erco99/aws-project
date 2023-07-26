const https = require("node:https");
const pathUtils = require("../utils/pathUtils");

const hostname = "api.open-meteo.com";
const apiVersion = "v1";

function getWeatherHourly(latitude, longitude, type, callback) {
    return https.request({
        hostname: hostname,
        path: pathUtils.composeWithQueryParams([apiVersion, "forecast"], {
            "latitude": latitude,
            "longitude": longitude,
            "hourly": "weathercode",
            "temperature_2m": null,
            "forecast_days": type === "day" ? 1 : 7
        }),
        method: 'GET',
    }, callback);
}

function getWeatherDaily(latitude, longitude, type, callback) {
    return https.request({
        hostname: hostname,
        path: pathUtils.composeWithQueryParams([apiVersion, "forecast"], {
            "latitude": latitude,
            "longitude": longitude,
            "daily": "weathercode",
            "temperature_2m_max": null,
            "temperature_2m_min": null,
            "timezone":"Europe%2FBerlin",
            "forecast_days": type === "day" ? 1 : 7
        }),
        method: 'GET',
    }, callback);
}

module.exports = { getWeatherHourly, getWeatherDaily }

