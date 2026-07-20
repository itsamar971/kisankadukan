import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  // Still resolving session from localStorage
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#071a05'
      }}>
        <span style={{
          width: 28, height: 28, border: '2.5px solid rgba(134,239,172,0.2)',
          borderTopColor: '#86efac', borderRadius: '50%',
          display: 'inline-block', animation: 'kkv2Spin 0.7s linear infinite'
        }} />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
