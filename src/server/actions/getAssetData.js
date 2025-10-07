'use server'

// Mock asset data for demo purposes
const generateAssetData = () => {
  const assets = [
    {
      id: 'AST-001',
      name: 'Crude Oil Pump P-101A',
      assetCode: 'P-101A',
      description: 'Primary crude oil transfer pump for distillation unit',
      serialNumber: 'KSB-2023-001',
      manufacturer: 'KSB',
      model: 'Etanorm G 200-150-400',
      status: 'tersedia',
      purchaseDate: '2023-01-15',
      warrantyExpiry: '2026-01-15',
      // Master Item Fields
      color: 'Blue',
      size: 'Large',
      type: 'Equipment',
      uom: 'unit',
      category: {
        primary: 'Production Equipment',
        sub: 'Pumps & Compressors',
        type: 'Fixed Asset',
        classification: 'Critical'
      },
      location: {
        facility: 'Pertamina Refinery Cilacap',
        building: 'Main Processing Unit',
        floor: 'Ground Floor',
        room: 'Pump House A',
        zone: 'Zone 1',
        coordinates: { latitude: '-7.7326', longitude: '109.0154' },
        responsiblePerson: 'Ahmad Suryanto',
        department: 'Operations',
        // Location & Storage fields
        location_id: 'WH-001',
        location_name: 'Gudang A - Main Processing',
        rack: 'R-001',
        bin_location: 'A1-B2',
        contact_person: 'Ahmad Warehouse',
        notes: 'Heavy equipment storage area with crane access'
      },
      specifications: {
        dimensions: { length: '2.5', width: '1.2', height: '1.8', unit: 'm' },
        weight: '850',
        powerRating: '75',
        voltage: '380',
        frequency: '50',
        capacity: '500',
        operatingTemp: { min: '10', max: '80' },
        pressure: '16'
      },
      maintenance: {
        type: 'Preventive Maintenance',
        frequency: 'Monthly',
        lastDate: '2024-08-15',
        nextDate: '2024-09-15',
        team: 'Mechanical Team',
        estimatedCost: '2500000'
      },
      criticality: 'Very High',
      riskLevel: 'High',
      tags: ['Rotating Equipment', 'Process Critical', 'High Pressure'],
      createdAt: '2023-01-15T08:00:00Z',
      updatedAt: '2024-08-15T14:30:00Z'
    },
    {
      id: 'AST-002',
      name: 'Heat Exchanger E-201B',
      assetCode: 'E-201B',
      description: 'Shell and tube heat exchanger for crude preheating',
      serialNumber: 'ALFA-2023-HE-002',
      manufacturer: 'Alfa Laval',
      model: 'M15-BFG',
      status: 'rusak',
      purchaseDate: '2023-03-20',
      warrantyExpiry: '2026-03-20',
      // Master Item Fields
      color: 'Silver',
      size: 'Extra Large',
      type: 'Equipment',
      uom: 'unit',
      category: {
        primary: 'Production Equipment',
        sub: 'Heat Exchangers',
        type: 'Fixed Asset',
        classification: 'Critical'
      },
      location: {
        facility: 'Pertamina Refinery Cilacap',
        building: 'Main Processing Unit',
        floor: 'Level 2',
        room: 'Heat Exchange Area',
        zone: 'Zone 2',
        coordinates: { latitude: '-7.7328', longitude: '109.0156' },
        responsiblePerson: 'Siti Nurhaliza',
        department: 'Operations',
        // Location & Storage fields
        location_id: 'WH-002',
        location_name: 'Heat Exchange Storage',
        rack: 'R-HE-01',
        bin_location: 'HE-L2-001',
        contact_person: 'Siti Operations',
        notes: 'High temperature equipment area - special handling required'
      },
      specifications: {
        dimensions: { length: '4.2', width: '2.1', height: '3.5', unit: 'm' },
        weight: '2500',
        powerRating: '0',
        voltage: '0',
        frequency: '0',
        capacity: '1200',
        operatingTemp: { min: '50', max: '350' },
        pressure: '25'
      },
      maintenance: {
        type: 'Overhaul',
        frequency: 'Annual',
        lastDate: '2024-09-01',
        nextDate: '2025-09-01',
        team: 'Multi-disciplinary Team',
        estimatedCost: '15000000'
      },
      criticality: 'Very High',
      riskLevel: 'Medium',
      tags: ['Static Equipment', 'Process Critical', 'High Temperature'],
      createdAt: '2023-03-20T10:15:00Z',
      updatedAt: '2024-09-01T09:00:00Z'
    },
    {
      id: 'AST-003',
      name: 'Control Valve CV-301',
      assetCode: 'CV-301',
      description: 'Pneumatic control valve for flow regulation',
      serialNumber: 'FISHER-2023-CV-003',
      manufacturer: 'Fisher',
      model: 'ED Series',
      status: 'dipakai',
      purchaseDate: '2023-05-10',
      warrantyExpiry: '2025-05-10',
      // Master Item Fields
      color: 'Gray',
      size: 'Medium',
      type: 'Equipment',
      uom: 'unit',
      category: {
        primary: 'Production Equipment',
        sub: 'Valves',
        type: 'Fixed Asset',
        classification: 'Important'
      },
      location: {
        facility: 'Pertamina Refinery Cilacap',
        building: 'Main Processing Unit',
        floor: 'Ground Floor',
        room: 'Control Room',
        zone: 'Zone 3',
        coordinates: { latitude: '-7.7330', longitude: '109.0158' },
        responsiblePerson: 'Budi Santoso',
        department: 'Instrumentation',
        // Location & Storage fields
        location_id: 'CR-001',
        location_name: 'Control Room Storage',
        rack: 'R-CTRL-01',
        bin_location: 'CR-A1',
        contact_person: 'Budi Control',
        notes: 'Instrumentation equipment storage with climate control'
      },
      specifications: {
        dimensions: { length: '0.8', width: '0.6', height: '1.2', unit: 'm' },
        weight: '45',
        powerRating: '0',
        voltage: '24',
        frequency: '0',
        capacity: '200',
        operatingTemp: { min: '-20', max: '200' },
        pressure: '40'
      },
      maintenance: {
        type: 'Preventive Maintenance',
        frequency: 'Quarterly',
        lastDate: '2024-07-01',
        nextDate: '2024-10-01',
        team: 'Instrumentation Team',
        estimatedCost: '1200000'
      },
      criticality: 'High',
      riskLevel: 'Medium',
      tags: ['Instrumentation', 'Process Critical', 'Pneumatic'],
      createdAt: '2023-05-10T14:20:00Z',
      updatedAt: '2024-07-01T11:45:00Z'
    },
    {
      id: 'AST-004',
      name: 'Storage Tank T-401',
      assetCode: 'T-401',
      description: 'Crude oil storage tank - 10,000 barrel capacity',
      serialNumber: 'TANK-2022-T401',
      manufacturer: 'PT Wijaya Karya',
      model: 'Fixed Roof Tank',
      status: 'tersedia',
      purchaseDate: '2022-08-15',
      warrantyExpiry: '2027-08-15',
      // Master Item Fields
      color: 'White',
      size: 'Extra Large',
      type: 'Equipment',
      uom: 'unit',
      category: {
        primary: 'Storage & Tanks',
        sub: 'Crude Oil Tanks',
        type: 'Fixed Asset',
        classification: 'Critical'
      },
      location: {
        facility: 'Pertamina Refinery Cilacap',
        building: 'Tank Farm A',
        floor: 'Ground Level',
        room: 'Tank Area 4',
        zone: 'Storage Zone',
        coordinates: { latitude: '-7.7340', longitude: '109.0170' },
        responsiblePerson: 'Dewi Kartika',
        department: 'Operations',
        // Location & Storage fields
        location_id: 'TF-A04',
        location_name: 'Tank Farm A - Area 4',
        rack: 'TANK-AREA',
        bin_location: 'T-401-LOC',
        contact_person: 'Dewi Tank Operations',
        notes: 'Large storage tank area - restricted access required'
      },
      specifications: {
        dimensions: { length: '25', width: '25', height: '12', unit: 'm' },
        weight: '85000',
        powerRating: '0',
        voltage: '0',
        frequency: '0',
        capacity: '10000',
        operatingTemp: { min: '-10', max: '60' },
        pressure: '1'
      },
      maintenance: {
        type: 'Routine Inspection',
        frequency: 'Monthly',
        lastDate: '2024-08-20',
        nextDate: '2024-09-20',
        team: 'Safety Team',
        estimatedCost: '3000000'
      },
      criticality: 'Very High',
      riskLevel: 'High',
      tags: ['Static Equipment', 'Storage', 'Environmental'],
      createdAt: '2022-08-15T12:00:00Z',
      updatedAt: '2024-08-20T16:30:00Z'
    },
    {
      id: 'AST-005',
      name: 'Fire Detection System FDS-501',
      assetCode: 'FDS-501',
      description: 'Automated fire detection and alarm system',
      serialNumber: 'HONEYWELL-2023-FDS-001',
      manufacturer: 'Honeywell',
      model: 'NOTIFIER NFS2-3030',
      status: 'tersedia',
      purchaseDate: '2023-02-28',
      warrantyExpiry: '2026-02-28',
      // Master Item Fields
      color: 'Red',
      size: 'Large',
      type: 'Safety Equipment',
      uom: 'set',
      category: {
        primary: 'Safety Equipment',
        sub: 'Fire Protection Systems',
        type: 'Fixed Asset',
        classification: 'Critical'
      },
      location: {
        facility: 'Pertamina Refinery Cilacap',
        building: 'Control Room Building',
        floor: 'Ground Floor',
        room: 'Fire Control Room',
        zone: 'Safety Zone',
        coordinates: { latitude: '-7.7325', longitude: '109.0145' },
        responsiblePerson: 'Eko Prasetyo',
        department: 'Safety & Environment',
        // Location & Storage fields
        location_id: 'FCR-001',
        location_name: 'Fire Control Room',
        rack: 'R-FIRE-01',
        bin_location: 'FCR-MAIN',
        contact_person: 'Eko Safety',
        notes: 'Critical safety system - 24/7 monitoring required'
      },
      specifications: {
        dimensions: { length: '2.0', width: '0.8', height: '1.5', unit: 'm' },
        weight: '120',
        powerRating: '2',
        voltage: '220',
        frequency: '50',
        capacity: '500',
        operatingTemp: { min: '0', max: '50' },
        pressure: '0'
      },
      maintenance: {
        type: 'Preventive Maintenance',
        frequency: 'Monthly',
        lastDate: '2024-08-10',
        nextDate: '2024-09-10',
        team: 'Safety Team',
        estimatedCost: '1500000'
      },
      criticality: 'Very High',
      riskLevel: 'Low',
      tags: ['Safety Critical', 'Fire & Gas', 'Electrical'],
      createdAt: '2023-02-28T09:30:00Z',
      updatedAt: '2024-08-10T13:15:00Z'
    },
    {
      id: 'AST-006',
      name: 'Safety Helmet',
      assetCode: 'PPE-001',
      description: 'Personal protective equipment - safety helmet',
      serialNumber: 'MSA-2024-H-001',
      manufacturer: 'MSA',
      model: 'V-Gard',
      status: 'habis',
      purchaseDate: '2024-01-15',
      warrantyExpiry: '2026-01-15',
      // Master Item Fields
      color: 'Yellow',
      size: 'Large',
      type: 'S3 SRC',
      uom: 'pcs',
      category: {
        primary: 'Safety Equipment',
        sub: 'Personal Protective Equipment',
        type: 'Consumable',
        classification: 'Standard'
      },
      location: {
        facility: 'Pertamina Refinery Cilacap',
        building: 'Safety Equipment Store',
        floor: 'Ground Floor',
        room: 'PPE Storage',
        zone: 'Safety Zone',
        coordinates: { latitude: '-7.7320', longitude: '109.0140' },
        responsiblePerson: 'Safety Officer',
        department: 'Safety & Environment',
        // Location & Storage fields
        location_id: 'PPE-001',
        location_name: 'PPE Storage Area',
        rack: 'R-PPE-01',
        bin_location: 'PPE-HELM-001',
        contact_person: 'Safety Store Keeper',
        notes: 'Personal protective equipment storage - regular inspection required'
      },
      specifications: {
        dimensions: { length: '0.3', width: '0.25', height: '0.15', unit: 'm' },
        weight: '0.4',
        powerRating: '0',
        voltage: '0',
        frequency: '0',
        capacity: '1',
        operatingTemp: { min: '-20', max: '50' },
        pressure: '0'
      },
      maintenance: {
        type: 'Visual Inspection',
        frequency: 'Weekly',
        lastDate: '2024-09-01',
        nextDate: '2024-09-08',
        team: 'Safety Team',
        estimatedCost: '50000'
      },
      criticality: 'Medium',
      riskLevel: 'Low',
      tags: ['PPE', 'Safety', 'Consumable'],
      createdAt: '2024-01-15T08:00:00Z',
      updatedAt: '2024-09-01T10:00:00Z'
    },
    {
      id: 'AST-007',
      name: 'Work Uniform Set',
      assetCode: 'UNI-001',
      description: 'Complete work uniform with 4 layers protection',
      serialNumber: 'UNIFORM-2024-001',
      manufacturer: 'PT Garment Indonesia',
      model: 'Industrial Uniform',
      status: 'dipensiunkan',
      purchaseDate: '2024-03-01',
      warrantyExpiry: '2025-03-01',
      // Master Item Fields
      color: 'Blue',
      size: '42',
      type: '4 Susun',
      uom: 'set',
      category: {
        primary: 'Safety Equipment',
        sub: 'Work Clothing',
        type: 'Consumable',
        classification: 'Standard'
      },
      location: {
        facility: 'Pertamina Refinery Cilacap',
        building: 'Employee Facility',
        floor: 'Ground Floor',
        room: 'Uniform Storage',
        zone: 'Admin Zone',
        coordinates: { latitude: '-7.7315', longitude: '109.0135' },
        responsiblePerson: 'HR Officer',
        department: 'Human Resources',
        // Location & Storage fields
        location_id: 'UNI-001',
        location_name: 'Uniform Storage Room',
        rack: 'R-UNI-01',
        bin_location: 'UNI-SIZE-42',
        contact_person: 'HR Store Keeper',
        notes: 'Employee uniform storage organized by size and department'
      },
      specifications: {
        dimensions: { length: '0.6', width: '0.4', height: '0.1', unit: 'm' },
        weight: '1.2',
        powerRating: '0',
        voltage: '0',
        frequency: '0',
        capacity: '1',
        operatingTemp: { min: '-10', max: '40' },
        pressure: '0'
      },
      maintenance: {
        type: 'Cleaning',
        frequency: 'Weekly',
        lastDate: '2024-08-25',
        nextDate: '2024-09-01',
        team: 'Housekeeping',
        estimatedCost: '25000'
      },
      criticality: 'Low',
      riskLevel: 'Low',
      tags: ['Uniform', 'PPE', 'Clothing'],
      createdAt: '2024-03-01T09:00:00Z',
      updatedAt: '2024-08-25T15:00:00Z'
    }
  ]

  return assets
}

export async function getAssetList(filters = {}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  let assets = generateAssetData()
  
  // Apply filters
  if (filters.status) {
    assets = assets.filter(asset => asset.status === filters.status)
  }
  
  if (filters.category) {
    assets = assets.filter(asset => asset.category.primary === filters.category)
  }
  
  if (filters.facility) {
    assets = assets.filter(asset => asset.location.facility === filters.facility)
  }
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    assets = assets.filter(asset => 
      asset.name.toLowerCase().includes(searchTerm) ||
      asset.assetCode.toLowerCase().includes(searchTerm) ||
      asset.description.toLowerCase().includes(searchTerm)
    )
  }
  
  return {
    success: true,
    data: assets,
    total: assets.length,
    filters: filters
  }
}

export async function getAssetById(id) {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const assets = generateAssetData()
  const asset = assets.find(a => a.id === id || a.assetCode === id)
  
  if (!asset) {
    return {
      success: false,
      error: 'Asset not found'
    }
  }

  // Enhance asset data with additional details for detail view
  const enhancedAsset = {
    ...asset,
    specifications: {
      ...asset.specifications,
      dimensions: asset.specifications.dimensions || { length: '2.5', width: '1.2', height: '1.8', unit: 'm' },
      weight: asset.specifications.weight || '850',
      weightUnit: 'kg',
      powerRating: asset.specifications.powerRating || '75',
      powerUnit: 'kW',
      voltage: asset.specifications.voltage || '380V',
      frequency: asset.specifications.frequency || '50Hz',
      capacity: asset.specifications.capacity || '500',
      capacityUnit: 'L/min',
      operatingTemp: asset.specifications.operatingTemp || { min: '10', max: '80' },
      pressure: asset.specifications.pressure || '16',
      pressureUnit: 'bar'
    },
    financial: {
      purchaseDate: asset.purchaseDate,
      purchasePrice: '125000000',
      currency: 'IDR',
      supplier: asset.manufacturer === 'KSB' ? 'PT KSB Indonesia' : `PT ${asset.manufacturer} Indonesia`,
      warrantyExpiry: asset.warrantyExpiry,
      depreciationMethod: 'Straight Line',
      depreciationRate: '10%',
      bookValue: '112500000',
      salvageValue: '12500000'
    },
    files: {
      documents: [
        { name: `${asset.assetCode}_Manual.pdf`, size: '2.1 MB', uploadedAt: '2024-01-20', type: 'Manual' },
        { name: 'Warranty_Certificate.pdf', size: '1.2 MB', uploadedAt: '2024-01-20', type: 'Warranty' },
        { name: `${asset.assetCode}_Installation_Guide.pdf`, size: '1.8 MB', uploadedAt: '2024-01-20', type: 'Installation' }
      ],
      images: [
        { name: `${asset.assetCode}_front_view.jpg`, size: '3.2 MB', uploadedAt: '2024-01-20', type: 'Photo' },
        { name: `${asset.assetCode}_nameplate.png`, size: '512 KB', uploadedAt: '2024-01-20', type: 'Nameplate' },
        { name: `${asset.assetCode}_installation.jpg`, size: '2.8 MB', uploadedAt: '2024-01-20', type: 'Installation' }
      ]
    },
    qrCode: {
      generated: true,
      generatedAt: '2024-01-20T10:30:00Z',
      format: 'PNG',
      size: '256x256'
    },
    auditTrail: [
      { action: 'Created', user: 'System Admin', timestamp: asset.createdAt, details: 'Asset registered in system' },
      { action: 'Updated', user: 'John Doe', timestamp: '2024-02-15T14:30:00Z', details: 'Updated maintenance schedule' },
      { action: 'Maintenance', user: 'Maintenance Team', timestamp: asset.maintenance.lastDate, details: asset.maintenance.type }
    ]
  }
  
  return {
    success: true,
    data: enhancedAsset
  }
}

export async function createAsset(assetData) {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const newAsset = {
    id: `AST-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    ...assetData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return {
    success: true,
    data: newAsset,
    message: 'Asset created successfully'
  }
}

export async function updateAsset(id, assetData) {
  await new Promise(resolve => setTimeout(resolve, 600))
  
  const assets = generateAssetData()
  const existingAsset = assets.find(a => a.id === id)
  
  if (!existingAsset) {
    return {
      success: false,
      error: 'Asset not found'
    }
  }
  
  const updatedAsset = {
    ...existingAsset,
    ...assetData,
    updatedAt: new Date().toISOString()
  }
  
  return {
    success: true,
    data: updatedAsset,
    message: 'Asset updated successfully'
  }
}

export async function deleteAsset(id) {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const assets = generateAssetData()
  const asset = assets.find(a => a.id === id)
  
  if (!asset) {
    return {
      success: false,
      error: 'Asset not found'
    }
  }
  
  return {
    success: true,
    message: 'Asset deleted successfully'
  }
}

export async function getAssetCategories() {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  return {
    success: true,
    data: {
      primaryCategories: [
        'Production Equipment',
        'Processing Units',
        'Storage & Tanks',
        'Transportation',
        'Safety Equipment',
        'IT & Telecommunications',
        'Office Equipment',
        'Utilities',
        'Maintenance Tools',
        'Laboratory Equipment'
      ],
      subCategories: {
        'Production Equipment': [
          'Pumps & Compressors',
          'Heat Exchangers',
          'Reactors',
          'Distillation Columns',
          'Turbines',
          'Generators'
        ],
        'Storage & Tanks': [
          'Crude Oil Tanks',
          'Product Storage Tanks',
          'Chemical Storage',
          'Gas Storage',
          'Underground Storage'
        ],
        'Safety Equipment': [
          'Fire Protection Systems',
          'Gas Detection Systems',
          'Emergency Shutdown Systems',
          'Personal Protective Equipment',
          'Safety Valves'
        ]
      }
    }
  }
}

export async function getAssetStatistics() {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const assets = generateAssetData()
  
  const stats = {
    total: assets.length,
    byStatus: {
      active: assets.filter(a => a.status === 'Active').length,
      maintenance: assets.filter(a => a.status === 'Under Maintenance').length,
      inactive: assets.filter(a => a.status === 'Inactive').length,
      disposed: assets.filter(a => a.status === 'Disposed').length
    },
    byCriticality: {
      veryHigh: assets.filter(a => a.criticality === 'Very High').length,
      high: assets.filter(a => a.criticality === 'High').length,
      medium: assets.filter(a => a.criticality === 'Medium').length,
      low: assets.filter(a => a.criticality === 'Low').length
    },
    byCategory: assets.reduce((acc, asset) => {
      const category = asset.category.primary
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {}),
    maintenanceDue: assets.filter(a => {
      const nextDate = new Date(a.maintenance.nextDate)
      const today = new Date()
      const diffDays = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24))
      return diffDays <= 7
    }).length
  }
  
  return {
    success: true,
    data: stats
  }
}
