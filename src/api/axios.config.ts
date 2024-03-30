import Axios, { AxiosResponse } from 'axios'
import qs from 'qs'

export const baseURL = import.meta.env.VITE_API_BASE_URL as string

export const CONTENT_TYPE = 'Content-Type'

export const FORM_URLENCODED = 'application/x-www-form-urlencoded; charset=UTF-8'

export const APPLICATION_JSON = 'application/json; charset=UTF-8'

export const TEXT_PLAIN = 'text/plain; charset=UTF-8'

const service = Axios.create({
  baseURL,
  timeout: 10 * 60 * 1000,
})

service.interceptors.request.use(
  (config) => {
    !config.headers && (config.headers = {})
    if (!config.headers[CONTENT_TYPE]) {
      config.headers[CONTENT_TYPE] = APPLICATION_JSON
    }
    if (config.headers[CONTENT_TYPE] === FORM_URLENCODED) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response
  },
  (error) => {
    if (import.meta.env.MODE === 'development') {
      console.log(error)
    }

    const msg = Array.isArray(error?.response?.data?.message)
      ? error?.response?.data?.message.join(', ')
      : error?.response?.data?.message

    return Promise.reject({ code: error?.response?.status, msg: msg || 'Internal server error' })
  }
)

export default service
