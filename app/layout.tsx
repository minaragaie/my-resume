import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Mina Youaness - Full-Stack Developer",
  description:
    "Full-Stack Web Developer with 10+ years of experience in Angular, React, Node.js, and building scalable, secure applications.",
  generator: "Mina Youaness",
  applicationName: "Mina Youaness Resume",
  keywords: [
    "Mina Youaness",
    "Full-Stack Developer",
    "Web Developer",
    "MEAN",
    "MERN",
    "Angular",
    "React",
    "Node.js",
    "TypeScript",
    "Web Development",
    "Resume",
    "Portfolio",
    "Professional Resume",
    "Software Engineer",
    "Web Applications",
    "Frontend Development",
    "Backend Development",
  ],
  authors: [{ name: "Mina Youaness", url: "https://minaragaie.github.io/" }],
  creator: "Mina Youaness",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} antialiased`} data-theme="vscode-dark">
      <body className="font-sans bg-base-100 text-base-content transition-colors duration-300">{children}</body>
    </html>
  )
}
