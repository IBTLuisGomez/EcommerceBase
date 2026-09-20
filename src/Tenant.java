package com.ecommerce.tenant.domain;

import com.ecommerce.shared.domain.AggregateRoot;
import com.ecommerce.shared.domain.TenantId;

import java.time.Instant;
import java.util.Objects;

public class Tenant extends AggregateRoot {

    private final TenantId id;
    private String name;
    private String subdomain;
    private String customDomain;
    private String logoUrl;
    private ThemeConfig themeConfig;
    private TenantStatus status;
    private Instant createdAt;
    private Instant updatedAt;

    private Tenant(TenantId id, String name, String subdomain) {
        this.id = Objects.requireNonNull(id);
        this.name = Objects.requireNonNull(name);
        this.subdomain = Objects.requireNonNull(subdomain);
        this.themeConfig = ThemeConfig.defaultTheme();
        this.status = TenantStatus.ACTIVE;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    public static Tenant create(String name, String subdomain) {
        return new Tenant(TenantId.generate(), name, subdomain);
    }

    public void updateTheme(ThemeConfig newTheme) {
        this.themeConfig = Objects.requireNonNull(newTheme);
        this.updatedAt = Instant.now();
        // registerEvent(new TenantThemeUpdated(...));
    }

    public void updateLogo(String logoUrl) {
        this.logoUrl = logoUrl;
        this.updatedAt = Instant.now();
    }

    // Getters
    public TenantId getId() { return id; }
    public String getName() { return name; }
    public String getSubdomain() { return subdomain; }
    public String getLogoUrl() { return logoUrl; }
    public ThemeConfig getThemeConfig() { return themeConfig; }
    public TenantStatus getStatus() { return status; }
}