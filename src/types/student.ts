export interface Student {
  _id: string
  displayId: string
  firstname: string
  lastname: string
  profileUrl: string
  dob: string
  gender: string
  address: string
  email: string
  phone: string
  parentInfo: ParentInfo
  enrollmentDate: string
  createdBy: string
  branchId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ParentInfo {
  displayId: string
  fatherName: string
  motherName: string
  contact: string
  createdBy: any
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}
