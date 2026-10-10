import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-info">
          <Link to="/" className="brand" style={{ color: 'var(--white)' }}>
            <span>STYLE INK</span>
          </Link>
          <p>Elevated streetwear essentials crafted for self-expression. Custom design meet premium everyday fits.</p>
        </div>
        <div className="footer-column">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop">All Collections</Link></li>
            <li><Link to="/customize">Customizer Studio</Link></li>
            <li><Link to="/shop?category=T-Shirts">Graphic Tees</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><Link to="/contact">Contact & Help</Link></li>
            <li><Link to="/tracking">Track Your Order</Link></li>
            <li><Link to="/about">Our Story</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Connect</h4>
          <ul>
            <li><a href="mailto:hello@styleink.com">hello@styleink.com</a></li>
            <li><a href="tel:+18005550142">+1 (800) 555-0142</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} STYLE INK. All rights reserved.</p>
        <p>Built for the next generation.</p>
      </div>
    </footer>
  );
}
