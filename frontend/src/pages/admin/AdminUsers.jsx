import { useState } from 'react';
import { Users, Shield, ShieldCheck, Search } from 'lucide-react';

const DEMO_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@smartmall.demo', role: 'ADMIN', joined: '2026-01-15', status: 'active' },
  { id: 2, name: 'Vraj Patel', email: 'user@smartmall.demo', role: 'USER', joined: '2026-03-22', status: 'active' },
  { id: 3, name: 'Jeel Shah', email: 'jeel@smartmall.demo', role: 'USER', joined: '2026-04-10', status: 'active' },
  { id: 4, name: 'Rudra Desai', email: 'rudra@smartmall.demo', role: 'USER', joined: '2026-04-15', status: 'active' },
  { id: 5, name: 'Priya Sharma', email: 'priya@example.com', role: 'USER', joined: '2026-05-01', status: 'active' },
  { id: 6, name: 'Arjun Mehta', email: 'arjun@example.com', role: 'USER', joined: '2026-06-12', status: 'inactive' },
];

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const users = DEMO_USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Manage Users</h1>
        <p className="admin-page-desc">{DEMO_USERS.length} registered users</p>
      </div>

      <div className="search-bar" style={{ marginBottom: 24, maxWidth: 400 }}>
        <Search size={18} className="search-bar-icon" /><input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Joined</th><th>Status</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: u.role === 'ADMIN' ? 'var(--primary-gradient)' : '#E8EAF0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: u.role === 'ADMIN' ? 'white' : '#6B7194', fontWeight: 700, fontSize: 13 }}>
                      {u.name.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 600 }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ color: '#6B7194' }}>{u.email}</td>
                <td>
                  <span className={`badge ${u.role === 'ADMIN' ? 'badge-primary' : 'badge-info'}`}>
                    {u.role === 'ADMIN' ? <><ShieldCheck size={12} /> ADMIN</> : 'USER'}
                  </span>
                </td>
                <td style={{ fontSize: 13 }}>{new Date(u.joined).toLocaleDateString()}</td>
                <td><span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-error'}`}>{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
