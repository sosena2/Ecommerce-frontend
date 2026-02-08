import React from 'react';
import { Star, Shield, Truck, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';

const ProductDetails = ({ product, onAddToCart, loading }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating || 0)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div>
        <span className="inline-block px-3 py-1 text-sm font-medium text-primary-700 bg-primary-50 rounded-full mb-2">
          {product.category}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center mb-4">
          <div className="flex items-center mr-4">
            {renderStars(product.rating)}
          </div>
          <span className="text-gray-600">({product.numReviews} reviews)</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center">
        <span className="text-4xl font-bold text-gray-900">${product.price}</span>
        {product.originalPrice && (
          <span className="ml-4 text-xl text-gray-500 line-through">
            ${product.originalPrice}
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center">
        {product.stock > 0 ? (
          <>
            <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-700 font-medium">
              In Stock ({product.stock} available)
            </span>
          </>
        ) : (
          <>
            <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-red-700 font-medium">Out of Stock</span>
          </>
        )}
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Truck className="h-6 w-6 text-gray-400 mr-3" />
          <div>
            <p className="font-medium text-gray-900">Free Shipping</p>
            <p className="text-sm text-gray-600">On orders over $50</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <RefreshCw className="h-6 w-6 text-gray-400 mr-3" />
          <div>
            <p className="font-medium text-gray-900">Easy Returns</p>
            <p className="text-sm text-gray-600">30-day return policy</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Shield className="h-6 w-6 text-gray-400 mr-3" />
          <div>
            <p className="font-medium text-gray-900">Secure Payment</p>
            <p className="text-sm text-gray-600">100% secure</p>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={onAddToCart}
        loading={loading}
        disabled={product.stock === 0}
        size="lg"
        className="w-full"
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </Button>
    </div>
  );
};

export default ProductDetails;