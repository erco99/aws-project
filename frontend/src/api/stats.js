import request from "@/utils/request";

export function getYearDistribution(year) {
    return request({
        url: "/stats/yearDistribution",
        method: "get",
        params: year,
    });
}

export function getFieldDistribution(year) {
    return request({
        url: "/stats/fieldDistribution",
        method: "get",
        params: year,
    })
}

export function getUsersDistribution() {
    return request({
        url: "/stats/usersDistribution",
        method: "get",
    })
}

export function getEarningsStats() {
    return request({
        url: "/stats/earningsStats",
        method: "get",
    })
}