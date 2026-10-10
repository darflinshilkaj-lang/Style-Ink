import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const differentiators = [
    { title: '1. Express Your Identity', desc: 'Discover designs that match your personality and individual taste.' },
    { title: '2. Customize Your Look', desc: 'Create personalized T-shirts using your preferred artwork, quotes, and designs wherever customization is supported.' },
    { title: '3. Everyday Comfort', desc: 'Explore versatile styles suitable for college, casual outings, and everyday wear.' },
    { title: '4. Style Without Limits', desc: 'Choose from minimal, graphic, and statement-making designs.' },
    { title: '5. Simple Shopping Experience', desc: 'Enjoy clear product information, transparent INR pricing, and a convenient shopping journey.' },
    { title: '6. Made for Your Generation', desc: 'Discover contemporary styles inspired by individuality, creativity, and modern streetwear.' },
  ];

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 4rem', maxWidth: '750px' }}>
          <span className="eyebrow">OUR MANIFESTO</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontFamily: "'Bodoni Moda', serif" }}>About STYLE INK</h1>
          <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--navy)', marginTop: '1rem' }}>
            “Style is more than what you wear. It is how you express yourself.”
          </p>
        </div>

        {/* Section 1: Intro & Story (Two column on desktop) */}
        <div className="grid-2" style={{ gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div>
            <span className="eyebrow">THE BEGINNING</span>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>Our Story</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              STYLE INK is a fashion brand created for people who believe their clothing should reflect their personality. We bring together contemporary streetwear, everyday comfort, and personal creativity to help you build a style that feels entirely your own.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8 }}>
              STYLE INK was created with a simple idea: fashion should give everyone the freedom to express themselves. Instead of following every trend, we want you to discover what makes your style unique. From clean minimal designs to bold graphic statements, our collection is designed to give everyday outfits a distinctive identity.
            </p>
          </div>
          <div>
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <img 
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80" 
                alt="STYLE INK Editorial photoshoot model" 
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4rem 0' }} />

        {/* Section 2: Our Mission & Vision */}
        <div className="grid-2" style={{ gap: '3rem', marginBottom: '5rem' }}>
          <div className="card" style={{ padding: '3rem 2.5rem' }}>
            <span className="eyebrow">PURPOSE</span>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontFamily: "'Bodoni Moda', serif" }}>Our Mission</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8 }}>
              Our mission is to make personal style more accessible, creative, and enjoyable. We aim to offer thoughtfully designed clothing, a smooth online shopping experience, and customization options that allow customers to turn their ideas into wearable designs.
            </p>
          </div>

          <div className="card" style={{ padding: '3rem 2.5rem', backgroundColor: 'var(--bg-soft)' }}>
            <span className="eyebrow">FUTURE ASPIRATION</span>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontFamily: "'Bodoni Moda', serif" }}>Our Vision</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8 }}>
              We envision STYLE INK as a place where fashion and creativity come together, helping people feel confident in what they wear and encouraging them to express themselves without hesitation.
            </p>
          </div>
        </div>

        {/* Section 3: What Makes STYLE INK Different? */}
        <div style={{ marginBottom: '5rem' }}>
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 3rem' }}>
            <span className="eyebrow">CORE ADVANTAGES</span>
            <h2>What Makes STYLE INK Different?</h2>
          </div>

          <div className="grid-3" style={{ gap: '2rem' }}>
            {differentiators.map((diff) => (
              <div key={diff.title} className="card" style={{ padding: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: 'var(--navy)' }}>{diff.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Our Promise Banner */}
        <div className="newsletter-shell" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '4rem 2rem' }}>
          <span className="eyebrow" style={{ color: 'var(--navy)' }}>OUR COMMITMENT</span>
          <h2 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>Our Promise</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', lineHeight: 1.8 }}>
            We aim to make every interaction simple, every design meaningful, and every outfit an opportunity for self-expression.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link className="btn btn-primary" to="/shop">
              Explore Collection <ArrowRight size={16} />
            </Link>
            <Link className="btn btn-outline" to="/customize">
              Customize Your T-Shirt
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
