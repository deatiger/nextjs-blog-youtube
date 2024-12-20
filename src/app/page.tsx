import { getRequestContext } from '@cloudflare/next-on-pages'
import { getBlogs } from '@/services/microcms/blog'
import { getCategories } from '@/services/microcms/category'
import { CategoryFilter } from '@/components/features/Blog/CategoryFilter'
import { formatDate } from '@/utils/date'
import Link from 'next/link'
import styles from './page.module.scss'

const DEFAULT_THUMBNAIL = '/images/default-thumbnail.jpg'

export const runtime = "edge"

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const env = getRequestContext().env
  const { contents: categories } = await getCategories({
    serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
    apiKey: env.MICROCMS_API_KEY,
  })

  const filters = searchParams.category
    ? `category[equals]${encodeURIComponent(searchParams.category)}`
    : undefined
  
  const { contents: blogs } = await getBlogs(
    {
      serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
      apiKey: env.MICROCMS_API_KEY, 
    }, 
    { filters }
  )

  return (
    <main className={styles.main}>
      <h1>Blog Posts</h1>
      <CategoryFilter categories={categories} />
      <div className={styles.grid}>
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.id}`} className={styles.card}>
            {blog.eyecatch ? (
              <img
                src={blog.eyecatch.url}
                alt=""
                className={styles.eyecatch}
                width={blog.eyecatch.width}
                height={blog.eyecatch.height}
              />
            ) : (
              <img
                src={DEFAULT_THUMBNAIL}
                alt=""
                className={styles.eyecatch}
                width={300}
                height={200}
              />
            )}
            <div className={styles.content}>
              <h2>{blog.title}</h2>
              {blog.category && (
                <p className={styles.category}>{blog.category.name}</p>
              )}
              {blog.publishedAt && (
                <time dateTime={blog.publishedAt}>
                  {formatDate(blog.publishedAt)}
                </time>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}