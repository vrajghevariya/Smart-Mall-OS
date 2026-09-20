import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, MapPin, Clock, ChevronRight } from 'lucide-react';
import StoreCard from '../components/StoreCard';
import { stores, categories } from '../services/data';

export default function Stores() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '');
  const [floorFilter, setFloorFilter] = useState('');
  const [openOnly, setOpenOnly] = useState(false);

  const floors = ['Ground Floor', '1st Floor', '2nd Floor'];
  const storeCategories = [...new Set(stores.map(s => s.category))];

  const filtered = useMemo(() => {
    let result = [...stores];
    if (search) result = result.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));
    if (categoryFilter) result = result.filter(s => s.category === categoryFilter);
    if (floorFilter) result = result.filter(s => s.floor === floorFilter);
    if (openOnly) result = result.filter(s => s.isOpen);
    return result;
  }, [search, categoryFilter, floorFilter, openOnly]);

  return (
    <div className="page-wrapper">
      <div className="container section">
        <div className="section-header">
          <div>
            <h1 className="section-title">Store Directory</h1>
            <p className="section-subtitle">{filtered.length} stores found</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-bar" style={{ flex: 1, minWidth: 250 }}>
            <Search size={18} className="search-bar-icon" />
            <input placeholder="Search stores..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="form-select" style={{ width: 'auto', minWidth: 160 }} value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            {storeCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="form-select" style={{ width: 'auto', minWidth: 160 }} value={floorFilter} onChange={e => setFloorFilter(e.target.value)}>
            <option value="">All Floors</option>
            {floors.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer', fontWeight: 500 }}>
            <input type="checkbox" checked={openOnly} onChange={e => setOpenOnly(e.target.checked)} style={{ accentColor: 'var(--accent)' }} />
            Open Now
          </label>
        </div>

        {/* Store Grid */}
        {filtered.length > 0 ? (
          <div className="grid-4">
            {filtered.map(store => <StoreCard key={store.id} store={store} />)}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><SlidersHorizontal size={32} /></div>
            <h3 className="empty-state-title">No stores found</h3>
            <p className="empty-state-desc">Try adjusting your filters or search term</p>
            <button className="btn btn-primary" onClick={() => { setSearch(''); setCategoryFilter(''); setFloorFilter(''); setOpenOnly(false); }}>Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
