'use client'

import { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'
import { Theme } from '@/types/resume'

type FontSize = 'small' | 'medium' | 'large'

export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') || 'dark') as Theme
    const savedFont = (localStorage.getItem('fontSize') || 'medium') as FontSize

    // Apply theme class to <html>
    const html = document.documentElement
    // html.classList.remove('theme-dark', 'theme-light', 'theme-high-contrast', 'theme-monokai')
    // html.classList.add(`theme-${savedTheme}`)

    // Apply font size
    const sizeMap: Record<FontSize, string> = { small: '14px', medium: '16px', large: '18px' }
    html.style.setProperty('--base-font-size', sizeMap[savedFont])

    setMounted(true)
  }, [])

  if (!mounted) return null // prevent SSR/client mismatch

  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme={localStorage.getItem('theme') || 'dark'} // dynamic defaultTheme
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  )
}
