import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, Truck, Shield, RotateCcw, Store, MapPin, Check, Navigation, TrendingDown, TrendingUp, BarChart3 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProductById, getRecommendations, getStoreById, formatPrice, getPriceHistory, getPriceStats } from '../services/data';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!product) return (
    <div className="page-wrapper">
      <div className="container section" style={{ textAlign: 'center', padding: 80 }}>
        <p style={{ fontSize: 48, marginBottom: 16 }}>📦</p>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Product not found</h3>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    </div>
  );

  const wishlisted = isInWishlist(product.id);
  const recommended = getRecommendations(product.id);
  const store = getStoreById(product.storeId);
  const images = product.images?.length > 0 ? product.images : [product.image];
  const hasRealImage = images[selectedImage]?.startsWith('http') && !imgError;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    addToast(`${product.name} added to cart`, 'success');
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="page-wrapper">
      <div className="container section">
        <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 24, textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 64 }}>
          {/* Image Gallery */}
          <div>
            <div style={{ borderRadius: 20, aspectRatio: '1', overflow: 'hidden', position: 'relative', background: 'var(--bg-input)', marginBottom: 12 }}>
              {hasRealImage ? (
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  onError={() => setImgError(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, background: `linear-gradient(135deg, var(--dark), var(--dark-secondary))` }}>
                  {product.category === 'Electronics' && '💻'}
                  {product.category === 'Fashion' && '👔'}
                  {product.category === 'Sports & Fashion' && '🏃'}
                  {product.category === 'Sports & Fitness' && '🏋️'}
                  {product.category === 'Beauty' && '✨'}
                  {product.category === 'Food & Beverage' && '☕'}
                  {product.category === 'Lifestyle' && '🛍️'}
                  {product.category === 'Books & Stationery' && '📚'}
                </div>
              )}
              {product.discount > 0 && (
                <span className="product-card-discount" style={{ fontSize: 14, padding: '6px 14px' }}>{product.discount}% OFF</span>
              )}
            </div>
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: 8 }}>
                {images.map((img, i) => (
                  <button key={i} onClick={() => { setSelectedImage(i); setImgError(false); }}
                    style={{ width: 72, height: 72, borderRadius: 12, overflow: 'hidden', border: selectedImage === i ? '2px solid var(--accent)' : '2px solid var(--bg-hover)', cursor: 'pointer', padding: 0 }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{product.brand}</span>
              {product.subcategory && <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>• {product.subcategory}</span>}
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{product.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: 'var(--success-light)', borderRadius: 'var(--radius-full)' }}>
                <Star size={14} fill="#FBBF24" stroke="#FBBF24" />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--success)' }}>{product.rating}</span>
              </div>
              <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{product.reviews.toLocaleString()} reviews</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)' }}>{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span style={{ fontSize: 18, color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>{formatPrice(product.originalPrice)}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--success)' }}>Save {formatPrice(product.originalPrice - product.price)}</span>
                </>
              )}
            </div>

            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>{product.description}</p>

            {/* Meta info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
              {product.color && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <span style={{ fontWeight: 600 }}>Color:</span> {product.color}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <span style={{ fontWeight: 600 }}>Availability:</span>
                <span style={{ color: product.stock > 0 ? 'var(--success)' : 'var(--error)', fontWeight: 600 }}>
                  {product.stock > 10 ? '✓ In Stock' : product.stock > 0 ? `Only ${product.stock} left` : '✗ Out of Stock'}
                </span>
              </div>
            </div>

            {/* Store link */}
            {store && (
              <Link to={`/stores/${store.id}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--bg-hover)', marginBottom: 28, textDecoration: 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: store.bannerGradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'white' }}>{store.logo?.substring(0, 2)}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{store.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{store.floor} • {store.location}</div>
                </div>
                <Navigation size={16} style={{ color: 'var(--accent)' }} />
              </Link>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleAddToCart}
                disabled={added || product.stock === 0}
                className="btn btn-primary btn-lg"
                style={{ flex: 1 }}
              >
                {added ? <><Check size={18} /> Added to Cart</> : <><ShoppingCart size={18} /> Add to Cart</>}
              </button>
              <button
                onClick={() => { toggleWishlist(product); addToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', wishlisted ? 'info' : 'success'); }}
                className={`btn btn-secondary btn-lg`}
                style={{ color: wishlisted ? 'var(--error)' : undefined }}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 20, marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--bg-hover)' }}>
              {[
                { icon: <Truck size={16} />, text: 'Free Delivery' },
                { icon: <Shield size={16} />, text: 'Genuine Products' },
                { icon: <RotateCcw size={16} />, text: 'Easy Returns' },
              ].map((badge, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500 }}>
                  <span style={{ color: 'var(--success)' }}>{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price History */}
        {(() => {
          const stats = getPriceStats(product.id);
          const history = getPriceHistory(product.id);
          if (!stats || !history.length) return null;
          const prices = history.map(h => h.price);
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          const range = max - min || 1;
          const w = 600, h = 140, pad = 8;
          const cW = w - pad*2, cH = h - pad*2;
          const pts = prices.map((p, i) => {
            const x = pad + (i/(prices.length-1))*cW;
            const y = pad + cH - ((p - min)/range)*cH;
            return `${x},${y}`;
          }).join(' ');
          const color = stats.trend === 'dropping' ? '#10B981' : stats.trend === 'rising' ? '#EF4444' : '#94A3B8';
          const area = `${pad},${pad+cH} ${pts} ${w-pad},${pad+cH}`;
          return (
            <div style={{ marginBottom: 48, padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bg-hover)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <BarChart3 size={20} /> Price History
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {stats.trend === 'dropping' && <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 12px', background: '#ECFDF5', color: '#059669', borderRadius: 20, fontSize: 12, fontWeight: 700 }}><TrendingDown size={13}/> {Math.abs(stats.weeklyChangePercent)}% this week</span>}
                  {stats.trend === 'rising' && <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 12px', background: '#FEF2F2', color: '#DC2626', borderRadius: 20, fontSize: 12, fontWeight: 700 }}><TrendingUp size={13}/> {Math.abs(stats.weeklyChangePercent)}% this week</span>}
                  {stats.isAtLowest && <span style={{ padding: '4px 12px', background: '#FFFBEB', color: '#B45309', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>🔥 All-Time Low!</span>}
                  <Link to='/price-compare' style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Compare Prices →</Link>
                </div>
              </div>
              <svg width='100%' viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
                <defs><linearGradient id='pg' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stopColor={color} stopOpacity='0.15'/><stop offset='100%' stopColor={color} stopOpacity='0.02'/></linearGradient></defs>
                <polygon points={area} fill='url(#pg)'/>
                <polyline points={pts} fill='none' stroke={color} strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'/>
                <circle cx={pad+cW} cy={pad+cH-((stats.currentPrice-min)/range)*cH} r='4' fill={color} stroke='white' strokeWidth='2'/>
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: 'var(--text-tertiary)' }}>
                <span>{history[0]?.dateLabel}</span><span>Today</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 16 }}>
                {[
                  { label: 'Current', value: formatPrice(stats.currentPrice), color: 'var(--text-primary)' },
                  { label: 'Lowest', value: formatPrice(stats.lowestPrice), color: '#059669' },
                  { label: 'Highest', value: formatPrice(stats.highestPrice), color: '#DC2626' },
                  { label: 'Average', value: formatPrice(stats.avgPrice), color: 'var(--text-secondary)' },
                ].map((s,i) => (
                  <div key={i} style={{ textAlign: 'center', padding: 12, background: 'var(--bg-input)', borderRadius: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Similar Products */}
        {recommended.length > 0 && (
          <div>
            <h2 style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, marginBottom: 20 }}>You May Also Like</h2>
            <div className="grid-4">
              {recommended.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
