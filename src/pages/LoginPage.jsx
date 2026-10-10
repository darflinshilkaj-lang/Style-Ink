import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.email.includes('@')) nextErrors.email = 'Enter a valid email address.';
    if (!form.password) nextErrors.password = 'Password cannot be blank.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    
    // Simulate Context Login
    login(form.email, form.password);
    navigate('/profile');
  };

  return (
    <section className="section">
      <div className="container">
        <div className="form-card card">
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', textAlign: 'center' }}>SIGN IN</h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
            Access your custom laboratory and order registry.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                className="input" 
                placeholder="name@email.com" 
                value={form.email} 
                onChange={(e) => setForm({ ...form, email: e.target.value })} 
                required
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  className="input" 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter password" 
                  value={form.password} 
                  onChange={(e) => setForm({ ...form, password: e.target.value })} 
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--navy)' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <div className="error">{errors.password}</div>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" /> Remember Session
              </label>
              <Link to="/login" style={{ fontWeight: 600 }}>Forgot Credentials?</Link>
            </div>

            <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '1rem' }}>
              Sign In
            </button>
          </form>

          <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            New customer? <Link to="/signup" style={{ fontWeight: 700, color: 'var(--navy)' }}>Create account</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
