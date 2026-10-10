import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Landmark, Smartphone, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../data/products';

const methods = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'upi', label: 'UPI / Wallet Link', icon: Smartphone },
  { id: 'netbanking', label: 'Net Banking', icon: Landmark },
  { id: 'wallet', label: 'Digital Wallets', icon: Wallet },
];

export default function PaymentPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('card');
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const payNow = (e) => {
    e.preventDefault();
    clearCart(); // empty cart on success
    navigate('/order-success');
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">FINAL STEP</span>
          <h1>PAYMENT GATEWAY</h1>
        </div>

        <div className="layout-2col">
          {/* Payment Options */}
          <div className="card">
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} /> Secure billing portal
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              We support standard sandboxed payments for Stripe & Razorpay simulation testing.
            </p>

            <div className="grid-2" style={{ gap: '1rem', marginBottom: '2rem' }}>
              {methods.map((method) => {
                const Icon = method.icon;
                return (
                  <button 
                    key={method.id} 
                    type="button"
                    className={`btn ${selectedMethod === method.id ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setSelectedMethod(method.id)}
                    style={{ padding: '0.75rem 1rem', fontSize: '0.85rem' }}
                  >
                    <Icon size={16} /> {method.label}
                  </button>
                );
              })}
            </div>

            {selectedMethod === 'card' && (
              <form onSubmit={payNow} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input className="input" required placeholder="Alexander Mercer" />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <input className="input" required placeholder="0000 0000 0000 0000" maxLength="19" />
                </div>
                <div className="field-row">
                  <div className="form-group">
                    <label>Expiration Date</label>
                    <input className="input" required placeholder="MM/YY" maxLength="5" />
                  </div>
                  <div className="form-group">
                    <label>Security Code (CVV)</label>
                    <input className="input" required type="password" placeholder="000" maxLength="3" />
                  </div>
                </div>
                
                <button className="btn btn-primary" type="submit" style={{ marginTop: '1rem', width: '100%' }}>
                  Authorize & Pay {formatCurrency(total)}
                </button>
              </form>
            )}

            {selectedMethod !== 'card' && (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Please confirm to complete simulation checkout with UPI or Wallets.
                </p>
                <button className="btn btn-primary" onClick={payNow} style={{ width: '100%' }}>
                  Pay {formatCurrency(total)} with {methods.find(m => m.id === selectedMethod)?.label}
                </button>
              </div>
            )}
          </div>

          {/* Breakdown summary */}
          <div className="summary-card">
            <h3>ORDER TOTAL</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (5%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
