// Mock data — exact field names from api-contract.md and db.json.
// Replace imports with fetch() calls once the backend is ready.
// Do NOT rename any field here without updating api-contract.md and db.json.

export const mockUsers = [
  { id: 1, name: 'Ramesh Patil',  phone: '9876543210', role: 'farmer',             business_name: null,          zone: 'Zone A' },
  { id: 2, name: 'Suresh Kumar', phone: '9876543211', role: 'farmer',             business_name: null,          zone: 'Zone B' },
  { id: 3, name: 'Priya Sharma', phone: '9876543212', role: 'buyer_individual',   business_name: null,          zone: 'Zone A' },
  { id: 4, name: 'Anil Mehta',   phone: '9876543213', role: 'buyer_enterprise',   business_name: 'Hotel Sagar', zone: 'Zone A' },
]

export const mockListings = [
  {
    id: 1,
    farmer_id: 1,
    farmer_name: 'Ramesh Patil',
    crop_name: 'Tomato',
    quantity_kg: 50,
    price_per_kg: 20,
    harvest_date: '2026-09-01',
    zone: 'Zone A',
    status: 'available',
  },
  {
    id: 2,
    farmer_id: 2,
    farmer_name: 'Suresh Kumar',
    crop_name: 'Onion',
    quantity_kg: 30,
    price_per_kg: 15,
    harvest_date: '2026-09-02',
    zone: 'Zone B',
    status: 'available',
  },
  {
    id: 3,
    farmer_id: 1,
    farmer_name: 'Ramesh Patil',
    crop_name: 'Potato',
    quantity_kg: 80,
    price_per_kg: 12,
    harvest_date: '2026-09-03',
    zone: 'Zone A',
    status: 'available',
  },
  {
    id: 4,
    farmer_id: 2,
    farmer_name: 'Suresh Kumar',
    crop_name: 'Tomato',
    quantity_kg: 60,
    price_per_kg: 19,
    harvest_date: '2026-09-03',
    zone: 'Zone A',
    status: 'available',
  },
]

export const mockOrders = [
  {
    id: 1,
    buyer_id: 3,
    buyer_name: 'Priya Sharma',
    buyer_role: 'buyer_individual',
    listing_id: 1,
    quantity_kg: 2,
    total_price: 40,
    order_type: 'single',
    fulfillment_type: 'pickup',
    is_recurring: false,
    status: 'placed',
  },
  {
    id: 2,
    buyer_id: 4,
    buyer_name: 'Hotel Sagar',
    buyer_role: 'buyer_enterprise',
    listing_id: 1,
    quantity_kg: 50,
    total_price: 1000,
    order_type: 'bulk',
    fulfillment_type: 'pooled_delivery',
    is_recurring: true,
    status: 'placed',
  },
  {
    id: 3,
    buyer_id: 4,
    buyer_name: 'Hotel Sagar',
    buyer_role: 'buyer_enterprise',
    listing_id: 4,
    quantity_kg: 50,
    total_price: 950,
    order_type: 'bulk',
    fulfillment_type: 'pooled_delivery',
    is_recurring: true,
    status: 'placed',
  },
]

export const mockBulkRequests = [
  {
    id: 1,
    buyer_id: 4,
    crop_name: 'Tomato',
    quantity_needed_kg: 100,
    quantity_fulfilled_kg: 100,
    matched_listing_ids: [1, 4],
    is_recurring: true,
    frequency: 'weekly',
    status: 'fulfilled',
  },
]
