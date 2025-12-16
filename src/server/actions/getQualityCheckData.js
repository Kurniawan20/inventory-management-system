'use server'

// Mock quality check data
const generateQualityCheckData = () => {
  const qcInspections = [
    {
      qc_id: 'QC-2024-001',
      receiving_id: 'RCV-2024-001',
      po_number: 'PO-2024-001',
      item_name: 'Crude Oil Pump P-101A',
      supplier_name: 'PT Industrial Supplies Indonesia',
      inspection_date: '2024-03-15T09:00:00Z',
      inspector_name: 'Ahmad Inspeksi',
      status: 'passed',
      priority: 'high',
      total_checks: 15,
      passed_checks: 15,
      failed_checks: 0,
      defect_quantity: 0,
      notes: 'All quality checks passed. Equipment in excellent condition.',
      photos: [],
      created_at: '2024-03-15T08:30:00Z',
      updated_at: '2024-03-15T10:00:00Z'
    },
    {
      qc_id: 'QC-2024-002',
      receiving_id: 'RCV-2024-003',
      po_number: 'PO-2024-003',
      item_name: 'Safety Helmet PPE-001',
      supplier_name: 'CV Safety Equipment',
      inspection_date: null,
      inspector_name: null,
      status: 'pending',
      priority: 'high',
      total_checks: 10,
      passed_checks: 0,
      failed_checks: 0,
      defect_quantity: 0,
      notes: 'Awaiting inspection.',
      photos: [],
      created_at: '2024-03-18T11:00:00Z',
      updated_at: '2024-03-18T11:00:00Z'
    },
    {
      qc_id: 'QC-2024-003',
      receiving_id: 'RCV-2024-004',
      po_number: 'PO-2024-004',
      item_name: 'Work Uniform Set',
      supplier_name: 'PT Pertamina Lubricants',
      inspection_date: '2024-03-16T14:00:00Z',
      inspector_name: 'Siti QC',
      status: 'in-progress',
      priority: 'medium',
      total_checks: 8,
      passed_checks: 5,
      failed_checks: 0,
      defect_quantity: 0,
      notes: 'Visual inspection in progress.',
      photos: [],
      created_at: '2024-03-16T13:45:00Z',
      updated_at: '2024-03-16T14:30:00Z'
    },
    {
      qc_id: 'QC-2024-004',
      receiving_id: 'RCV-2024-002',
      po_number: 'PO-2024-002',
      item_name: 'Heat Exchanger E-201B',
      supplier_name: 'PT Equipment Solutions',
      inspection_date: '2024-03-17T10:00:00Z',
      inspector_name: 'Budi QC',
      status: 'failed',
      priority: 'high',
      total_checks: 12,
      passed_checks: 10,
      failed_checks: 2,
      defect_quantity: 1,
      notes: 'Minor surface damage detected. Supplier notified for replacement.',
      photos: ['photo1.jpg', 'photo2.jpg'],
      created_at: '2024-03-17T09:30:00Z',
      updated_at: '2024-03-17T11:00:00Z'
    }
  ]

  return qcInspections
}

export async function getQualityCheckList(filters = {}) {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  let inspections = generateQualityCheckData()
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    inspections = inspections.filter(inspection => 
      inspection.qc_id.toLowerCase().includes(searchTerm) ||
      inspection.item_name.toLowerCase().includes(searchTerm) ||
      inspection.supplier_name.toLowerCase().includes(searchTerm) ||
      inspection.po_number.toLowerCase().includes(searchTerm)
    )
  }
  
  if (filters.status) {
    inspections = inspections.filter(inspection => inspection.status === filters.status)
  }
  
  if (filters.priority) {
    inspections = inspections.filter(inspection => inspection.priority === filters.priority)
  }
  
  inspections.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  
  return {
    inspections,
    total: inspections.length,
    page: filters.page || 1,
    limit: filters.limit || 10
  }
}

export async function getQualityCheckById(qcId) {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const inspections = generateQualityCheckData()
  const inspection = inspections.find(i => i.qc_id === qcId)
  
  if (!inspection) {
    throw new Error('Quality check inspection not found')
  }
  
  return inspection
}

export async function createQualityCheck(inspectionData) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const newQcId = `QC-${new Date().getFullYear()}-${String(Date.now()).slice(-3).padStart(3, '0')}`
  
  const newInspection = {
    qc_id: newQcId,
    ...inspectionData,
    passed_checks: 0,
    failed_checks: 0,
    defect_quantity: 0,
    photos: [],
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  return {
    success: true,
    inspection: newInspection,
    message: 'Quality check created successfully'
  }
}

export async function updateQualityCheck(qcId, inspectionData) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const updatedInspection = {
    qc_id: qcId,
    ...inspectionData,
    updated_at: new Date().toISOString()
  }
  
  return {
    success: true,
    inspection: updatedInspection,
    message: 'Quality check updated successfully'
  }
}

export async function deleteQualityCheck(qcId) {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    success: true,
    message: 'Quality check deleted successfully'
  }
}

export async function getQualityCheckSummary() {
  await new Promise(resolve => setTimeout(resolve, 600))
  
  const inspections = generateQualityCheckData()
  
  const summary = {
    total_inspections: inspections.length,
    pending_inspections: inspections.filter(i => i.status === 'pending').length,
    in_progress_inspections: inspections.filter(i => i.status === 'in-progress').length,
    passed_inspections: inspections.filter(i => i.status === 'passed').length,
    failed_inspections: inspections.filter(i => i.status === 'failed').length,
    pass_rate: inspections.length > 0 
      ? ((inspections.filter(i => i.status === 'passed').length / inspections.filter(i => i.status !== 'pending').length) * 100).toFixed(1)
      : 0,
    total_defects: inspections.reduce((sum, i) => sum + i.defect_quantity, 0)
  }
  
  return summary
}
