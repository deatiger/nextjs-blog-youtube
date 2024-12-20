import { getRequestContext } from '@cloudflare/next-on-pages'
import { getBlog } from '@/services/microcms/blog'
import { formatDate } from '@/utils/date'
import parse from 'html-react-parser'
import styles from './page.module.scss'

const DEFAULT_THUMBNAIL = '/images/default-thumbnail.jpg'

export const runtime = "edge"

export default async function BlogDetail({
  params,
}: {
  params: { id: string }
}) {
  const env = getRequestContext().env
  const blog = await getBlog({
    serviceDomain: env.MICROCMS_SERVICE_DOMAIN ?? "",
    apiKey: env.MICROCMS_API_KEY ?? "",
  }, params.id)

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{blog.title}</h1>
        <div className={styles.meta}>
          {blog.category && (
            <p className={styles.category}>{blog.category.name}</p>
          )}
          {blog.publishedAt && (
            <time dateTime={blog.publishedAt}>
              {formatDate(blog.publishedAt)}
            </time>
          )}
        </div>
      </header>

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
          width={1200}
          height={400}
        />
      )}

      <div className={styles.content}>
        {parse(blog.content)}
      </div>
    </article>
  )
}