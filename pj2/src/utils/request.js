import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:3000/api', // 后端API基础路径
  timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里添加请求头，如token
    return config;
  },
  error => {
    console.log(error); // 用于调试
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 如果响应状态码不是200，显示错误信息
    if (response.status !== 200) {
      ElMessage({
        message: res.message || '请求失败',
        type: 'error',
        duration: 3 * 1000
      });
      return Promise.reject(new Error(res.message || '请求失败'));
    } else {
      return res;
    }
  },
  error => {
    console.log('err' + error); // 用于调试
    ElMessage({
      message: error.message || '网络错误',
      type: 'error',
      duration: 3 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;    