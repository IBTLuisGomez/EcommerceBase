import { create } from 'zustand'

interface CartState {
    items: number[]
    add: (id: number) => void
    remove: (id: number) => void
    clear: () => void
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    add: (id) => set((state) => ({ items: [...state.items, id] })),
    remove: (id) => set((state) => {
        const index = state.items.indexOf(id)
        return { items: index === -1 ? state.items : [...state.items.slice(0, index), ...state.items.slice(index + 1)] }
    }),
    clear: () => set({ items: [] }),
}))
