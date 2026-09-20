import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Package, Heart, Settings, LogOut, Edit2, Save, ShoppingBag, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../services/data';

export default function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('smartmall_orders') || '[]');
    setOrders(saved.reverse().slice(0, 5));
  }, []);

  if (!isAuthenticated) return (
    <div className="page-wrapper"><div className="container section"><div className="empty-state">
      <h3 className="empty-state-title">Please login to view profile</h3>
      <Link to="/login" className="btn btn-primary">Login</Link>
    </div></div></div>
  );

  const handleSave = () => {
    setEditing(false);
    addToast('Profile updated', 'success');
  };

  return (
    <div className="page-wrapper">
      <div className="container section">
        <h1 className="section-title" style={{ marginBottom: 32 }}>My Profile</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 32 }}>
          {/* Profile Card */}
          <div>
            <div className="card-flat" style={{ padding: 32, textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 32, fontWeight: 800, margin: '0 auto 16px' }}>
                {user.avatar}
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>{user.name}</h2>
              <p style={{ fontSize: 13, color: '#6B7194', marginTop: 4 }}>{user.email}</p>
              <span className={`badge ${user.role === 'ADMIN' ? 'badge-primary' : 'badge-success'}`} style={{ marginTop: 8 }}>{user.role}</span>
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link to="/orders" className="btn btn-secondary w-full"><Package size={16} /> My Orders</Link>
                <Link to="/wishlist" className="btn btn-secondary w-full"><Heart size={16} /> Wishlist</Link>
                <button className="btn btn-danger w-full" onClick={() => { logout(); navigate('/'); }}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </div>

          <div>
            {/* Edit Profile */}
            <div className="card-flat" style={{ padding: 24, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>Personal Information</h3>
                <button className="btn btn-ghost btn-sm" onClick={() => editing ? handleSave() : setEditing(true)}>
                  {editing ? <><Save size={14} /> Save</> : <><Edit2 size={14} /> Edit</>}
                </button>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  {editing ? <input className="form-input" value={name} onChange={e => setName(e.target.value)} /> : <p style={{ fontSize: 14 }}>{user.name}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <p style={{ fontSize: 14 }}>{user.email}</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  {editing ? <input className="form-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" /> : <p style={{ fontSize: 14 }}>{user.phone || 'Not set'}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <p style={{ fontSize: 14 }}>{user.role}</p>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="card-flat" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>Recent Orders</h3>
                <Link to="/orders" style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>View All</Link>
              </div>
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 32, color: '#9BA1BF' }}>
                  <ShoppingBag size={32} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                  <p style={{ fontSize: 13 }}>No orders yet</p>
                </div>
              ) : (
                orders.map(order => (
                  <Link key={order.id} to={`/orders/${order.id}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F0F1F7', fontSize: 13, textDecoration: 'none', color: 'inherit' }}>
                    <div>
                      <span style={{ fontWeight: 600 }}>{order.id}</span>
                      <span style={{ color: '#6B7194', marginLeft: 12 }}><Clock size={12} style={{ verticalAlign: -1 }} /> {new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 600 }}>{formatPrice(order.total)}</span>
                      <span className="badge badge-info" style={{ marginLeft: 8 }}>{order.status}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
