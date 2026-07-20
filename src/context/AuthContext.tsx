import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  role: 'farmer' | 'buyer';
  fullName: string;
  mobile: string;
  location: string;
  landSurveyNumber?: string;
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    password: string,
    role: 'farmer' | 'buyer',
    details: { fullName: string; mobile: string; location: string; landSurveyNumber?: string; }
  ) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<Pick<User, 'fullName' | 'mobile' | 'location' | 'landSurveyNumber'>>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = 'kkd_users';
const SESSION_KEY = 'kkd_session';

const getUsers = (): User[] => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      if (s) setUser(JSON.parse(s));
    } catch { /* ignore */ }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const users = getUsers();
    const stored = localStorage.getItem(`kkd_pw_${email}`);
    if (!stored || stored !== btoa(password)) {
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password.' };
    }
    const found = users.find(u => u.email === email);
    if (!found) { setIsLoading(false); return { success: false, error: 'Account not found.' }; }
    setUser(found);
    localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    setIsLoading(false);
    return { success: true };
  };

  const register = async (
    email: string,
    password: string,
    role: 'farmer' | 'buyer',
    details: { fullName: string; mobile: string; location: string; landSurveyNumber?: string; }
  ) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      setIsLoading(false);
      return { success: false, error: 'Email already registered.' };
    }
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      role,
      fullName: details.fullName,
      mobile: details.mobile,
      location: details.location,
      landSurveyNumber: details.landSurveyNumber,
      joinedAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(`kkd_pw_${email}`, btoa(password));
    setUser(newUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const updateProfile = (data: Partial<Pick<User, 'fullName' | 'mobile' | 'location' | 'landSurveyNumber'>>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    // Update in users array
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) { users[idx] = updated; localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
    // Update session
    setUser(updated);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
