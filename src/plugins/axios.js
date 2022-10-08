import Vue from 'vue'
import axios from "axios";
import {
    Toast
} from 'vant';
// 导入axios
import VueAxios from 'vue-axios'
// 自定义axios配置
const config = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 1000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json; charset=UTF-8;"
    }
});

const _axios = axios.create(config);
_axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
// axios 添加请求拦截器
_axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// axios 添加响应拦截器
_axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.status !== 200) {
        Toast.fail('接口内部报错');
    }
    Toast.clear()
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
})


Vue.use(VueAxios, _axios)