import React, { createContext, useState, useContext, useEffect } from 'react';
import * as cartService from '../services/cartService';
import { getProductById } from '../services/productService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setCart(null);
        setCartCount(0);
        setLoading(false);
        return;
      }

      const response = await cartService.getCart();
      
      // Handle different response structures
      const cartData = response?.data || response;
      
      // Validate cart data structure
      if (cartData && typeof cartData === 'object') {
        const items = Array.isArray(cartData.items) ? cartData.items : [];
        const enrichedItems = await Promise.all(
          items.map(async (item) => {
            const productId = item.productId || item.product?._id || item.product?.id;
            const hasImage =
              item.imageUrl || item.image || item.product?.imageUrl || item.product?.image;

            if (!productId || hasImage) {
              return item;
            }

            try {
              const productResponse = await getProductById(productId);
              const productData = productResponse?.data ?? productResponse;
              if (!productData) return item;

              return {
                ...item,
                product: item.product || productData,
                name: item.name || productData.name || productData.title,
                price: item.price ?? productData.price,
                imageUrl: item.imageUrl || productData.imageUrl || productData.image,
              };
            } catch (fetchError) {
              console.error('Failed to hydrate cart item:', fetchError.message);
              return item;
            }
          })
        );

        const updatedCart = { ...cartData, items: enrichedItems };
        setCart(updatedCart);
        const count = enrichedItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
        setCartCount(count);
      } else {
        setCart(null);
        setCartCount(0);
      }
    } catch (error) {
      // Handle 401 silently (user not authenticated)
      if (error.response?.status === 401) {
        setCart(null);
        setCartCount(0);
      } else {
        setError('Failed to fetch cart');
        console.error('Cart fetch error:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      setError(null);
      
      if (!productId) {
        throw new Error('Product ID is required');
      }

      const response = await cartService.addToCart(productId, quantity);
      
      // Refresh cart after successful add
      await fetchCart();
      
      return { success: true, data: response };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add item to cart';
      setError(errorMessage);
      console.error('Add to cart error:', errorMessage);
      
      // Return error object instead of throwing
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      setError(null);
      
      if (!productId) {
        throw new Error('Product ID is required');
      }

      if (quantity <= 0) {
        // If quantity is 0 or negative, remove the item instead
        return await removeFromCart(productId);
      }

      // If cart is null or has no items, don't proceed
      if (!cart?.items) {
        throw new Error('Cart not initialized');
      }

      const updatedItems = cart.items.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      );

      await cartService.updateCart({ items: updatedItems });
      await fetchCart();
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update cart';
      setError(errorMessage);
      console.error('Update cart error:', errorMessage);
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setError(null);
      
      if (!productId) {
        throw new Error('Product ID is required');
      }

      await cartService.removeFromCart(productId);
      await fetchCart();
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to remove item from cart';
      setError(errorMessage);
      console.error('Remove from cart error:', errorMessage);
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      
      await cartService.clearCart();
      
      // Clear local cart state
      setCart(null);
      setCartCount(0);
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to clear cart';
      setError(errorMessage);
      console.error('Clear cart error:', errorMessage);
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  const cartTotal = cart?.items?.reduce(
    (total, item) =>
      total + (((item.price ?? item.product?.price) || 0) * (item.quantity || 0)),
    0
  ) || 0;

  useEffect(() => {
    fetchCart();
    
    // Optional: Listen for auth changes
    const handleAuthChange = () => {
      fetchCart();
    };

    window.addEventListener('storage', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
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