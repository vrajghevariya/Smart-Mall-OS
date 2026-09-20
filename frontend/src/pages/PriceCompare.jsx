import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingDown, TrendingUp, Minus, Bell, BellOff, Star, ChevronDown, ChevronUp, BarChart3, ShoppingCart, Check } from 'lucide-react';
import { products, stores, formatPrice, getPriceHistory, getPriceStats, getCrossStoreComparison } from '../services/data';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

// Mini SVG price chart
function PriceChart({ history, width = 280, height = 80 }) {
  if (!history || history.length === 0) return null;
  const prices = history.map(h => h.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const padding = 4;
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;

  const points = prices.map((p, i) => {
    const x = padding + (i / (prices.length - 1)) * chartW;
    const y = padding + chartH - ((p - min) / range) * chartH;
    return `${x},${y}`;
  }).join(' ');

  const lastPrice = prices[prices.length - 1];
  const firstPrice = prices[0];
  const isDown = lastPrice < firstPrice;
  const color = isDown ? '#10B981' : lastPrice > firstPrice ? '#EF4444' : '#94A3B8';

  // Area fill
  const areaPoints = `${padding},${padding + chartH} ${points} ${width - padding},${padding + chartH}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`grad-${history[0]?.date}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${history[0]?.date})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Current price dot */}
      {(() => {
        const lastX = padding + ((prices.length - 1) / (prices.length - 1)) * chartW;
        const lastY = padding + chartH - ((lastPrice - min) / range) * chartH;
        return <circle cx={lastX} cy={lastY} r="3.5" fill={color} stroke="white" strokeWidth="1.5" />;
      })()}
    </svg>
  );
}

function TrendBadge({ trend, change, percent }) {
  if (trend === 'dropping') return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: '#ECFDF5', color: '#059669', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
      <TrendingDown size={13} /> {Math.abs(percent)}% ↓
    </span>
  );
  if (trend === 'rising') return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: '#FEF2F2', color: '#DC2626', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
      <TrendingUp size={13} /> {Math.abs(percent)}% ↑
    </span>
  );
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: '#F1F5F9', color: '#64748B', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
      <Minus size={13} /> Stable
    </span>
  );
}

function ProductCompareRow({ product, isExpanded, onToggle }) {
  const stats = useMemo(() => getPriceStats(product.id), [product.id]);
  const comparisons = useMemo(() => getCrossStoreComparison(product.id), [product.id]);
  const history = useMemo(() => getPriceHistory(product.id), [product.id]);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [alertSet, setAlertSet] = useState(false);
  const [added, setAdded] = useState(false);

  if (!stats) return null;

  const bestPrice = comparisons.filter(c => c.inStock).sort((a, b) => a.price - b.price)[0];
  const saving = stats.highestPrice - stats.currentPrice;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    addToast(`${product.name} added to cart`, 'success');
    setTimeout(() => setAdded(false), 1200);
  };

  const handleAlert = (e) => {
    e.stopPropagation();
    setAlertSet(!alertSet);
    addToast(alertSet ? 'Price alert removed' : 'Price drop alert set! We\'ll notify you.', alertSet ? 'info' : 'success');
  };

  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bg-hover)', overflow: 'hidden', transition: 'all 0.25s' }}>
      {/* Main row */}
      <div onClick={onToggle} style={{ display: 'grid', gridTemplateColumns: '56px 1fr 120px 140px 100px 50px', alignItems: 'center', gap: 16, padding: '16px 20px', cursor: 'pointer', transition: 'background 0.15s' }} onMouseOver={e => e.currentTarget.style.background = 'var(--bg-hover)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
        {/* Image */}
        <div style={{ width: 52, height: 52, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: 'var(--bg-input)' }}>
          {product.image?.startsWith('http') ? (
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🛍️</div>
          )}
        </div>

        {/* Name & Store */}
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{product.store} • {product.subcategory}</div>
        </div>

        {/* Current Price */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 16, fontWeight: 800 }}>{formatPrice(stats.currentPrice)}</div>
          {stats.currentPrice < stats.highestPrice && (
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>{formatPrice(stats.highestPrice)}</div>
          )}
        </div>

        {/* Trend */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <TrendBadge trend={stats.trend} change={stats.weeklyChange} percent={stats.weeklyChangePercent} />
          {stats.isAtLowest && (
            <span style={{ fontSize: 10, fontWeight: 700, color: '#059669', background: '#ECFDF5', padding: '2px 8px', borderRadius: 10 }}>🔥 ALL-TIME LOW</span>
          )}
        </div>

        {/* Mini chart */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PriceChart history={history} width={90} height={36} />
        </div>

        {/* Expand arrow */}
        <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {/* Expanded section */}
      {isExpanded && (
        <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--bg-hover)', animation: 'slideDown 0.2s ease' }}>
          {/* Price History Chart */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 20 }}>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <BarChart3 size={14} /> 30-Day Price History
              </h4>
              <div style={{ background: 'var(--bg-input)', borderRadius: 12, padding: 16 }}>
                <PriceChart history={history} width={400} height={120} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: 'var(--text-tertiary)' }}>
                  <span>{history[0]?.dateLabel}</span>
                  <span>Today</span>
                </div>
              </div>
              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 12 }}>
                {[
                  { label: 'Lowest', value: formatPrice(stats.lowestPrice), color: '#059669' },
                  { label: 'Highest', value: formatPrice(stats.highestPrice), color: '#DC2626' },
                  { label: 'Average', value: formatPrice(stats.avgPrice), color: 'var(--text-secondary)' },
                  { label: 'You Save', value: saving > 0 ? formatPrice(saving) : '—', color: '#059669' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: 10, background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--bg-hover)' }}>
                    <div style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-Store Comparison */}
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>🏪 Compare Across Stores</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {comparisons.map((comp, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                    background: comp.isBest ? '#ECFDF5' : 'var(--bg-input)',
                    borderRadius: 12,
                    border: comp.isBest ? '1.5px solid #10B981' : comp.isCurrent ? '1.5px solid var(--accent)' : '1px solid transparent',
                    position: 'relative',
                  }}>
                    {comp.isBest && (
                      <span style={{ position: 'absolute', top: -8, right: 12, fontSize: 10, fontWeight: 800, padding: '2px 8px', background: '#10B981', color: 'white', borderRadius: 8 }}>
                        BEST PRICE
                      </span>
                    )}
                    {comp.isCurrent && !comp.isBest && (
                      <span style={{ position: 'absolute', top: -8, right: 12, fontSize: 10, fontWeight: 800, padding: '2px 8px', background: 'var(--accent)', color: 'white', borderRadius: 8 }}>
                        CURRENT
                      </span>
                    )}
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, border: '1px solid var(--bg-hover)', flexShrink: 0 }}>
                      {comp.storeLogo?.substring(0, 3)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{comp.storeName}</div>
                      <div style={{ fontSize: 11, color: comp.inStock ? 'var(--success)' : 'var(--error)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        {comp.inStock ? '✓ ' + comp.delivery : '✗ Out of Stock'}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: comp.isBest ? '#059669' : 'var(--text-primary)' }}>
                        {formatPrice(comp.price)}
                      </div>
                      {comp.originalPrice > comp.price && (
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>{formatPrice(comp.originalPrice)}</div>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 11, color: '#FBBF24' }}>
                      <Star size={11} fill="#FBBF24" stroke="#FBBF24" /> {comp.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'flex-end' }}>
            <button onClick={handleAlert} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
              background: alertSet ? 'var(--warning-light)' : 'var(--bg-input)',
              border: alertSet ? '1px solid var(--warning)' : '1px solid var(--bg-hover)',
              borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              color: alertSet ? '#B45309' : 'var(--text-secondary)', fontFamily: 'var(--font-family)',
            }}>
              {alertSet ? <><BellOff size={14} /> Alert Set</> : <><Bell size={14} /> Set Price Drop Alert</>}
            </button>
            <Link to={`/products/${product.id}`} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'var(--bg-input)', border: '1px solid var(--bg-hover)', borderRadius: 10, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none' }}>
              View Details
            </Link>
            <button onClick={handleAddToCart} disabled={added} className="btn btn-primary btn-sm">
              {added ? <><Check size={14} /> Added</> : <><ShoppingCart size={14} /> Add to Cart</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PriceCompare() {
  const [expandedId, setExpandedId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [trendFilter, setTrendFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const allCategories = [...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let result = products.slice(0, 20);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.store.toLowerCase().includes(q));
    }
    if (categoryFilter) result = result.filter(p => p.category === categoryFilter);
    if (trendFilter) {
      result = result.filter(p => {
        const stats = getPriceStats(p.id);
        return stats?.trend === trendFilter;
      });
    }

    return result;
  }, [searchQuery, categoryFilter, trendFilter]);

  // Summary stats
  const droppingCount = products.slice(0, 20).filter(p => getPriceStats(p.id)?.trend === 'dropping').length;
  const risingCount = products.slice(0, 20).filter(p => getPriceStats(p.id)?.trend === 'rising').length;
  const lowestCount = products.slice(0, 20).filter(p => getPriceStats(p.id)?.isAtLowest).length;

  return (
    <div className="page-wrapper">
      <div className="container section">
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 24, textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back
        </Link>

        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 'var(--font-3xl)', fontWeight: 800, marginBottom: 8 }}>💰 Price Comparison & Tracker</h1>
          <p style={{ color: 'var(--text-tertiary)', maxWidth: 560 }}>Compare prices across stores, track 30-day price history, and set alerts for price drops.</p>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '📉', label: 'Prices Dropping', value: droppingCount, color: '#059669', bg: '#ECFDF5' },
            { icon: '📈', label: 'Prices Rising', value: risingCount, color: '#DC2626', bg: '#FEF2F2' },
            { icon: '🔥', label: 'At Lowest Price', value: lowestCount, color: '#D97706', bg: '#FFFBEB' },
            { icon: '🏪', label: 'Stores Tracked', value: stores.length, color: 'var(--accent)', bg: 'var(--accent-subtle)' },
          ].map((stat, i) => (
            <div key={i} style={{ padding: 18, background: stat.bg, borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{stat.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: stat.color, opacity: 0.7, marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search products or brands..."
            style={{ flex: 1, minWidth: 200, padding: '10px 14px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', fontSize: 13, border: '1px solid var(--bg-hover)', fontFamily: 'var(--font-family)', color: 'var(--text-primary)' }}
          />
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{ padding: '10px 14px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', fontSize: 13, border: '1px solid var(--bg-hover)', fontFamily: 'var(--font-family)', color: 'var(--text-primary)', minWidth: 140 }}>
            <option value="">All Categories</option>
            {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { value: '', label: 'All' },
              { value: 'dropping', label: '📉 Dropping' },
              { value: 'rising', label: '📈 Rising' },
              { value: 'stable', label: '➖ Stable' },
            ].map(f => (
              <button key={f.value} onClick={() => setTrendFilter(f.value)} className={`glass-chip ${trendFilter === f.value ? 'active' : ''}`} style={{ fontSize: 12 }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCompareRow
                key={product.id}
                product={product}
                isExpanded={expandedId === product.id}
                onToggle={() => setExpandedId(expandedId === product.id ? null : product.id)}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No products found</h3>
              <p style={{ color: 'var(--text-tertiary)' }}>Try a different search or filter.</p>
            </div>
          )}
        </div>

        {/* Info footer */}
        <div style={{ marginTop: 28, padding: 20, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--bg-hover)', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
            💡 Click on any product to see detailed 30-day price history, cross-store comparison, and set price drop alerts.
          </p>
        </div>
      </div>
    </div>
  );
}
