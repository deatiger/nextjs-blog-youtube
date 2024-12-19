import { createClient } from 'microcms-js-sdk'
import type { Category } from '@/domains/blog'

export type CategoriesResponse = {
  contents: Category[]
  totalCount: number
  offset: number
  limit: number
}

export const getCategories = async (config: {
  serviceDomain: string
  apiKey: string
}): Promise<CategoriesResponse> => {
  const client = createClient({
    serviceDomain: config.serviceDomain,
    apiKey: config.apiKey,
  })

  return await client.get({
    endpoint: 'categories',
  })
}