import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import dbConnect from '../lib/mongodb';
import Product, { IProduct } from '../models/Product';

async function getProducts(): Promise<IProduct[]> {
  await dbConnect();
  const products = await Product.find({}).lean();
  return products.map((product: any) => ({
    ...product,
    _id: product._id.toString(),
  }));
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.length === 0 ? (<p> No Products Available</p>):
      (products.map(product => (
        <ProductCard
          key={product._id}
          product={product}
          // Note: Client-side dispatch needs a client component
        />
      ))
    )}
    </div>
  );
}