const { week } = require('../api/weather');

async function weather(req, res) {
    console.log(req.query)
    if (!req.query.latitude || !req.query.longitude) return res.sendStatus(400);
    const request = week(req.query.latitude, req.query.longitude, (response) => {
        let jsonData = "";
        response.on('data', (chunk) => {
            jsonData = jsonData.concat(chunk);
        });
        response.on('end', () => {
            const weather_data = JSON.parse(jsonData);
            return res.status(200).json({ weather_data });
        })
    });

    request.on('error', (error) => {
        console.log(error);
        return res.sendStatus(500);
    });
    request.end();

}

module.exports = { weather }