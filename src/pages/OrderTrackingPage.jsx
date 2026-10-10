import { CheckCircle2, Circle, Package, Truck, MapPin, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { label: 'Order Placed', sublabel: 'Aug 27, 2026 — 09:14 AM', done: true, icon: CheckCircle2 },
  { label: 'Payment Confirmed', sublabel: 'Aug 27, 2026 — 09:16 AM', done: true, icon: CheckCircle2 },
  { label: 'Processing & Print', sublabel: 'Aug 27, 2026 — 11:00 AM', done: true, icon: Package },
  { label: 'Shipped', sublabel: 'Awaiting pickup', done: false, icon: Truck },
  { label: 'Out for Delivery', sublabel: 'Estimated Aug 31', done: false, icon: MapPin },
  { label: 'Delivered', sublabel: 'Expected delivery window', done: false, icon: Home },
];

export default function OrderTrackingPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">SHIPMENT STATUS</span>
          <h1>TRACK YOUR ORDER</h1>
        </div>

        <div className="layout-2col">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem' }}>ORDER #ST-20481</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Placed on August 27, 2026</p>
              </div>
              <span className="badge" style={{ backgroundColor: 'var(--ice-blue)', alignSelf: 'flex-start' }}>IN TRANSIT</span>
            </div>

            {/* Tracking Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                return (
                  <div key={step.label} style={{ display: 'flex', gap: '1.5rem' }}>
                    {/* Indicator column */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: step.done ? 'var(--navy)' : 'var(--border)',
                        color: step.done ? 'var(--white)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.3s ease'
                      }}>
                        <Icon size={18} />
                      </div>
                      {!isLast && (
                        <div style={{
                          width: 2,
                          height: 48,
                          background: step.done ? 'var(--navy)' : 'var(--border)',
                          margin: '4px 0'
                        }} />
                      )}
                    </div>
                    {/* Text column */}
                    <div style={{ paddingTop: '0.5rem', paddingBottom: isLast ? 0 : '2.5rem' }}>
                      <h4 style={{ fontSize: '1rem', color: step.done ? 'var(--navy)' : 'var(--text-muted)' }}>{step.label}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{step.sublabel}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="summary-card">
              <h3>DELIVERY INFO</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                <div className="summary-row">
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Carrier</span>
                  <strong style={{ fontSize: '0.9rem' }}>FedEx Express</strong>
                </div>
                <div className="summary-row">
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Tracking No.</span>
                  <strong style={{ fontSize: '0.9rem' }}>794644823420</strong>
                </div>
                <div className="summary-row">
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Expected Date</span>
                  <strong style={{ fontSize: '0.9rem' }}>Aug 31, 2026</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link className="btn btn-primary" to="/profile">View Profile</Link>
              <Link className="btn btn-outline" to="/shop">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
