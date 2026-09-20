export interface ThemeConfig {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    backgroundColor: string
    textColor: string
    fontFamily: string
    logoUrl?: string
}

export const defaultTheme: ThemeConfig = {
    primaryColor: '#292722',
    secondaryColor: '#465342',
    accentColor: '#bd5b3f',
    backgroundColor: '#f7f4ed',
    textColor: '#292722',
    fontFamily: 'Manrope, sans-serif',
}
