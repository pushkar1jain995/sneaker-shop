import React, { createContext, useContext, useState } from 'react';
import { Sneaker } from '../types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  size: number;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (sneaker: Sneaker, size: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const addToCart = (sneaker: Sneaker, size: number) => {
    const existingItem = cartItems.find(
      item => item.id === sneaker.id && item.size === size
    );

    if (existingItem) {
      setCartItems(items =>
        items.map(item =>
          item.id === sneaker.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems(items => [
        ...items,
        {
          id: sneaker.id,
          name: sneaker.name,
          size,
          price: sneaker.price,
          quantity: 1,
          image: sneaker.images[0]
        }
      ]);
    }

    toast.success(
      <div>
        {sneaker.name} added to cart!{' '}
        <button 
          className="text-purple-600 font-semibold"
          onClick={() => navigate('/cart')}
        >
          View Cart
        </button>
      </div>
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}