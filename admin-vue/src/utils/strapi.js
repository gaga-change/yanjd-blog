import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_STRAPI_BASE, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.errors && res.errors.length) {
      // const msg = res.errors.map(v => v.message).join('\r\n') || 'Error'
      const msg = res.errors[0].message || 'Error'
      Message({
        message: typeof msg === 'string' ? msg : msg.type,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(msg))
    }
    return res
  },
  error => {
    let message = error.message
    if (message === 'Network Error') {
      message = '网络异常，请稍后再试'
    } else if (error.message.includes('timeout')) {
      message = '服务器连接超时，请稍后再试'
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
