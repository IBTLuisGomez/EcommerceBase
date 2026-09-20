
import 

{ useTheme } from "../../theme/useTheme";

export function ProductCard({ product }) {
  const { theme } = useTheme();

  return (
        <div  className =   "rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition"
        > <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-[var(--color-text)]">{product.name}</h3>
        <p className="text-lg font-bold mt-1" style={{ color: "var(--color-primary)" }}>
          ${product.price}
        </p>
        <button
          className="mt-3 w-full py-2 rounded-lg text-white font-medium"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
