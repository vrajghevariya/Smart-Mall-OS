import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Wallet, Banknote, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatPrice, generateOrderId } from '../services/data';

export default function Checkout() {
  const { items, subtotal, delivery, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '', phone: user?.phone || '',
    address: '', city: 'Ahmedabad', state: 'Gujarat', pincode: '', payment: 'upi'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isAuthenticated) {
    return <div className="page-wrapper"><div className="container section"><div className="empty-state">
      <h3 className="empty-state-title">Please login to checkout</h3>
      <Link to="/login" className="btn btn-primary">Login</Link>
    </div></div></div>;
  }

  if (items.length === 0 && !orderPlaced) {
    return <div className="page-wrapper"><div className="container section"><div className="empty-state">
      <h3 className="empty-state-title">Your cart is empty</h3>
      <Link to="/products" className="btn btn-primary">Shop Now</Link>
    </div></div></div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = generateOrderId();
    setOrderId(id);
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('smartmall_orders') || '[]');
    orders.push({
      id, items: [...items], total, subtotal, delivery,
      customer: { name: form.name, email: form.email, phone: form.phone, address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}` },
      payment: form.payment, status: 'PLACED', date: new Date().toISOString(),
      timeline: [{ status: 'PLACED', time: new Date().toISOString() }]
    });
    localStorage.setItem('smartmall_orders', JSON.stringify(orders));
    clearCart();
    setOrderPlaced(true);
    addToast('Order placed successfully!', 'success');
  };

  if (orderPlaced) {
    return (
      <div className="page-wrapper"><div className="container section">
        <div className="success-page">
          <div className="success-icon"><CheckCircle size={48} /></div>
          <h2 className="success-title">Order Placed Successfully!</h2>
          <p className="success-message">Your order <strong>{orderId}</strong> has been placed. You'll receive updates on your order status.</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/orders" className="btn btn-primary">View Orders</Link>
            <Link to="/products" className="btn btn-secondary">Continue Shopping</Link>
          </div>
        </div>
      </div></div>
    );
  }

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="page-wrapper">
      <div className="container section">
        <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
          <ArrowLeft size={16} /> Back to Cart
        </Link>
        <h1 className="section-title" style={{ marginBottom: 32 }}>Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="checkout-layout">
            <div>
              {/* Customer Details */}
              <div className="checkout-section">
                <h2 className="checkout-section-title">Customer Details</h2>
                <div className="grid-2">
                  <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={form.name} onChange={e => update('name', e.target.value)} required /></div>
                  <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-input" value={form.email} onChange={e => update('email', e.target.value)} required /></div>
                  <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.phone} onChange={e => update('phone', e.target.value)} required placeholder="+91 98765 43210" /></div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="checkout-section">
                <h2 className="checkout-section-title">Delivery Address</h2>
                <div className="form-group"><label className="form-label">Address</label><textarea className="form-textarea" value={form.address} onChange={e => update('address', e.target.value)} required placeholder="House no, Street, Locality" style={{ minHeight: 80 }} /></div>
                <div className="grid-3">
                  <div className="form-group"><label className="form-label">City</label><input className="form-input" value={form.city} onChange={e => update('city', e.target.value)} required /></div>
                  <div className="form-group"><label className="form-label">State</label><input className="form-input" value={form.state} onChange={e => update('state', e.target.value)} required /></div>
                  <div className="form-group"><label className="form-label">PIN Code</label><input className="form-input" value={form.pincode} onChange={e => update('pincode', e.target.value)} required placeholder="380001" /></div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="checkout-section">
                <h2 className="checkout-section-title">Payment Method</h2>
                <p style={{ fontSize: 12, color: '#9BA1BF', marginBottom: 16 }}>⚠️ This is a demo. No real payment will be processed.</p>
                {[
                  { key: 'upi', icon: <Wallet size={20} />, label: 'UPI Payment', desc: 'Google Pay, PhonePe, Paytm' },
                  { key: 'card', icon: <CreditCard size={20} />, label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                  { key: 'cod', icon: <Banknote size={20} />, label: 'Cash on Delivery', desc: 'Pay when you receive' },
                ].map(opt => (
                  <div key={opt.key} className={`payment-option ${form.payment === opt.key ? 'selected' : ''}`} onClick={() => update('payment', opt.key)}>
                    <div className="payment-option-radio" />
                    {opt.icon}
                    <div><div style={{ fontWeight: 600, fontSize: 14 }}>{opt.label}</div><div style={{ fontSize: 12, color: '#6B7194' }}>{opt.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="cart-summary">
              <h3 className="cart-summary-title">Order Summary</h3>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: '1px solid #F0F1F7' }}>
                  <span style={{ flex: 1 }}>{item.name} × {item.quantity}</span>
                  <span style={{ fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="cart-summary-row" style={{ marginTop: 12 }}><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="cart-summary-row">
                <span>Delivery</span>
                <span style={{ color: delivery === 0 ? 'var(--success)' : undefined }}>{delivery === 0 ? 'FREE' : formatPrice(delivery)}</span>
              </div>
              <div className="cart-summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
              <button type="submit" className="btn btn-primary btn-lg w-full" style={{ marginTop: 20 }}>
                <CheckCircle size={18} /> Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
