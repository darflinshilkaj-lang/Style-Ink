import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const saved = window.localStorage.getItem('style-ink-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('style-ink-user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('style-ink-user');
    }
  }, [user]);

  const login = (email, password) => {
    const demoUser = { name: 'Ava Bennett', email, phone: '+1 555 0123', password, rememberMe: true };
    setUser(demoUser);
    return demoUser;
  };

  const signup = (form) => {
    const created = { name: form.name, email: form.email, phone: form.phone, password: form.password };
    setUser(created);
    return created;
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, signup, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
