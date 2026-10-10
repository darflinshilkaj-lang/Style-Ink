import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem('style-ink-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    window.localStorage.setItem('style-ink-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.id === item.id && entry.size === item.size && entry.color === item.color && JSON.stringify(entry.customization || {}) === JSON.stringify(item.customization || {}));
      if (existing) {
        return prev.map((entry) => entry.id === existing.id && entry.size === existing.size && entry.color === existing.color && JSON.stringify(entry.customization || {}) === JSON.stringify(item.customization || {}) ? { ...entry, quantity: entry.quantity + (item.quantity || 1) } : entry);
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) => prev.flatMap((item) => item.id === id ? (item.quantity + amount > 0 ? [{ ...item, quantity: item.quantity + amount }] : []) : [item]));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const value = useMemo(() => ({ cart, addToCart, updateQuantity, removeFromCart, clearCart }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
