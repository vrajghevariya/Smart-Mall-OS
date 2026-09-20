import { useState } from 'react';
import { QrCode, CheckCircle, ShoppingCart, CreditCard, Smartphone } from 'lucide-react';
import { products, formatPrice, getProductImage } from '../services/data';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ScanAndGo() {
  const [scannedItems, setScannedItems] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const exists = scannedItems.find(i => i.id === randomProduct.id);
      if (exists) {
        setScannedItems(prev => prev.map(i => i.id === randomProduct.id ? { ...i, qty: i.qty + 1 } : i));
      } else {
        setScannedItems(prev => [...prev, { ...randomProduct, qty: 1 }]);
      }
      addToast(`Scanned: ${randomProduct.name}`, 'success');
      setScanning(false);
    }, 1500);
  };

  const total = scannedItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleCheckout = () => {
    scannedItems.forEach(item => { for (let i = 0; i < item.qty; i++) addToCart(item); });
    setShowSuccess(true);
    addToast('Items added to cart! Proceed to payment.', 'success');
  };

  return (
    <div className="page-wrapper">
      <div className="container section">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 className="section-title animate-fade-in-up">📱 Scan & Go</h1>
          <p className="section-subtitle">Scan product barcodes, skip the checkout queue!</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, maxWidth: 900, margin: '0 auto' }}>
          {/* Scanner */}
          <div style={{ textAlign: 'center' }}>
            <div className="qr-scanner-frame" style={{ margin: '0 auto' }}>
              <div className="qr-corner tl" />
              <div className="qr-corner tr" />
              <div className="qr-corner bl" />
              <div className="qr-corner br" />
              {scanning && <div className="qr-scanner-line" />}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                {scanning ? (
                  <>
                    <QrCode size={48} style={{ opacity: 0.5, animation: 'pulse-glow 1s infinite' }} />
                    <p style={{ marginTop: 12, fontSize: 13 }}>Scanning...</p>
                  </>
                ) : (
                  <>
                    <Smartphone size={48} style={{ opacity: 0.3 }} />
                    <p style={{ marginTop: 12, fontSize: 13, opacity: 0.6 }}>Point camera at barcode</p>
                  </>
                )}
              </div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={simulateScan} disabled={scanning} style={{ marginTop: 24 }}>
              <QrCode size={18} /> {scanning ? 'Scanning...' : 'Simulate Scan'}
            </button>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 8 }}>Demo: Click to scan a random product</p>

            <div className="card-flat" style={{ padding: 16, marginTop: 24, textAlign: 'left' }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>How it works</h4>
              {[
                { step: '1', text: 'Open the app and go to Scan & Go' },
                { step: '2', text: 'Scan product barcodes as you shop' },
                { step: '3', text: 'Review your list and pay in-app' },
                { step: '4', text: 'Show your receipt and walk out!' },
              ].map(s => (
                <div key={s.step} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8, fontSize: 13 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{s.step}</div>
                  {s.text}
                </div>
              ))}
            </div>
          </div>

          {/* Scanned Items */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
              <ShoppingCart size={18} style={{ verticalAlign: -3 }} /> Scanned Items ({scannedItems.length})
            </h3>
            {scannedItems.length === 0 ? (
              <div className="card-flat" style={{ padding: 40, textAlign: 'center' }}>
                <QrCode size={32} color="var(--text-tertiary)" />
                <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 8 }}>Scan products to add them here</p>
              </div>
            ) : (
              <>
                {scannedItems.map(item => (
                  <div key={item.id} className="card-flat animate-fade-in-up" style={{ padding: 12, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                    {item.image && item.image.startsWith('http') ? (
                      <img src={item.image} alt={item.name} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: 48, height: 48, borderRadius: 10, background: getProductImage(item), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, color: 'white' }}>
                        {(item.brand || '').substring(0, 2)}
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>x{item.qty}</div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{formatPrice(item.price * item.qty)}</div>
                  </div>
                ))}
                <div className="card-flat" style={{ padding: 16, marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18 }}>
                    <span>Total</span><span>{formatPrice(total)}</span>
                  </div>
                  <button className="btn btn-primary btn-lg w-full" style={{ marginTop: 16 }} onClick={handleCheckout}>
                    <CreditCard size={18} /> Pay & Go — {formatPrice(total)}
                  </button>
                </div>
              </>
            )}

            {showSuccess && (
              <div className="animate-bounce-in" style={{ textAlign: 'center', marginTop: 24, padding: 24, background: 'var(--success-light)', borderRadius: 16 }}>
                <CheckCircle size={40} color="var(--success)" />
                <h3 style={{ marginTop: 8, color: 'var(--success)' }}>Payment Successful!</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Show this screen at the exit gate.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
