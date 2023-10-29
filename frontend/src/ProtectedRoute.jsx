import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {

  const { loading, isAuthenticated } = useAuth();

  if(loading) return <h1>Loading...</h1>
  if (!isAuthenticated) return < Navigate to='/' replace />
  
  // Outlet -> Básicamente va a seguir con la ruta ya establecida al momento de realizar el login.
  return ( <Outlet /> )
}

export default ProtectedRoute