import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ArrowLeft } from 'lucide-react';
import { products, formatCurrency } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  
  const product = useMemo(() => products.find((item) => String(item.id) === String(id)), [id]);
  const isWishlisted = wishlist.includes(product?.id);

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'White');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <h2>Product not found.</h2>
        <Link className="btn btn-primary" to="/shop" style={{ marginTop: '1.5rem' }}>Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter((item) => item.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
  };

  return (
    <section className="section">
      <div className="container">
        <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="grid-2" style={{ gap: '4rem', alignItems: 'start' }}>
          {/* Visual Column */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80';
                }}
              />
            </div>
          </div>

          {/* Details Column */}
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="badge">{product.category}</span>
              {product.customizable && <span className="badge" style={{ backgroundColor: 'var(--ice-blue)' }}>Customizable</span>}
            </div>
            
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <strong style={{ fontSize: '2rem', color: 'var(--navy)' }}>{formatCurrency(product.price)}</strong>
              <div className="product-rating" style={{ fontSize: '1rem' }}>
                <Star size={18} fill="currentColor" />
                <span>{product.rating} (Review Score)</span>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              {product.description}
            </p>

            {/* Selection Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>Select Size</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {product.sizes.map((size) => (
                    <button 
                      key={size} 
                      className={`btn ${selectedSize === size ? 'btn-primary' : 'btn-outline'}`} 
                      onClick={() => setSelectedSize(size)}
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>Select Color</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {product.colors.map((color) => (
                    <button 
                      key={color} 
                      className={`btn ${selectedColor === color ? 'btn-primary' : 'btn-outline'}`} 
                      onClick={() => setSelectedColor(color)}
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>Quantity</h4>
                <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border)' }}>
                  <button 
                    className="btn" 
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{ padding: '0.5rem 1rem', background: 'none', border: 'none' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 1rem', fontWeight: 700 }}>{quantity}</span>
                  <button 
                    className="btn" 
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{ padding: '0.5rem 1rem', background: 'none', border: 'none' }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button className="btn btn-primary" onClick={handleAdd} style={{ flex: 2 }}>
                <ShoppingBag size={16} /> Add to Cart
              </button>
              <button 
                className={`btn btn-outline ${isWishlisted ? 'active' : ''}`} 
                onClick={() => toggleWishlist(product.id)}
                style={{ flex: 1 }}
              >
                <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} /> Wishlist
              </button>
            </div>

            {product.customizable && (
              <Link 
                className="btn btn-secondary" 
                to={`/customize/${product.id}`}
                style={{ width: '100%', marginBottom: '1.5rem' }}
              >
                Open Studio Customizer
              </Link>
            )}
          </div>
        </div>

        {/* Related Section */}
        <div style={{ marginTop: '6rem' }}>
          <div className="section-header">
            <span className="eyebrow">COMPLETE THE FIT</span>
            <h2>RELATED ESSENTIALS</h2>
          </div>
          <div className="grid-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
