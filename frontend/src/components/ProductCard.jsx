import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Check, MapPin } from 'lucide-react';
import { formatPrice } from '../services/data';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const wishlisted = isInWishlist(product.id);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    addToast(`${product.name} added to cart`, 'success');
    setTimeout(() => setAdded(false), 1200);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    addToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', wishlisted ? 'info' : 'success');
  };

  const hasRealImage = product.image && product.image.startsWith('http') && !imgError;

  // Fallback gradient based on category
  const fallbackColors = {
    'Electronics': ['#1a1a2e', '#16213e'],
    'Fashion': ['#e8345a', '#cc2b5e'],
    'Sports & Fashion': ['#111', '#333'],
    'Sports & Fitness': ['#0066CC', '#004494'],
    'Beauty': ['#1a1a1a', '#434343'],
    'Food & Beverage': ['#1e3932', '#00704A'],
    'Lifestyle': ['#6a0572', '#ab2587'],
    'Books & Stationery': ['#2c3e50', '#3498db'],
  };
  const colors = fallbackColors[product.category] || ['#4F6BF6', '#818CF8'];
  const categoryEmoji = { 'Electronics': '💻', 'Fashion': '👔', 'Sports & Fashion': '🏃', 'Sports & Fitness': '🏋️', 'Beauty': '✨', 'Food & Beverage': '☕', 'Lifestyle': '🛍️', 'Books & Stationery': '📚' };

  return (
    <Link to={`/products/${product.id}`} className="product-card" style={{ textDecoration: 'none' }}>
      <div className="product-card-image">
        {hasRealImage ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
            {categoryEmoji[product.category] || '🛍️'}
          </div>
        )}
        {product.discount > 0 && (
          <span className="product-card-discount">{product.discount}% OFF</span>
        )}
        <button className={`product-card-wishlist ${wishlisted ? 'active' : ''}`} onClick={handleToggleWishlist}>
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-card-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <p className="product-card-store">{product.brand || product.store}</p>
          {product.floor && (
            <span style={{ fontSize: 11, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 2 }}>
              <MapPin size={10} /> {product.floor.split(' ')[0]}
            </span>
          )}
        </div>
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-rating">
          <Star size={13} fill="#FBBF24" stroke="#FBBF24" />
          <span style={{ fontSize: 12, fontWeight: 600 }}>{product.rating}</span>
          <span className="product-card-review-count">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="product-card-price">
          <span className="product-card-price-current">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="product-card-price-original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <button
          className={`product-card-add-btn ${added ? 'added' : ''}`}
          onClick={handleAddToCart}
          disabled={added}
        >
          {added ? <><Check size={14} /> Added</> : <><ShoppingCart size={14} /> Add to Cart</>}
        </button>
      </div>
    </Link>
  );
}
