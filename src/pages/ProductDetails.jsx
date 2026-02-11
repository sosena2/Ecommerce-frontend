import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Product not found.</p>
        <Link to="/products" className="text-blue-600 underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-gray-700 mb-4">${product.price}</p>

      <p className="text-gray-600 mb-6">{product.description}</p>

      <button className="px-6 py-2 bg-black text-white rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
