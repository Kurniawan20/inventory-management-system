// Mock data for Warehouse Operations Dashboard
export const getWarehouseDashboardData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))

  return {
    overview: {
      totalItems: 15847,
      inStock: 14523,
      lowStock: 892,
      outOfStock: 432,
      monthlyTurnover: 12.5
    },
    inventoryChart: [
      { month: 'Jan', inbound: 2400, outbound: 2100, stock: 12000 },
      { month: 'Feb', inbound: 2200, outbound: 2300, stock: 11900 },
      { month: 'Mar', inbound: 2800, outbound: 2400, stock: 12300 },
      { month: 'Apr', inbound: 2600, outbound: 2200, stock: 12700 },
      { month: 'May', inbound: 3000, outbound: 2600, stock: 13100 },
      { month: 'Jun', inbound: 2900, outbound: 2800, stock: 13200 }
    ],
    lowStockAlerts: [
      {
        id: 1,
        itemName: 'Crude Oil Filter Type A',
        currentStock: 15,
        minimumStock: 50,
        location: 'Warehouse A-1',
        category: 'Filters',
        priority: 'critical'
      },
      {
        id: 2,
        itemName: 'Industrial Lubricant 20W-50',
        currentStock: 28,
        minimumStock: 100,
        location: 'Warehouse B-2',
        category: 'Lubricants',
        priority: 'high'
      },
      {
        id: 3,
        itemName: 'Safety Helmet Standard',
        currentStock: 45,
        minimumStock: 200,
        location: 'Safety Equipment Store',
        category: 'PPE',
        priority: 'medium'
      }
    ],
    utilizationData: [
      { warehouse: 'Warehouse A', capacity: 10000, used: 8500, percentage: 85 },
      { warehouse: 'Warehouse B', capacity: 8000, used: 6200, percentage: 77.5 },
      { warehouse: 'Warehouse C', capacity: 12000, used: 9600, percentage: 80 },
      { warehouse: 'Cold Storage', capacity: 5000, used: 3200, percentage: 64 }
    ],
    activityData: [
      {
        id: 1,
        type: 'inbound',
        itemName: 'Diesel Fuel Additive',
        quantity: 500,
        unit: 'Liters',
        supplier: 'PT Chemical Solutions',
        timestamp: '2024-01-15 15:45',
        status: 'received'
      },
      {
        id: 2,
        type: 'outbound',
        itemName: 'Hydraulic Oil ISO 46',
        quantity: 200,
        unit: 'Liters',
        destination: 'Maintenance Workshop',
        timestamp: '2024-01-15 14:20',
        status: 'dispatched'
      },
      {
        id: 3,
        type: 'inbound',
        itemName: 'Industrial Gloves Size L',
        quantity: 1000,
        unit: 'Pairs',
        supplier: 'Safety Equipment Co.',
        timestamp: '2024-01-15 13:30',
        status: 'quality_check'
      },
      {
        id: 4,
        type: 'outbound',
        itemName: 'Pipe Fittings 2 inch',
        quantity: 50,
        unit: 'Pieces',
        destination: 'Construction Site B',
        timestamp: '2024-01-15 12:15',
        status: 'packed'
      }
    ]
  }
}
