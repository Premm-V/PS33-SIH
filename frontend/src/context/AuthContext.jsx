import { createContext, useContext, useState, useCallback } from 'react'

// AuthContext — shared login state across the entire app.
//
// The User object follows the exact shape from api-contract.md:
//   { id, name, phone, role, business_name, zone }
//
// Mock authentication is isolated here so replacing it with real API calls
// later only requires changing login() and signup() — nothing else in the app.

const AuthContext = createContext(null)

// Roles as defined in api-contract.md — do NOT rename these.
export const ROLES = {
  FARMER:           'farmer',
  BUYER_INDIVIDUAL: 'buyer_individual',
  BUYER_ENTERPRISE: 'buyer_enterprise',
}

// Post-login route for each role (matches App.jsx routing).
export const ROLE_HOME = {
  [ROLES.FARMER]:           '/farmer/dashboard',
  [ROLES.BUYER_INDIVIDUAL]: '/buyer/browse',
  [ROLES.BUYER_ENTERPRISE]: '/enterprise/bulk-browse',
}

let _nextId = 100 // mock ID counter for new sign-ups

export function AuthProvider({ children }) {
  // Attempt to restore a session from sessionStorage (browser refresh survival).
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('fm_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const persistUser = useCallback((u) => {
    setUser(u)
    if (u) {
      sessionStorage.setItem('fm_user', JSON.stringify(u))
    } else {
      sessionStorage.removeItem('fm_user')
    }
  }, [])

  // login — mock implementation.
  // Replace the body with a real apiFetch('/auth/login', ...) call.
  // Returns the user object on success, throws on failure.
  const login = useCallback(async ({ phone, role }) => {
    // Mock: find matching user in mockData by phone + role.
    // In production this is a backend call — only the body of this function changes.
    const { mockUsers } = await import('../mockData.js')
    const found = mockUsers.find(
      (u) => u.phone === phone && u.role === role,
    )
    if (!found) {
      throw new Error('No account found with that phone number and role.')
    }
    persistUser(found)
    return found
  }, [persistUser])

  // signup — mock implementation.
  // Replace with apiFetch('/auth/signup', { method: 'POST', body: ... }).
  // userData shape: { name, phone, role, business_name, zone }
  const signup = useCallback(async (userData) => {
    // Validate role is one of the three contract values.
    if (!Object.values(ROLES).includes(userData.role)) {
      throw new Error(`Invalid role: ${userData.role}`)
    }
    // Mock: create a local user object.
    const newUser = {
      id: ++_nextId,
      name: userData.name,
      phone: userData.phone,
      role: userData.role,
      business_name: userData.role === ROLES.BUYER_ENTERPRISE
        ? (userData.business_name || null)
        : null,
      zone: userData.zone || 'Zone A',
    }
    persistUser(newUser)
    return newUser
  }, [persistUser])

  const logout = useCallback(() => {
    persistUser(null)
  }, [persistUser])

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return ctx
}
