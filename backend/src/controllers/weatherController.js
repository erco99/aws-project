const { getWeatherHourly, getWeatherDaily } = require('../api/weather');

async function hourly(req, res, type) {
    if (!req.query.latitude || !req.query.longitude) return res.sendStatus(400);
    const request = getWeatherHourly(req.query.latitude, req.query.longitude, type, (response) => {
        let jsonData = "";
        response.on('data', (chunk) => {
            jsonData = jsonData.concat(chunk);
        });
        response.on('end', () => {
            const weather_data = JSON.parse(jsonData);
            return res.status(200).json({ weather_data });
        });
    });

    request.on('error', (error) => {
        console.log(error);
        return res.sendStatus(500);
    });
    request.end();
}

async function daily(req, res, type) {
    if (!req.query.latitude || !req.query.longitude) return res.sendStatus(400);
    const request = getWeatherDaily(req.query.latitude, req.query.longitude, type, (response) => {
        let jsonData = "";
        response.on('data', (chunk) => {
            jsonData = jsonData.concat(chunk);
        });
        response.on('end', () => {
            const weather_data = JSON.parse(jsonData);
            return res.status(200).json({ weather_data });
        });
    });

    request.on('error', (error) => {
        console.log(error);
        return res.sendStatus(500);
    });
    request.end();
}

module.exports = { hourly, daily }