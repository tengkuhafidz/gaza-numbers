import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gaza in Numbers 🇵🇸',
  description: 'Stay informed on the latest Gaza-Nakba numbers',
  metadataBase: new URL('https://gaza-numbers.jariyah.app'),
  openGraph: {
    title: 'Gaza in Numbers 🇵🇸',
    description: 'Stay informed on the latest Gaza-Nakba numbers',
    siteName: 'Gaza in Numbers 🇵🇸',
    images: 'https://og.tailgraph.com/og?fontFamily=Roboto&title=Gaza%20in%20Numbers&titleTailwind=font-bold%20text-6xl%20text-white&text=Stay%20informed%20on%20the%20latest%20Gaza-Nakba%20martyrs%20numbers&textTailwind=text-2xl%20mt-4%20text-white&logoTailwind=h-8&bgTailwind=bg-black&footer=gaza-numbers.jariyah.app&footerTailwind=text-white&t=1705504316657&refresh=1',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
