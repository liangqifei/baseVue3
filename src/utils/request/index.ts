// src/utils/axios.ts
import axios from 'axios'

// 创建 axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // 使用 Vite 环境变量设置基础 URL
  timeout: 10000,  // 请求超时设置为 10 秒
  headers: {
    'Content-Type': 'application/json',
  }
})

// 请求拦截器：在请求发送之前做一些处理，比如添加 token 等
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')  // 假设你存储了 token 在 localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器：处理响应，统一格式化返回的数据
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data  // 只返回 data 部分，方便后续处理
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized, please login.')
          break
        case 500:
          console.error('Server error, please try again later.')
          break
        default:
          console.error('Error:', error.response.status)
      }
    } else {
      console.error('Network error or request timeout.')
    }
    return  Promise.reject(error)
  }
)

// 定义常用请求方法的泛型类型
type RequestResponse<T> = AxiosResponse<T>

// 封装 GET 请求，支持覆盖默认配置
export const getRequest = <T>(
  url: string, 
  params?: object, 
  options?: AxiosRequestConfig
): Promise<RequestResponse<T>> => {
  return axiosInstance.get<T>(url, { params, ...options })  // 合并 options 参数
}

// 封装 POST 请求，支持覆盖默认配置
export const postRequest = <T>(
  url: string, 
  data: object, 
  options?: AxiosRequestConfig
): Promise<RequestResponse<T>> => {
  return axiosInstance.post<T>(url, data, options)  // 合并 options 参数
}

// 封装 PUT 请求，支持覆盖默认配置
export const putRequest = <T>(
  url: string, 
  data: object, 
  options?: AxiosRequestConfig
): Promise<RequestResponse<T>> => {
  return axiosInstance.put<T>(url, data, options)  // 合并 options 参数
}

// 封装 DELETE 请求，支持覆盖默认配置
export const deleteRequest = <T>(
  url: string, 
  options?: AxiosRequestConfig
): Promise<RequestResponse<T>> => {
  return axiosInstance.delete<T>(url, options)  // 合并 options 参数
}

// 封装文件上传（POST）请求，支持覆盖默认配置
export const uploadFile = <T>(
  url: string, 
  formData: FormData, 
  options?: AxiosRequestConfig
): Promise<RequestResponse<T>> => {
  return axiosInstance.post<T>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...options  // 合并 options 参数
  })
}

// 封装文件下载（GET）请求，支持覆盖默认配置
export const downloadFile = <T>(
  url: string, 
  params?: object, 
  options?: AxiosRequestConfig
): Promise<AxiosResponse<Blob>> => {
  return axiosInstance.get(url, {
    params,
    responseType: 'blob',
    ...options  // 合并 options 参数
  })
}
