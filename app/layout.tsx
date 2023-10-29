import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ToasterProvider from './(site)/context/ToasterProvider'
import AuthContext from './(site)/context/AuthContext'
import ActiveStatus from './(site)/components/shared/ActiveStatus'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Messenger Clone 2.0',
  description: 'This app is developed by Turkish Coders'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthContext>
          <ToasterProvider />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
