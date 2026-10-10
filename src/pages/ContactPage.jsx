import { useState } from 'react';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 2.5rem' }}>
          <span className="eyebrow">GET IN TOUCH</span>
          <h1>CONTACT US</h1>
        </div>

        <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'start' }}>
          {/* Contact Info */}
          <div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem', lineHeight: 1.2 }}>
              LET'S TALK STYLE, ORDERS, AND EVERYTHING IN BETWEEN.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              We're available for support queries, customization discussions, wholesale opportunities, or just to hear what you think about our product line.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div className="feature-icon" style={{ flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>EMAIL</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>contact@styleink.com</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>orders@styleink.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div className="feature-icon" style={{ flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>PHONE</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>9489659269</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Mon–Fri, 9AM–6PM </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div className="feature-icon" style={{ flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>STUDIO</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>12 Harbor Avenue, KSR Kalvi Nagar</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Erode, TN 600001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ width: 64, height: 64, background: 'var(--ice-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <Send size={28} />
                </div>
                <h3 style={{ marginBottom: '0.75rem' }}>MESSAGE SENT</h3>
                <p style={{ color: 'var(--text-muted)' }}>We'll get back to you within 24–48 hours.</p>
                <button className="btn btn-outline" onClick={() => setSent(false)} style={{ marginTop: '2rem' }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>SEND A MESSAGE</h3>

                <div className="field-row">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Your Name</label>
                    <input className="input" required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Email Address</label>
                    <input className="input" required type="email" placeholder="name@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Subject</label>
                  <input className="input" required placeholder="Order issue, Customization help, etc." value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Message</label>
                  <textarea className="textarea" required placeholder="Describe your question or inquiry in detail..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ minHeight: '160px' }} />
                </div>

                <button className="btn btn-primary" type="submit" style={{ marginTop: '0.5rem' }}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
