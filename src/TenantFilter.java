package com.ecommerce.shared.infrastructure.multitenancy;

import com.ecommerce.shared.domain.TenantId;
import com.ecommerce.tenant.domain.TenantRepository;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;

@Component
@Order(1)
public class TenantFilter implements Filter {

    private final TenantRepository tenantRepository;

    public TenantFilter(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        try {
            TenantId tenantId = resolveTenant(req);
            TenantContext.set(tenantId);

            // Para RLS de PostgreSQL
            // Se setea en la conexión vía Hibernate Interceptor o StatementInspector

            chain.doFilter(request, response);
        } finally {
            TenantContext.clear();
        }
    }

    private TenantId resolveTenant(HttpServletRequest request) {
        String header = request.getHeader("X-Tenant-ID");
        if (header != null && !header.isBlank()) {
            return TenantId.of(UUID.fromString(header));
        }

        String host = request.getServerName(); // empresa1.plataforma.com
        String subdomain = host.contains(".") ? host.split("\\.")[0] : "default";

        return tenantRepository.findBySubdomain(subdomain)
                .map(t -> t.getId())
                .orElseThrow(() -> new TenantNotFoundException(subdomain));
    }
}