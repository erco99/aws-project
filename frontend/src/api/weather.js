import request from "@/utils/request";

export function getHourlyWeather(params) {
    return request({
        url: "/weather/hourly",
        method: "get",
        params: params
    })
}

export function getDailyWeather(params) {
    return request({
        url: "weather/daily",
        method: "get",
        params: params
    })
}