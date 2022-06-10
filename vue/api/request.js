//对axios 二次封装
import axios from "axios";
const request = axios.create({
  //基础路径，发请求的时候，路径当中会出现
  baseURL: "http://1.14.137.211:8888",
  //代表请求超时的时间5s
  timeout: 3000,
});
//请求拦截器：在发请求之前，请求可以检测到，可以在请求发出去之前做一些事情
request.interceptors.request.use((config) => {
  return config;
});
//响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功的回调函数，服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return response.data;
    // return response;
  },
  (error) => {
    //响应失败的回调
    console.log(error);
    // return Promise.reject(new Error("failed"));
  }
);
export default request;
