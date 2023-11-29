import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'
import favicon from 'public/favicon.ico'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'convertmyfec',
  description: 'Generated by create next app',
  generator: 'Next.js',
  applicationName: 'convertmyfec',
  keywords: ['FEC', 'convertisseur', 'comptes auxiliaires', 'racines comptables'],
  authors: [{name: 'Thomas Ramillon', url: 'https://portfolio-tomram.vercel.app'}],
  creator: 'Thomas Ramillon',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  linkedin: {
    title: 'Thomas Ramillon',
    description: 'Développeur Web Front-end',
    url: 'https://www.linkedin.com/in/thomas-ramillon-0b584611b'
  }

}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <Head>
        <link rel='icon' href={favicon} />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
