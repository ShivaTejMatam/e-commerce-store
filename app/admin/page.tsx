'use client';

import { useState } from 'react';
import dbConnect from '../../lib/mongodb';
import Product, { IProduct } from '../../models/Product';

async function getInitialProducts(): Promise<IProduct[]> {
  await dbConnect();
  const products = await Product.find({}).lean();
  return products.map((product: any) => ({
    ...product,
    _id: product._id.toString(),
  }));
}

export default function AdminPanel() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    stock: '',
  });

  // Fetch initial products on mount (client-side)
  useState(() => {
    getInitialProducts().then(setProducts);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      }),
    });
    const newProduct: IProduct = await res.json();
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <button type="submit">Add Product</button>
      </form>
      <div>
        {products.map(product => (
          <div key={product._id}>{product.name}</div>
        ))}
      </div>
    </div>
  );
}