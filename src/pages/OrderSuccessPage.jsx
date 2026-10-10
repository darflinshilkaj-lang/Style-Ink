import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  const orderId = `ST-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <section className="section">
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="card" style={{ maxWidth: 560, width: '100%', textAlign: 'center', padding: '4rem 3rem' }}>
          <div style={{
            width: 80,
            height: 80,
            background: 'var(--ice-blue)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem'
          }}>
            <CheckCircle2 size={40} color="var(--navy)" />
          </div>

          <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>ORDER CONFIRMED</span>
          <h1 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '1rem' }}>PAYMENT SUCCESSFUL</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Your STYLE INK order is confirmed and is being prepared for dispatch. You'll receive an email confirmation shortly.
          </p>

          <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-soft)', marginBottom: '2.5rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem' }}>Order ID</span>
              <strong>{orderId}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem' }}>Estimated Delivery</span>
              <strong>4–6 Business Days</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link className="btn btn-primary" to="/tracking">
              Track Order <ArrowRight size={16} />
            </Link>
            <Link className="btn btn-outline" to="/shop">
              Keep Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
