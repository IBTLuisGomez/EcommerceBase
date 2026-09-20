import { Outlet, Link } from 'react-router-dom'

export function AdminLayout() {
    return (
        <div>
            <header>
                <Link to="/admin">Admin</Link>
            </header>
            <Outlet />
        </div>
    )
}
