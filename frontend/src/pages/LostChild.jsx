import { useState } from 'react';
import { Users, Search, MapPin, Clock, AlertTriangle, CheckCircle, Camera, Bell } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const MOCK_REPORTS = [
  { id: 1, name: 'Arjun', age: 5, description: 'Blue t-shirt, jeans, red shoes', lastSeen: 'Near Food Court', time: '3 min ago', status: 'SEARCHING', photo: '👦' },
  { id: 2, name: 'Priya', age: 7, description: 'Pink dress, white shoes, pigtails', lastSeen: 'H&M Store', time: '12 min ago', status: 'FOUND', photo: '👧' },
];

export default function LostChild() {
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', description: '', lastSeen: '' });
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: Date.now(),
      ...form,
      time: 'Just now',
      status: 'SEARCHING',
      photo: '👶',
    };
    setReports([newReport, ...reports]);
    setForm({ name: '', age: '', description: '', lastSeen: '' });
    setShowForm(false);
    addToast('🚨 Lost child report submitted! Security has been alerted.', 'error');
  };

  return (
    <div className="page-wrapper">
      <div className="container section">
        <div className="section-header">
          <div>
            <h1 className="section-title animate-fade-in-up">👶 Lost Child Detection</h1>
            <p className="section-subtitle">AI-powered child safety with camera tracking and instant alerts</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            <AlertTriangle size={16} /> Report Lost Child
          </button>
        </div>

        {/* Stats */}
        <div className="grid-3" style={{ marginBottom: 32 }}>
          <div className="stat-card"><div><div className="stat-card-value">{reports.filter(r => r.status === 'SEARCHING').length}</div><div className="stat-card-label">Active Searches</div></div><div className="stat-card-icon" style={{ background: 'var(--error-light)', color: 'var(--error)' }}><Search size={24} /></div></div>
          <div className="stat-card"><div><div className="stat-card-value">{reports.filter(r => r.status === 'FOUND').length}</div><div className="stat-card-label">Found Today</div></div><div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><CheckCircle size={24} /></div></div>
          <div className="stat-card"><div><div className="stat-card-value">120</div><div className="stat-card-label">AI Cameras Active</div></div><div className="stat-card-icon" style={{ background: 'var(--info-light)', color: 'var(--info)' }}><Camera size={24} /></div></div>
        </div>

        {/* Report Form */}
        {showForm && (
          <div className="card-flat animate-scale-in" style={{ padding: 24, marginBottom: 24, maxWidth: 600 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'var(--error)' }}>⚠️ Report Missing Child</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Child's Name</label>
                <input className="form-input" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter child's name" />
              </div>
              <div className="form-group">
                <label className="form-label">Age</label>
                <input className="form-input" required type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} placeholder="Age" />
              </div>
              <div className="form-group">
                <label className="form-label">Description (clothing, features)</label>
                <textarea className="form-textarea" required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Blue t-shirt, brown hair..." />
              </div>
              <div className="form-group">
                <label className="form-label">Last Seen Location</label>
                <input className="form-input" required value={form.lastSeen} onChange={e => setForm({ ...form, lastSeen: e.target.value })} placeholder="e.g., Near Food Court" />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" className="btn btn-primary"><AlertTriangle size={16} /> Submit Alert</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Active Reports */}
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Active Reports</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {reports.map((report, i) => (
            <div key={report.id} className="child-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="child-avatar">{report.photo}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700 }}>{report.name}, {report.age} yrs</h4>
                  <span className={`badge ${report.status === 'FOUND' ? 'badge-success' : 'badge-error'}`}>
                    {report.status === 'FOUND' ? <><CheckCircle size={12} /> FOUND</> : <><Search size={12} /> SEARCHING</>}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>{report.description}</p>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-tertiary)' }}>
                  <span><MapPin size={12} style={{ verticalAlign: -2 }} /> {report.lastSeen}</span>
                  <span><Clock size={12} style={{ verticalAlign: -2 }} /> {report.time}</span>
                </div>
              </div>
              {report.status === 'SEARCHING' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-sm btn-secondary" onClick={() => {
                    setReports(prev => prev.map(r => r.id === report.id ? { ...r, status: 'FOUND' } : r));
                    addToast(`✅ ${report.name} has been found!`, 'success');
                  }}><CheckCircle size={14} /> Mark Found</button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="card-flat" style={{ padding: 20, marginTop: 32, textAlign: 'center' }}>
          <Camera size={24} color="var(--accent)" />
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 8 }}>
            <strong>AI Camera System Active:</strong> 120 cameras with face recognition are scanning all areas.
            Average child location time: <strong>4.2 minutes</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
