import { AxiosResponse } from 'axios'
import { App } from 'vue'
import request from './axios.config'

export interface HttpOption {
  url: string
  data?: any
  method?: string
  headers?: any
  beforeRequest?: () => void
  afterRequest?: () => void
}

export interface Response<T = any> {
  totalSize: number | 0
  code: number
  msg: string
  data: T
}

function http<T = any>({ url, data, method, headers, beforeRequest, afterRequest }: HttpOption) {
  const successHandler = (res: AxiosResponse<Response<T>>) => {
    return res.data
  }
  const failHandler = (error: Response<Error>) => {
    afterRequest && afterRequest()
    throw new Error(error.msg || 'Request failed with unknown exception!')
  }
  beforeRequest && beforeRequest()
  method = method || 'GET'
  const params = Object.assign(typeof data === 'function' ? data() : data || {}, {})
  // return method === 'GET'
  //   ? request.get(url, { params }).then(successHandler, failHandler)
  //   : request.post(url, params, { headers: headers }).then(successHandler, failHandler)

  if (method === 'GET') {
    return request.get(url, { params }).then(successHandler, failHandler)
  } else if (method === 'POST') {
    return request.post(url, params, { headers: headers }).then(successHandler, failHandler)
  } else if (method === 'PUT') {
    return request.put(url, params, { headers: headers }).then(successHandler, failHandler)
  } else if (method === 'DELETE') {
    return request.delete(url, { params }).then(successHandler, failHandler)
  } else {
    throw new Error(`Invalid method: ${method}`)
  }
}

export function get<T = any>({
  url,
  data,
  method = 'GET',
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    beforeRequest,
    afterRequest,
  })
}

export function post<T = any>({
  url,
  data,
  method = 'POST',
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    beforeRequest,
    afterRequest,
  })
}

export function put<T = any>({
  url,
  data,
  method = 'PUT',
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    beforeRequest,
    afterRequest,
  })
}

export function del<T = any>({
  url,
  data,
  method = 'DELETE',
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    beforeRequest,
    afterRequest,
  })
}

function install(app: App): void {
  app.config.globalProperties.$http = http

  app.config.globalProperties.$get = get

  app.config.globalProperties.$post = post

  app.config.globalProperties.$put = put

  app.config.globalProperties.$del = del
}

export default {
  install,
  get,
  post,
  put,
  del,
}
