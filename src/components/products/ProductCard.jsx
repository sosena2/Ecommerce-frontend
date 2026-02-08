import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to add to cart');
      return;
    }

    try {
      await addToCart(product._id, 1);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add to cart');
    }
  };

  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <span className="inline-block px-2 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded-full mb-2">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.numReviews || 0})</span>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.stock < 10 && product.stock > 0 && (
                <p className="text-xs text-amber-600 mt-1">
                  Only {product.stock} left!
                </p>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`p-2 rounded-lg transition-colors ${
                  product.stock === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                }`}
                title={product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
              <Link
                to={`/product/${product._id}`}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="View Details"
              >
                <Eye className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;