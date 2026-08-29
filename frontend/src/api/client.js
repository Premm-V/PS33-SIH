// API client — placeholder for real backend calls.
// When the backend is ready, set BASE_URL to the actual API base URL.
// All fetch calls go through this client so the swap is in one place.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(error.message || 'Request failed')
  }

  return response.json()
}
