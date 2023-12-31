import type { Metadata } from 'next'
import { Inter, Tangerine } from 'next/font/google'
import './globals.css'
import { GlobalContextProvider } from "./context/store";

const inter = Inter({ subsets: ['latin'] })
const tangerine = Tangerine({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'StyleFast',
  description: 'Edit & Live Preview styles for your website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  )
}
