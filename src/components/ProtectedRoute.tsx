import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LumaSpin } from './ui/LumaSpin';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  // Still resolving session from localStorage
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#071a05'
      }}>
        <LumaSpin size={60} color="#86efac" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
