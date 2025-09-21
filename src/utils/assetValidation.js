// Asset Registration Business Rules and Validation

export const assetValidationRules = {
  // Required fields based on asset type
  requiredFieldsByType: {
    'Fixed Asset': ['name', 'assetCode', 'category.primary', 'category.sub', 'location.facility', 'purchaseDate', 'purchasePrice'],
    'Equipment': ['name', 'assetCode', 'category.primary', 'specifications.manufacturer', 'specifications.model', 'location.facility'],
    'Vehicle': ['name', 'assetCode', 'specifications.manufacturer', 'specifications.model', 'specifications.licensePlate', 'location.facility'],
    'IT Asset': ['name', 'assetCode', 'specifications.manufacturer', 'specifications.model', 'specifications.serialNumber', 'location.facility'],
    'Furniture': ['name', 'assetCode', 'category.primary', 'location.facility', 'location.room'],
    'Tool': ['name', 'assetCode', 'category.primary', 'specifications.manufacturer', 'location.facility']
  },

  // Maintenance requirements based on criticality
  maintenanceBycriticality: {
    'Critical': { required: true, maxFrequency: 'Monthly' },
    'High': { required: true, maxFrequency: 'Quarterly' },
    'Medium': { required: true, maxFrequency: 'Semi-Annual' },
    'Low': { required: false, maxFrequency: 'Annual' }
  },

  // File requirements based on asset type
  fileRequirementsByType: {
    'Fixed Asset': { documents: ['manual', 'warranty'], images: ['photo'] },
    'Equipment': { documents: ['manual', 'warranty'], images: ['photo', 'nameplate'] },
    'Vehicle': { documents: ['registration', 'insurance'], images: ['photo'] },
    'IT Asset': { documents: ['warranty'], images: ['photo'] },
    'Furniture': { documents: [], images: ['photo'] },
    'Tool': { documents: ['manual'], images: ['photo'] }
  },

  // Value thresholds for approval requirements
  approvalThresholds: {
    'IDR': {
      'manager': 50000000, // 50M IDR
      'director': 500000000, // 500M IDR
      'board': 2000000000 // 2B IDR
    },
    'USD': {
      'manager': 3500,
      'director': 35000,
      'board': 140000
    }
  }
}

// Validation functions
export const validateAssetRegistration = (formData) => {
  const errors = {}
  const warnings = []

  // Basic required fields
  if (!formData.name?.trim()) {
    errors.name = 'Asset name is required'
  }

  if (!formData.assetCode?.trim()) {
    errors.assetCode = 'Asset code is required'
  } else if (formData.assetCode.length < 3) {
    errors.assetCode = 'Asset code must be at least 3 characters'
  }

  // Category validation
  if (!formData.category?.primary) {
    errors['category.primary'] = 'Primary category is required'
  }

  if (!formData.category?.type) {
    errors['category.type'] = 'Asset type is required'
  }

  // Type-specific validation
  const assetType = formData.category?.type
  if (assetType && assetValidationRules.requiredFieldsByType[assetType]) {
    const requiredFields = assetValidationRules.requiredFieldsByType[assetType]
    
    requiredFields.forEach(fieldPath => {
      const value = getNestedValue(formData, fieldPath)
      if (!value || (typeof value === 'string' && !value.trim())) {
        errors[fieldPath] = `${getFieldLabel(fieldPath)} is required for ${assetType}`
      }
    })
  }

  // Location validation
  if (!formData.location?.facility?.trim()) {
    errors['location.facility'] = 'Facility is required'
  }

  // Financial validation
  if (formData.purchasePrice && formData.currency) {
    const price = parseFloat(formData.purchasePrice)
    const currency = formData.currency
    
    if (price > 0 && assetValidationRules.approvalThresholds[currency]) {
      const thresholds = assetValidationRules.approvalThresholds[currency]
      
      if (price > thresholds.board) {
        warnings.push('Asset value requires Board approval')
      } else if (price > thresholds.director) {
        warnings.push('Asset value requires Director approval')
      } else if (price > thresholds.manager) {
        warnings.push('Asset value requires Manager approval')
      }
    }
  }

  // Criticality and maintenance validation
  const criticality = formData.criticality
  if (criticality && assetValidationRules.maintenanceBycriticality[criticality]) {
    const maintenanceRule = assetValidationRules.maintenanceBycriticality[criticality]
    
    if (maintenanceRule.required && !formData.maintenance?.required) {
      errors['maintenance.required'] = `Maintenance is required for ${criticality} criticality assets`
    }
    
    if (formData.maintenance?.frequency) {
      const frequencyOrder = ['Weekly', 'Monthly', 'Quarterly', 'Semi-Annual', 'Annual']
      const maxFreqIndex = frequencyOrder.indexOf(maintenanceRule.maxFrequency)
      const currentFreqIndex = frequencyOrder.indexOf(formData.maintenance.frequency)
      
      if (currentFreqIndex > maxFreqIndex) {
        warnings.push(`${criticality} criticality assets should have maintenance frequency of ${maintenanceRule.maxFrequency} or more frequent`)
      }
    }
  }

  // File validation based on asset type
  if (assetType && assetValidationRules.fileRequirementsByType[assetType]) {
    const fileReqs = assetValidationRules.fileRequirementsByType[assetType]
    
    // Check required documents
    if (fileReqs.documents.length > 0) {
      const uploadedDocs = formData.files?.documents || []
      if (uploadedDocs.length === 0) {
        warnings.push(`${assetType} typically requires documents: ${fileReqs.documents.join(', ')}`)
      }
    }
    
    // Check required images
    if (fileReqs.images.length > 0) {
      const uploadedImages = formData.files?.images || []
      if (uploadedImages.length === 0) {
        warnings.push(`${assetType} typically requires images: ${fileReqs.images.join(', ')}`)
      }
    }
  }

  // Date validation
  if (formData.purchaseDate) {
    const purchaseDate = new Date(formData.purchaseDate)
    const today = new Date()
    
    if (purchaseDate > today) {
      errors.purchaseDate = 'Purchase date cannot be in the future'
    }
    
    const tenYearsAgo = new Date()
    tenYearsAgo.setFullYear(today.getFullYear() - 10)
    
    if (purchaseDate < tenYearsAgo) {
      warnings.push('Purchase date is more than 10 years ago - verify depreciation settings')
    }
  }

  // Warranty validation
  if (formData.warrantyEndDate && formData.purchaseDate) {
    const warrantyEnd = new Date(formData.warrantyEndDate)
    const purchaseDate = new Date(formData.purchaseDate)
    
    if (warrantyEnd < purchaseDate) {
      errors.warrantyEndDate = 'Warranty end date cannot be before purchase date'
    }
  }

  // Environmental and safety validation
  if (formData.environmentalImpact === 'High' && !formData.complianceRequired) {
    warnings.push('High environmental impact assets typically require compliance monitoring')
  }

  if (formData.safetyCategory && ['Class I', 'Hazardous'].includes(formData.safetyCategory)) {
    if (!formData.maintenance?.safetyPrecautions?.trim()) {
      errors['maintenance.safetyPrecautions'] = 'Safety precautions are required for this safety category'
    }
  }

  return { errors, warnings, isValid: Object.keys(errors).length === 0 }
}

// Helper functions
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

const getFieldLabel = (fieldPath) => {
  const labels = {
    'name': 'Asset Name',
    'assetCode': 'Asset Code',
    'category.primary': 'Primary Category',
    'category.sub': 'Sub Category',
    'category.type': 'Asset Type',
    'location.facility': 'Facility',
    'location.room': 'Room',
    'purchaseDate': 'Purchase Date',
    'purchasePrice': 'Purchase Price',
    'specifications.manufacturer': 'Manufacturer',
    'specifications.model': 'Model',
    'specifications.serialNumber': 'Serial Number',
    'specifications.licensePlate': 'License Plate',
    'maintenance.required': 'Maintenance Required',
    'maintenance.safetyPrecautions': 'Safety Precautions'
  }
  
  return labels[fieldPath] || fieldPath.split('.').pop()
}

// Business rule checks
export const checkBusinessRules = (formData) => {
  const rules = []
  
  // Rule 1: Critical assets must have maintenance
  if (formData.criticality === 'Critical' && !formData.maintenance?.required) {
    rules.push({
      type: 'error',
      rule: 'CRITICAL_MAINTENANCE',
      message: 'Critical assets must have maintenance enabled'
    })
  }
  
  // Rule 2: High-value assets need approval workflow
  if (formData.purchasePrice && parseFloat(formData.purchasePrice) > 100000000) { // 100M IDR
    rules.push({
      type: 'warning',
      rule: 'HIGH_VALUE_APPROVAL',
      message: 'High-value assets require management approval'
    })
  }
  
  // Rule 3: Production equipment needs location details
  if (formData.category?.primary === 'Production Equipment' && !formData.location?.zone) {
    rules.push({
      type: 'warning',
      rule: 'PRODUCTION_LOCATION',
      message: 'Production equipment should specify zone location'
    })
  }
  
  // Rule 4: IT assets need serial numbers
  if (formData.category?.type === 'IT Asset' && !formData.specifications?.serialNumber) {
    rules.push({
      type: 'warning',
      rule: 'IT_SERIAL_NUMBER',
      message: 'IT assets should have serial numbers for tracking'
    })
  }
  
  return rules
}
