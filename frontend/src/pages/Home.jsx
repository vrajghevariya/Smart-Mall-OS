import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Mic, MapPin, Car, QrCode, MessageSquare, ChevronRight, Star, Tag, TrendingUp, Store, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import StoreCard from '../components/StoreCard';
import { products, stores, offers, categories, formatPrice } from '../services/data';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const trendingProducts = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
  const topOffers = offers.slice(0, 4);
  const topStores = stores.filter(s => s.isOpen).sort((a, b) => b.rating - a.rating).slice(0, 6);

  const quickActions = [
    { icon: <Search size={20} />, label: 'Find Product', to: '/products', color: '#4F6BF6' },
    { icon: <MapPin size={20} />, label: 'Mall Map', to: '/mall-map', color: '#06B6D4' },
    { icon: <Car size={20} />, label: 'Parking', to: '/parking', color: '#10B981' },
    { icon: <QrCode size={20} />, label: 'Scan & Go', to: '/scan-go', color: '#F59E0B' },
    { icon: <MessageSquare size={20} />, label: 'AI Assistant', to: '/assistant', color: '#8B5CF6' },
  ];

  const brandNames = ['CROMA', 'H&M', 'NIKE', 'SAMSUNG', 'SEPHORA', 'STARBUCKS', "LEVI'S", 'DECATHLON'];

  return (
    <div className="page-wrapper">
      {/* ── Hero Section ──────────────────── */}
      <section style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(135deg, #0A1628 0%, #1A2742 40%, #2A3A5C 100%)' }}>
        {/* Ambient background orbs */}
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,107,246,0.15) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'heroPulse 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '15%', right: '15%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', filter: 'blur(50px)', animation: 'heroPulse 8s ease-in-out infinite 2s' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 800, padding: '120px 24px 80px' }}>
          {/* Heading */}
          <h1 className="hero-animate-1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: 'white', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 20 }}>
            YOUR MALL.<br />
            <span style={{ background: 'linear-gradient(135deg, #4F6BF6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SMARTER.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-animate-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Discover stores, find products, navigate smarter — and shop effortlessly.
          </p>

          {/* Glass Search */}
          <form onSubmit={handleSearch} className="hero-animate-3" style={{ maxWidth: 560, margin: '0 auto 48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 6px 6px 20px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px) saturate(150%)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, transition: 'all 0.3s', ...(isSearchFocused ? { background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(79,107,246,0.4)' } : {}) }}>
              <Search size={18} style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search products, brands or stores..."
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'white', fontSize: 15, padding: '12px 0', fontFamily: 'var(--font-family)' }}
              />
              <Link to="/voice-shopping" style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', transition: 'all 0.2s', flexShrink: 0, textDecoration: 'none' }}>
                <Mic size={16} />
              </Link>
              <button type="submit" style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #4F6BF6, #818CF8)', color: 'white', border: 'none', borderRadius: 14, fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-family)', transition: 'all 0.2s', flexShrink: 0 }}>
                Search
              </button>
            </div>
          </form>

          {/* Quick Actions */}
          <div className="hero-animate-4" style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {quickActions.map((action, i) => (
              <Link key={i} to={action.to} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '14px 18px', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, color: 'white', textDecoration: 'none', transition: 'all 0.25s', minWidth: 80 }} onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ color: action.color }}>{action.icon}</div>
                <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.8 }}>{action.label}</span>
              </Link>
            ))}
          </div>

          {/* Brand strip */}
          <div className="hero-animate-5" style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 56, flexWrap: 'wrap' }}>
            {brandNames.map((name, i) => (
              <span key={i} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)' }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Stats ──────────────────── */}
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--bg-hover)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: 48, padding: '24px', flexWrap: 'wrap' }}>
          {[
            { value: `${stores.length}+`, label: 'Premium Stores' },
            { value: `${products.length}+`, label: 'Products' },
            { value: '3', label: 'Floors' },
            { value: '500+', label: 'Parking Spots' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: 100 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500, marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ──────────────────── */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="section-header">
            <h2 style={{ fontSize: 'var(--font-2xl)', fontWeight: 700 }}>Explore Categories</h2>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <Link key={cat.id} to={`/products?category=${encodeURIComponent(cat.name)}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '20px 24px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bg-hover)', transition: 'all 0.25s', flexShrink: 0, textDecoration: 'none', minWidth: 110 }} onMouseOver={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--bg-hover)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <span style={{ fontSize: 28 }}>{cat.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{cat.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{cat.count} items</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending Now ──────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 style={{ fontSize: 'var(--font-2xl)', fontWeight: 700 }}>
                <TrendingUp size={22} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8, color: 'var(--accent)' }} />
                Trending Now
              </h2>
              <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-tertiary)', marginTop: 4 }}>Most popular across all stores</p>
            </div>
            <Link to="/products" className="section-link">View All <ChevronRight size={16} /></Link>
          </div>
          <div className="grid-4">
            {trendingProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Popular Stores ──────────────────── */}
      <section className="section" style={{ background: 'var(--bg-white)', paddingTop: 48, paddingBottom: 48 }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 style={{ fontSize: 'var(--font-2xl)', fontWeight: 700 }}>
                <Store size={22} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8, color: 'var(--accent)' }} />
                Popular Stores
              </h2>
              <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-tertiary)', marginTop: 4 }}>Top-rated stores in the mall</p>
            </div>
            <Link to="/stores" className="section-link">All Stores <ChevronRight size={16} /></Link>
          </div>
          <div className="grid-3">
            {topStores.map(s => <StoreCard key={s.id} store={s} />)}
          </div>
        </div>
      </section>

      {/* ── Today's Offers ──────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 style={{ fontSize: 'var(--font-2xl)', fontWeight: 700 }}>
                <Tag size={22} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8, color: 'var(--error)' }} />
                Today's Offers
              </h2>
              <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-tertiary)', marginTop: 4 }}>Don't miss these deals</p>
            </div>
            <Link to="/offers" className="section-link">All Offers <ChevronRight size={16} /></Link>
          </div>
          <div className="grid-4">
            {topOffers.map(offer => (
              <div key={offer.id} className="card" style={{ padding: 24, borderLeft: `4px solid var(--accent)` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent)' }}>{offer.discount}</span>
                  <span className="badge badge-primary" style={{ fontSize: 11 }}>{offer.store}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{offer.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 12, lineHeight: 1.5 }}>{offer.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <code style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', background: 'var(--accent-subtle)', color: 'var(--accent)', borderRadius: 6 }}>{offer.code}</code>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Min. {formatPrice(offer.minPurchase)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Smart Features ──────────────────── */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1A2742 100%)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'var(--font-3xl)', fontWeight: 800, marginBottom: 12 }}>
              <Sparkles size={24} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />
              Smart Features
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto' }}>AI-powered tools that make your shopping experience seamless</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { emoji: '🎙️', title: 'Voice Shopping', desc: 'Search with your voice', to: '/voice-shopping' },
              { emoji: '📱', title: 'Scan & Go', desc: 'Skip the checkout queue', to: '/scan-go' },
              { emoji: '🗺️', title: 'Indoor Navigation', desc: 'Find your way around', to: '/mall-map' },
              { emoji: '⏱️', title: 'Queue Prediction', desc: 'Smart wait time estimates', to: '/queue-prediction' },
              { emoji: '🌡️', title: 'Crowd Heatmap', desc: 'Real-time crowd density', to: '/crowd-heatmap' },
              { emoji: '🅿️', title: 'Smart Parking', desc: 'Find & book spots', to: '/parking' },
              { emoji: '🤖', title: 'AI Assistant', desc: 'Your personal shopper', to: '/assistant' },
              { emoji: '🚨', title: 'Emergency Alerts', desc: 'Safety first, always', to: '/emergency' },
            ].map((f, i) => (
              <Link key={i} to={f.to} style={{ padding: '24px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, textDecoration: 'none', color: 'white', transition: 'all 0.25s', display: 'block' }} onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{f.emoji}</span>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{f.title}</h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
