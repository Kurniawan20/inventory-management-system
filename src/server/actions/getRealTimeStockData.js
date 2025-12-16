'use server'

const generateRealTimeStockData = () => {
  return [
    { stock_id: 'STK-001', item_name: 'Crude Oil Pump P-101A', warehouse: 'WH-001', location: 'RACK-A-01-02', current_stock: 45, min_stock: 10, max_stock: 100, unit: 'pcs', last_updated: '2024-03-16T10:30:00Z', status: 'optimal' },
    { stock_id: 'STK-002', item_name: 'Safety Helmet PPE-001', warehouse: 'WH-002', location: 'SHELF-B-03-05', current_stock: 8, min_stock: 15, max_stock: 200, unit: 'pcs', last_updated: '2024-03-16T11:00:00Z', status: 'low' },
    { stock_id: 'STK-003', item_name: 'Work Uniform Set', warehouse: 'WH-003', location: 'BIN-C-02-08', current_stock: 120, min_stock: 20, max_stock: 100, unit: 'sets', last_updated: '2024-03-16T09:45:00Z', status: 'overstock' },
    { stock_id: 'STK-004', item_name: 'Heat Exchanger E-201B', warehouse: 'WH-001', location: 'FLOOR-A-HEAVY-01', current_stock: 3, min_stock: 2, max_stock: 10, unit: 'units', last_updated: '2024-03-16T10:15:00Z', status: 'optimal' }
  ]
}

export async function getRealTimeStockList(filters = {}) {
  await new Promise(resolve => setTimeout(resolve, 300))
  let stock = generateRealTimeStockData()
  
  if (filters.search) {
    stock = stock.filter(s => s.item_name.toLowerCase().includes(filters.search.toLowerCase()) || s.location.toLowerCase().includes(filters.search.toLowerCase()))
  }
  if (filters.status) stock = stock.filter(s => s.status === filters.status)
  if (filters.warehouse) stock = stock.filter(s => s.warehouse === filters.warehouse)
  
  return { stock, total: stock.length }
}

export async function getRealTimeStockSummary() {
  await new Promise(resolve => setTimeout(resolve, 200))
  const stock = generateRealTimeStockData()
  return {
    total_items: stock.length,
    low_stock_items: stock.filter(s => s.status === 'low').length,
    overstocked_items: stock.filter(s => s.status === 'overstock').length,
    optimal_items: stock.filter(s => s.status === 'optimal').length,
    total_value: stock.reduce((sum, s) => sum + (s.current_stock * 1000), 0)
  }
}
