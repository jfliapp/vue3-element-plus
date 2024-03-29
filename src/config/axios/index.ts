import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  // AxiosRequestHeaders,
  AxiosResponse,
  AxiosError
} from 'axios'

import { ElMessage } from 'element-plus'
import { useCache } from '@/hooks/web/useCache'
import router, { resetRouter } from '@/router'
import { useTagsViewStore } from '@/store/modules/tagsView'
// import qs from 'qs'

import { config } from '@/config/axios/config'

const { result_code, base_url } = config
const { wsCache } = useCache()
const tagsViewStore = useTagsViewStore()

export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH]
// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.request_timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // if (
    //   config.method === 'post' &&
    //   (config.headers as AxiosRequestHeaders)['Content-Type'] ===
    //     'application/x-www-form-urlencoded'
    // ) {
    //   config.data = qs.stringify(config.data)
    // }
    // get参数编码
    if (config.method === 'get' && config.params) {
      let url = config.url as string
      url += '?'
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<Recordable>) => {
    if (response.data.error === result_code) {
      response.data = {
        data: response.data
      }
      return response.data
    } else {
      ElMessage.error(response.data.message)

      wsCache.clear()
      tagsViewStore.delAllViews()
      resetRouter() // 重置静态路由表
      router.replace('/login')
    }
  },
  (error: AxiosError) => {
    console.log('err' + error) // for debug
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export { service }
