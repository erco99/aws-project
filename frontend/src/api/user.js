import request from "@/utils/request";

export function register(data) {
  return request({
    url: "/auth/register",
    method: "post",
    data,
  });
}

export function newOTP(data) {
  return request({
    url: "auth/newOTP",
    method: "post",
    data,
  });
}

export function verifyOTP(data) {
  return request({
    url: "/auth/verifyOTP",
    method: "post",
    data,
  });
}

export function cancelRegistration(data) {
  return request({
    url: "auth/cancel",
    method: "post",
    data,
  });
}

export function login(data) {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
}

export function refresh() {
  return request({
    url: "/auth/refresh",
    method: "post",
  });
}

export function logout() {
  return request({
    url: "/auth/logout",
    method: "post",
  });
}

export function user() {
  return request({
    url: "/auth/user",
    method: "get",
  });
}

export function getUsers() {
  return request({
    url: "/users",
    method: "get",
  });
}
