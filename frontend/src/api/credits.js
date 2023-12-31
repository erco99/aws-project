import request from "@/utils/request";

export function paymentMethodInsert(data) {
  return request({
    url: "/credits/paymentMethodInsert",
    method: "post",
    data
  })
}

export function depositWithdrawMoney(data) {
  return request({
    url: "/credits/depositWithdrawMoney",
    method: "post",
    data
  })
}

export function getTransactions(data) {
  return request({
    url: "/credits/getTransactions",
    method: "post",
    data
  })
}

export function deletePaymentMethod(data) {
  return request({
    url: "/credits/deletePaymentMethod",
    method: "post",
    data
  })
}

export function sendMoney(data) {
  return request({
    url: "/credits/sendMoney",
    method: "post",
    data
  })
}
