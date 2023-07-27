const https = require("node:https");
const pathUtils = require("../utils/pathUtils");
const { dateToString } = require("../utils/dateUtils");

const hostname = "api.open-meteo.com";
const apiVersion = "v1";

function getWeatherHourly(latitude, longitude, from, callback) {
    const to = new Date();
    to.setUTCDate(from.getDate() + (7 - from.getDay()));
    return https.request({
        hostname: hostname,
        path: pathUtils.composeWithQueryParams([apiVersion, "forecast"], {
            "latitude": latitude,
            "longitude": longitude,
            "hourly": "weathercode",
            "temperature_2m": null,
            "start_date": dateToString(from),
            "end_date": dateToString(to)
        }),
        method: 'GET',
    }, callback);
}

function getWeatherDaily(latitude, longitude, from, callback) {
    const to = new Date();
    to.setUTCDate(from.getDate() + (7 - from.getDay()));
    return https.request({
        hostname: hostname,
        path: pathUtils.composeWithQueryParams([apiVersion, "forecast"], {
            "latitude": latitude,
            "longitude": longitude,
            "daily": "weathercode",
            "temperature_2m_max": null,
            "temperature_2m_min": null,
            "timezone":"Europe%2FBerlin",
            "start_date": dateToString(from),
            "end_date": dateToString(to)
        }),
        method: 'GET',
    }, callback);
}

module.exports = { getWeatherHourly, getWeatherDaily }

