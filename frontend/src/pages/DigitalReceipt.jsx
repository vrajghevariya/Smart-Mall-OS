import { useParams, Link } from 'react-router-dom';
import { Download, Printer, Share2, CheckCircle, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../services/data';
import { useToast } from '../context/ToastContext';

export default function DigitalReceipt() {
  const { id } = useParams();
  const { addToast } = useToast();
  const orders = JSON.parse(localStorage.getItem('smartmall_orders') || '[]');
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="page-wrapper">
        <div className="container section" style={{ textAlign: 'center' }}>
          <h2>Receipt not found</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Place an order to generate a digital receipt.</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: 16 }}>Shop Now</Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => window.print();
  const handleShare = () => { navigator.share?.({ title: `Smart Mall Receipt #${order.id}`, text: `Order total: ${formatPrice(order.total)}` }).catch(() => {}); addToast('Shared!', 'success'); };

  return (
    <div className="page-wrapper">
      <div className="container section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <Link to={`/orders/${id}`} className="btn btn-secondary"><ArrowLeft size={16} /> Back to Order</Link>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" onClick={handlePrint}><Printer size={16} /> Print</button>
            <button className="btn btn-secondary" onClick={handleShare}><Share2 size={16} /> Share</button>
            <button className="btn btn-primary" onClick={() => addToast('Receipt downloaded!', 'success')}><Download size={16} /> Download PDF</button>
          </div>
        </div>

        <div className="receipt animate-scale-in">
          <div className="receipt-header">
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>🛒 SMART MALL</h2>
            <p style={{ fontSize: 11, margin: '4px 0 0' }}>A Smarter Way to Shop</p>
            <p style={{ fontSize: 10, color: '#888' }}>123 Innovation Street, Tech City, India</p>
            <p style={{ fontSize: 10, color: '#888' }}>GSTIN: 24AAACS1234K1ZA</p>
          </div>

          <div className="receipt-line"><span>Receipt No:</span><span style={{ fontWeight: 700 }}>#{order.id}</span></div>
          <div className="receipt-line"><span>Date:</span><span>{new Date(order.date).toLocaleString()}</span></div>
          <div className="receipt-line"><span>Payment:</span><span style={{ textTransform: 'uppercase' }}>{order.payment}</span></div>
          <div className="receipt-line"><span>Status:</span><span style={{ fontWeight: 700, color: '#20B486' }}>✓ {order.status}</span></div>

          <div className="receipt-divider" />
          <div className="receipt-line" style={{ fontWeight: 700 }}><span>Item</span><span>Amount</span></div>
          <div className="receipt-divider" />

          {order.items.map((item, i) => (
            <div key={i}>
              <div className="receipt-line"><span>{item.name}</span><span>{formatPrice(item.price)}</span></div>
              <div className="receipt-line" style={{ fontSize: 11, color: '#888' }}><span>  Qty: {item.quantity}</span><span>{formatPrice(item.price * item.quantity)}</span></div>
            </div>
          ))}

          <div className="receipt-divider" />
          <div className="receipt-line"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
          <div className="receipt-line"><span>Delivery</span><span>{order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee)}</span></div>
          <div className="receipt-divider" />
          <div className="receipt-line" style={{ fontWeight: 700, fontSize: 16 }}><span>TOTAL</span><span>{formatPrice(order.total)}</span></div>
          <div className="receipt-divider" />

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <div style={{ fontSize: 10, color: '#888', marginBottom: 12 }}>Thank you for shopping with Smart Mall!</div>
            {/* Barcode simulation */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              {Array.from({ length: 40 }, (_, i) => (
                <div key={i} style={{ width: Math.random() > 0.5 ? 2 : 1, height: 40, background: '#000' }} />
              ))}
            </div>
            <div style={{ fontSize: 10, marginTop: 4 }}>{order.id}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
