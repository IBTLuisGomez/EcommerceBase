package com.ecommerce.shared.infrastructure;

import com.ecommerce.shared.domain.TenantId;

public final class TenantContext {
    private static final ThreadLocal<TenantId> CURRENT = new ThreadLocal<>();

    public static void set(TenantId tenantId) {
        CURRENT.set(tenantId);
    }

    public static TenantId get() {
        return CURRENT.get();
    }

    public static void clear() {
        CURRENT.remove();
    }
}