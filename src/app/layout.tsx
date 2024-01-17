import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script
        id="hockeystack"
        dangerouslySetInnerHTML={{
          __html: `
var hsscript = document.createElement("script");
hsscript.src = "https://cdn.jsdelivr.net/npm/hockeystack@latest/hockeystack.min.js";
hsscript.async = 1;
hsscript.dataset.apikey = "${process.env.NEXT_PUBLIC_HOCKEYSTACK_API_KEY}";
hsscript.dataset.cookieless = 1;
hsscript.dataset.autoIdentify = 1;
document.getElementsByTagName('head')[0].append(hsscript);
                    `,
        }}
      />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
