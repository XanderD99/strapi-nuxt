import type { MetaResponsePaginationByOffset, MetaResponsePaginationByPage, PaginationByOffset, PaginationByPage, StrapiLocale, StrapiRequestParamField, StrapiRequestParamPopulate, StrapiRequestParamSort } from '.'

export interface Strapi5Error {
  error: {
    status: number
    name: string
    message: string
    details: Record<string, unknown>
  }
}

export interface Strapi5RequestParams<T> {
  fields?: Array<StrapiRequestParamField<T>>
  populate?: '*' | StrapiRequestParamPopulate<T> | Array<StrapiRequestParamPopulate<T>>
  sort?: StrapiRequestParamSort<T> | Array<StrapiRequestParamSort<T>>
  pagination?: PaginationByOffset | PaginationByPage
  filters?: Record<string, unknown>
  status?: 'published' | 'draft'
  locale?: StrapiLocale | null
}

export interface StrapiSystemFields {
  documentId: string
  locale?: string
}

export type Strapi5ResponseData<T> = T extends object
  ? T extends Array<infer U>
    ? Array<Strapi5ResponseData<U>> // Handle arrays
    : T extends Record<string, unknown>
      ? { [K in keyof T]: Strapi5ResponseData<T[K]> } & StrapiSystemFields
      : T
  : T

// Pagination interface for optional pagination info in the meta field
export interface StrapiResponseMetaPagination {
  page: number
  pageSize: number
}

export interface Strapi5ResponseSingle<T> {
  data: Strapi5ResponseData<T>
  meta: Strapi5ResponseMeta
}

export interface Strapi5ResponseMany<T> {
  data: Strapi5ResponseData<T>[]
  meta: Strapi5ResponseMeta
}

export interface Strapi5ResponseMeta {
  pagination: MetaResponsePaginationByPage | MetaResponsePaginationByOffset
  [key: string]: unknown
}
