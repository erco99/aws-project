import axios from "axios";

const baseURL = "http://localhost:10000";

export default {
    install: (app, options) => {
        const axiosInstance = axios.create({
            baseURL: options ? options.baseURL : baseURL,
            headers: {
                Accept: "application/json",
            },
        });
        app.provide('axios', axiosInstance);
    }
}
