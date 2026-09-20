export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  logoUrl?: string;
}

export const defaultTheme: ThemeConfig = {
  primaryColor: "#2563eb",
  secondaryColor: "#1e40af",
  accentColor: "#f59e0b",
  backgroundColor: "#ffffff",
  textColor: "#111827",
  fontFamily: "Inter, system-ui, sans-serif",
};