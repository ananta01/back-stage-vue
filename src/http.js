import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from './router'
import LocalStorageData from './assets/js/loaclStorageData'

const localStorageData = new LocalStorageData('ananta')

let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

// 请求拦截
axios.interceptors.request.use(config => {
  // 加载动画
  startLoading();

  // 设置统一请求头
  const token = localStorageData.get();
  if (token) {
    config.headers.Authorization = token
  }
  return config;

}, error => {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
  endLoading();
  return response
}, error => {
  endLoading();
  Message.error(error.response.data)

  // 获取错误状态码
  const { status } = error.response;
  if (status == 401) {
    Message.error('token失效，请重新登录')
    // 清除token
    localStorageData.remove('ananta')
    router.push('/login')
  }

  return Promise.reject(error)

})

export default axios