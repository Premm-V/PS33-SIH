import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, ROLES } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Landing     from './pages/Landing'
import SignIn      from './pages/auth/SignIn'
import SignUp      from './pages/auth/SignUp'
import Dashboard   from './pages/farmer/Dashboard'
import Browse      from './pages/buyer_individual/Browse'
import BulkBrowse  from './pages/buyer_enterprise/BulkBrowse'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/"       element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Farmer */}
          <Route
            path="/farmer/dashboard"
            element={
              <ProtectedRoute role={ROLES.FARMER}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Individual buyer */}
          <Route
            path="/buyer/browse"
            element={
              <ProtectedRoute role={ROLES.BUYER_INDIVIDUAL}>
                <Browse />
              </ProtectedRoute>
            }
          />

          {/* Enterprise buyer */}
          <Route
            path="/enterprise/bulk-browse"
            element={
              <ProtectedRoute role={ROLES.BUYER_ENTERPRISE}>
                <BulkBrowse />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
