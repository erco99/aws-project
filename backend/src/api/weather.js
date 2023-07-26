const https = require("node:https")
const pathUtils = require("../utils/pathUtils");

const hostname = "api.open-meteo.com"
const apiVersion = "v1"

function week(latitude, longitude, callback) {
    return https.request({
        hostname: hostname,
        path: pathUtils.composeWithQueryParams([apiVersion, "forecast"], {
            "latitude": latitude,
            "longitude": longitude,
            "hourly": "temperature_2m"
        }),
        method: 'GET',
    }, callback)
}

module.exports = { week }

