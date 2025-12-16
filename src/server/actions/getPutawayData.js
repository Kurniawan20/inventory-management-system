'use server'

// Mock putaway management data
const generatePutawayData = () => {
  const putawayTasks = [
    {
      putaway_id: 'PUT-2024-001',
      receiving_id: 'RCV-2024-001',
      item_name: 'Crude Oil Pump P-101A',
      quantity: 50,
      from_location: 'RECEIVING-A1',
      to_location: 'RACK-A-01-02',
      warehouse_id: 'WH-001',
      warehouse_name: 'Gudang A - Main Warehouse',
      status: 'completed',
      priority: 'high',
      assigned_to: 'John Warehouse',
      started_at: '2024-03-15T09:00:00Z',
      completed_at: '2024-03-15T10:30:00Z',
      notes: 'All items stored successfully.',
      created_at: '2024-03-15T08:30:00Z',
      updated_at: '2024-03-15T10:30:00Z'
    },
    {
      putaway_id: 'PUT-2024-002',
      receiving_id: 'RCV-2024-003',
      item_name: 'Safety Helmet PPE-001',
      quantity: 120,
      from_location: 'RECEIVING-B2',
      to_location: 'SHELF-B-03-05',
      warehouse_id: 'WH-002',
      warehouse_name: 'Gudang B - Equipment Storage',
      status: 'in-progress',
      priority: 'high',
      assigned_to: 'Jane Warehouse',
      started_at: '2024-03-18T11:30:00Z',
      completed_at: null,
      notes: 'Putaway in progress.',
      created_at: '2024-03-18T11:00:00Z',
      updated_at: '2024-03-18T12:00:00Z'
    },
    {
      putaway_id: 'PUT-2024-003',
      receiving_id: 'RCV-2024-004',
      item_name: 'Work Uniform Set',
      quantity: 50,
      from_location: 'RECEIVING-C1',
      to_location: 'BIN-C-02-08',
      warehouse_id: 'WH-003',
      warehouse_name: 'Safety Equipment Storage',
      status: 'pending',
      priority: 'medium',
      assigned_to: null,
      started_at: null,
      completed_at: null,
      notes: 'Awaiting assignment.',
      created_at: '2024-03-16T14:00:00Z',
      updated_at: '2024-03-16T14:00:00Z'
    },
    {
      putaway_id: 'PUT-2024-004',
      receiving_id: 'RCV-2024-002',
      item_name: 'Heat Exchanger E-201B',
      quantity: 5,
      from_location: 'RECEIVING-A2',
      to_location: 'FLOOR-A-HEAVY-01',
      warehouse_id: 'WH-001',
      warehouse_name: 'Gudang A - Main Warehouse',
      status: 'assigned',
      priority: 'high',
      assigned_to: 'Ahmad Warehouse',
      started_at: null,
      completed_at: null,
      notes: 'Heavy equipment - requires forklift.',
      created_at: '2024-03-17T10:00:00Z',
      updated_at: '2024-03-17T10:30:00Z'
    }
  ]

  return putawayTasks
}

export async function getPutawayList(filters = {}) {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  let tasks = generatePutawayData()
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    tasks = tasks.filter(task => 
      task.putaway_id.toLowerCase().includes(searchTerm) ||
      task.item_name.toLowerCase().includes(searchTerm) ||
      task.to_location.toLowerCase().includes(searchTerm) ||
      task.assigned_to?.toLowerCase().includes(searchTerm)
    )
  }
  
  if (filters.status) {
    tasks = tasks.filter(task => task.status === filters.status)
  }
  
  if (filters.priority) {
    tasks = tasks.filter(task => task.priority === filters.priority)
  }
  
  if (filters.warehouse_id) {
    tasks = tasks.filter(task => task.warehouse_id === filters.warehouse_id)
  }
  
  tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  
  return {
    tasks,
    total: tasks.length,
    page: filters.page || 1,
    limit: filters.limit || 10
  }
}

export async function getPutawayById(putawayId) {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const tasks = generatePutawayData()
  const task = tasks.find(t => t.putaway_id === putawayId)
  
  if (!task) {
    throw new Error('Putaway task not found')
  }
  
  return task
}

export async function createPutaway(taskData) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const newPutawayId = `PUT-${new Date().getFullYear()}-${String(Date.now()).slice(-3).padStart(3, '0')}`
  
  const newTask = {
    putaway_id: newPutawayId,
    ...taskData,
    status: 'pending',
    started_at: null,
    completed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  return {
    success: true,
    task: newTask,
    message: 'Putaway task created successfully'
  }
}

export async function updatePutaway(putawayId, taskData) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const updatedTask = {
    putaway_id: putawayId,
    ...taskData,
    updated_at: new Date().toISOString()
  }
  
  return {
    success: true,
    task: updatedTask,
    message: 'Putaway task updated successfully'
  }
}

export async function deletePutaway(putawayId) {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    success: true,
    message: 'Putaway task deleted successfully'
  }
}

export async function getPutawaySummary() {
  await new Promise(resolve => setTimeout(resolve, 600))
  
  const tasks = generatePutawayData()
  
  const summary = {
    total_tasks: tasks.length,
    pending_tasks: tasks.filter(t => t.status === 'pending').length,
    assigned_tasks: tasks.filter(t => t.status === 'assigned').length,
    in_progress_tasks: tasks.filter(t => t.status === 'in-progress').length,
    completed_tasks: tasks.filter(t => t.status === 'completed').length,
    total_quantity: tasks.reduce((sum, t) => sum + t.quantity, 0),
    completion_rate: tasks.length > 0 
      ? ((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100).toFixed(1)
      : 0
  }
  
  return summary
}
