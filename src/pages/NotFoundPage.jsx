import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{
          fontSize: 'clamp(6rem, 15vw, 12rem)',
          fontWeight: 800,
          color: 'var(--ice-blue)',
          lineHeight: 1,
          fontFamily: 'Syne, sans-serif',
          letterSpacing: '-0.05em',
          marginBottom: '1rem'
        }}>
          404
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '1rem' }}>PAGE NOT FOUND</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '3rem' }}>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn btn-primary" to="/">Back to Home</Link>
          <Link className="btn btn-outline" to="/shop">Browse Shop</Link>
        </div>
      </div>
    </section>
  );
}
