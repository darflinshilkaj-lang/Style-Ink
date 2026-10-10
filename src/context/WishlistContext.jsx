import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem('style-ink-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    window.localStorage.setItem('style-ink-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]);
  };

  const value = useMemo(() => ({ wishlist, toggleWishlist }), [wishlist]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  return useContext(WishlistContext);
}
