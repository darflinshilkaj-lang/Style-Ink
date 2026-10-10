import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { products, formatCurrency } from '../data/products';
import { LogOut, Heart, ShoppingBag, MapPin, Layers } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const wishlistItems = products.filter((item) => wishlist.includes(item.id));

  if (!user) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <h2>ACCESS RESTRICTED</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '2rem' }}>Please sign in to access your profile settings.</p>
        <Link className="btn btn-primary" to="/login">Sign In</Link>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 'none' }}>
          <div>
            <span className="eyebrow">REGISTRY CONTROL</span>
            <h1>MY ACCOUNT</h1>
          </div>
          <button className="btn btn-outline" onClick={logout} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="grid-2" style={{ alignItems: 'start', gap: '3rem' }}>
          {/* Profile Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', fontSize: '1.2rem' }}>
              Personal Info
            </h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email Address:</strong> {user.email}</p>
            {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
          </div>

          {/* Wishlist Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={18} /> Wishlist Registry
            </h3>
            {wishlistItems.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {wishlistItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to={`/product/${item.id}`} style={{ fontWeight: 600, textTransform: 'uppercase' }}>
                      {item.name}
                    </Link>
                    <span>{formatCurrency(item.price)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Your wishlist is empty.</p>
            )}
          </div>
        </div>

        {/* Dashboard Panels */}
        <div style={{ marginTop: '4rem' }}>
          <div className="grid-3">
            <div className="card" style={{ padding: '1.5rem' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <ShoppingBag size={18} /> My Orders
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Order #ST-20481 is currently in transit.</p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <MapPin size={18} /> Delivery Addresses
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>12 Harbor Avenue, New York, NY 10001</p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Layers size={18} /> Saved Customizations
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>1 Custom T-Shirt design configuration.</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
          <Link className="btn btn-primary" to="/tracking">Track Active Order</Link>
          <Link className="btn btn-outline" to="/shop">Shop Collection</Link>
        </div>
      </div>
    </section>
  );
}
