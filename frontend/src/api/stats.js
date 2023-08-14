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