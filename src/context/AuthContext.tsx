import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile as updateFbProfile } from 'firebase/auth';
import { api } from '../lib/api';

export interface User {
  id: string;
  email: string;
  role: 'farmer' | 'buyer';
  fullName: string;
  mobile: string;
  location: string;
  landSurveyNumber?: string;
  coordinates?: string;
  profilePhoto?: string;
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
    details: { fullName: string; mobile: string; location: string; landSurveyNumber?: string; coordinates?: string; profilePhoto?: string }
  ) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<Pick<User, 'fullName' | 'mobile' | 'location' | 'landSurveyNumber' | 'coordinates' | 'profilePhoto'>>) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Sync with backend to get role and extra details
          const { data } = await api.post('/users/sync');
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            role: data.user.role || 'buyer',
            fullName: data.user.name || firebaseUser.displayName || '',
            mobile: data.user.mobile || '',
            location: data.user.location || '',
            landSurveyNumber: data.user.landSurveyNumber || '',
            joinedAt: data.user.createdAt || new Date().toISOString()
          });
        } catch (error) {
          console.error("Failed to sync user data", error);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle setting the user
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, error: error.message || 'Invalid email or password.' };
    }
  };

  const register = async (
    email: string,
    password: string,
    role: 'farmer' | 'buyer',
    details: { fullName: string; mobile: string; location: string; landSurveyNumber?: string; }
  ) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateFbProfile(userCredential.user, { displayName: details.fullName });
      
      // Wait for the token to be available
      await userCredential.user.getIdToken(true);

      // Sync and store extra details in backend
      const { data } = await api.post('/users/sync', {
        role,
        fullName: details.fullName,
        mobile: details.mobile,
        location: details.location,
        landSurveyNumber: details.landSurveyNumber
      });

      setUser({
        id: userCredential.user.uid,
        email,
        role,
        fullName: details.fullName,
        mobile: details.mobile,
        location: details.location,
        landSurveyNumber: details.landSurveyNumber,
        joinedAt: data.user.createdAt
      });

      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, error: error.message || 'Registration failed.' };
    }
  };

  const updateProfile = async (data: Partial<Pick<User, 'fullName' | 'mobile' | 'location' | 'landSurveyNumber'>>) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    try {
      const { data: responseData } = await api.post('/users/sync', data);
      setUser({
        ...user,
        ...data,
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: 'Failed to update profile' };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
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
