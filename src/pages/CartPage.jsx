import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../data/products';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">YOUR DESKTOP BAG</span>
          <h1>SHOPPING BAG</h1>
        </div>

        <div className="layout-2col">
          {/* Cart items list */}
          <div>
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Size: <strong>{item.size}</strong> • Color: <strong>{item.color}</strong>
                    </p>
                    {item.customization && (
                      <span className="badge" style={{ alignSelf: 'flex-start', marginTop: '0.5rem', backgroundColor: 'var(--ice-blue)' }}>
                        Studio Design Print: "{item.customization.frontText}"
                      </span>
                    )}
                    <div className="cart-item-actions">
                      <div className="qty-control">
                        <button className="btn" onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button className="btn" onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        className="btn" 
                        onClick={() => removeFromCart(item.id)}
                        style={{ display: 'inline-flex', gap: '0.25rem', color: '#DC2626', background: 'none', border: 'none', fontSize: '0.85rem', fontWeight: 600, padding: 0 }}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontWeight: 700, fontSize: '1.2rem' }}>
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <h3>YOUR BAG IS EMPTY</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '2rem' }}>Add some essential gear to get started.</p>
                <Link className="btn btn-primary" to="/shop">Shop Collection</Link>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="summary-card">
              <h3>ORDER BREAKDOWN</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Standard Delivery</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
              <div className="summary-row">
                <span>Estimated Tax (5%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>

              <Link className="btn btn-primary" to="/checkout" style={{ width: '100%', marginTop: '1rem' }}>
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              
              <Link className="btn btn-outline" to="/shop" style={{ width: '100%', textAlign: 'center' }}>
                Keep Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
