'use server'

// Mock warehouse data for demo purposes
const generateWarehouseData = () => {
  const warehouses = [
    {
      id: 'WH-001',
      name: 'Main Warehouse Cilacap',
      code: 'WH-CLP-001',
      location: 'Pertamina Refinery Cilacap',
      type: 'Distribution Center',
      capacity: 50000,
      currentUtilization: 38500,
      status: 'Active',
      manager: 'Budi Santoso',
      contact: '+62-282-123456',
      address: 'Jl. Laut Selatan, Cilacap, Jawa Tengah',
      coordinates: { latitude: '-7.7326', longitude: '109.0154' },
      operatingHours: '24/7',
      securityLevel: 'High',
      climateControlled: true,
      hazmatCertified: true,
      createdAt: '2022-01-15T08:00:00Z',
      updatedAt: '2024-09-15T14:30:00Z'
    },
    {
      id: 'WH-002',
      name: 'Chemical Storage Balikpapan',
      code: 'WH-BPP-002',
      location: 'Pertamina Refinery Balikpapan',
      type: 'Chemical Storage',
      capacity: 25000,
      currentUtilization: 18750,
      status: 'Active',
      manager: 'Siti Nurhaliza',
      contact: '+62-542-789012',
      address: 'Jl. Soekarno Hatta, Balikpapan, Kalimantan Timur',
      coordinates: { latitude: '-1.2379', longitude: '116.8529' },
      operatingHours: '06:00-22:00',
      securityLevel: 'Very High',
      climateControlled: true,
      hazmatCertified: true,
      createdAt: '2022-03-20T10:15:00Z',
      updatedAt: '2024-09-10T11:45:00Z'
    },
    {
      id: 'WH-003',
      name: 'Spare Parts Warehouse',
      code: 'WH-SPR-003',
      location: 'Pertamina Terminal Tanjung Priok',
      type: 'Spare Parts',
      capacity: 15000,
      currentUtilization: 12300,
      status: 'Active',
      manager: 'Ahmad Suryanto',
      contact: '+62-21-456789',
      address: 'Jl. Raya Pelabuhan, Jakarta Utara',
      coordinates: { latitude: '-6.1045', longitude: '106.8827' },
      operatingHours: '07:00-19:00',
      securityLevel: 'Medium',
      climateControlled: false,
      hazmatCertified: false,
      createdAt: '2022-06-10T14:20:00Z',
      updatedAt: '2024-09-12T16:00:00Z'
    }
  ]

  const inventory = [
    {
      id: 'INV-001',
      itemCode: 'CRUDE-001',
      itemName: 'Crude Oil - Light Sweet',
      category: 'Raw Materials',
      warehouseId: 'WH-001',
      currentStock: 15000,
      minStock: 5000,
      maxStock: 20000,
      unit: 'Barrel',
      unitCost: 850000,
      totalValue: 12750000000,
      location: 'Tank Farm A - Tank 1',
      batchNumber: 'BATCH-2024-001',
      expiryDate: null,
      lastUpdated: '2024-09-15T08:30:00Z',
      supplier: 'PT Pertamina Hulu Energi',
      status: 'Available',
      reservedStock: 2000,
      availableStock: 13000
    },
    {
      id: 'INV-002',
      itemCode: 'CHEM-001',
      itemName: 'Catalyst - Platinum Based',
      category: 'Chemicals',
      warehouseId: 'WH-002',
      currentStock: 500,
      minStock: 100,
      maxStock: 1000,
      unit: 'Kg',
      unitCost: 2500000,
      totalValue: 1250000000,
      location: 'Chemical Storage - Zone A',
      batchNumber: 'CAT-2024-015',
      expiryDate: '2026-12-31',
      lastUpdated: '2024-09-10T14:15:00Z',
      supplier: 'Johnson Matthey',
      status: 'Available',
      reservedStock: 50,
      availableStock: 450
    },
    {
      id: 'INV-003',
      itemCode: 'SPARE-001',
      itemName: 'Pump Impeller - KSB Model',
      category: 'Spare Parts',
      warehouseId: 'WH-003',
      currentStock: 25,
      minStock: 5,
      maxStock: 50,
      unit: 'Pcs',
      unitCost: 15000000,
      totalValue: 375000000,
      location: 'Rack A-15-03',
      batchNumber: 'SP-2024-089',
      expiryDate: null,
      lastUpdated: '2024-09-12T10:20:00Z',
      supplier: 'KSB Indonesia',
      status: 'Available',
      reservedStock: 3,
      availableStock: 22
    },
    {
      id: 'INV-004',
      itemCode: 'FUEL-001',
      itemName: 'Premium Gasoline 92',
      category: 'Finished Products',
      warehouseId: 'WH-001',
      currentStock: 8500,
      minStock: 2000,
      maxStock: 12000,
      unit: 'Liter',
      unitCost: 12500,
      totalValue: 106250000,
      location: 'Product Tank - P1',
      batchNumber: 'PREM-2024-045',
      expiryDate: '2025-03-15',
      lastUpdated: '2024-09-14T16:45:00Z',
      supplier: 'Internal Production',
      status: 'Available',
      reservedStock: 1500,
      availableStock: 7000
    },
    {
      id: 'INV-005',
      itemCode: 'LUBE-001',
      itemName: 'Engine Oil SAE 10W-40',
      category: 'Lubricants',
      warehouseId: 'WH-001',
      currentStock: 150,
      minStock: 50,
      maxStock: 300,
      unit: 'Drum',
      unitCost: 2800000,
      totalValue: 420000000,
      location: 'Lubricant Storage - L2',
      batchNumber: 'LUBE-2024-012',
      expiryDate: '2027-06-30',
      lastUpdated: '2024-09-13T11:30:00Z',
      supplier: 'Pertamina Lubricants',
      status: 'Low Stock',
      reservedStock: 20,
      availableStock: 130
    }
  ]

  const transactions = [
    {
      id: 'TXN-001',
      type: 'Inbound',
      itemCode: 'CRUDE-001',
      itemName: 'Crude Oil - Light Sweet',
      quantity: 5000,
      unit: 'Barrel',
      warehouseId: 'WH-001',
      reference: 'PO-2024-001',
      supplier: 'PT Pertamina Hulu Energi',
      date: '2024-09-15T08:30:00Z',
      processedBy: 'Ahmad Suryanto',
      status: 'Completed',
      notes: 'Regular crude oil delivery from Duri field'
    },
    {
      id: 'TXN-002',
      type: 'Outbound',
      itemCode: 'FUEL-001',
      itemName: 'Premium Gasoline 92',
      quantity: 2000,
      unit: 'Liter',
      warehouseId: 'WH-001',
      reference: 'SO-2024-089',
      customer: 'SPBU Cilacap Raya',
      date: '2024-09-14T14:20:00Z',
      processedBy: 'Budi Santoso',
      status: 'Completed',
      notes: 'Fuel distribution to retail station'
    },
    {
      id: 'TXN-003',
      type: 'Transfer',
      itemCode: 'SPARE-001',
      itemName: 'Pump Impeller - KSB Model',
      quantity: 2,
      unit: 'Pcs',
      warehouseId: 'WH-003',
      reference: 'TR-2024-025',
      destination: 'Maintenance Workshop',
      date: '2024-09-12T09:15:00Z',
      processedBy: 'Siti Nurhaliza',
      status: 'In Transit',
      notes: 'Emergency spare parts for pump maintenance'
    },
    {
      id: 'TXN-004',
      type: 'Adjustment',
      itemCode: 'CHEM-001',
      itemName: 'Catalyst - Platinum Based',
      quantity: -10,
      unit: 'Kg',
      warehouseId: 'WH-002',
      reference: 'ADJ-2024-007',
      reason: 'Stock Count Adjustment',
      date: '2024-09-10T16:30:00Z',
      processedBy: 'Dewi Kartika',
      status: 'Completed',
      notes: 'Physical count discrepancy correction'
    }
  ]

  return { warehouses, inventory, transactions }
}

export async function getWarehouseList(filters = {}) {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const { warehouses } = generateWarehouseData()
  let filtered = warehouses
  
  if (filters.status) {
    filtered = filtered.filter(wh => wh.status === filters.status)
  }
  
  if (filters.type) {
    filtered = filtered.filter(wh => wh.type === filters.type)
  }
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filtered = filtered.filter(wh => 
      wh.name.toLowerCase().includes(searchTerm) ||
      wh.code.toLowerCase().includes(searchTerm) ||
      wh.location.toLowerCase().includes(searchTerm)
    )
  }
  
  return {
    success: true,
    data: filtered,
    total: filtered.length
  }
}

export async function getInventoryList(filters = {}) {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const { inventory } = generateWarehouseData()
  let filtered = inventory
  
  if (filters.warehouseId) {
    filtered = filtered.filter(item => item.warehouseId === filters.warehouseId)
  }
  
  if (filters.category) {
    filtered = filtered.filter(item => item.category === filters.category)
  }
  
  if (filters.status) {
    filtered = filtered.filter(item => item.status === filters.status)
  }
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filtered = filtered.filter(item => 
      item.itemName.toLowerCase().includes(searchTerm) ||
      item.itemCode.toLowerCase().includes(searchTerm)
    )
  }
  
  return {
    success: true,
    data: filtered,
    total: filtered.length
  }
}

export async function getTransactionHistory(filters = {}) {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const { transactions } = generateWarehouseData()
  let filtered = transactions
  
  if (filters.type) {
    filtered = filtered.filter(txn => txn.type === filters.type)
  }
  
  if (filters.warehouseId) {
    filtered = filtered.filter(txn => txn.warehouseId === filters.warehouseId)
  }
  
  if (filters.dateFrom) {
    filtered = filtered.filter(txn => new Date(txn.date) >= new Date(filters.dateFrom))
  }
  
  if (filters.dateTo) {
    filtered = filtered.filter(txn => new Date(txn.date) <= new Date(filters.dateTo))
  }
  
  return {
    success: true,
    data: filtered,
    total: filtered.length
  }
}

export async function getWarehouseStatistics() {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const { warehouses, inventory, transactions } = generateWarehouseData()
  
  const stats = {
    warehouses: {
      total: warehouses.length,
      active: warehouses.filter(wh => wh.status === 'Active').length,
      totalCapacity: warehouses.reduce((sum, wh) => sum + wh.capacity, 0),
      totalUtilization: warehouses.reduce((sum, wh) => sum + wh.currentUtilization, 0)
    },
    inventory: {
      totalItems: inventory.length,
      totalValue: inventory.reduce((sum, item) => sum + item.totalValue, 0),
      lowStockItems: inventory.filter(item => item.currentStock <= item.minStock).length,
      outOfStockItems: inventory.filter(item => item.currentStock === 0).length
    },
    transactions: {
      today: transactions.filter(txn => {
        const today = new Date().toDateString()
        return new Date(txn.date).toDateString() === today
      }).length,
      thisWeek: transactions.filter(txn => {
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return new Date(txn.date) >= weekAgo
      }).length,
      inbound: transactions.filter(txn => txn.type === 'Inbound').length,
      outbound: transactions.filter(txn => txn.type === 'Outbound').length
    }
  }
  
  return {
    success: true,
    data: stats
  }
}

export async function createWarehouseTransaction(transactionData) {
  await new Promise(resolve => setTimeout(resolve, 600))
  
  const newTransaction = {
    id: `TXN-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    ...transactionData,
    date: new Date().toISOString(),
    status: 'Pending'
  }
  
  return {
    success: true,
    data: newTransaction,
    message: 'Transaction created successfully'
  }
}

export async function updateInventoryStock(itemId, adjustment) {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  return {
    success: true,
    message: `Stock updated for item ${itemId}`,
    adjustment: adjustment
  }
}
