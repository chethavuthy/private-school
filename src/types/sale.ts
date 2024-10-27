export interface ISaleCreate {
  branchId: string
  studentId: string
  saleDate: string
  totalPaid: number
  itemList: ItemList[]
  discountPercent: number
}

export interface ItemList {
  stockroomId: string
  qty: number
  price: number
}
