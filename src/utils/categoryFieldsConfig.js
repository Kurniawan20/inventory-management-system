/**
 * Configuration for category-specific fields in asset registration
 * This file defines which fields should be shown based on asset category and subcategory
 */

// Field visibility configuration by primary category
export const categoryFieldsConfig = {
  // Production Equipment
  'Production Equipment': {
    common: [
      'serialNumber',
      'model',
      'manufacturer',
      'partNumber',
      'manufacturingYear',
      'voltage',
      'power',
      'capacity',
    ],
    'Pumps & Compressors': [
      'specifications.flowRate',
      'specifications.pressure',
      'specifications.rpm',
      'specifications.impellerSize',
    ],
    'Heat Exchangers': [
      'specifications.heatTransferArea',
      'specifications.designPressure',
      'specifications.designTemperature',
      'specifications.shellMaterial',
      'specifications.tubeMaterial',
    ],
    'Turbines': [
      'specifications.powerOutput',
      'specifications.rpm',
      'specifications.efficiency',
      'specifications.fuelType',
    ],
    'Generators': [
      'specifications.powerRating',
      'specifications.voltage',
      'specifications.frequency',
      'specifications.phaseType',
    ],
  },
  
  // Safety Equipment
  'Safety Equipment': {
    common: [
      'serialNumber',
      'model',
      'manufacturer',
      'partNumber',
      'manufacturingYear',
      'certificationStandards',
      'expiryDate',
      'inspectionFrequency',
    ],
    'Fire Protection Systems': [
      'specifications.coverageArea',
      'specifications.suppressantType',
      'specifications.activationType',
    ],
    'Gas Detection Systems': [
      'specifications.gasType',
      'specifications.detectionRange',
      'specifications.responseTime',
      'specifications.alarmThreshold',
    ],
    'Personal Protective Equipment': [
      'specifications.size',
      'specifications.material',
      'specifications.protectionLevel',
      'specifications.color',
      'specifications.standards',
    ],
  },
  
  // IT & Telecommunications
  'IT & Telecommunications': {
    common: [
      'serialNumber',
      'model',
      'manufacturer',
      'partNumber',
      'manufacturingYear',
      'macAddress',
      'ipAddress',
      'warrantyExpiry',
    ],
    'Computers & Servers': [
      'specifications.processor',
      'specifications.ram',
      'specifications.storage',
      'specifications.operatingSystem',
    ],
    'Network Equipment': [
      'specifications.ports',
      'specifications.throughput',
      'specifications.protocol',
      'specifications.encryptionType',
    ],
  },
  
  // Default fields for all other categories
  default: {
    common: [
      'serialNumber',
      'model',
      'manufacturer',
      'partNumber',
      'manufacturingYear',
    ],
  }
}

/**
 * Get fields to display based on category and subcategory
 * @param {string} primaryCategory - Primary asset category
 * @param {string} subCategory - Sub category
 * @returns {Array} List of fields to display
 */
export const getFieldsByCategory = (primaryCategory, subCategory) => {
  // Get category config or use default
  const categoryConfig = categoryFieldsConfig[primaryCategory] || categoryFieldsConfig.default
  
  // Get common fields for this category
  const commonFields = categoryConfig.common || []
  
  // Get subcategory specific fields
  const subCategoryFields = subCategory && categoryConfig[subCategory] 
    ? categoryConfig[subCategory] 
    : []
  
  // Combine common and subcategory fields
  return [...commonFields, ...subCategoryFields]
}

/**
 * Check if a field should be visible based on category
 * @param {string} field - Field name
 * @param {string} primaryCategory - Primary asset category
 * @param {string} subCategory - Sub category
 * @returns {boolean} Whether the field should be visible
 */
export const isFieldVisible = (field, primaryCategory, subCategory) => {
  const visibleFields = getFieldsByCategory(primaryCategory, subCategory)
  return visibleFields.includes(field)
}

export default {
  categoryFieldsConfig,
  getFieldsByCategory,
  isFieldVisible
}
