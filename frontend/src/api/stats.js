import request from "@/utils/request";

export function getYearDistribution(year) {
    return request({
        url: "/stats/yearDistribution",
        method: "get",
        params: year,
    });
}