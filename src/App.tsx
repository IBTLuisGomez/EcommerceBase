import { useMemo, useState } from 'react'
import { ArrowRight, Check, ChevronDown, Heart, Menu, Minus, Plus, Search, ShoppingBag, Sparkles, X } from 'lucide-react'

type Category = 'Todos' | 'Casa' | 'Rituales' | 'Escritorio'
type Product = { id: number; name: string; category: Exclude<Category, 'Todos'>; price: number; image: string; note: string; tone: string }

const products: Product[] = [
    { id: 1, name: 'Vela Umbral', category: 'Casa', price: 420, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85', note: 'Cedro · Higo · Ámbar', tone: 'soft' },
    { id: 2, name: 'Taza Alba', category: 'Casa', price: 680, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85', note: 'Cerámica de alta temperatura', tone: 'cream' },
    { id: 3, name: 'Cuaderno Sur', category: 'Escritorio', price: 350, image: 'https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?auto=format&fit=crop&w=900&q=85', note: 'Papel ahuesado · 160 páginas', tone: 'rose' },
    { id: 4, name: 'Aceite Calma', category: 'Rituales', price: 590, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85', note: 'Lavanda · Neroli · Sándalo', tone: 'olive' },
    { id: 5, name: 'Lámpara Nube', category: 'Casa', price: 1290, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', note: 'Luz cálida · Vidrio opalino', tone: 'warm' },
    { id: 6, name: 'Set Pausa', category: 'Rituales', price: 760, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85', note: 'Tres gestos para desacelerar', tone: 'sage' },
]

const money = (value: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(value)

export default function App() {
    const [category, setCategory] = useState<Category>('Todos')
    const [query, setQuery] = useState('')
    const [cart, setCart] = useState<number[]>([])
    const [cartOpen, setCartOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [saved, setSaved] = useState<number[]>([])
    const [admin, setAdmin] = useState(false)

    const filteredProducts = useMemo(() => products.filter((product) => {
        const matchesCategory = category === 'Todos' || product.category === category
        const matchesQuery = `${product.name} ${product.note}`.toLowerCase().includes(query.toLowerCase())
        return matchesCategory && matchesQuery
    }), [category, query])

    const addToCart = (id: number) => { setCart((items) => [...items, id]); setCartOpen(true) }
    const removeOne = (id: number) => setCart((items) => { const index = items.indexOf(id); return index === -1 ? items : [...items.slice(0, index), ...items.slice(index + 1)] })
    const cartProducts = products.filter((product) => cart.includes(product.id))
    const total = cart.reduce((sum, id) => sum + (products.find((product) => product.id === id)?.price ?? 0), 0)

    return (
        <div className="app-shell">
            <div className="announcement"><Sparkles size={14} /> Envíos gratis a partir de $1,200 <span>·</span> Hecho para durar</div>
            <header className="site-header">
                <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú"><Menu size={21} /></button>
                <a className="wordmark" href="#inicio" onClick={() => setAdmin(false)}>LÍNEA<span>NORTE</span></a>
                <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
                    <a href="#coleccion">Colección</a><a href="#historia">Nuestra mirada</a><a href="#journal">Journal</a>
                    <button className="admin-link" onClick={() => { setAdmin(!admin); setMenuOpen(false) }}>{admin ? 'Volver a tienda' : 'Panel de marca'}</button>
                </nav>
                <div className="header-actions">
                    <label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar" aria-label="Buscar productos" /></label>
                    <button className="icon-button" aria-label="Favoritos"><Heart size={19} /></button>
                    <button className="bag-button" onClick={() => setCartOpen(true)} aria-label="Abrir carrito"><ShoppingBag size={19} /><span>{cart.length}</span></button>
                </div>
            </header>

            {admin ? <AdminPanel /> : <>
                <main>
                    <section className="hero" id="inicio">
                        <div className="hero-copy"><p className="eyebrow">Objetos con intención · Estudio independiente</p><h1>Haz espacio<br /><em>para lo esencial.</em></h1><p className="hero-text">Una colección de objetos cotidianos diseñada para acompañar tus pausas, tus rituales y los pequeños comienzos.</p><a className="primary-button" href="#coleccion">Explorar colección <ArrowRight size={17} /></a></div>
                        <div className="hero-image"><img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=90" alt="Interior sereno con objetos de diseño" /><div className="hero-tag"><span>01</span><span>La calma también se diseña.</span></div></div>
                    </section>
                    <section className="value-strip"><div><strong>01</strong><span>Diseño honesto</span></div><div><strong>02</strong><span>Producción consciente</span></div><div><strong>03</strong><span>Envío a todo México</span></div><div><strong>04</strong><span>Hecho para quedarse</span></div></section>
                    <section className="collection-section" id="coleccion">
                        <div className="section-heading"><div><p className="eyebrow">Selección de temporada</p><h2>Los objetos que<br /><em>hacen hogar.</em></h2></div><p className="section-intro">Piezas simples, materiales nobles y una paleta que baja el volumen del mundo.</p></div>
                        <div className="filter-row"><div className="filters">{(['Todos', 'Casa', 'Rituales', 'Escritorio'] as Category[]).map((item) => <button className={category === item ? 'filter active' : 'filter'} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><button className="sort-button">Ordenar <ChevronDown size={16} /></button></div>
                        <div className="product-grid">{filteredProducts.map((product) => <article className="product-card" key={product.id}><div className={`product-image ${product.tone}`}><img src={product.image} alt={product.name} /><button className={saved.includes(product.id) ? 'save-button saved' : 'save-button'} onClick={() => setSaved((items) => items.includes(product.id) ? items.filter((item) => item !== product.id) : [...items, product.id])} aria-label="Guardar producto"><Heart size={17} fill={saved.includes(product.id) ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={() => addToCart(product.id)}>Añadir <Plus size={15} /></button></div><div className="product-meta"><div><h3>{product.name}</h3><p>{product.note}</p></div><strong>{money(product.price)}</strong></div></article>)}</div>
                        {filteredProducts.length === 0 && <div className="empty-state">No encontramos objetos con esa búsqueda. Prueba otra palabra.</div>}
                    </section>
                    <section className="story-section" id="historia"><div className="story-image"><img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1100&q=85" alt="Mesa de trabajo de Línea Norte" /></div><div className="story-copy"><p className="eyebrow">Nuestra mirada</p><h2>Menos ruido.<br /><em>Más presencia.</em></h2><p>Creemos que los objetos que nos rodean pueden devolvernos al momento presente. Diseñamos desde esa idea: formas esenciales, texturas que invitan a tocar y piezas que mejoran con el tiempo.</p><a href="#journal" className="text-link">Conoce nuestra historia <ArrowRight size={16} /></a></div></section>
                    <section className="journal-section" id="journal"><div className="journal-head"><p className="eyebrow">Journal</p><h2>Ideas para vivir<br /><em>más despacio.</em></h2><a className="text-link" href="#journal">Ver todas <ArrowRight size={16} /></a></div><div className="journal-grid"><article><img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=85" alt="Cuaderno abierto" /><p>Rituales</p><h3>El arte de empezar el día sin prisa</h3></article><article><img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=85" alt="Escritura a mano" /><p>Materia</p><h3>Por qué elegimos cerámica imperfecta</h3></article></div></section>
                </main>
                <footer><div className="footer-brand"><a className="wordmark" href="#inicio">LÍNEA<span>NORTE</span></a><p>Objetos para una vida con intención.</p></div><div><p className="footer-label">Explora</p><a href="#coleccion">Colección</a><a href="#historia">Nuestra mirada</a></div><div><p className="footer-label">Ayuda</p><a href="#inicio">Envíos y devoluciones</a><a href="#inicio">Contacto</a></div><div className="newsletter"><p className="footer-label">Una nota al mes</p><p>Historias, novedades y una pausa en tu bandeja.</p><div><input placeholder="Tu correo electrónico" /><button aria-label="Suscribirme"><ArrowRight size={17} /></button></div></div><div className="footer-bottom">© 2026 Línea Norte <span>Diseñado con calma</span></div></footer>
            </>}

            {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow">Tu selección</p><h2>Carrito <span>({cart.length})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito"><X size={20} /></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={32} /><p>Tu carrito está esperando<br />algo especial.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Seguir explorando</button></div> : <><div className="cart-items">{cartProducts.map((product) => <div className="cart-item" key={product.id}><img src={product.image} alt={product.name} /><div><h3>{product.name}</h3><p>{money(product.price)}</p><div className="quantity"><button onClick={() => removeOne(product.id)}><Minus size={13} /></button><span>{cart.filter((id) => id === product.id).length}</span><button onClick={() => addToCart(product.id)}><Plus size={13} /></button></div></div></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{money(total)}</strong></div><p>Impuestos y envío calculados al finalizar.</p><button className="primary-button full">Ir a checkout <ArrowRight size={17} /></button></div></>}</aside></div>}
        </div>
    )
}

function AdminPanel() { return <main className="admin-page"><div className="admin-top"><div><p className="eyebrow">Panel de marca · Acme Studio</p><h1>Buenos días, <em>Lucía.</em></h1><p>Esto es lo que está pasando en tu tienda esta semana.</p></div><button className="primary-button">Editar tienda <ArrowRight size={17} /></button></div><div className="kpi-grid"><div><p>Ventas netas</p><strong>$48,920</strong><span className="positive">+18.4% vs. semana pasada</span></div><div><p>Pedidos</p><strong>126</strong><span className="positive">+12.8% vs. semana pasada</span></div><div><p>Ticket promedio</p><strong>$388</strong><span>$42 más que el mes pasado</span></div><div><p>Conversión</p><strong>3.8%</strong><span className="positive">+0.6% en los últimos 7 días</span></div></div><div className="admin-content"><section className="sales-card"><div className="card-heading"><div><p className="eyebrow">Rendimiento</p><h2>Ventas de septiembre</h2></div><button className="sort-button">Últimos 30 días <ChevronDown size={15} /></button></div><div className="chart"><div className="chart-y"><span>$50k</span><span>$35k</span><span>$20k</span><span>$5k</span></div><svg viewBox="0 0 700 230" preserveAspectRatio="none" role="img" aria-label="Gráfica de ventas"><path d="M0 190 C70 175, 95 150, 145 165 S205 135, 260 145 S320 95, 365 125 S440 105, 480 112 S535 55, 580 85 S640 50, 700 28" fill="none" stroke="var(--ink)" strokeWidth="3" /><path d="M0 190 C70 175, 95 150, 145 165 S205 135, 260 145 S320 95, 365 125 S440 105, 480 112 S535 55, 580 85 S640 50, 700 28 L700 230 L0 230 Z" fill="url(#area)" opacity=".4" /><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#bd5b3f" /><stop offset="1" stopColor="#bd5b3f" stopOpacity="0" /></linearGradient></defs></svg></div><div className="chart-x"><span>01 sep</span><span>08 sep</span><span>15 sep</span><span>22 sep</span><span>30 sep</span></div></section><section className="orders-card"><div className="card-heading"><div><p className="eyebrow">Actividad reciente</p><h2>Últimos pedidos</h2></div><a className="text-link" href="#inicio">Ver todos <ArrowRight size={15} /></a></div>{[['#LN-1048', 'María G.', '$1,280', 'Pagado'], ['#LN-1047', 'Diego R.', '$680', 'En preparación'], ['#LN-1046', 'Ana P.', '$2,140', 'Pagado'], ['#LN-1045', 'Jorge M.', '$420', 'Enviado']].map(([id, name, price, status]) => <div className="order-row" key={id}><span className="order-dot"><Check size={13} /></span><div><strong>{id}</strong><small>{name}</small></div><b>{price}</b><span className="status">{status}</span></div>)}</section></div></main> }
import { ThemeProvider } from "./theme/ThemeProvider";
import { useEffect, useState } from "react";
import { fetchTenantTheme } from "./shared/api/tenant";

function App() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    // Detectar subdomain y cargar tema del tenant
    const subdomain = window.location.hostname.split(".")[0];
    fetchTenantTheme(subdomain).then(setTheme);
  }, []);

  if (!theme) return <div>Loading store...</div>;

  return (
    <ThemeProvider initialTheme={theme}>
      {/* Rutas de la tienda */}
    </ThemeProvider>
  );
}