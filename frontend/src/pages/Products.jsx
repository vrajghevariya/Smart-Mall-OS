import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, stores, categories, intelligentSearch, filterProducts } from '../services/data';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedStore, setSelectedStore] = useState(searchParams.get('store') || '');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200000]);

  // Debounced search
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    let result;

    if (debouncedQuery.trim()) {
      const { results } = intelligentSearch(debouncedQuery);
      result = results;
    } else {
      result = [...products];
    }

    // Apply filters on top
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (selectedStore) result = result.filter(p => p.store === selectedStore);
    if (priceRange[0] > 0) result = result.filter(p => p.price >= priceRange[0]);
    if (priceRange[1] < 200000) result = result.filter(p => p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      case 'popular': default: result.sort((a, b) => b.reviews - a.reviews); break;
    }

    return result;
  }, [debouncedQuery, selectedCategory, selectedStore, sortBy, priceRange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedStore('');
    setSortBy('popular');
    setPriceRange([0, 200000]);
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedStore || priceRange[0] > 0 || priceRange[1] < 200000;
  const uniqueStores = [...new Set(products.map(p => p.store))].sort();

  return (
    <div className="page-wrapper">
      <div className="container section">
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 'var(--font-3xl)', fontWeight: 800, marginBottom: 8 }}>Explore Products</h1>
          <p style={{ color: 'var(--text-tertiary)' }}>{filteredProducts.length} products{selectedCategory ? ` in ${selectedCategory}` : ''}{selectedStore ? ` at ${selectedStore}` : ''}</p>
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--bg-hover)', transition: 'border-color 0.2s' }}>
            <Search size={18} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search: "Nike shoes", "laptop under 60000", "gift for brother"...'
              style={{ flex: 1, padding: '14px 0', background: 'transparent', border: 'none', fontSize: 14, color: 'var(--text-primary)', fontFamily: 'var(--font-family)' }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ padding: 4, color: 'var(--text-tertiary)', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            )}
            <Link to="/voice-shopping" style={{ padding: 6, color: 'var(--text-tertiary)', borderRadius: 8, transition: 'color 0.2s' }}>
              <Mic size={18} />
            </Link>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}>
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          <button
            className={`glass-chip ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory('')}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`glass-chip ${selectedCategory === cat.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? '' : cat.name)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bg-hover)', marginBottom: 24, animation: 'slideDown 0.2s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', display: 'block', marginBottom: 8 }}>Store</label>
                <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', fontSize: 13, border: '1px solid var(--bg-hover)', fontFamily: 'var(--font-family)', color: 'var(--text-primary)' }}>
                  <option value="">All Stores</option>
                  {uniqueStores.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', display: 'block', marginBottom: 8 }}>Sort By</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', fontSize: 13, border: '1px solid var(--bg-hover)', fontFamily: 'var(--font-family)', color: 'var(--text-primary)' }}>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="btn btn-ghost" style={{ color: 'var(--error)' }}>
                    <X size={14} /> Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid-4">
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No products found</h3>
            <p style={{ color: 'var(--text-tertiary)', marginBottom: 24 }}>Try another brand, category, or price range.</p>
            <button onClick={clearFilters} className="btn btn-primary">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
