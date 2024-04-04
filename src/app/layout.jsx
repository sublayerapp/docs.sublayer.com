import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'
import * as snippet from '@segment/snippet'
import clsx from 'clsx'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { Analytics } from "@vercel/analytics/react";

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Use local version of Lexend so that we can use OpenType features
const lexend = localFont({
  src: '../fonts/lexend.woff2',
  display: 'swap',
  variable: '--font-lexend',
})

export const metadata = {
  title: {
    template: '%s - Docs',
    default: 'Sublayer - Ruby AI Framework',
  },
  description:
    'Sublayer is a Ruby AI Framework that simplifies building Gen AI-powered applications.',
}

function renderSnippet() {
  return snippet.max({
    apiKey: process.env.SEGMENT_WRITE_KEY,
    page: true,
  })
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, lexend.variable)}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <Script id="segment-script" dangerouslySetInnerHTML={{ __html: renderSnippet() }} />
      </head>
      <body className="flex min-h-full bg-white dark:bg-slate-900">
        <Providers>
          <Layout>{children}</Layout>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
