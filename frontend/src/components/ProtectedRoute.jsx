import { Navigate } from 'react-router-dom'
import { useAuth, ROLE_HOME } from '../context/AuthContext'

// ProtectedRoute — redirects unauthenticated users to /signin.
// Optionally enforces that the authenticated user has a specific role;
// a mismatch redirects to their own correct dashboard.
//
// Props:
//   children  — the page to render if access is granted
//   role      — (optional) one of ROLES.* — if provided, enforces role match

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  if (role && user.role !== role) {
    // User is logged in but to a different role — send them to their own home.
    return <Navigate to={ROLE_HOME[user.role]} replace />
  }

  return children
}
