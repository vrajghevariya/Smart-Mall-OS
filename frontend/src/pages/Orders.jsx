import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, Clock } from 'lucide-react';
import { formatPrice } from '../services/data';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('smartmall_orders') || '[]');
    setOrders(saved.reverse());
  }, []);

  if (!isAuthenticated) return (
    <div className="page-wrapper"><div className="container section"><div className="empty-state">
      <h3 className="empty-state-title">Please login to view orders</h3>
      <Link to="/login" className="btn btn-primary">Login</Link>
    </div></div></div>
  );

  const statusColors = {
    PLACED: 'badge-info', CONFIRMED: 'badge-primary', PREPARING: 'badge-warning',
    READY: 'badge-success', COMPLETED: 'badge-success', CANCELLED: 'badge-error'
  };

  return (
    <div className="page-wrapper">
      <div className="container section">
        <h1 className="section-title" style={{ marginBottom: 32 }}>My Orders</h1>
        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><Package size={32} /></div>
            <h3 className="empty-state-title">No orders yet</h3>
            <p className="empty-state-desc">Start shopping to see your orders here</p>
            <Link to="/products" className="btn btn-primary">Shop Now</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {orders.map(order => (
              <Link key={order.id} to={`/orders/${order.id}`} className="card-flat" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 24, textDecoration: 'none', transition: 'box-shadow 0.2s' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{order.id}</span>
                    <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#6B7194' }}>
                    <span><Clock size={14} style={{ verticalAlign: -2 }} /> {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>{order.items.length} items</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{formatPrice(order.total)}</div>
                  <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}><Eye size={14} /> View Details</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
