import type { Strapi3RequestParams } from '../types/v3'
import { useStrapiClient } from '#imports'

interface StrapiV3Client<T> {
  count(contentType: string, params?: Strapi3RequestParams): Promise<number>
  find<F = T[]>(contentType: string, params?: Strapi3RequestParams): Promise<F>
  findOne<F = T>(contentType: string, id?: string | number | Strapi3RequestParams, params?: Strapi3RequestParams): Promise<F>
  create<F = T>(contentType: string, data: Partial<F>): Promise<F>
  update<F = T>(contentType: string, id: string | number | Partial<F>, data?: Partial<F>): Promise<F>
  delete<F = T>(contentType: string, id?: string | number): Promise<F>
}

export const useStrapi = <T>(): StrapiV3Client<T> => {
  const client = useStrapiClient()

  /**
   * Count {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Strapi3RequestParams} [params] - Query parameters
   * @returns Promise<number>
   */
  const count = (contentType: string, params?: Strapi3RequestParams): Promise<number> => {
    return client(`/${contentType}/count`, { method: 'GET', params })
  }

  /**
   * Get a list of {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Strapi3RequestParams} [params] - Query parameters
   * @returns Promise<T>
   */
  const find = <T>(contentType: string, params?: Strapi3RequestParams): Promise<T> => {
    return client(`/${contentType}`, { method: 'GET', params })
  }

  /**
   * Get a specific {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry
   * @param  {Strapi3RequestParams} [params] - Query parameters
   * @returns Promise<T>
   */
  const findOne = <T>(contentType: string, id?: string | number | Strapi3RequestParams, params?: Strapi3RequestParams): Promise<T> => {
    if (typeof id === 'object') {
      params = id
      id = undefined
    }

    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'GET', params })
  }

  /**
   * Create a {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const create = <T>(contentType: string, data: Partial<T>): Promise<T> => {
    return client(`/${contentType}`, { method: 'POST', body: data })
  }

  /**
   * Update an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be updated
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const update = <T>(contentType: string, id: string | number | Partial<T>, data?: Partial<T>): Promise<T> => {
    if (typeof id === 'object') {
      data = id
      id = undefined
    }

    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'PUT', body: data })
  }

  /**
   * Delete an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be deleted
   * @returns Promise<T>
   */
  const _delete = <T>(contentType: string, id?: string | number): Promise<T> => {
    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'DELETE' })
  }

  return {
    count,
    find,
    findOne,
    create,
    update,
    delete: _delete
  }
}
