import { useMemo, useState } from 'react';
import { products, formatCurrency } from '../data/products';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, Grid3X3, ArrowUpDown } from 'lucide-react';

const categories = ['All', ...new Set(products.map((item) => item.category))];
const sizes = ['All', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
const colors = ['All', 'Black', 'White', 'Navy Blue', 'Grey', 'Blue', 'Light Blue', 'Light Grey'];

export default function ShopPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [size, setSize] = useState('All');
  const [color, setColor] = useState('All');
  const [price, setPrice] = useState(3500);
  const [sortBy, setSortBy] = useState('featured');

  const filtered = useMemo(() => {
    const next = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSize = size === 'All' || product.sizes.includes(size);
      const matchesColor = color === 'All' || product.colors.includes(color);
      const matchesPrice = product.price <= price;
      return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice;
    });

    return next.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [category, color, price, search, size, sortBy]);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">READY TO WEAR</span>
          <h1>COLLECTIONS</h1>
        </div>

        {/* Filters Panel */}
        <div className="card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
            <input 
              className="input" 
              placeholder="Search fits..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              aria-label="Search products"
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
              <ArrowUpDown size={16} />
              <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort by">
                <option value="featured">Featured Drops</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
          
          <div className="grid-4" style={{ gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ fontSize: '0.75rem' }}>Category</label>
              <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ fontSize: '0.75rem' }}>Size Choice</label>
              <select className="select" value={size} onChange={(e) => setSize(e.target.value)}>
                {sizes.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ fontSize: '0.75rem' }}>Color Palette</label>
              <select className="select" value={color} onChange={(e) => setColor(e.target.value)}>
                {colors.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Max budget</span>
                <strong>{formatCurrency(price)}</strong>
              </label>
              <input 
                type="range" 
                min="500" 
                max="3500" 
                step="100"
                value={price} 
                onChange={(e) => setPrice(Number(e.target.value))} 
                style={{ width: '100%', marginTop: '0.5rem' }} 
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h3>NO FITS MATCHED</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Try adjusting your filters or searching another keyword.</p>
          </div>
        )}
      </div>
    </section>
  );
}
