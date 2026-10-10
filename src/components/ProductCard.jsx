import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../data/products';

export default function ProductCard({ product, showNew = false }) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const isWishlisted = wishlist.includes(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1
    });
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80';
            }}
          />
        </Link>
        <div className="product-badges">
          {showNew && <span className="badge badge-new">New Drop</span>}
          <span className="badge">{product.category}</span>
          {product.customizable && <span className="badge" style={{ backgroundColor: 'var(--ice-blue)' }}>Customizable</span>}
        </div>
        <button 
          className={`btn-icon wishlist-btn ${isWishlisted ? 'active' : ''}`} 
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }} 
          aria-label="Toggle Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="product-info">
        <div className="product-info-header">
          <Link to={`/product/${product.id}`}>
            <h3 className="product-title">{product.name}</h3>
          </Link>
          <span className="product-price">{formatCurrency(product.price)}</span>
        </div>
        <div className="product-rating">
          <Star size={14} fill="currentColor" />
          <span>{product.rating}</span>
        </div>
        <p className="product-desc">{product.description}</p>
        
        <div className="product-card-actions">
          <Link className="btn btn-outline" to={`/product/${product.id}`}>Details</Link>
          <button className="btn btn-primary" onClick={handleAdd}>
            <ShoppingBag size={14} /> Add
          </button>
        </div>
        {product.customizable && (
          <Link 
            className="btn btn-secondary" 
            to={`/customize/${product.id}`}
            style={{ marginTop: '0.5rem', width: '100%' }}
          >
            Design Yours
          </Link>
        )}
      </div>
    </article>
  );
}
