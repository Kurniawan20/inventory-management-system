'use server'

// Mock vendor data for demo purposes
const generateVendorData = () => {
  const vendors = [
    {
      vendor_id: 'VND-001',
      vendor_name: 'PT KSB Indonesia',
      contact_name: 'Ahmad Supplier',
      contact_phone: '+62-21-5555-0001',
      contact_email: 'ahmad@ksb.co.id',
      address: 'Jl. Industri Raya No. 123, Jakarta Timur 13920, Indonesia',
      npwp: '01.234.567.8-901.000',
      notes: 'Specialized in pumps and rotating equipment. Preferred supplier for critical equipment.',
      createdAt: '2023-01-15T08:00:00Z',
      updatedAt: '2024-08-15T14:30:00Z'
    },
    {
      vendor_id: 'VND-002',
      vendor_name: 'Alfa Laval Indonesia',
      contact_name: 'Siti Procurement',
      contact_phone: '+62-21-5555-0002',
      contact_email: 'siti@alfalaval.com',
      address: 'Jl. Sudirman Kav. 45, Jakarta Pusat 10210, Indonesia',
      npwp: '02.345.678.9-012.000',
      notes: 'Heat exchanger and separation technology specialist. ISO certified supplier.',
      createdAt: '2023-02-20T10:15:00Z',
      updatedAt: '2024-09-01T09:00:00Z'
    },
    {
      vendor_id: 'VND-003',
      vendor_name: 'Fisher Controls Indonesia',
      contact_name: 'Budi Valve',
      contact_phone: '+62-21-5555-0003',
      contact_email: 'budi@fisher.com',
      address: 'Jl. Gatot Subroto No. 789, Jakarta Selatan 12930, Indonesia',
      npwp: '03.456.789.0-123.000',
      notes: 'Control valves and instrumentation equipment. Excellent after-sales service.',
      createdAt: '2023-03-10T14:20:00Z',
      updatedAt: '2024-07-01T11:45:00Z'
    },
    {
      vendor_id: 'VND-004',
      vendor_name: 'PT Wijaya Karya Steel',
      contact_name: 'Dewi Construction',
      contact_phone: '+62-21-5555-0004',
      contact_email: 'dewi@wika.co.id',
      address: 'Jl. DI Panjaitan Kav. 9-10, Jakarta Timur 13340, Indonesia',
      npwp: '04.567.890.1-234.000',
      notes: 'Steel fabrication and tank construction. Local supplier with competitive pricing.',
      createdAt: '2022-08-15T12:00:00Z',
      updatedAt: '2024-08-20T16:30:00Z'
    },
    {
      vendor_id: 'VND-005',
      vendor_name: 'Honeywell Indonesia',
      contact_name: 'Eko Safety',
      contact_phone: '+62-21-5555-0005',
      contact_email: 'eko@honeywell.com',
      address: 'Jl. HR Rasuna Said Blok X-5 Kav. 1-2, Jakarta Selatan 12950, Indonesia',
      npwp: '05.678.901.2-345.000',
      notes: 'Safety systems and automation solutions. Global technology leader.',
      createdAt: '2023-02-28T09:30:00Z',
      updatedAt: '2024-08-10T13:15:00Z'
    },
    {
      vendor_id: 'VND-006',
      vendor_name: 'MSA Safety Indonesia',
      contact_name: 'Safety Manager',
      contact_phone: '+62-21-5555-0006',
      contact_email: 'safety@msa.com',
      address: 'Jl. Jend. Sudirman Kav. 25, Jakarta Pusat 10270, Indonesia',
      npwp: '06.789.012.3-456.000',
      notes: 'Personal protective equipment supplier. Wide range of safety products.',
      createdAt: '2024-01-15T08:00:00Z',
      updatedAt: '2024-09-01T10:00:00Z'
    },
    {
      vendor_id: 'VND-007',
      vendor_name: 'PT Garment Industri Nusantara',
      contact_name: 'HR Uniform',
      contact_phone: '+62-21-5555-0007',
      contact_email: 'hr@garment.co.id',
      address: 'Jl. Raya Bekasi Km. 25, Bekasi 17530, Indonesia',
      npwp: '07.890.123.4-567.000',
      notes: 'Industrial uniform and workwear manufacturer. Custom sizing available.',
      createdAt: '2024-03-01T09:00:00Z',
      updatedAt: '2024-08-25T15:00:00Z'
    }
  ]

  return vendors
}

export async function getVendorList(filters = {}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  let vendors = generateVendorData()
  
  // Apply filters
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    vendors = vendors.filter(vendor => 
      vendor.vendor_name.toLowerCase().includes(searchTerm) ||
      vendor.vendor_id.toLowerCase().includes(searchTerm) ||
      vendor.contact_name.toLowerCase().includes(searchTerm) ||
      vendor.contact_email.toLowerCase().includes(searchTerm)
    )
  }
  
  if (filters.npwp) {
    vendors = vendors.filter(vendor => vendor.npwp && vendor.npwp.includes(filters.npwp))
  }
  
  return {
    vendors,
    total: vendors.length,
    page: filters.page || 1,
    limit: filters.limit || 10
  }
}

export async function getVendorById(vendorId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const vendors = generateVendorData()
  const vendor = vendors.find(v => v.vendor_id === vendorId)
  
  if (!vendor) {
    throw new Error('Vendor not found')
  }
  
  return vendor
}

export async function createVendor(vendorData) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Generate new vendor ID
  const newVendorId = `VND-${String(Date.now()).slice(-3).padStart(3, '0')}`
  
  const newVendor = {
    vendor_id: newVendorId,
    ...vendorData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return {
    success: true,
    vendor: newVendor,
    message: 'Vendor created successfully'
  }
}

export async function updateVendor(vendorId, vendorData) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const updatedVendor = {
    vendor_id: vendorId,
    ...vendorData,
    updatedAt: new Date().toISOString()
  }
  
  return {
    success: true,
    vendor: updatedVendor,
    message: 'Vendor updated successfully'
  }
}

export async function deleteVendor(vendorId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    success: true,
    message: 'Vendor deleted successfully'
  }
}
