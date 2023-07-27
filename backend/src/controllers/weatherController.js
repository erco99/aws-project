const { getWeatherHourly, getWeatherDaily } = require('../api/weather');

async function weather(req, res, type) {
    if (!req.query.latitude || !req.query.longitude || !req.query.from) return res.sendStatus(400);
    const api = type === "daily" ? getWeatherDaily : type === "hourly" ? getWeatherHourly : undefined;
    if (!api) return res.sendStatus(400);
    const request = api(req.query.latitude, req.query.longitude, new Date(req.query.from), (response) => {
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

module.exports = { weather }