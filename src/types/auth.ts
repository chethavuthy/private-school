export interface LoginResponse {
  _id: string
  username: string
  isActive: boolean
  isVerify: boolean
  roleId: string
  branchId: string
  createdBy: any
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
  permissionList: PermissionList
  accessToken: string
  refreshToken: string
}

export interface PermissionList {
  sale: Sale
  stockroom: Stockroom
  attendance: Attendance
  enrollment: Enrollment
  student: Student
  teacher: Teacher
  role: Role
  user: User
  branch: Branch
  payment: Payment
  classroom: Classroom
  course: Course
  category: Category
  setting: Setting
  dashboard: Dashboard
  report: Report
}

export interface Sale {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Stockroom {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Attendance {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Enrollment {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Student {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Teacher {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Role {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface User {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Branch {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Payment {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Classroom {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Course {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Category {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Setting {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Dashboard {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface Report {
  view: boolean
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export interface UserRequest {
  firstname: string
  lastname: string
  profileUrl: string
  dob: string
  gender: string
  address: string
  email: string
  phone: string
  parentInfo: ParentInfo
  branchId: string
  enrollmentDate: string
}

export interface ParentInfo {
  fatherName: string
  motherName: string
  contact: string
}
