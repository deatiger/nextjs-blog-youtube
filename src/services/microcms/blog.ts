import { createClient } from 'microcms-js-sdk'
import type { BlogsResponse, Blog } from '@/domains/blog'

export const getBlogs = async (
  config: {
    serviceDomain: string
    apiKey: string
  },
  queries?: {
    offset?: number
    limit?: number
    filters?: string
}): Promise<BlogsResponse> => {
  const client = createClient({
    serviceDomain: config.serviceDomain,
    apiKey: config.apiKey,
  })

  return await client.get({
    endpoint: 'blogs',
    queries,
  })
}

export const getBlog = async (
  config: {
    serviceDomain: string
    apiKey: string
  },
  contentId: string
): Promise<Blog> => {
  const client = createClient({
    serviceDomain: config.serviceDomain,
    apiKey: config.apiKey,
  })

  return await client.get({
    endpoint: 'blogs',
    contentId,
  })
}