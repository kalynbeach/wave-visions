import './globals.css'
import { Inter } from 'next/font/google'
import Header from './ui/Header'
import Footer from './ui/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'wave-visions',
  description: 'Audio visualization experiments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
