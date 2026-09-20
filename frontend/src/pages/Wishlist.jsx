import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice, getProductImage } from '../services/data';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  if (wishlistItems.length === 0) return (
    <div className="page-wrapper"><div className="container section">
      <div className="empty-state">
        <div className="empty-state-icon"><Heart size={32} /></div>
        <h3 className="empty-state-title">Your wishlist is empty</h3>
        <p className="empty-state-desc">Save items you love to your wishlist and come back to them later.</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    </div></div>
  );

  return (
    <div className="page-wrapper">
      <div className="container section">
        <h1 className="section-title" style={{ marginBottom: 32 }}>My Wishlist ({wishlistItems.length} items)</h1>
        <div className="grid-4">
          {wishlistItems.map(item => (
            <div key={item.id} className="product-card">
              <Link to={`/products/${item.id}`}>
                <div className="product-card-image">
                  {item.image && item.image.startsWith('http') ? (
                    <img src={item.image} alt={item.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, background: getProductImage(item), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
                      🛍️
                    </div>
                  )}
                </div>
              </Link>
              <div className="product-card-body">
                <p className="product-card-store">{item.store}</p>
                <h3 className="product-card-name">{item.name}</h3>
                <div className="product-card-price">
                  <span className="product-card-price-current">{formatPrice(item.price)}</span>
                  {item.originalPrice > item.price && <span className="product-card-price-original">{formatPrice(item.originalPrice)}</span>}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button className="product-card-add-btn" style={{ flex: 1 }} onClick={() => { addToCart(item); addToast('Added to cart', 'success'); }}>
                    <ShoppingCart size={14} /> Add to Cart
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => { removeFromWishlist(item.id); addToast('Removed from wishlist', 'info'); }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
