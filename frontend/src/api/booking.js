import request from "@/utils/request";

export function getFields() {
  return request({
    url: "/booking/fields",
    method: "get",
  });
}
