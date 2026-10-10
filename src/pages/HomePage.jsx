import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Sparkles, Lock, ArrowUpRight } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const featuredCategories = [
  { title: 'Graphic Tees', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', tag: 'BOLD STORIES' },
  { title: 'Oversized Fits', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', tag: 'EASY DRAPE' },
  { title: 'Streetwear', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80', tag: 'URBAN EDGE' },
];

const reasons = [
  { title: 'Premium Style', desc: 'Crafted using heavyweight cotton fabrics and refined tailored silhouettes.', icon: Shield },
  { title: 'Personalized Designs', desc: 'Transform your thoughts into wearable statements with our custom tee studio.', icon: Sparkles },
  { title: 'Comfortable Everyday Wear', desc: 'Versatile relaxed fits engineered for college, casual outings, and everyday comfort.', icon: Truck },
  { title: 'Secure Shopping', desc: 'Encrypted checkout with transparent INR pricing and step-by-step order tracking.', icon: Lock },
];

const communityImages = [
  { name: '@alex_inked', image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=600&q=80', likes: 231 },
  { name: '@streetwear_daily', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80', likes: 452 },
  { name: '@inked_fit', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', likes: 189 },
  { name: '@vintage_vibes', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', likes: 512 },
];

export default function HomePage() {
  const featured = products.filter((item) => item.featured).slice(0, 3);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-shell">
          <div className="hero-copy">
            <span className="hero-eyebrow">EDITORIAL STREETWEAR • CUSTOM MADE</span>
            <h1 className="hero-display">
              <span className="hero-line" style={{ fontStyle: 'italic', fontWeight: 400 }}>Wear Your</span>
              <span className="hero-line">Imagination.</span>
            </h1>
            <p>
              Discover your style. Customize your statement. Make every outfit uniquely yours.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/shop">
                Explore Collection <ArrowRight size={16} />
              </Link>
              <Link className="btn btn-outline" to="/customize">
                Customize Your T-Shirt
              </Link>
            </div>
            <div className="hero-badges">
              <span className="hero-pill">NEW DROP</span>
              <span className="hero-pill">100% ORGANIC COTTON</span>
              <span className="hero-pill">MADE ON DEMAND</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-media">
              <img 
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80" 
                alt="Streetwear model wearing STYLE INK oversized graphic t-shirt" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. LATEST DROP (PRODUCTS) */}
      <section className="section">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 'none' }}>
            <div>
              <span className="eyebrow">CURATED COLLECTION</span>
              <h2>LATEST DROP</h2>
            </div>
            <Link className="btn btn-outline" to="/shop" style={{ padding: '0.75rem 1.5rem' }}>
              View All
            </Link>
          </div>
          <div className="grid-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} showNew={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. CUSTOM T-SHIRT PROMOTION */}
      <section className="section section-bg-navy">
        <div className="container customization-grid">
          <div className="customization-copy">
            <span className="eyebrow">YOUR TEE. YOUR STATEMENT.</span>
            <h2>CUSTOM T-SHIRTS</h2>
            <p>
              Choose your canvas from premium heavyweight drops, upload custom artwork, 
              or draft typographic layouts. Built for custom statement styling.
            </p>
            <div className="swatches" aria-label="Color options">
              <span className="swatch" style={{ backgroundColor: '#0F2742' }} title="Navy" />
              <span className="swatch" style={{ backgroundColor: '#FFFFFF' }} title="White" />
              <span className="swatch" style={{ backgroundColor: '#000000' }} title="Black" />
              <span className="swatch" style={{ backgroundColor: '#DCEAF2' }} title="Light Blue" />
              <span className="swatch" style={{ backgroundColor: '#E1EAF2' }} title="Grey" />
            </div>
            <Link className="btn btn-outline-white" to="/customize">
              Start Customizing
            </Link>
          </div>
          <div className="customization-visual">
            <div className="custom-preview">
              <img 
                src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80" 
                alt="Style Ink customized preview T-Shirt mockup" 
              />
            </div>
            <div className="preview-caption">
              <div>
                <h3 style={{ color: 'var(--white)' }}>LIVE CREATIVE CANVAS</h3>
                <p style={{ color: 'var(--ice-blue)', fontSize: '0.85rem' }}>Front and back visualization workspace.</p>
              </div>
              <Link className="btn btn-primary" to="/customize" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                Open Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRENDING CATEGORIES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">EXPLORE CUTS</span>
            <h2>TRENDING CATEGORIES</h2>
          </div>
          <div className="category-row">
            {featuredCategories.map((cat) => (
              <article key={cat.title} className="category-card">
                <img src={cat.image} alt={cat.title} />
                <div className="category-card-body">
                  <span className="eyebrow">{cat.tag}</span>
                  <h3>{cat.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE STYLE INK */}
      <section className="section section-bg-ice">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 2rem' }}>
            <span className="eyebrow">THE STANDARD</span>
            <h2>WHY CHOOSE STYLE INK</h2>
          </div>
          <div className="features-grid">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article key={reason.title} className="feature-card">
                  <div className="feature-icon">
                    <Icon size={20} />
                  </div>
                  <h3>{reason.title}</h3>
                  <p>{reason.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. STYLE INK COMMUNITY */}
      <section className="section">
        <div className="container community-grid">
          <div className="community-info">
            <span className="eyebrow">WEAR & SHARE</span>
            <h2>STYLE INK COMMUNITY</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '1rem' }}>
              Tag <strong style={{ color: 'var(--navy)' }}>#STYLEINK</strong> on your fits to get featured in our editorial mood board. Join a community built around modern styling.
            </p>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-outline">
              Follow Our Feed
            </a>
          </div>
          <div className="community-mosaic">
            {communityImages.map((comm) => (
              <div key={comm.name} className="community-card">
                <img src={comm.image} alt={comm.name} />
                <div className="community-overlay">
                  <span>{comm.name}</span>
                  <span style={{ fontSize: '0.85rem' }}>❤️ {comm.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <div className="newsletter-shell">
            <div>
              <span className="eyebrow" style={{ color: 'var(--navy)' }}>WEEKLY BRIEFINGS</span>
              <h2>JOIN THE MAILING LIST</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Subscribe for private print releases, seasonal lookbooks, and early access codes.</p>
            </div>
            <div className="newsletter-actions">
              <input className="input" placeholder="Your Email Address" type="email" aria-label="Email address for newsletter" />
              <button className="btn btn-primary">Join</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
