// 统一处理接口配置
import axios from 'axios'
import { getToken, getCode, removeToken } from '@/utils/auth'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  // headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  // headers: { 'X-Requested-With': self.hqLoginCookieKey },
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (getToken()) {
    config.headers['Authorization'] = getToken()
    config.headers['companyCode'] = getCode()
  } else {
    console.log(config.url)
  }
  // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  return config
}, error => {
  // Do something with request error
  console.log('error', error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    console.log('response', response)
    if (response.data.code === '911') {
      store.dispatch('showConfirm', {
        title: '提示',
        text: '您已被登出，请重新登录!',
        onConfirm () {
          store.dispatch('hideConfirm')
          removeToken()
          window.location.reload()
          return Promise.reject(response.data.message)
        },
        onCancel () {
          store.dispatch('hideConfirm')
        }
      })
    } else {
      return response
    }
  },
  error => {
    console.log('error', error)// for debug
    // if (error.response.status === 401) {
    //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //     confirmButtonText: '重新登录',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     store.dispatch('FedLogOut').then(() => {
    //       location.reload()// 为了重新实例化vue-router对象 避免bug
    //     })
    //   })
    // } else {
    //   const errMsg = error.response.status >= 500 ? '系统繁忙' : '参数错误'
    //   Message.error(errMsg)
    // }
    return Promise.reject(error)
  })

export default service
