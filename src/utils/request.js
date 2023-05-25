import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
console.log(process.env.VUE_APP_BASE_API)
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  res => {
    // 未设置状态码则默认成功状态
    const code = res.data.error || 200
    // 获取错误信息
    // const msg = errorCode[code] || res.message || errorCode['default']
    const msg = res.data.error
    if (msg == '需要登录') {
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // store.dispatch('user/logout')
        // location.href = '/login';
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    
    if (code !== 'OK') {
      Message({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else {
      return res.data
    }
  },
  
  error => {
    Message({
      message: error.response.data.message?error.response.data.message:error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
