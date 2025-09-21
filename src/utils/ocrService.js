import Tesseract from 'tesseract.js'

/**
 * OCR Service for extracting text from images
 * Supports asset nameplate recognition, document parsing, and general text extraction
 */

// OCR Configuration for different asset types
const OCR_CONFIG = {
  // General text extraction
  general: {
    lang: 'eng',
    options: {
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .-_/',
      tessedit_pageseg_mode: Tesseract.PSM.AUTO
    }
  },
  // Asset nameplate specific (alphanumeric codes, serial numbers)
  nameplate: {
    lang: 'eng',
    options: {
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_',
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
      preserve_interword_spaces: '0'
    }
  },
  // Document text extraction (certificates, manuals)
  document: {
    lang: 'eng',
    options: {
      tessedit_pageseg_mode: Tesseract.PSM.AUTO,
      preserve_interword_spaces: '1'
    }
  }
}

/**
 * Extract text from image file
 * @param {File} imageFile - Image file to process
 * @param {string} type - OCR type: 'general', 'nameplate', 'document'
 * @param {function} onProgress - Progress callback function
 * @returns {Promise<Object>} OCR result with text, confidence, and metadata
 */
export const extractTextFromImage = async (imageFile, type = 'general', onProgress = null) => {
  try {
    const config = OCR_CONFIG[type] || OCR_CONFIG.general
    
    const result = await Tesseract.recognize(imageFile, config.lang, {
      ...config.options,
      logger: onProgress ? (m) => {
        if (m.status === 'recognizing text') {
          onProgress(Math.round(m.progress * 100))
        }
      } : undefined
    })

    return {
      success: true,
      text: result.data.text.trim(),
      confidence: result.data.confidence,
      words: result.data.words,
      lines: result.data.lines,
      blocks: result.data.blocks,
      metadata: {
        processingTime: Date.now(),
        imageSize: imageFile.size,
        ocrType: type
      }
    }
  } catch (error) {
    console.error('OCR Error:', error)
    return {
      success: false,
      error: error.message,
      text: '',
      confidence: 0
    }
  }
}

/**
 * Parse asset information from OCR text
 * Attempts to extract common asset fields from recognized text
 * @param {string} text - OCR extracted text
 * @param {string} assetType - Type of asset (optional) to improve parsing accuracy
 * @returns {Object} Parsed asset information
 */
export const parseAssetInformation = (text, assetType = null) => {
  // Base parsed object with common fields
  const parsed = {
    serialNumber: null,
    model: null,
    manufacturer: null,
    partNumber: null,
    voltage: null,
    power: null,
    year: null,
    capacity: null,
    // Category-specific fields
    size: null,
    material: null,
    color: null,
    standards: null,
    flowRate: null,
    pressure: null,
    rpm: null,
    macAddress: null,
    ipAddress: null,
    operatingSystem: null
  }

  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)

  // Detect asset type if not provided
  let detectedType = assetType
  if (!detectedType) {
    const text = lines.join(' ').toUpperCase()
    if (text.includes('SAFETY') && (text.includes('SHOE') || text.includes('BOOT') || text.includes('FOOTWEAR'))) {
      detectedType = 'ppe_shoes'
    } else if (text.includes('HELMET') || text.includes('HARD HAT') || text.includes('HEAD PROTECTION')) {
      detectedType = 'ppe_helmet'
    } else if (text.includes('GLOVE') || text.includes('HAND PROTECTION')) {
      detectedType = 'ppe_gloves'
    } else if (text.includes('PUMP') || text.includes('COMPRESSOR')) {
      detectedType = 'pump'
    } else if (text.includes('MOTOR') || text.includes('ENGINE')) {
      detectedType = 'motor'
    } else if (text.includes('VALVE')) {
      detectedType = 'valve'
    } else if (text.includes('COMPUTER') || text.includes('SERVER') || text.includes('LAPTOP')) {
      detectedType = 'it_equipment'
    }
  }

  // Process each line for common patterns first
  lines.forEach(line => {
    const upperLine = line.toUpperCase()
    
    // Serial Number patterns
    if (upperLine.includes('SERIAL') || upperLine.includes('S/N') || upperLine.includes('SN:') || upperLine.includes('ARTICLE NO') || upperLine.includes('PART NO')) {
      const serialMatch = line.match(/(?:SERIAL|S\/N|SN:?|ARTICLE NO|PART NO)\s*:?\s*([A-Z0-9\-_]+)/i)
      if (serialMatch) parsed.serialNumber = serialMatch[1]
    }
    
    // Model patterns
    if (upperLine.includes('MODEL') || upperLine.includes('TYPE')) {
      const modelMatch = line.match(/(?:MODEL|TYPE)\s*:?\s*([A-Z0-9\-_\s]+)/i)
      if (modelMatch) parsed.model = modelMatch[1].trim()
    } else {
      // Try to find model-like patterns (alphanumeric with dashes)
      const genericModelMatch = line.match(/([A-Z0-9]+-[A-Z0-9]+(?:-[A-Z0-9]+)*)/i)
      if (genericModelMatch && !parsed.model) parsed.model = genericModelMatch[1].trim()
    }
    
    // Manufacturer patterns
    const manufacturers = ['KSB', 'GRUNDFOS', 'FLOWSERVE', 'SULZER', 'PENTAIR', 'ITT', 'EBARA', 'SIEMENS', 'HONEYWELL', 'MSA', 'ANSELL']
    manufacturers.forEach(mfg => {
      if (upperLine.includes(mfg)) {
        parsed.manufacturer = mfg
      }
    })
    
    // If manufacturer is still null, look for any word in all caps at the beginning of a line
    if (!parsed.manufacturer) {
      const possibleMfgMatch = line.match(/^([A-Z]{3,})/) 
      if (possibleMfgMatch) parsed.manufacturer = possibleMfgMatch[1]
    }
    
    // Part Number patterns
    if (upperLine.includes('PART') || upperLine.includes('P/N')) {
      const partMatch = line.match(/(?:PART|P\/N)\s*:?\s*([A-Z0-9\-_]+)/i)
      if (partMatch) parsed.partNumber = partMatch[1]
    }
    
    // Voltage patterns
    const voltageMatch = line.match(/(\d+)\s*V(?:OLT)?/i)
    if (voltageMatch) parsed.voltage = voltageMatch[1] + 'V'
    
    // Power patterns
    const powerMatch = line.match(/(\d+(?:\.\d+)?)\s*(?:KW|HP)/i)
    if (powerMatch) parsed.power = powerMatch[0]
    
    // Year patterns
    const yearMatch = line.match(/(19|20)\d{2}/)
    if (yearMatch) parsed.year = yearMatch[0]
    
    // Capacity patterns
    const capacityMatch = line.match(/(\d+(?:\.\d+)?)\s*(?:L\/MIN|GPM|M3\/H)/i)
    if (capacityMatch) parsed.capacity = capacityMatch[0]
    
    // PPE-specific patterns
    if (detectedType && detectedType.startsWith('ppe_')) {
      // Size patterns
      if (upperLine.includes('SIZE')) {
        const sizeMatch = line.match(/SIZE\s*:?\s*([0-9]+(?:\s*[A-Z]+)?|[A-Z]+)/i)
        if (sizeMatch) parsed.size = sizeMatch[1]
      } else if (upperLine.match(/\b\d+\s*(?:EU|US)\b/)) {
        // Look for patterns like "42 EU" or "8 US"
        const euUsMatch = line.match(/(\d+\s*EU|\d+\s*US|\d+\s*UK)/i)
        if (euUsMatch) parsed.size = euUsMatch[0]
      } else if (upperLine.match(/\b[XS|S|M|L|XL|XXL]\b/)) {
        // Look for size letters
        const letterSizeMatch = line.match(/\b([XS|S|M|L|XL|XXL]+)\b/)
        if (letterSizeMatch) parsed.size = letterSizeMatch[1]
      }
      
      // Material patterns
      if (upperLine.includes('MATERIAL')) {
        const materialMatch = line.match(/MATERIAL\s*:?\s*([A-Z0-9\s]+)/i)
        if (materialMatch) parsed.material = materialMatch[1].trim()
      } else if (upperLine.includes('LEATHER') || upperLine.includes('NYLON') || 
                upperLine.includes('COTTON') || upperLine.includes('HDPE')) {
        const materialKeywords = ['LEATHER', 'NYLON', 'COTTON', 'HDPE', 'POLYESTER', 'NITRILE']
        for (const material of materialKeywords) {
          if (upperLine.includes(material)) {
            parsed.material = material
            break
          }
        }
      }
      
      // Color patterns
      if (upperLine.includes('COLOR')) {
        const colorMatch = line.match(/COLOR\s*:?\s*([A-Z]+)/i)
        if (colorMatch) parsed.color = colorMatch[1]
      } else {
        const colorKeywords = ['YELLOW', 'BLUE', 'RED', 'GREEN', 'BLACK', 'WHITE', 'ORANGE']
        for (const color of colorKeywords) {
          if (upperLine.includes(color)) {
            parsed.color = color
            break
          }
        }
      }
      
      // Safety standards
      if (upperLine.includes('STANDARD') || upperLine.includes('EN ISO') || 
          upperLine.includes('ANSI') || upperLine.includes('ASTM')) {
        // Look for common safety standard patterns
        const standardMatch = line.match(/(EN ISO \d+(?:-\d+)?|ANSI\/ISEA [A-Z0-9\.-]+|ASTM [A-Z0-9\.-]+)/i)
        if (standardMatch) parsed.standards = standardMatch[0]
      }
    }
    
    // Pump-specific patterns
    else if (detectedType === 'pump') {
      // Flow rate
      if (upperLine.includes('FLOW') || upperLine.includes('CAPACITY')) {
        const flowMatch = line.match(/(\d+(?:\.\d+)?)\s*(?:L\/MIN|GPM|M3\/H)/i)
        if (flowMatch) parsed.flowRate = flowMatch[0]
      }
      
      // Pressure
      if (upperLine.includes('PRESSURE')) {
        const pressureMatch = line.match(/(\d+(?:\.\d+)?)\s*(?:BAR|PSI|KPA|MPA)/i)
        if (pressureMatch) parsed.pressure = pressureMatch[0]
      }
      
      // RPM
      if (upperLine.includes('RPM') || upperLine.includes('SPEED')) {
        const rpmMatch = line.match(/(\d+)\s*(?:RPM)/i)
        if (rpmMatch) parsed.rpm = rpmMatch[0]
      }
    }
    
    // Motor-specific patterns
    else if (detectedType === 'motor') {
      // RPM
      if (upperLine.includes('RPM') || upperLine.includes('SPEED')) {
        const rpmMatch = line.match(/(\d+)\s*(?:RPM)/i)
        if (rpmMatch) parsed.rpm = rpmMatch[0]
      }
      
      // Current
      if (upperLine.includes('CURRENT') || upperLine.includes('AMP')) {
        const currentMatch = line.match(/(\d+(?:\.\d+)?)\s*(?:A|AMP)/i)
        if (currentMatch) parsed.current = currentMatch[0]
      }
      
      // Frequency
      if (upperLine.includes('FREQ') || upperLine.includes('HZ')) {
        const freqMatch = line.match(/(\d+)\s*(?:HZ)/i)
        if (freqMatch) parsed.frequency = freqMatch[0]
      }
    }
    
    // IT equipment-specific patterns
    else if (detectedType === 'it_equipment') {
      // MAC Address
      const macMatch = line.match(/([0-9A-F]{2}[:-]){5}([0-9A-F]{2})/i)
      if (macMatch) parsed.macAddress = macMatch[0]
      
      // IP Address
      const ipMatch = line.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/)
      if (ipMatch) parsed.ipAddress = ipMatch[0]
      
      // Operating System
      if (upperLine.includes('WINDOWS') || upperLine.includes('LINUX') || 
          upperLine.includes('UBUNTU') || upperLine.includes('MAC OS')) {
        const osKeywords = ['WINDOWS', 'LINUX', 'UBUNTU', 'MAC OS', 'CENTOS', 'DEBIAN']
        for (const os of osKeywords) {
          if (upperLine.includes(os)) {
            // Try to get version too
            const osVersionMatch = line.match(new RegExp(os + '\\s*(\\d+(?:\\.\\d+)?)', 'i'))
            parsed.operatingSystem = osVersionMatch ? osVersionMatch[0] : os
            break
          }
        }
      }
    }
  })

  return parsed
}

/**
 * Validate OCR confidence and suggest improvements
 * @param {number} confidence - OCR confidence score (0-100)
 * @param {string} text - Extracted text
 * @returns {Object} Validation result with suggestions
 */
export const validateOCRResult = (confidence, text) => {
  const validation = {
    isReliable: confidence >= 70,
    confidence,
    suggestions: []
  }

  if (confidence < 50) {
    validation.suggestions.push('Very low confidence. Try retaking the photo with better lighting.')
  } else if (confidence < 70) {
    validation.suggestions.push('Moderate confidence. Please review the extracted text carefully.')
  }

  if (text.length < 10) {
    validation.suggestions.push('Very little text detected. Ensure the image contains readable text.')
  }

  if (!/[A-Z0-9]/.test(text)) {
    validation.suggestions.push('No alphanumeric characters detected. Check if the image is clear and contains text.')
  }

  return validation
}

/**
 * Process multiple images for OCR
 * @param {File[]} imageFiles - Array of image files
 * @param {string} type - OCR type
 * @param {function} onProgress - Progress callback
 * @returns {Promise<Array>} Array of OCR results
 */
export const processMultipleImages = async (imageFiles, type = 'general', onProgress = null) => {
  const results = []
  
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i]
    
    if (onProgress) {
      onProgress({
        currentFile: i + 1,
        totalFiles: imageFiles.length,
        fileName: file.name,
        status: 'processing'
      })
    }
    
    const result = await extractTextFromImage(file, type, (progress) => {
      if (onProgress) {
        onProgress({
          currentFile: i + 1,
          totalFiles: imageFiles.length,
          fileName: file.name,
          status: 'processing',
          fileProgress: progress
        })
      }
    })
    
    results.push({
      fileName: file.name,
      ...result
    })
  }
  
  return results
}

export default {
  extractTextFromImage,
  parseAssetInformation,
  validateOCRResult,
  processMultipleImages
}
