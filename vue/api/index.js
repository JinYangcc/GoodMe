import request from "./request";
//*获取菜单接口
export const gettealist = () => {
  return request({
    method: "get",
    url: "/tealist",
  });
};
//*获取订单号
export const getOrderNum = () => {
  return request({
    method: "get",
    url: "/buyId",
  });
};
//*登录
export const login = (data) => {
  return request({
    url: "/login",
    method: "post",
    data,
  });
};
//*添加
export const addTea = (data) => {
  return request({
    url: "/gentea",
    method: "post",
    data,
  });
};
