import { Outlet, Link } from 'react-router-dom'

export function StoreLayout() {
    return (
        <div>
            <header>
                <Link to="/">Store</Link>
            </header>
            <Outlet />
        </div>
    )
}
