'use client'

import { Category } from '@/domains/blog'
import styles from './CategoryFilter.module.scss'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  categories: Category[]
}

export const CategoryFilter = ({ categories }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategoryId = searchParams.get('category')

  const handleSelect = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (categoryId) {
      params.set('category', categoryId)
    } else {
      params.delete('category')
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className={styles.categories}>
      <button
        className={clsx(styles.category, {
          [styles.active]: selectedCategoryId === null,
        })}
        onClick={() => handleSelect(null)}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={clsx(styles.category, {
            [styles.active]: selectedCategoryId === category.id,
          })}
          onClick={() => handleSelect(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}