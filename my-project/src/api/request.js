// 对axios进行二次封装
import axios from "axios";
// 引入nprogress插件
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";
//在当前模块引入store模块
import store from "@/store";

const requests = axios.create({
  // 基础路径,作用是将来发请求的时候，会自动把基础的路径拼接到当前路径前面
  baseURL: "/api",
  // 请求不能超过5秒
  timeout: 5000,
});

// 请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config) => {
  //请求头加个字段，token，和后台老师约定好的
  
  if (store.state.detail.uuid_token) {
    //请求头添加一个字段(userTempId):和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token;
}
    //需要携带token带给服务器
    if (store.state.user.token) {
      config.headers.token = store.state.user.token;
  }
  // 开始进度条
  nprogress.start();
  // config是配置对象，对象中有一个属性叫headers，这个属性是一个对象，对象中存放的是请求头的信息
  return config;
});

// 响应拦截器----当服务器响应请求后，会执行的
requests.interceptors.response.use(
  (res) => {
    // 响应成功做的事情,并且结束进度条
    nprogress.done();
    return res.data;
  },
  (err) => {
    // 进度条结束
   

    nprogress.done();
    // 处理响应失败的情况
    return Promise.reject(new Error("请求失败"));
  }
);

export default requests;
