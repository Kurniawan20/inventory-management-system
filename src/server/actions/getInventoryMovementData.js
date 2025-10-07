'use server'

// Mock inventory movement data for demo purposes
const generateInventoryMovementData = () => {
  const movements = [
    {
      movement_id: 'MOV-2024-001',
      item_id: 'AST-001',
      location_id: 'WH-001',
      movement_type: 'inbound',
      reference_doc: 'PO-2024-001',
      qty_in: 1,
      qty_out: 0,
      balance: 1,
      batch_number: 'BATCH-001-2024',
      expiry_date: '2027-01-15',
      tracking_method: 'FIFO',
      transaction_date: '2024-01-15T08:00:00Z',
      notes: 'Received crude oil pump from PT KSB Indonesia. Installed in main processing unit.',
      createdAt: '2024-01-15T08:00:00Z',
      updatedAt: '2024-01-15T08:00:00Z',
      // Related data for display
      item_name: 'Crude Oil Pump P-101A',
      location_name: 'Gudang A - Main Warehouse',
      unit_cost: 125000000.00,
      total_value: 125000000.00
    },
    {
      movement_id: 'MOV-2024-002',
      item_id: 'AST-002',
      location_id: 'WH-002',
      movement_type: 'inbound',
      reference_doc: 'PO-2024-002',
      qty_in: 1,
      qty_out: 0,
      balance: 1,
      batch_number: 'BATCH-002-2024',
      expiry_date: '2027-02-20',
      tracking_method: 'FIFO',
      transaction_date: '2024-02-20T10:15:00Z',
      notes: 'Heat exchanger received and inspected. Ready for installation.',
      createdAt: '2024-02-20T10:15:00Z',
      updatedAt: '2024-02-20T10:15:00Z',
      item_name: 'Heat Exchanger E-201B',
      location_name: 'Gudang B - Equipment Storage',
      unit_cost: 275000000.00,
      total_value: 275000000.00
    },
    {
      movement_id: 'MOV-2024-003',
      item_id: 'AST-006',
      location_id: 'WH-003',
      movement_type: 'inbound',
      reference_doc: 'PO-2024-006',
      qty_in: 50,
      qty_out: 0,
      balance: 50,
      batch_number: 'BATCH-PPE-001',
      expiry_date: '2026-01-15',
      tracking_method: 'FEFO',
      transaction_date: '2024-01-15T09:00:00Z',
      notes: 'Safety helmets received in bulk. Distributed to safety equipment storage.',
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z',
      item_name: 'Safety Helmet PPE-001',
      location_name: 'Safety Equipment Storage',
      unit_cost: 50000.00,
      total_value: 2500000.00
    },
    {
      movement_id: 'MOV-2024-004',
      item_id: 'AST-006',
      location_id: 'WH-003',
      movement_type: 'outbound',
      reference_doc: 'REQ-2024-001',
      qty_in: 0,
      qty_out: 15,
      balance: 35,
      batch_number: 'BATCH-PPE-001',
      expiry_date: '2026-01-15',
      tracking_method: 'FEFO',
      transaction_date: '2024-02-01T14:30:00Z',
      notes: 'Safety helmets issued to field operations team for maintenance work.',
      createdAt: '2024-02-01T14:30:00Z',
      updatedAt: '2024-02-01T14:30:00Z',
      item_name: 'Safety Helmet PPE-001',
      location_name: 'Safety Equipment Storage',
      unit_cost: 50000.00,
      total_value: 1750000.00
    },
    {
      movement_id: 'MOV-2024-005',
      item_id: 'AST-007',
      location_id: 'WH-004',
      movement_type: 'inbound',
      reference_doc: 'PO-2024-007',
      qty_in: 100,
      qty_out: 0,
      balance: 100,
      batch_number: 'BATCH-UNI-001',
      expiry_date: null,
      tracking_method: 'FIFO',
      transaction_date: '2024-03-01T09:00:00Z',
      notes: 'Work uniform sets received. Quality checked and ready for distribution.',
      createdAt: '2024-03-01T09:00:00Z',
      updatedAt: '2024-03-01T09:00:00Z',
      item_name: 'Work Uniform Set UNI-001',
      location_name: 'Uniform Storage',
      unit_cost: 150000.00,
      total_value: 15000000.00
    },
    {
      movement_id: 'MOV-2024-006',
      item_id: 'AST-007',
      location_id: 'WH-004',
      movement_type: 'outbound',
      reference_doc: 'REQ-2024-002',
      qty_in: 0,
      qty_out: 25,
      balance: 75,
      batch_number: 'BATCH-UNI-001',
      expiry_date: null,
      tracking_method: 'FIFO',
      transaction_date: '2024-03-15T11:00:00Z',
      notes: 'Uniform sets distributed to new employees during orientation.',
      createdAt: '2024-03-15T11:00:00Z',
      updatedAt: '2024-03-15T11:00:00Z',
      item_name: 'Work Uniform Set UNI-001',
      location_name: 'Uniform Storage',
      unit_cost: 150000.00,
      total_value: 11250000.00
    },
    {
      movement_id: 'MOV-2024-007',
      item_id: 'AST-003',
      location_id: 'WH-001',
      movement_type: 'transfer',
      reference_doc: 'TRF-2024-001',
      qty_in: 1,
      qty_out: 0,
      balance: 1,
      batch_number: 'BATCH-003-2024',
      expiry_date: '2026-03-10',
      tracking_method: 'FIFO',
      transaction_date: '2024-03-12T13:20:00Z',
      notes: 'Control valve transferred from temporary storage to main warehouse.',
      createdAt: '2024-03-12T13:20:00Z',
      updatedAt: '2024-03-12T13:20:00Z',
      item_name: 'Control Valve CV-301',
      location_name: 'Gudang A - Main Warehouse',
      unit_cost: 22500000.00,
      total_value: 22500000.00
    },
    {
      movement_id: 'MOV-2024-008',
      item_id: 'AST-006',
      location_id: 'WH-003',
      movement_type: 'adjustment',
      reference_doc: 'ADJ-2024-001',
      qty_in: 0,
      qty_out: 2,
      balance: 33,
      batch_number: 'BATCH-PPE-001',
      expiry_date: '2026-01-15',
      tracking_method: 'FEFO',
      transaction_date: '2024-03-20T16:45:00Z',
      notes: 'Stock adjustment due to damaged helmets found during inspection.',
      createdAt: '2024-03-20T16:45:00Z',
      updatedAt: '2024-03-20T16:45:00Z',
      item_name: 'Safety Helmet PPE-001',
      location_name: 'Safety Equipment Storage',
      unit_cost: 50000.00,
      total_value: 1650000.00
    }
  ]

  return movements
}

export async function getInventoryMovementList(filters = {}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  let movements = generateInventoryMovementData()
  
  // Apply filters
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    movements = movements.filter(movement => 
      movement.movement_id.toLowerCase().includes(searchTerm) ||
      movement.item_name.toLowerCase().includes(searchTerm) ||
      movement.location_name.toLowerCase().includes(searchTerm) ||
      movement.reference_doc.toLowerCase().includes(searchTerm) ||
      movement.batch_number.toLowerCase().includes(searchTerm)
    )
  }
  
  if (filters.movement_type) {
    movements = movements.filter(movement => movement.movement_type === filters.movement_type)
  }
  
  if (filters.item_id) {
    movements = movements.filter(movement => movement.item_id === filters.item_id)
  }
  
  if (filters.location_id) {
    movements = movements.filter(movement => movement.location_id === filters.location_id)
  }
  
  if (filters.tracking_method) {
    movements = movements.filter(movement => movement.tracking_method === filters.tracking_method)
  }
  
  if (filters.date_from) {
    movements = movements.filter(movement => movement.transaction_date >= filters.date_from)
  }
  
  if (filters.date_to) {
    movements = movements.filter(movement => movement.transaction_date <= filters.date_to)
  }
  
  // Sort by transaction date (newest first)
  movements.sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date))
  
  return {
    movements,
    total: movements.length,
    page: filters.page || 1,
    limit: filters.limit || 10
  }
}

export async function getInventoryMovementById(movementId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const movements = generateInventoryMovementData()
  const movement = movements.find(m => m.movement_id === movementId)
  
  if (!movement) {
    throw new Error('Inventory movement not found')
  }
  
  return movement
}

export async function createInventoryMovement(movementData) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Generate new movement ID
  const newMovementId = `MOV-${new Date().getFullYear()}-${String(Date.now()).slice(-3).padStart(3, '0')}`
  
  const newMovement = {
    movement_id: newMovementId,
    ...movementData,
    transaction_date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return {
    success: true,
    movement: newMovement,
    message: 'Inventory movement created successfully'
  }
}

export async function updateInventoryMovement(movementId, movementData) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const updatedMovement = {
    movement_id: movementId,
    ...movementData,
    updatedAt: new Date().toISOString()
  }
  
  return {
    success: true,
    movement: updatedMovement,
    message: 'Inventory movement updated successfully'
  }
}

export async function deleteInventoryMovement(movementId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    success: true,
    message: 'Inventory movement deleted successfully'
  }
}

export async function getInventoryBalance(itemId, locationId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const movements = generateInventoryMovementData()
  const itemMovements = movements.filter(m => 
    m.item_id === itemId && m.location_id === locationId
  )
  
  // Calculate current balance
  let balance = 0
  itemMovements.forEach(movement => {
    balance += movement.qty_in - movement.qty_out
  })
  
  return {
    item_id: itemId,
    location_id: locationId,
    current_balance: balance,
    movements: itemMovements
  }
}

export async function getInventoryMovementsByItem(itemId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const movements = generateInventoryMovementData()
  const itemMovements = movements.filter(m => m.item_id === itemId)
  
  return {
    movements: itemMovements,
    total: itemMovements.length
  }
}

export async function getInventoryMovementsByLocation(locationId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const movements = generateInventoryMovementData()
  const locationMovements = movements.filter(m => m.location_id === locationId)
  
  return {
    movements: locationMovements,
    total: locationMovements.length
  }
}

export async function getInventoryMovementSummary() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600))
  
  const movements = generateInventoryMovementData()
  
  const summary = {
    total_movements: movements.length,
    inbound_movements: movements.filter(m => m.movement_type === 'inbound').length,
    outbound_movements: movements.filter(m => m.movement_type === 'outbound').length,
    transfer_movements: movements.filter(m => m.movement_type === 'transfer').length,
    adjustment_movements: movements.filter(m => m.movement_type === 'adjustment').length,
    total_value: movements.reduce((sum, m) => sum + m.total_value, 0),
    tracking_methods: {
      FIFO: movements.filter(m => m.tracking_method === 'FIFO').length,
      LIFO: movements.filter(m => m.tracking_method === 'LIFO').length,
      FEFO: movements.filter(m => m.tracking_method === 'FEFO').length
    }
  }
  
  return summary
}
