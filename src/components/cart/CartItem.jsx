import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, onQuantityChange, onRemove, updating }) => {
  const productId = item.productId || item.product?._id || item.product?.id;
  const productName = item.name || item.product?.name || item.product?.title || 'Product';
  const productPrice = item.price ?? item.product?.price ?? 0;
  const productImage =
    item.imageUrl || item.image || item.product?.imageUrl || item.product?.image;
  const handleIncrement = () => {
    onQuantityChange(item.productId, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.productId, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    if (window.confirm('Remove this item from cart?')) {
      onRemove(item.productId);
    }
  };

  return (
    <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      {/* Product Image */}
      <Link to={`/products/${productId}`} className="shrink-0">
        <img
          src={productImage}
          alt={productName}
          className="w-20 h-20 object-cover rounded-lg"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
          }}
        />
      </Link>

      {/* Product Info */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <div>
            <Link
              to={`/products/${productId}`}
              className="font-semibold text-gray-900 hover:text-primary-600"
            >
              {productName}
            </Link>
            <p className="text-sm text-gray-600 mt-1">${productPrice} each</p>
          </div>
          <button
            onClick={handleRemove}
            disabled={updating}
            className="text-gray-400 hover:text-red-600 disabled:opacity-50"
            title="Remove item"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDecrement}
              disabled={item.quantity <= 1 || updating}
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center font-medium">
              {updating ? '...' : item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={updating}
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              ${(productPrice * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;