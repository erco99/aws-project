const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}

module.exports = corsOptions;