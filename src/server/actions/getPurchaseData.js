'use server'

// Mock purchase data for demo purposes
const generatePurchaseData = () => {
  const purchases = [
    {
      purchase_id: 'PO-2024-001',
      item_id: 'AST-001', // Links to asset
      vendor_id: 'VND-001',
      purchase_date: '2024-01-15',
      document_ref: 'PO-001/INV-2024-0115',
      acquisition_value: 125000000.00,
      qty: 1,
      uom: 'unit',
      warranty_expiry: '2027-01-15',
      notes: 'Crude oil pump procurement for main processing unit. Includes installation and commissioning.',
      createdAt: '2024-01-15T08:00:00Z',
      updatedAt: '2024-01-15T08:00:00Z',
      // Related data for display
      item_name: 'Crude Oil Pump P-101A',
      vendor_name: 'PT KSB Indonesia',
      vendor_contact: 'Ahmad Supplier'
    },
    {
      purchase_id: 'PO-2024-002',
      item_id: 'AST-002',
      vendor_id: 'VND-002',
      purchase_date: '2024-02-20',
      document_ref: 'PO-002/INV-2024-0220',
      acquisition_value: 275000000.00,
      qty: 1,
      uom: 'unit',
      warranty_expiry: '2027-02-20',
      notes: 'Heat exchanger for processing plant. High-efficiency plate type with stainless steel construction.',
      createdAt: '2024-02-20T10:15:00Z',
      updatedAt: '2024-02-20T10:15:00Z',
      item_name: 'Heat Exchanger E-201B',
      vendor_name: 'Alfa Laval Indonesia',
      vendor_contact: 'Siti Procurement'
    },
    {
      purchase_id: 'PO-2024-003',
      item_id: 'AST-003',
      vendor_id: 'VND-003',
      purchase_date: '2024-03-10',
      document_ref: 'PO-003/INV-2024-0310',
      acquisition_value: 45000000.00,
      qty: 2,
      uom: 'unit',
      warranty_expiry: '2026-03-10',
      notes: 'Control valves for process control system. Pneumatic actuated with positioner.',
      createdAt: '2024-03-10T14:20:00Z',
      updatedAt: '2024-03-10T14:20:00Z',
      item_name: 'Control Valve CV-301',
      vendor_name: 'Fisher Controls Indonesia',
      vendor_contact: 'Budi Valve'
    },
    {
      purchase_id: 'PO-2024-004',
      item_id: 'AST-004',
      vendor_id: 'VND-004',
      purchase_date: '2023-08-15',
      document_ref: 'PO-004/INV-2023-0815',
      acquisition_value: 850000000.00,
      qty: 1,
      uom: 'unit',
      warranty_expiry: '2028-08-15',
      notes: 'Large storage tank fabrication and installation. API 650 standard with floating roof.',
      createdAt: '2023-08-15T12:00:00Z',
      updatedAt: '2023-08-15T12:00:00Z',
      item_name: 'Storage Tank T-401',
      vendor_name: 'PT Wijaya Karya Steel',
      vendor_contact: 'Dewi Construction'
    },
    {
      purchase_id: 'PO-2024-005',
      item_id: 'AST-005',
      vendor_id: 'VND-005',
      purchase_date: '2024-02-28',
      document_ref: 'PO-005/INV-2024-0228',
      acquisition_value: 180000000.00,
      qty: 1,
      uom: 'set',
      warranty_expiry: '2029-02-28',
      notes: 'Fire detection and suppression system. Includes sensors, control panel, and suppression equipment.',
      createdAt: '2024-02-28T09:30:00Z',
      updatedAt: '2024-02-28T09:30:00Z',
      item_name: 'Fire Detection System FDS-501',
      vendor_name: 'Honeywell Indonesia',
      vendor_contact: 'Eko Safety'
    },
    {
      purchase_id: 'PO-2024-006',
      item_id: 'AST-006',
      vendor_id: 'VND-006',
      purchase_date: '2024-01-15',
      document_ref: 'PO-006/INV-2024-0115',
      acquisition_value: 2500000.00,
      qty: 50,
      uom: 'pcs',
      warranty_expiry: '2026-01-15',
      notes: 'Safety helmets for field personnel. ANSI Z89.1 certified with chin strap.',
      createdAt: '2024-01-15T08:00:00Z',
      updatedAt: '2024-01-15T08:00:00Z',
      item_name: 'Safety Helmet PPE-001',
      vendor_name: 'MSA Safety Indonesia',
      vendor_contact: 'Safety Manager'
    },
    {
      purchase_id: 'PO-2024-007',
      item_id: 'AST-007',
      vendor_id: 'VND-007',
      purchase_date: '2024-03-01',
      document_ref: 'PO-007/INV-2024-0301',
      acquisition_value: 15000000.00,
      qty: 100,
      uom: 'set',
      warranty_expiry: '2026-03-01',
      notes: 'Work uniform sets for operations personnel. Flame-resistant material with reflective strips.',
      createdAt: '2024-03-01T09:00:00Z',
      updatedAt: '2024-03-01T09:00:00Z',
      item_name: 'Work Uniform Set UNI-001',
      vendor_name: 'PT Garment Industri Nusantara',
      vendor_contact: 'HR Uniform'
    }
  ]

  return purchases
}

export async function getPurchaseList(filters = {}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  let purchases = generatePurchaseData()
  
  // Apply filters
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    purchases = purchases.filter(purchase => 
      purchase.purchase_id.toLowerCase().includes(searchTerm) ||
      purchase.item_name.toLowerCase().includes(searchTerm) ||
      purchase.vendor_name.toLowerCase().includes(searchTerm) ||
      purchase.document_ref.toLowerCase().includes(searchTerm)
    )
  }
  
  if (filters.vendor_id) {
    purchases = purchases.filter(purchase => purchase.vendor_id === filters.vendor_id)
  }
  
  if (filters.date_from) {
    purchases = purchases.filter(purchase => purchase.purchase_date >= filters.date_from)
  }
  
  if (filters.date_to) {
    purchases = purchases.filter(purchase => purchase.purchase_date <= filters.date_to)
  }
  
  return {
    purchases,
    total: purchases.length,
    page: filters.page || 1,
    limit: filters.limit || 10
  }
}

export async function getPurchaseById(purchaseId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const purchases = generatePurchaseData()
  const purchase = purchases.find(p => p.purchase_id === purchaseId)
  
  if (!purchase) {
    throw new Error('Purchase not found')
  }
  
  return purchase
}

export async function createPurchase(purchaseData) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Generate new purchase ID
  const newPurchaseId = `PO-${new Date().getFullYear()}-${String(Date.now()).slice(-3).padStart(3, '0')}`
  
  const newPurchase = {
    purchase_id: newPurchaseId,
    ...purchaseData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return {
    success: true,
    purchase: newPurchase,
    message: 'Purchase record created successfully'
  }
}

export async function updatePurchase(purchaseId, purchaseData) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const updatedPurchase = {
    purchase_id: purchaseId,
    ...purchaseData,
    updatedAt: new Date().toISOString()
  }
  
  return {
    success: true,
    purchase: updatedPurchase,
    message: 'Purchase record updated successfully'
  }
}

export async function deletePurchase(purchaseId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    success: true,
    message: 'Purchase record deleted successfully'
  }
}

export async function getPurchasesByVendor(vendorId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const purchases = generatePurchaseData()
  const vendorPurchases = purchases.filter(p => p.vendor_id === vendorId)
  
  return {
    purchases: vendorPurchases,
    total: vendorPurchases.length
  }
}

export async function getPurchasesByItem(itemId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const purchases = generatePurchaseData()
  const itemPurchases = purchases.filter(p => p.item_id === itemId)
  
  return {
    purchases: itemPurchases,
    total: itemPurchases.length
  }
}
