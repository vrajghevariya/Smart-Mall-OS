import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, getProductImage } from '../services/data';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, discount, delivery, total, cartCount } = useCart();

  if (items.length === 0) return (
    <div className="page-wrapper"><div className="container section">
      <div className="empty-state">
        <div className="empty-state-icon"><ShoppingBag size={32} /></div>
        <h3 className="empty-state-title">Your cart is empty</h3>
        <p className="empty-state-desc">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn btn-primary">Start Shopping</Link>
      </div>
    </div></div>
  );

  return (
    <div className="page-wrapper">
      <div className="container section">
        <h1 className="section-title" style={{ marginBottom: 32 }}>Shopping Cart ({cartCount} items)</h1>
        <div className="cart-layout">
          <div>
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  {item.image && item.image.startsWith('http') ? (
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: getProductImage(item), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: 'white' }}>
                      {(item.brand || item.store || '').substring(0, 2)}
                    </div>
                  )}
                </div>
                <div className="cart-item-info">
                  <Link to={`/products/${item.id}`} className="cart-item-name">{item.name}</Link>
                  <p className="cart-item-store">{item.store}</p>
                  <div className="cart-item-qty">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                    <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 'auto', color: 'var(--error)' }}><Trash2 size={16} /></button>
                  </div>
                </div>
                <div className="cart-item-price">
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{formatPrice(item.price * item.quantity)}</div>
                  {item.originalPrice > item.price && (
                    <div style={{ fontSize: 12, color: '#9BA1BF', textDecoration: 'line-through' }}>{formatPrice(item.originalPrice * item.quantity)}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="cart-summary-title">Order Summary</h3>
            <div className="cart-summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="cart-summary-row" style={{ color: 'var(--success)' }}><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
            <div className="cart-summary-row">
              <span>Delivery</span>
              <span style={{ color: delivery === 0 ? 'var(--success)' : undefined }}>
                {delivery === 0 ? 'FREE' : formatPrice(delivery)}
              </span>
            </div>
            {delivery > 0 && <p style={{ fontSize: 11, color: '#9BA1BF', marginTop: 4 }}>Free delivery on orders above ₹999</p>}
            <div className="cart-summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
            <Link to="/checkout" className="btn btn-primary btn-lg w-full" style={{ marginTop: 20 }}>
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
