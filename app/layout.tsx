import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import { Web3Provider } from "@/contexts/web3-context"
import { Toaster } from "sonner"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
})

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "600"],
})

export const metadata: Metadata = {
  title: "Zhane Consulting Shares - ZCS Token IDO Platform",
          description: "Empowering Your Investment Journey with Trust and Transparency. Invest in ZCS tokens using NAIRA.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${sourceSansPro.variable} dark`}>
      <body className="font-sans antialiased">
        <Web3Provider>
          {children}
          <Toaster
            theme="dark"
            position="top-right"
            toastOptions={{
              style: {
                background: "#1e293b",
                border: "1px solid #334155",
                color: "#f1f5f9",
              },
            }}
          />
        </Web3Provider>
      </body>
    </html>
  )
}
