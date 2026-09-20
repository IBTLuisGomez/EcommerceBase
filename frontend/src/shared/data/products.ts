import type { Product } from '../types/product'

export const products: Product[] = [
    { id: 1, name: 'Vela Umbral', slug: 'vela-umbral', category: 'Casa', price: 420, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85', note: 'Cedro · Higo · Ámbar' },
    { id: 2, name: 'Taza Alba', slug: 'taza-alba', category: 'Casa', price: 680, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85', note: 'Cerámica de alta temperatura' },
    { id: 3, name: 'Cuaderno Sur', slug: 'cuaderno-sur', category: 'Escritorio', price: 350, image: 'https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?auto=format&fit=crop&w=900&q=85', note: 'Papel ahuesado · 160 páginas' },
    { id: 4, name: 'Aceite Calma', slug: 'aceite-calma', category: 'Rituales', price: 590, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85', note: 'Lavanda · Neroli · Sándalo' },
    { id: 5, name: 'Lámpara Nube', slug: 'lampara-nube', category: 'Casa', price: 1290, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', note: 'Luz cálida · Vidrio opalino' },
    { id: 6, name: 'Set Pausa', slug: 'set-pausa', category: 'Rituales', price: 760, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85', note: 'Tres gestos para desacelerar' },
]

export const money = (value: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(value)
