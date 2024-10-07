export interface Pagination {
  totalDocs: number
  totalPages: number
  hasPrevPage: boolean
  prevPage: any
  hasNextPage: boolean
  nextPage: any
  page: number
  limit: number
}