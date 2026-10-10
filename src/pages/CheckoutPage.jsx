import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../data/products';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '', city: '', state: '', postalCode: '' });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      // Proceed to the custom Payment page
      navigate('/payment');
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">ORDER INITIATION</span>
          <h1>SECURE CHECKOUT</h1>
        </div>

        <div className="layout-2col">
          {/* Checkout Steps Form */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Step {step} of 3</h3>
              <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
                {step === 1 ? 'Shipping Address' : step === 2 ? 'Review Order' : 'Billing Method'}
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input className="input" required placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                  </div>
                  <div className="field-row">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input className="input" required type="email" placeholder="email@address.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input className="input" required placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Shipping Address</label>
                    <input className="input" required placeholder="Flat / House No., Building, Street" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  </div>
                  <div className="field-row">
                    <div className="form-group">
                      <label>City</label>
                      <input className="input" required placeholder="Mumbai" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input className="input" required placeholder="Maharashtra" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input className="input" required placeholder="400001" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />
                  </div>
                </div>
              ) : step === 2 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>Verify item list</h4>
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                      <div>
                        <strong>{item.name}</strong>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Color: {item.color} | Size: {item.size} | Qty: {item.quantity}</p>
                      </div>
                      <strong>{formatCurrency(item.price * item.quantity)}</strong>
                    </div>
                  ))}
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Shipping: <strong>{formatCurrency(shipping)}</strong></p>
                    <p style={{ fontSize: '0.9rem' }}>Tax: <strong>{formatCurrency(tax)}</strong></p>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '1rem 0' }}>
                  <h4 style={{ marginBottom: '1rem' }}>Secure payment authorization</h4>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    We support Cards, UPI, Net Banking, and Digital wallets. Click continue below to access the payment integration layout page.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <button 
                  className="btn btn-outline" 
                  type="button" 
                  onClick={() => setStep((prev) => Math.max(1, prev - 1))} 
                  disabled={step === 1}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button 
                  className="btn btn-primary" 
                  type="submit"
                  style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  {step === 3 ? 'Continue to Payment' : 'Continue'} <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>

          {/* Side Summary */}
          <div className="summary-card">
            <h3>ORDER SUMMARY</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Cost</span>
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
            <Link className="btn btn-outline" to="/cart" style={{ width: '100%', textAlign: 'center', marginTop: '1rem' }}>
              Modify Bag
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
