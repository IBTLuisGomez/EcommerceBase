import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { defaultTheme, type ThemeConfig } from './types'

const ThemeContext = createContext<{ theme: ThemeConfig; setTheme: (theme: ThemeConfig) => void } | undefined>(undefined)

export function ThemeProvider({ children, initialTheme = defaultTheme }: { children: ReactNode; initialTheme?: ThemeConfig }) {
    const [theme, setTheme] = useState(initialTheme)

    useEffect(() => {
        const root = document.documentElement
        root.style.setProperty('--color-primary', theme.primaryColor)
        root.style.setProperty('--color-secondary', theme.secondaryColor)
        root.style.setProperty('--color-accent', theme.accentColor)
        root.style.setProperty('--color-bg', theme.backgroundColor)
        root.style.setProperty('--color-text', theme.textColor)
        root.style.setProperty('--font-family', theme.fontFamily)
    }, [theme])

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('useTheme must be used within ThemeProvider')
    return context
}
