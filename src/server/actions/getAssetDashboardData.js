// Mock data for Asset Management Dashboard
export const getAssetDashboardData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))

  return {
    overview: {
      totalAssets: 1247,
      activeAssets: 1156,
      underMaintenance: 67,
      criticalAlerts: 24,
      monthlyGrowth: 8.2
    },
    statusChart: [
      { name: 'Equipment', value: 45, count: 561, color: '#8884d8' },
      { name: 'Vehicles', value: 25, count: 312, color: '#82ca9d' },
      { name: 'IT Assets', value: 20, count: 249, color: '#ffc658' },
      { name: 'Furniture', value: 10, count: 125, color: '#ff7300' }
    ],
    maintenanceAlerts: [
      {
        id: 1,
        assetName: 'Generator Unit A-01',
        type: 'Preventive Maintenance',
        dueDate: '2024-01-20',
        priority: 'high',
        location: 'Refinery Block A'
      },
      {
        id: 2,
        assetName: 'Pump System B-15',
        type: 'Corrective Maintenance',
        dueDate: '2024-01-18',
        priority: 'critical',
        location: 'Processing Unit B'
      },
      {
        id: 3,
        assetName: 'Compressor C-08',
        type: 'Inspection',
        dueDate: '2024-01-25',
        priority: 'medium',
        location: 'Compression Station'
      }
    ],
    locationData: [
      { location: 'Refinery Block A', count: 342, percentage: 27.4 },
      { location: 'Processing Unit B', count: 298, percentage: 23.9 },
      { location: 'Storage Facility', count: 245, percentage: 19.6 },
      { location: 'Administration', count: 189, percentage: 15.2 },
      { location: 'Maintenance Shop', count: 173, percentage: 13.9 }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'registration',
        assetName: 'Laptop Dell Precision 5570',
        assetCode: 'IT-2024-001',
        action: 'Asset Registered',
        user: 'Ahmad Rizki',
        timestamp: '2024-01-15 14:30',
        status: 'completed'
      },
      {
        id: 2,
        type: 'transfer',
        assetName: 'Forklift Toyota 8FBE20',
        assetCode: 'VH-2023-045',
        action: 'Location Transfer',
        user: 'Siti Nurhaliza',
        timestamp: '2024-01-15 13:15',
        status: 'completed'
      },
      {
        id: 3,
        type: 'maintenance',
        assetName: 'Generator Caterpillar C32',
        assetCode: 'EQ-2022-089',
        action: 'Maintenance Completed',
        user: 'Budi Santoso',
        timestamp: '2024-01-15 11:45',
        status: 'completed'
      },
      {
        id: 4,
        type: 'disposal',
        assetName: 'Old Server HP ProLiant',
        assetCode: 'IT-2019-156',
        action: 'Disposal Request',
        user: 'Maya Sari',
        timestamp: '2024-01-15 10:20',
        status: 'pending'
      }
    ]
  }
}
