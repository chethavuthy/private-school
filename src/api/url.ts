import { baseURL } from './axios.config'

export const baseAddress = baseURL

export const AUTH = {
  LOGIN: '/auth/login',
  REFRESH_TOKEN: '/auth/refresh-token',
  CREATE_USER: '/user',
  GET_USER: '/user',
  UPDATE_USER: '/user',
  CHANGE_PASSWORD: '/auth/account/change-password',
}

export const STUDENT = {
  CREATE: '/student',
  LIST: '/student',
  GET_ONE: '/student',
  DELETE: '/student',
  UPDATE: '/student',
}

export const BRANCH = {
  CREATE: '/branch',
  LIST: '/branch',
  GET_ONE: '/branch',
  DELETE: '/branch',
  UPDATE: '/branch',
}

// export const Category = {
//   CREATE: '/category/create',
//   LIST: '/category',
//   DELETE: '/category/delete',
//   UPDATE: '/category/update',
//   GET: '/category',
// }

// export const Poster = {
//   CREATE: '/poster/admin/create',
//   LIST: '/poster/admin/list',
//   DELETE: '/poster/admin/delete',
//   UPDATE: '/poster/admin/update',
//   GET: '/poster/admin',
// }

// export const BusinessType = {
//   CREATE: '/business-type/create',
//   LIST: '/business-type/list',
//   DELETE: '/business-type/delete',
//   UPDATE: '/business-type/update',
//   GET: '/business-type',
// }

// export const Role = {
//   CREATE: '/role/create',
//   LIST: '/role/list',
//   DELETE: '/role/delete',
//   UPDATE: '/role/update',
//   GET: '/role',
// }

// export const Banner = {
//   CREATE: '/banner/admin/create',
//   LIST: '/banner/admin/list',
// }

// export const RequestDesign = {
//   LIST: '/request-design/admin/list',
// }

export const test = '/test'

export const login = '/login'

export const updateUserInfo = '/updateUser'

export const addUserInfo = '/addUser'

export const getMenuListByRoleId = '/getMenusByRoleId'

export const getAllMenuByRoleId = '/getAllMenuByRoleId'

export const deleteUserById = '/deleteUserById'

export const getDepartmentList = '/getDepartmentList'

export const addDepartment = '/addDepartment'

export const getRoleList = '/getRoleList'

export const getMenuList = '/getMenuList'

export const getParentMenuList = '/getParentMenuList'

export const getTableList = '/getTableList'

export const getCardList = '/getCardList'

export const getCommentList = '/getCommentList'
