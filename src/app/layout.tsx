import type { Metadata } from 'next'
import { Header } from '@/components/ui/Header'
import 'remixicon/fonts/remixicon.css'
import '@/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Site Title',
  description: 'Site description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}