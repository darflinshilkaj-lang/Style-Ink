import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Full name is required.';
    if (!form.email.includes('@')) nextErrors.email = 'Please enter a valid email.';
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required.';
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    
    // Simulate Signup Context
    signup(form);
    navigate('/profile');
  };

  return (
    <section className="section">
      <div className="container">
        <div className="form-card card">
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', textAlign: 'center' }}>CREATE ACCOUNT</h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
            Register to save custom laboratory designs and unlock quick checkout.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Full Name</label>
              <input className="input" placeholder="Alexander Mercer" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input className="input" type="email" placeholder="name@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input className="input" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  className="input" 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Min 6 characters" 
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

            <div className="form-group">
              <label>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  className="input" 
                  type={showConfirm ? 'text' : 'password'} 
                  placeholder="Verify password" 
                  value={form.confirmPassword} 
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirm(!showConfirm)} 
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--navy)' }}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
            </div>

            <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '1rem' }}>
              Create Account
            </button>
          </form>

          <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Already registered? <Link to="/login" style={{ fontWeight: 700, color: 'var(--navy)' }}>Sign In</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
