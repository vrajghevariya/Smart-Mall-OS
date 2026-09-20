import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, CheckCircle, Clock, Truck, ChefHat, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../services/data';
import { useToast } from '../context/ToastContext';

const STATUS_FLOW = ['PLACED', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED'];

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('smartmall_orders') || '[]');
    setOrder(orders.find(o => o.id === id));
  }, [id]);

  if (!order) return (
    <div className="page-wrapper"><div className="container section"><div className="empty-state">
      <h3 className="empty-state-title">Order not found</h3>
      <Link to="/orders" className="btn btn-primary">Back to Orders</Link>
    </div></div></div>
  );

  const currentIdx = STATUS_FLOW.indexOf(order.status);
  const statusIcons = { PLACED: <ShoppingBag size={16} />, CONFIRMED: <CheckCircle size={16} />, PREPARING: <ChefHat size={16} />, READY: <Package size={16} />, COMPLETED: <Truck size={16} /> };

  const advanceStatus = () => {
    if (currentIdx < STATUS_FLOW.length - 1) {
      const newStatus = STATUS_FLOW[currentIdx + 1];
      const orders = JSON.parse(localStorage.getItem('smartmall_orders') || '[]');
      const idx = orders.findIndex(o => o.id === order.id);
      if (idx >= 0) {
        orders[idx].status = newStatus;
        orders[idx].timeline = [...(orders[idx].timeline || []), { status: newStatus, time: new Date().toISOString() }];
        localStorage.setItem('smartmall_orders', JSON.stringify(orders));
        setOrder({ ...orders[idx] });
        addToast(`Order status updated to ${newStatus}`, 'success');
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container section">
        <Link to="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}><ArrowLeft size={16} /> Back to Orders</Link>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800 }}>Order {order.id}</h1>
            <p style={{ fontSize: 13, color: '#6B7194' }}>Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to={`/receipt/${order.id}`} className="btn btn-secondary">🧾 Digital Receipt</Link>
            {order.status !== 'COMPLETED' && order.status !== 'CANCELLED' && (
              <button className="btn btn-primary" onClick={advanceStatus}>Advance Status (Demo)</button>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32 }}>
          <div>
            {/* Timeline */}
            <div className="card-flat" style={{ padding: 24, marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Order Timeline</h3>
              <div className="order-timeline">
                {STATUS_FLOW.map((status, idx) => (
                  <div key={status} className={`timeline-item ${idx < currentIdx ? 'completed' : idx === currentIdx ? 'active' : ''}`}>
                    <div className="timeline-dot" />
                    <div>
                      <div className="timeline-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {statusIcons[status]} {status}
                      </div>
                      {order.timeline?.find(t => t.status === status) && (
                        <p className="timeline-time">{new Date(order.timeline.find(t => t.status === status).time).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="card-flat" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Order Items</h3>
              {order.items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F0F1F7', fontSize: 14 }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                    <span style={{ color: '#6B7194' }}> × {item.quantity}</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="card-flat" style={{ padding: 24, marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Order Summary</h3>
              <div className="cart-summary-row"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
              <div className="cart-summary-row"><span>Delivery</span><span>{order.delivery === 0 ? 'FREE' : formatPrice(order.delivery)}</span></div>
              <div className="cart-summary-row total"><span>Total</span><span>{formatPrice(order.total)}</span></div>
            </div>
            {order.customer && (
              <div className="card-flat" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Delivery Details</h3>
                <p style={{ fontSize: 14, fontWeight: 600 }}>{order.customer.name}</p>
                <p style={{ fontSize: 13, color: '#6B7194', marginTop: 4 }}>{order.customer.email}</p>
                <p style={{ fontSize: 13, color: '#6B7194', marginTop: 4 }}>{order.customer.phone}</p>
                <p style={{ fontSize: 13, color: '#6B7194', marginTop: 4 }}>{order.customer.address}</p>
                <p style={{ fontSize: 13, marginTop: 12 }}><span style={{ fontWeight: 600 }}>Payment:</span> {order.payment?.toUpperCase()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
