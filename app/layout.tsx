// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";

// --------------------
// Font Configuration
// --------------------
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "500", "600"],
});

// --------------------
// Metadata
// --------------------
export const metadata: Metadata = {
  title: "Mina Youaness - Full-Stack Developer",
  description:
    "Resume of Mina Youaness, Full-Stack Web Developer with 10+ years of experience in Angular, React, Node.js, and scalable web applications.",
  generator: "Mina Youaness",
  applicationName: "Mina Youaness Resume",

  openGraph: {
    title: "Mina Youaness - Full-Stack Developer",
    description:
      "Resume of Mina Youaness, Full-Stack Web Developer with 10+ years of experience in Angular, React, Node.js, and scalable web applications.",
    url: "https://minaragaie.github.io/",
    siteName: "Mina Youaness Resume",
    images: [
      {
        url: "/images/profile.jpg", // Ensure this path is correct (no /public prefix needed in Next.js)
        width: 1200,
        height: 630,
        alt: "Mina Youaness Resume",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  viewport: { width: "device-width", initialScale: 1 },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },

  keywords: [
    "Mina Youaness",
    "Full-Stack Developer",
    "Web Developer",
    "Angular",
    "React",
    "Node.js",
    "TypeScript",
    "Frontend Development",
    "Backend Development",
    "Resume",
    "Portfolio",
    "Software Engineer",
    "Web Applications",
  ],

  authors: [{ name: "Mina Youaness", url: "https://minaragaie.github.io/" }],
  creator: "Mina Youaness",
};

// --------------------
// Root Layout
// --------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased transition-colors duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
