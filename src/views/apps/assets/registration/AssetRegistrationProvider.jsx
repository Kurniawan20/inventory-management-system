'use client'

// React Imports
import { createContext, useContext, useState, useCallback, useEffect } from 'react'

// Validation Imports - temporarily disabled
// import { validateAssetRegistration, checkBusinessRules } from '@/utils/assetValidation'

// Server Action Imports
import { createAsset } from '@/server/actions/getAssetData'

const AssetRegistrationContext = createContext()

export const useAssetRegistration = () => {
  const context = useContext(AssetRegistrationContext)
  if (!context) {
    throw new Error('useAssetRegistration must be used within AssetRegistrationProvider')
  }
  return context
}

const AssetRegistrationProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    assetCode: '',
    description: '',
    serialNumber: '',
    manufacturer: '',
    model: '',
    status: 'tersedia',
    purchaseDate: '',
    purchasePrice: '',
    currency: 'IDR',
    warrantyExpiry: '',
    
    // Master Item Fields (matching your schema)
    color: '',
    size: '',
    uom: '', // Unit of Measure
    type: '', // Item type (will map to category.type)
    
    // Images and Documents
    images: [],
    documents: [],
    
    // Specifications
    specifications: {
      dimensions: { length: '', width: '', height: '', unit: 'cm' },
      weight: '',
      weightUnit: 'kg',
      powerRating: '',
      powerUnit: 'kW',
      voltage: '',
      frequency: '',
      capacity: '',
      capacityUnit: 'L',
      operatingTemp: { min: '', max: '' },
      pressure: '',
      pressureUnit: 'bar',
      additionalSpecs: ''
    },
    
    // Location & Storage (matching your schema)
    location: {
      // Existing fields
      facility: '',
      building: '',
      floor: '',
      room: '',
      zone: '',
      coordinates: { latitude: '', longitude: '' },
      address: {
        street: '',
        city: '',
        province: '',
        postalCode: '',
        country: 'Indonesia'
      },
      responsiblePerson: '',
      department: '',
      costCenter: '',
      
      // New Location & Storage fields (matching your schema)
      location_id: '', // ID lokasi/gudang
      location_name: '', // Nama lokasi (Gudang A, WH-01, Ruang Server, dll.)
      rack: '', // Nomor rak penyimpanan
      bin_location: '', // Slot/bin lokasi penyimpanan
      contact_person: '', // Penanggung jawab lokasi
      notes: '' // Catatan tambahan
    },
    
    // Category
    category: {
      primary: '',
      sub: '',
      type: '',
      classification: ''
    },
    
    // Files
    files: {
      documents: [],
      images: []
    },
    
    // QR Code
    qrCode: null,
    criticality: '',
    complianceRequired: false,
    environmentalImpact: '',
    safetyCategory: '',
    tags: [],
    
    // Financial Information
    financial: {
      purchasePrice: '',
      currency: 'IDR',
      supplier: '',
      vendor_id: '', // Vendor/Supplier ID
      purchaseDate: '',
      warrantyPeriod: '',
      warrantyExpiry: '',
      depreciationMethod: 'Straight Line',
      depreciationRate: '',
      salvageValue: '',
      bookValue: '',
      insuranceValue: '',
      insuranceProvider: '',
      insuranceExpiry: ''
    },
    downtime: { planned: '', estimated: '' },
    cost: { estimated: '', currency: 'IDR' }
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [warnings, setWarnings] = useState([])
  const [businessRules, setBusinessRules] = useState([])
  const [isDraft, setIsDraft] = useState(false)
  const [validationStatus, setValidationStatus] = useState({ isValid: false, lastValidated: null })

  const updateFormData = useCallback((section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof data === 'function' ? data(prev[section]) : data
    }))
  }, [])

  const updateNestedFormData = useCallback((section, subsection, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: typeof data === 'function' ? data(prev[section][subsection]) : data
      }
    }))
  }, [])

  // Handle nested path updates like 'files.images' or 'specifications.voltage'
  const updateFormDataByPath = useCallback((path, data) => {
    const keys = path.split('.')
    
    setFormData(prev => {
      const newData = { ...prev }
      let current = newData
      
      // Navigate to the parent object
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }
      
      // Set the final value
      current[keys[keys.length - 1]] = typeof data === 'function' ? data(current[keys[keys.length - 1]]) : data
      
      return newData
    })
  }, [])

  const validateForm = useCallback(() => {
    // Basic validation only for now
    const basicErrors = {}
    if (!formData.name?.trim()) basicErrors.name = 'Asset name is required'
    if (!formData.assetCode?.trim()) basicErrors.assetCode = 'Asset code is required'
    
    setErrors(basicErrors)
    setWarnings([])
    setBusinessRules([])
    setValidationStatus({
      isValid: Object.keys(basicErrors).length === 0,
      lastValidated: new Date().toISOString()
    })
    
    return Object.keys(basicErrors).length === 0
  }, [formData])

  // Real-time validation when form data changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateForm()
    }, 500) // Debounce validation by 500ms
    
    return () => clearTimeout(timeoutId)
  }, [formData, validateForm])

  const saveDraft = useCallback(async () => {
    setLoading(true)
    setIsDraft(true)
    
    try {
      // In a real app, this would save to localStorage or backend
      localStorage.setItem('assetRegistrationDraft', JSON.stringify(formData))
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return { success: true, message: 'Draft saved successfully' }
    } catch (error) {
      return { success: false, message: 'Failed to save draft' }
    } finally {
      setLoading(false)
    }
  }, [formData])

  const loadDraft = useCallback(() => {
    try {
      const draft = localStorage.getItem('assetRegistrationDraft')
      if (draft) {
        setFormData(JSON.parse(draft))
        setIsDraft(true)
        return true
      }
    } catch (error) {
      console.error('Failed to load draft:', error)
    }
    return false
  }, [])

  const clearDraft = useCallback(() => {
    localStorage.removeItem('assetRegistrationDraft')
    setIsDraft(false)
  }, [])

  const populateDummyData = useCallback(() => {
    // Define multiple example assets for different categories
    const dummyAssets = [
      // Example 1: Production Equipment - Pump
      {
        name: 'Centrifugal Pump CP-001',
        assetCode: 'PMP-CP-001-2024',
        description: 'High-pressure centrifugal pump for crude oil processing unit',
        serialNumber: 'SN-CP001-2024-001',
        manufacturer: 'Grundfos',
        model: 'CR 64-2-2 A-F-A-E-HOOE',
        status: 'Active',
        purchaseDate: '2024-01-15',
        warrantyExpiry: '2027-01-15',
        specifications: {
          dimensions: { length: '120', width: '80', height: '150', unit: 'cm' },
          weight: '450',
          weightUnit: 'kg',
          powerRating: '15',
          powerUnit: 'kW',
          voltage: '380',
          frequency: '50',
          capacity: '500',
          capacityUnit: 'L/min',
          operatingTemp: { min: '10', max: '80' },
          pressure: '16',
          pressureUnit: 'bar',
          flowRate: '500',
          rpm: '1450',
          additionalSpecs: 'Stainless steel construction, ATEX certified for hazardous areas'
        },
        location: {
          facility: 'Pertamina Refinery Cilacap',
          building: 'Main Processing Unit',
          floor: 'Ground Floor',
          room: 'Pump House A',
          zone: 'Production Area Zone 1',
          coordinates: { latitude: '-7.7326', longitude: '109.0154' },
          address: {
            street: 'Jl. Laut Selatan No. 1, Cilacap',
            city: 'Cilacap',
            province: 'Jawa Tengah',
            postalCode: '53211',
            country: 'Indonesia'
          },
          responsiblePerson: 'Ahmad Suryanto',
          department: 'Operations',
          costCenter: 'CC-PROD-001'
        },
        category: {
          primary: 'Production Equipment',
          sub: 'Pumps & Compressors',
          type: 'Fixed Asset',
          classification: 'Critical'
        },
        criticality: 'High',
        riskLevel: 'Medium',
        complianceRequired: true,
        environmentalImpact: 'Medium Impact',
        safetyCategory: 'Safety Critical',
        tags: ['pump', 'centrifugal', 'crude-oil', 'production', 'critical'],
        maintenance: {
          required: true,
          type: 'Preventive',
          frequency: 'Monthly',
          frequencyValue: '1',
          frequencyUnit: 'months',
          lastDate: '2024-08-15',
          nextDate: '2024-09-15',
          estimatedDuration: '4',
          team: 'Mechanical Maintenance Team A',
          skillsRequired: ['Mechanical', 'Vibration Analysis', 'Alignment'],
          spareParts: ['Impeller', 'Mechanical Seal', 'Bearing Set', 'O-Ring Kit'],
          instructions: 'Check vibration levels, inspect mechanical seal, verify alignment, lubricate bearings',
          safetyPrecautions: 'Lock-out tag-out procedure, use proper PPE, ensure area ventilation',
          downtime: { planned: '4', estimated: '6' },
          cost: { estimated: '2500000', currency: 'IDR' }
        }
      },
      
      // Example 2: Safety Equipment - PPE
      {
        name: 'Safety Helmet MSA V-Gard',
        assetCode: 'PPE-HLM-2024-042',
        description: 'Type I industrial safety helmet with ratchet suspension',
        serialNumber: 'MSA-VG-24-10042',
        manufacturer: 'MSA Safety',
        model: 'V-Gard 500',
        status: 'Active',
        purchaseDate: '2024-03-10',
        warrantyExpiry: '2026-03-10',
        specifications: {
          dimensions: { length: '22', width: '16', height: '21', unit: 'cm' },
          weight: '0.35',
          weightUnit: 'kg',
          material: 'High-Density Polyethylene',
          color: 'Yellow',
          standards: 'ANSI/ISEA Z89.1-2014 Type I, Class E',
          additionalSpecs: 'Fas-Trac III Suspension, 4-point chin strap attachment'
        },
        location: {
          facility: 'Pertamina Refinery Balikpapan',
          building: 'Safety Equipment Storage',
          floor: '1st Floor',
          room: 'PPE Storage Room',
          zone: 'Safety Zone',
          coordinates: { latitude: '-1.2379', longitude: '116.8529' },
          address: {
            street: 'Jl. Yos Sudarso No. 1, Balikpapan',
            city: 'Balikpapan',
            province: 'Kalimantan Timur',
            postalCode: '76111',
            country: 'Indonesia'
          },
          responsiblePerson: 'Budi Santoso',
          department: 'HSE',
          costCenter: 'CC-HSE-002'
        },
        category: {
          primary: 'Safety Equipment',
          sub: 'Personal Protective Equipment',
          type: 'Consumable',
          classification: 'Standard'
        },
        criticality: 'Medium',
        riskLevel: 'Low',
        complianceRequired: true,
        environmentalImpact: 'Low Impact',
        safetyCategory: 'Standard Safety',
        tags: ['ppe', 'helmet', 'head-protection', 'safety', 'ansi-certified'],
        maintenance: {
          required: true,
          type: 'Inspection',
          frequency: 'Monthly',
          frequencyValue: '1',
          frequencyUnit: 'months',
          lastDate: '2024-08-01',
          nextDate: '2024-09-01',
          estimatedDuration: '0.5',
          team: 'HSE Team',
          skillsRequired: ['PPE Inspection'],
          spareParts: ['Suspension', 'Sweatband', 'Chin Strap'],
          instructions: 'Check for cracks, dents, or damage. Inspect suspension system. Verify certification date.',
          safetyPrecautions: 'None required',
          downtime: { planned: '0', estimated: '0' },
          cost: { estimated: '50000', currency: 'IDR' }
        }
      },
      
      // Example 3: IT & Telecommunications - Server
      {
        name: 'Dell PowerEdge R740 Server',
        assetCode: 'IT-SRV-2024-015',
        description: '2U rack server for enterprise applications',
        serialNumber: 'DELL-PE-R740-24015',
        manufacturer: 'Dell Technologies',
        model: 'PowerEdge R740',
        status: 'Active',
        purchaseDate: '2024-02-20',
        warrantyExpiry: '2027-02-20',
        specifications: {
          dimensions: { length: '70.8', width: '48.2', height: '8.7', unit: 'cm' },
          weight: '23.4',
          weightUnit: 'kg',
          powerRating: '750',
          powerUnit: 'W',
          voltage: '220',
          frequency: '50',
          operatingSystem: 'VMware ESXi 7.0',
          additionalSpecs: '2x Intel Xeon Gold 6248R, 384GB RAM, 8x 1.92TB SSD, Redundant Power Supply'
        },
        location: {
          facility: 'Pertamina Head Office Jakarta',
          building: 'Data Center Building',
          floor: '3rd Floor',
          room: 'Server Room A',
          zone: 'High Security Zone',
          coordinates: { latitude: '-6.2088', longitude: '106.8456' },
          address: {
            street: 'Jl. Medan Merdeka Timur No. 1A',
            city: 'Jakarta',
            province: 'DKI Jakarta',
            postalCode: '10110',
            country: 'Indonesia'
          },
          responsiblePerson: 'Dian Kusuma',
          department: 'IT Infrastructure',
          costCenter: 'CC-IT-003'
        },
        category: {
          primary: 'IT & Telecommunications',
          sub: 'Servers & Storage',
          type: 'Fixed Asset',
          classification: 'Critical'
        },
        criticality: 'Very High',
        riskLevel: 'High',
        complianceRequired: true,
        environmentalImpact: 'Low Impact',
        safetyCategory: 'Low Risk',
        tags: ['server', 'rack-mount', 'virtualization', 'enterprise', 'data-center'],
        maintenance: {
          required: true,
          type: 'Preventive',
          frequency: 'Quarterly',
          frequencyValue: '3',
          frequencyUnit: 'months',
          lastDate: '2024-07-20',
          nextDate: '2024-10-20',
          estimatedDuration: '2',
          team: 'IT Infrastructure Team',
          skillsRequired: ['Server Administration', 'Hardware Maintenance', 'VMware'],
          spareParts: ['Power Supply', 'Cooling Fans', 'Hard Drives'],
          instructions: 'Check system logs, update firmware, clean dust, verify cooling, test failover',
          safetyPrecautions: 'Ensure proper grounding, use ESD protection',
          downtime: { planned: '1', estimated: '2' },
          cost: { estimated: '1500000', currency: 'IDR' }
        }
      },
      
      // Example 4: Laboratory Equipment - Analyzer
      {
        name: 'Agilent 8890 GC System',
        assetCode: 'LAB-GC-2024-007',
        description: 'Gas chromatography system for hydrocarbon analysis',
        serialNumber: 'US12345678',
        manufacturer: 'Agilent Technologies',
        model: '8890 GC',
        status: 'Active',
        purchaseDate: '2024-04-05',
        warrantyExpiry: '2025-04-05',
        specifications: {
          dimensions: { length: '58', width: '49', height: '49', unit: 'cm' },
          weight: '50',
          weightUnit: 'kg',
          powerRating: '1200',
          powerUnit: 'W',
          voltage: '220',
          frequency: '50',
          additionalSpecs: 'FID & TCD detectors, 7693A Autosampler, OpenLab CDS Software'
        },
        location: {
          facility: 'Pertamina R&D Center',
          building: 'Laboratory Building',
          floor: '2nd Floor',
          room: 'Analytical Lab 3',
          zone: 'Controlled Access Zone',
          coordinates: { latitude: '-6.3723', longitude: '106.8249' },
          address: {
            street: 'Jl. Raya Bekasi KM 20, Pulogadung',
            city: 'Jakarta',
            province: 'DKI Jakarta',
            postalCode: '13920',
            country: 'Indonesia'
          },
          responsiblePerson: 'Dr. Ratna Dewi',
          department: 'R&D Analytics',
          costCenter: 'CC-RND-005'
        },
        category: {
          primary: 'Laboratory Equipment',
          sub: 'Analytical Instruments',
          type: 'Fixed Asset',
          classification: 'Important'
        },
        criticality: 'High',
        riskLevel: 'Medium',
        complianceRequired: true,
        environmentalImpact: 'Low Impact',
        safetyCategory: 'Standard Safety',
        tags: ['gc', 'analytical', 'laboratory', 'hydrocarbon-analysis', 'quality-control'],
        maintenance: {
          required: true,
          type: 'Preventive',
          frequency: 'Quarterly',
          frequencyValue: '3',
          frequencyUnit: 'months',
          lastDate: '2024-07-05',
          nextDate: '2024-10-05',
          estimatedDuration: '8',
          team: 'Lab Equipment Service Team',
          skillsRequired: ['GC Maintenance', 'Analytical Chemistry', 'Calibration'],
          spareParts: ['Column', 'Septa', 'Liner', 'O-rings', 'Detector parts'],
          instructions: 'Clean inlet, replace consumables, check gas flows, run performance verification',
          safetyPrecautions: 'Ensure gas lines are secure, wear gloves when handling chemicals',
          downtime: { planned: '8', estimated: '10' },
          cost: { estimated: '3500000', currency: 'IDR' }
        }
      },
      
      // Example 5: Electrical Equipment - Transformer
      {
        name: 'ABB Power Transformer',
        assetCode: 'ELEC-TRF-2024-003',
        description: 'Oil-immersed power transformer for main substation',
        serialNumber: 'ABB-PT-24003',
        manufacturer: 'ABB',
        model: 'TrafoStar 10MVA',
        status: 'Active',
        purchaseDate: '2024-01-30',
        warrantyExpiry: '2029-01-30',
        specifications: {
          dimensions: { length: '350', width: '250', height: '400', unit: 'cm' },
          weight: '12500',
          weightUnit: 'kg',
          powerRating: '10',
          powerUnit: 'MVA',
          voltage: '33/11',
          frequency: '50',
          additionalSpecs: 'ONAN/ONAF cooling, OLTC, Buchholz relay, oil temperature indicators'
        },
        location: {
          facility: 'Pertamina Refinery Dumai',
          building: 'Main Substation',
          floor: 'Ground Floor',
          room: 'Transformer Bay 3',
          zone: 'Electrical Zone',
          coordinates: { latitude: '1.6667', longitude: '101.4500' },
          address: {
            street: 'Jl. Raya Dumai-Pekanbaru KM 2',
            city: 'Dumai',
            province: 'Riau',
            postalCode: '28826',
            country: 'Indonesia'
          },
          responsiblePerson: 'Hendra Wijaya',
          department: 'Electrical Maintenance',
          costCenter: 'CC-ELEC-002'
        },
        category: {
          primary: 'Electrical Equipment',
          sub: 'Transformers',
          type: 'Fixed Asset',
          classification: 'Critical'
        },
        criticality: 'Very High',
        riskLevel: 'High',
        complianceRequired: true,
        environmentalImpact: 'Medium Impact',
        safetyCategory: 'Hazardous',
        tags: ['transformer', 'power-distribution', 'high-voltage', 'substation', 'critical'],
        maintenance: {
          required: true,
          type: 'Preventive',
          frequency: 'Yearly',
          frequencyValue: '1',
          frequencyUnit: 'years',
          lastDate: '2024-06-15',
          nextDate: '2025-06-15',
          estimatedDuration: '24',
          team: 'Electrical Maintenance Team',
          skillsRequired: ['High Voltage', 'Transformer Maintenance', 'Oil Testing'],
          spareParts: ['Transformer Oil', 'Gaskets', 'Silica Gel', 'Bushings'],
          instructions: 'Test oil quality, check bushings, inspect cooling system, verify protection devices',
          safetyPrecautions: 'Full lockout/tagout, authorized personnel only, use HV PPE',
          downtime: { planned: '24', estimated: '36' },
          cost: { estimated: '15000000', currency: 'IDR' }
        }
      }
    ];
    
    // Select a random example from the dummy assets
    const randomIndex = Math.floor(Math.random() * dummyAssets.length);
    const selectedDummyData = dummyAssets[randomIndex];
    
    // Add files to the selected dummy data
    selectedDummyData.files = {
      documents: [
        {
          id: Date.now() + 1,
          name: `${selectedDummyData.assetCode}_Manual.pdf`,
          size: 2048576,
          type: 'application/pdf',
          uploadedAt: new Date().toISOString(),
          status: 'completed'
        },
        {
          id: Date.now() + 2,
          name: 'Warranty_Certificate.pdf',
          size: 1024000,
          type: 'application/pdf',
          uploadedAt: new Date().toISOString(),
          status: 'completed'
        }
      ],
      images: [
        {
          id: Date.now() + 3,
          name: `${selectedDummyData.category.sub.toLowerCase().replace(/\s+/g, '_')}_image.jpg`,
          size: 3145728,
          type: 'image/jpeg',
          uploadedAt: new Date().toISOString(),
          status: 'completed'
        },
        {
          id: Date.now() + 4,
          name: 'nameplate_qr_code.png',
          size: 512000,
          type: 'image/png',
          uploadedAt: new Date().toISOString(),
          status: 'completed'
        }
      ]
    };
    
    // Add QR code data
    selectedDummyData.qrCode = {
      data: JSON.stringify({
        assetCode: selectedDummyData.assetCode,
        name: selectedDummyData.name,
        category: selectedDummyData.category.primary,
        location: {
          facility: selectedDummyData.location.facility,
          building: selectedDummyData.location.building,
          room: selectedDummyData.location.room
        },
        status: selectedDummyData.status.toLowerCase(),
        generatedAt: new Date().toISOString(),
        url: `${typeof window !== 'undefined' ? window.location.origin : ''}/assets/${selectedDummyData.assetCode}`
      }),
      size: 200,
      format: 'PNG',
      generatedAt: new Date().toISOString()
    };
    
    setFormData(selectedDummyData);
  }, [])

  const submitAsset = useCallback(async () => {
    if (!validateForm()) {
      return { success: false, message: 'Please fix validation errors' }
    }
    
    setLoading(true)
    
    try {
      // Transform form data to match API structure
      const assetData = {
        name: formData.name,
        assetCode: formData.assetCode,
        description: formData.description,
        serialNumber: formData.serialNumber,
        manufacturer: formData.manufacturer,
        model: formData.model,
        status: formData.status,
        purchaseDate: formData.purchaseDate,
        warrantyExpiry: formData.warrantyExpiry,
        category: formData.category,
        location: formData.location,
        specifications: formData.specifications,
        maintenance: formData.maintenance,
        criticality: formData.criticality,
        riskLevel: formData.riskLevel,
        tags: formData.tags
      }
      
      const result = await createAsset(assetData)
      
      if (result.success) {
        clearDraft()
        // Reset form
        setFormData({
          name: '',
          assetCode: '',
          description: '',
          serialNumber: '',
          manufacturer: '',
          model: '',
          status: 'Active',
          purchaseDate: '',
          warrantyExpiry: '',
          images: [],
          documents: [],
          specifications: {
            dimensions: { length: '', width: '', height: '', unit: 'cm' },
            weight: '',
            weightUnit: 'kg',
            powerRating: '',
            powerUnit: 'kW',
            voltage: '',
            frequency: '',
            capacity: '',
            capacityUnit: 'L',
            operatingTemp: { min: '', max: '' },
            pressure: '',
            pressureUnit: 'bar',
            additionalSpecs: ''
          },
          location: {
            facility: '',
            building: '',
            floor: '',
            room: '',
            zone: '',
            coordinates: { latitude: '', longitude: '' },
            address: {
              street: '',
              city: '',
              province: '',
              postalCode: '',
              country: 'Indonesia'
            },
            responsiblePerson: '',
            department: '',
            costCenter: ''
          },
          category: {
            primary: '',
            sub: '',
            type: '',
            classification: ''
          },
          criticality: '',
          riskLevel: '',
          complianceRequired: false,
          environmentalImpact: '',
          safetyCategory: '',
          tags: [],
          maintenance: {
            required: true,
            type: '',
            frequency: '',
            frequencyValue: '',
            frequencyUnit: 'days',
            lastDate: '',
            nextDate: '',
            estimatedDuration: '',
            team: '',
            skillsRequired: [],
            spareParts: [],
            instructions: '',
            safetyPrecautions: '',
            downtime: { planned: '', estimated: '' },
            cost: { estimated: '', currency: 'IDR' }
          }
        })
        setErrors({})
      }
      
      return result
    } catch (error) {
      return { success: false, message: 'Failed to register asset' }
    } finally {
      setLoading(false)
    }
  }, [formData, validateForm, clearDraft])

  const value = {
    formData,
    loading,
    errors,
    warnings,
    businessRules,
    isDraft,
    validationStatus,
    updateFormData,
    updateNestedFormData,
    updateFormDataByPath,
    saveDraft,
    loadDraft,
    clearDraft,
    populateDummyData,
    submitAsset,
    validateForm
  }

  return (
    <AssetRegistrationContext.Provider value={value}>
      {children}
    </AssetRegistrationContext.Provider>
  )
}

export default AssetRegistrationProvider
