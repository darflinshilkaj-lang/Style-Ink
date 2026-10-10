import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingBag, UserRound, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/customize', label: 'Customize' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setMobileMenuOpen(false)}>
          <span>STYLE INK</span>
        </Link>
        
        <nav className="nav-links">
          {links.map((link) => (
            <Link 
              key={link.to} 
              to={link.to} 
              className={location.pathname === link.to ? 'nav-active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link className="btn-icon nav-item-relative" to="/profile" aria-label="Wishlist">
            <Heart size={18} />
            {wishlist.length > 0 && <span className="nav-count">{wishlist.length}</span>}
          </Link>
          <Link className="btn-icon nav-item-relative" to="/cart" aria-label="Cart">
            <ShoppingBag size={18} />
            {cart.length > 0 && <span className="nav-count">{cart.length}</span>}
          </Link>
          <Link className="btn-icon" to={user ? '/profile' : '/login'} aria-label="Profile">
            <UserRound size={18} />
          </Link>
          <button 
            className="btn-icon mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#FFFFFF',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          gap: '1.5rem',
          borderTop: '1px solid var(--border)'
        }}>
          {links.map((link) => (
            <Link 
              key={link.to} 
              to={link.to} 
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: location.pathname === link.to ? 'var(--navy)' : 'var(--text-muted)'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
