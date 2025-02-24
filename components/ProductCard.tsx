'use client';

import { IProduct } from '../models/Product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  return (
    <div className="border p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <button
        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Add to Cart
      </button>
    </div>
  );
}