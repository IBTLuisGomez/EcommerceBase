import { Navigate, Route, Routes } from 'react-router-dom'
import { StoreLayout } from './layouts/StoreLayout'
import { AdminLayout } from './layouts/AdminLayout'
import { HomePage } from './features/catalog/pages/HomePage'
import { CategoryPage } from './features/catalog/pages/CategoryPage'
import { ProductDetailPage } from './features/catalog/pages/ProductDetailPage'
import { SearchPage } from './features/catalog/pages/SearchPage'
import { CartPage } from './features/cart/pages/CartPage'
import { CheckoutPage } from './features/cart/pages/CheckoutPage'
import { AccountPage } from './features/auth/pages/AccountPage'
import { OrdersPage } from './features/auth/pages/OrdersPage'
import { LoginPage } from './features/auth/pages/LoginPage'
import { RegisterPage } from './features/auth/pages/RegisterPage'
import { DashboardPage } from './features/admin/pages/DashboardPage'
import { ProductsPage } from './features/admin/pages/ProductsPage'
import { OrdersAdminPage } from './features/admin/pages/OrdersAdminPage'
import { BrandingPage } from './features/admin/pages/BrandingPage'

export default function App() {
    return (
        <Routes>
            <Route element={<StoreLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/categoria/:slug" element={<CategoryPage />} />
                <Route path="/buscar" element={<SearchPage />} />
                <Route path="/producto/:slug" element={<ProductDetailPage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/cuenta" element={<AccountPage />} />
                <Route path="/pedidos" element={<OrdersPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
            </Route>

            <Route element={<AdminLayout />}>
                <Route path="/admin" element={<DashboardPage />} />
                <Route path="/admin/productos" element={<ProductsPage />} />
                <Route path="/admin/pedidos" element={<OrdersAdminPage />} />
                <Route path="/admin/marca" element={<BrandingPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
