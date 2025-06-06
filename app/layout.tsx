import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vivek Pahilwan - UI/UX Designer",
  description:
    "A design enthusiast pursuing B.Tech at Vishwakarma Institute of Information Technology, Pune. Looking for UI/UX or Product Design opportunities.",
  keywords: ["UI/UX Designer", "Product Designer", "Design Systems", "Mobile Design", "Web Design", "Figma"],
  authors: [{ name: "Vivek Pahilwan" }],
  creator: "Vivek Pahilwan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vivek-portfolio.com",
    title: "Vivek Pahilwan - UI/UX Designer",
    description:
      "A design enthusiast pursuing B.Tech at Vishwakarma Institute of Information Technology, Pune. Looking for UI/UX or Product Design opportunities.",
    siteName: "Vivek Pahilwan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Pahilwan - UI/UX Designer",
    description:
      "A design enthusiast pursuing B.Tech at Vishwakarma Institute of Information Technology, Pune. Looking for UI/UX or Product Design opportunities.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
