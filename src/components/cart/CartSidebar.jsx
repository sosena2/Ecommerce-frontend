import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Shield, Truck } from 'lucide-react';
import Button from '../ui/Button';

const CartSidebar = ({ items, total, onCheckout, loading }) => {
  const subtotal = total;
  const shipping = total > 50 ? 0 : 5.99;
  const tax = total * 0.1;
  const orderTotal = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <ShoppingBag className="h-5 w-5 mr-2" />
        Order Summary
      </h2>
      
      {/* Order Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={onCheckout}
        loading={loading}
        disabled={items.length === 0}
        size="lg"
        className="w-full mb-4"
      >
        Proceed to Checkout
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      {/* Continue Shopping */}
      <Link
        to="/products"
        className="w-full flex items-center justify-center px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 font-medium"
      >
        Continue Shopping
      </Link>

      {/* Trust Badges */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Truck className="h-4 w-4 mr-2 text-green-600" />
          Free shipping on orders over $50
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Shield className="h-4 w-4 mr-2 text-blue-600" />
          Secure SSL encryption
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">We accept:</p>
        <div className="flex space-x-2">
          <div className="w-10 h-6 bg-gray-200 rounded"></div>
          <div className="w-10 h-6 bg-gray-200 rounded"></div>
          <div className="w-10 h-6 bg-gray-200 rounded"></div>
          <div className="w-10 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;