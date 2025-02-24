import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the product interface
export interface IProduct extends Document {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  stock: number;
}

// Define the schema with proper typing
const productSchema: Schema<IProduct> = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  stock: { type: Number, default: 0 },
});

// Export the model, ensuring it’s typed correctly
const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default ProductModel;