import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import Link from 'next/link'
import { BASE_PATH } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  generator: "Next.js",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icon-192x192.png" },
    { rel: "icon", url: "icon-192x192.png" },
  ],
}

// Providers wrap around our application and give them access to data.
// NextThemesProvider - Give our application access to light / dark mode data.
// Providers are generally on the client side ("use client")
// Switch from light mode to dark mode <-- user interaction / needs the client to exist.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main className="flex flex-col items-center min-h-screen p-24">
            <div className="z-10 items-center justify-between w-full max-w-5xl text-sm lg:flex">
              <Link href="/"><h2 className="text-2xl text-bold">PokemonFinder</h2></Link>
            </div>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
