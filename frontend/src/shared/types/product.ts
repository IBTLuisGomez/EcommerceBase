export type Category = 'Casa' | 'Rituales' | 'Escritorio'

export interface Product {
    id: number
    name: string
    slug: string
    category: Category
    price: number
    image: string
    note: string
}
