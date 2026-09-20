package com.ecommerce.tenant.domain;

import java.util.Map;

public record ThemeConfig(
        String primaryColor,
        String secondaryColor,
        String accentColor,
        String backgroundColor,
        String textColor,
        String fontFamily,
        Map<String, String> extra
) {
    public static ThemeConfig defaultTheme() {
        return new ThemeConfig(
                "#2563eb",   // blue-600
                "#1e40af",
                "#f59e0b",
                "#ffffff",
                "#111827",
                "Inter, system-ui, sans-serif",
                Map.of()
        );
    }
}