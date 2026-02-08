import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import * as cartService from '../services/cartService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setCart(null);
        setCartCount(0);
        return;
      }

      const response = await cartService.getCart();
      const cartData = response?.data || response;
      setCart(cartData);
      setCartCount(cartData?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0);
    } catch (error) {
      // Don't show error if user is not logged in
      if (error.response?.status !== 401) {
        console.error('Failed to fetch cart:', error);
      }
      setCart(null);
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      await cartService.addToCart(productId, quantity);
      await fetchCart();
      return true;
    } catch (error) {
      throw error;
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const updatedItems = cart.items.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      );
      await cartService.updateCart({ items: updatedItems });
      await fetchCart();
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await cartService.removeFromCart(productId);
      await fetchCart();
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart(null);
      setCartCount(0);
    } catch (error) {
      throw error;
    }
  };

  const cartTotal = cart?.items.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        cartCount,
        cartTotal,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};