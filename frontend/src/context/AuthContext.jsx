import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@smartmall.demo', password: 'admin123', role: 'ADMIN', phone: '+91 98765 43210', avatar: 'A' },
  { id: 2, name: 'Vraj Patel', email: 'user@smartmall.demo', password: 'user123', role: 'USER', phone: '+91 98765 43211', avatar: 'V' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('smartmall_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('smartmall_user', JSON.stringify(user));
    else localStorage.removeItem('smartmall_user');
  }, [user]);

  const login = (email, password) => {
    const found = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      return { success: true, user: safeUser };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (name, email, password) => {
    const exists = DEMO_USERS.find(u => u.email === email);
    if (exists) return { success: false, error: 'Email already registered' };
    const newUser = {
      id: Date.now(), name, email, role: 'USER',
      phone: '', avatar: name.charAt(0).toUpperCase()
    };
    DEMO_USERS.push({ ...newUser, password });
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => setUser(null);
  const isAdmin = user?.role === 'ADMIN';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be within AuthProvider');
  return ctx;
};
