'use server'

// Mock goods receiving data for demo purposes
const generateGoodsReceivingData = () => {
  const receivingOrders = [
    {
      receiving_id: 'RCV-2024-001',
      po_number: 'PO-2024-001',
      supplier_id: 'SUP-001',
      supplier_name: 'PT Industrial Supplies Indonesia',
      receiving_date: '2024-03-15T08:30:00Z',
      expected_date: '2024-03-15T08:00:00Z',
      status: 'completed',
      priority: 'high',
      warehouse_id: 'WH-001',
      warehouse_name: 'Gudang A - Main Warehouse',
      total_items: 5,
      received_items: 5,
      total_quantity: 150,
      received_quantity: 150,
      notes: 'All items received in good condition. Quality check completed.',
      received_by: 'John Doe',
      created_at: '2024-03-14T10:00:00Z',
      updated_at: '2024-03-15T10:30:00Z'
    },
    {
      receiving_id: 'RCV-2024-002',
      po_number: 'PO-2024-002',
      supplier_id: 'SUP-002',
      supplier_name: 'PT Equipment Solutions',
      receiving_date: null,
      expected_date: '2024-03-20T09:00:00Z',
      status: 'pending',
      priority: 'medium',
      warehouse_id: 'WH-001',
      warehouse_name: 'Gudang A - Main Warehouse',
      total_items: 3,
      received_items: 0,
      total_quantity: 75,
      received_quantity: 0,
      notes: 'Awaiting arrival from supplier.',
      received_by: null,
      created_at: '2024-03-10T14:00:00Z',
      updated_at: '2024-03-10T14:00:00Z'
    },
    {
      receiving_id: 'RCV-2024-003',
      po_number: 'PO-2024-003',
      supplier_id: 'SUP-003',
      supplier_name: 'CV Safety Equipment',
      receiving_date: '2024-03-18T11:00:00Z',
      expected_date: '2024-03-18T10:00:00Z',
      status: 'in-progress',
      priority: 'high',
      warehouse_id: 'WH-002',
      warehouse_name: 'Gudang B - Equipment Storage',
      total_items: 8,
      received_items: 5,
      total_quantity: 200,
      received_quantity: 120,
      notes: 'Partial receipt. Remaining items expected tomorrow.',
      received_by: 'Jane Smith',
      created_at: '2024-03-17T09:00:00Z',
      updated_at: '2024-03-18T12:15:00Z'
    },
    {
      receiving_id: 'RCV-2024-004',
      po_number: 'PO-2024-004',
      supplier_id: 'SUP-004',
      supplier_name: 'PT Pertamina Lubricants',
      receiving_date: '2024-03-16T13:45:00Z',
      expected_date: '2024-03-16T14:00:00Z',
      status: 'completed',
      priority: 'low',
      warehouse_id: 'WH-003',
      warehouse_name: 'Safety Equipment Storage',
      total_items: 2,
      received_items: 2,
      total_quantity: 50,
      received_quantity: 50,
      notes: 'Received on time. All items verified.',
      received_by: 'Ahmad Fulan',
      created_at: '2024-03-12T08:00:00Z',
      updated_at: '2024-03-16T14:30:00Z'
    },
    {
      receiving_id: 'RCV-2024-005',
      po_number: 'PO-2024-005',
      supplier_id: 'SUP-005',
      supplier_name: 'PT Valve & Instrument',
      receiving_date: null,
      expected_date: '2024-03-22T08:00:00Z',
      status: 'scheduled',
      priority: 'medium',
      warehouse_id: 'WH-001',
      warehouse_name: 'Gudang A - Main Warehouse',
      total_items: 10,
      received_items: 0,
      total_quantity: 300,
      received_quantity: 0,
      notes: 'Scheduled for delivery.',
      received_by: null,
      created_at: '2024-03-15T11:00:00Z',
      updated_at: '2024-03-15T11:00:00Z'
    },
    {
      receiving_id: 'RCV-2024-006',
      po_number: 'PO-2024-006',
      supplier_id: 'SUP-001',
      supplier_name: 'PT Industrial Supplies Indonesia',
      receiving_date: '2024-03-19T09:30:00Z',
      expected_date: '2024-03-19T09:00:00Z',
      status: 'completed',
      priority: 'high',
      warehouse_id: 'WH-002',
      warehouse_name: 'Gudang B - Equipment Storage',
      total_items: 6,
      received_items: 6,
      total_quantity: 180,
      received_quantity: 180,
      notes: 'Complete delivery. QC passed.',
      received_by: 'Budi Santoso',
      created_at: '2024-03-18T10:00:00Z',
      updated_at: '2024-03-19T11:00:00Z'
    }
  ]

  return receivingOrders
}

export async function getGoodsReceivingList(filters = {}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  let orders = generateGoodsReceivingData()
  
  // Apply filters
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    orders = orders.filter(order => 
      order.receiving_id.toLowerCase().includes(searchTerm) ||
      order.po_number.toLowerCase().includes(searchTerm) ||
      order.supplier_name.toLowerCase().includes(searchTerm) ||
      order.warehouse_name.toLowerCase().includes(searchTerm)
    )
  }
  
  if (filters.status) {
    orders = orders.filter(order => order.status === filters.status)
  }
  
  if (filters.priority) {
    orders = orders.filter(order => order.priority === filters.priority)
  }
  
  if (filters.warehouse_id) {
    orders = orders.filter(order => order.warehouse_id === filters.warehouse_id)
  }
  
  if (filters.date_from) {
    orders = orders.filter(order => order.expected_date >= filters.date_from)
  }
  
  if (filters.date_to) {
    orders = orders.filter(order => order.expected_date <= filters.date_to)
  }
  
  // Sort by expected date (newest first)
  orders.sort((a, b) => new Date(b.expected_date) - new Date(a.expected_date))
  
  return {
    orders,
    total: orders.length,
    page: filters.page || 1,
    limit: filters.limit || 10
  }
}

export async function getGoodsReceivingById(receivingId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const orders = generateGoodsReceivingData()
  const order = orders.find(o => o.receiving_id === receivingId)
  
  if (!order) {
    throw new Error('Receiving order not found')
  }
  
  return order
}

export async function createGoodsReceiving(orderData) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Generate new receiving ID
  const newReceivingId = `RCV-${new Date().getFullYear()}-${String(Date.now()).slice(-3).padStart(3, '0')}`
  
  const newOrder = {
    receiving_id: newReceivingId,
    ...orderData,
    received_items: 0,
    received_quantity: 0,
    status: 'scheduled',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  return {
    success: true,
    order: newOrder,
    message: 'Receiving order created successfully'
  }
}

export async function updateGoodsReceiving(receivingId, orderData) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const updatedOrder = {
    receiving_id: receivingId,
    ...orderData,
    updated_at: new Date().toISOString()
  }
  
  return {
    success: true,
    order: updatedOrder,
    message: 'Receiving order updated successfully'
  }
}

export async function deleteGoodsReceiving(receivingId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    success: true,
    message: 'Receiving order deleted successfully'
  }
}

export async function getGoodsReceivingSummary() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600))
  
  const orders = generateGoodsReceivingData()
  
  const summary = {
    total_orders: orders.length,
    pending_orders: orders.filter(o => o.status === 'pending').length,
    in_progress_orders: orders.filter(o => o.status === 'in-progress').length,
    completed_orders: orders.filter(o => o.status === 'completed').length,
    scheduled_orders: orders.filter(o => o.status === 'scheduled').length,
    total_items: orders.reduce((sum, o) => sum + o.total_items, 0),
    received_items: orders.reduce((sum, o) => sum + o.received_items, 0),
    total_quantity: orders.reduce((sum, o) => sum + o.total_quantity, 0),
    received_quantity: orders.reduce((sum, o) => sum + o.received_quantity, 0),
    completion_rate: orders.length > 0 
      ? ((orders.filter(o => o.status === 'completed').length / orders.length) * 100).toFixed(1)
      : 0
  }
  
  return summary
}

export async function updateReceivingStatus(receivingId, status, notes = '') {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    success: true,
    message: `Receiving order status updated to ${status}`,
    receiving_id: receivingId,
    new_status: status
  }
}
