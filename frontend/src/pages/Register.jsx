import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    const result = register(name, email, password);
    if (result.success) {
      addToast('Account created successfully!', 'success');
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page" style={{ paddingTop: 0 }}>
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20, color: 'var(--accent)', fontWeight: 800, fontSize: 20 }}>
            <div className="navbar-brand-icon"><Store size={22} /></div>
            Smart Mall
          </Link>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join Smart Mall and start shopping smarter</p>
        </div>
        {error && <div style={{ padding: '10px 16px', background: '#FEF2F2', color: '#EF4444', borderRadius: 10, fontSize: 13, marginBottom: 16 }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} className="form-input" placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} required style={{ paddingRight: 44 }} />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9BA1BF' }}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-full" style={{ marginTop: 8 }}>Create Account</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
