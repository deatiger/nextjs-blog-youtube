import type { MicroCMSImage, MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'

export type Category = {
  id: string
  name: string
} & MicroCMSContentId & MicroCMSDate

export type Blog = {
  // Required fields
  title: string
  content: string
  // Optional fields
  eyecatch?: MicroCMSImage
  category?: Category
  publishedAt?: string
} & MicroCMSContentId & MicroCMSDate

export type BlogsResponse = {
  contents: Blog[]
  totalCount: number
  offset: number
  limit: number
}