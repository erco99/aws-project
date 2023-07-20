import request from "@/utils/request";

export function getFields() {
  return request({
    url: "/booking/fields",
    method: "get",
  });
}

export function getWeek(params) {
  return request({
    url: "/booking/week",
    method: "get",
    params,
  });
}
