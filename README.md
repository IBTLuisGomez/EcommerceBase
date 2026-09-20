# Línea Norte Commerce

MVP de tienda online multi-tenant inspirado en la especificación de `EcommerceBase.pdf`.

## Incluye

- Storefront responsive con identidad visual configurable por tenant.
- Catálogo con categorías, búsqueda, favoritos y añadir al carrito.
- Carrito lateral con cantidades, subtotal y camino a checkout.
- Vista de panel de marca con KPIs, gráfica de ventas y pedidos recientes.
- Base React + TypeScript + Vite lista para conectar con Spring Boot, PostgreSQL, Redis y RLS.

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```

La siguiente etapa de backend puede implementar los bounded contexts del documento: tenant, catalog, cart, order y analytics, manteniendo la interfaz del storefront como contrato de integración.
