import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { MediaDevicesProvider } from './media-devices-context'
import { StreamProvider } from './stream-context'
import { VisionsProvider } from './visions-context'
import Header from '@/components/header'
import Footer from '@/components/footer'

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
    <html lang="en" className="dark">
      <body className={`${inter.className} w-screen h-screen p-2`}>
        <MediaDevicesProvider>
          <StreamProvider>
            <VisionsProvider>
              <div className='w-full h-full flex flex-col gap-2 justify-between'>
                <Header />
                {children}
                {/* <Footer /> */}
              </div>
            </VisionsProvider>
          </StreamProvider>
        </MediaDevicesProvider>
      </body>
    </html>
  )
}
