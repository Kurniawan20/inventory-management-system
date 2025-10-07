'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, pipe, nonEmpty, minLength } from 'valibot'

const schema = object({
  assetName: pipe(string(), nonEmpty('Asset name is required')),
  primaryCategory: pipe(string(), nonEmpty('Primary category is required')),
  subCategory: pipe(string(), nonEmpty('Sub category is required')),
  assetType: pipe(string(), nonEmpty('Asset type is required')),
  brand: pipe(string(), nonEmpty('Brand/Manufacturer is required')),
  model: pipe(string(), nonEmpty('Model/Specification is required')),
  quantity: pipe(string(), nonEmpty('Quantity is required')),
  unitPrice: pipe(string(), nonEmpty('Estimated unit price is required')),
  totalBudget: pipe(string(), nonEmpty('Total budget is required')),
  priority: pipe(string(), nonEmpty('Priority is required')),
  department: pipe(string(), nonEmpty('Department is required')),
  requestedFor: pipe(string(), nonEmpty('Requested for (person/project) is required')),
  location: pipe(string(), nonEmpty('Installation/Usage location is required')),
  supplier: string(),
  warrantyPeriod: string(),
  maintenanceRequirement: string(),
  justification: pipe(string(), nonEmpty('Justification is required'), minLength(20, 'Please provide detailed justification (minimum 20 characters)')),
  expectedDate: pipe(string(), nonEmpty('Expected date is required')),
  urgencyReason: string(),
  technicalSpecs: string(),
  complianceRequirements: string(),
  environmentalConsiderations: string()
})

const AssetRequestView = () => {
  const router = useRouter()
  
  // Define asset types array first
  const assetTypes = [
    'Fixed Asset',
    'Mobile Asset',
    'Consumable',
    'Tool & Equipment',
    'Infrastructure',
    'Software License',
    'Intangible Asset'
  ]

  // Mapping sub categories to appropriate asset types
  const subCategoryToAssetTypes = {
    // Production Equipment
    'Pumps & Compressors': ['Fixed Asset', 'Mobile Asset'],
    'Heat Exchangers': ['Fixed Asset'],
    'Reactors': ['Fixed Asset'],
    'Distillation Columns': ['Fixed Asset'],
    'Turbines': ['Fixed Asset'],
    'Generators': ['Fixed Asset', 'Mobile Asset'],
    'Motors': ['Fixed Asset', 'Mobile Asset'],
    'Mixers & Agitators': ['Fixed Asset'],
    'Separators': ['Fixed Asset'],
    'Filters & Strainers': ['Fixed Asset', 'Consumable'],
    'Pressure Vessels': ['Fixed Asset'],
    'Cooling Towers': ['Fixed Asset'],

    // Processing Units
    'Crude Distillation Unit': ['Fixed Asset'],
    'Catalytic Cracking Unit': ['Fixed Asset'],
    'Hydroprocessing Unit': ['Fixed Asset'],
    'Reforming Unit': ['Fixed Asset'],
    'Alkylation Unit': ['Fixed Asset'],
    'Isomerization Unit': ['Fixed Asset'],
    'Hydrotreating Unit': ['Fixed Asset'],
    'Coking Unit': ['Fixed Asset'],
    'Sulfur Recovery Unit': ['Fixed Asset'],
    'Hydrogen Production Unit': ['Fixed Asset'],
    'Amine Treatment Unit': ['Fixed Asset'],
    'Merox Treatment Unit': ['Fixed Asset'],

    // Storage & Tanks
    'Crude Oil Tanks': ['Fixed Asset'],
    'Product Storage Tanks': ['Fixed Asset'],
    'Chemical Storage': ['Fixed Asset'],
    'Gas Storage': ['Fixed Asset'],
    'Underground Storage': ['Fixed Asset'],
    'Floating Roof Tanks': ['Fixed Asset'],
    'Fixed Roof Tanks': ['Fixed Asset'],
    'Spherical Tanks': ['Fixed Asset'],
    'Horizontal Tanks': ['Fixed Asset'],
    'Day Tanks': ['Fixed Asset'],
    'Buffer Tanks': ['Fixed Asset'],
    'Cryogenic Storage': ['Fixed Asset'],

    // Transportation
    'Pipelines': ['Infrastructure'],
    'Tanker Trucks': ['Mobile Asset'],
    'Rail Cars': ['Mobile Asset'],
    'Marine Vessels': ['Mobile Asset'],
    'Conveyor Systems': ['Fixed Asset'],
    'Loading Arms': ['Fixed Asset'],
    'Metering Systems': ['Fixed Asset'],
    'Transfer Pumps': ['Fixed Asset', 'Mobile Asset'],
    'Valves & Actuators': ['Fixed Asset', 'Tool & Equipment'],
    'Pipeline Inspection Equipment': ['Tool & Equipment', 'Mobile Asset'],
    'Terminal Equipment': ['Fixed Asset'],
    'Jetty Equipment': ['Fixed Asset'],

    // Safety Equipment
    'Fire Protection Systems': ['Fixed Asset'],
    'Gas Detection Systems': ['Fixed Asset'],
    'Emergency Shutdown Systems': ['Fixed Asset'],
    'Personal Protective Equipment': ['Consumable', 'Tool & Equipment'],
    'Safety Valves': ['Fixed Asset', 'Tool & Equipment'],
    'Fire Extinguishers': ['Tool & Equipment', 'Mobile Asset'],
    'Safety Showers & Eyewash': ['Fixed Asset'],
    'Breathing Apparatus': ['Tool & Equipment'],
    'Fall Protection': ['Tool & Equipment'],
    'Confined Space Equipment': ['Tool & Equipment'],
    'Emergency Lighting': ['Fixed Asset'],
    'Evacuation Equipment': ['Tool & Equipment'],

    // IT & Telecommunications
    'Servers & Storage': ['Fixed Asset'],
    'Network Equipment': ['Fixed Asset'],
    'Workstations & Computers': ['Fixed Asset', 'Mobile Asset'],
    'Radio Communication Systems': ['Fixed Asset', 'Mobile Asset'],
    'Satellite Communication': ['Fixed Asset'],
    'PABX & Telephone Systems': ['Fixed Asset'],
    'CCTV & Surveillance': ['Fixed Asset'],
    'Access Control Systems': ['Fixed Asset'],
    'Industrial Control Systems': ['Fixed Asset'],
    'SCADA Equipment': ['Fixed Asset'],
    'Data Center Infrastructure': ['Infrastructure'],
    'Mobile Devices': ['Mobile Asset'],

    // Office Equipment
    'Furniture & Fixtures': ['Fixed Asset'],
    'Printers & Scanners': ['Fixed Asset'],
    'Photocopiers': ['Fixed Asset'],
    'Meeting Room Equipment': ['Fixed Asset'],
    'Audiovisual Systems': ['Fixed Asset'],
    'Office Appliances': ['Fixed Asset'],
    'Filing & Storage Systems': ['Fixed Asset'],
    'Mail Room Equipment': ['Fixed Asset'],
    'Security Systems': ['Fixed Asset'],
    'Time & Attendance Systems': ['Fixed Asset'],
    'Shredders & Disposal': ['Fixed Asset'],
    'Office Supplies': ['Consumable'],

    // Utilities
    'Power Generation': ['Fixed Asset'],
    'Power Distribution': ['Infrastructure'],
    'Water Treatment': ['Fixed Asset'],
    'Wastewater Treatment': ['Fixed Asset'],
    'Steam Generation': ['Fixed Asset'],
    'Compressed Air Systems': ['Fixed Asset'],
    'HVAC Systems': ['Fixed Asset'],
    'Cooling Water Systems': ['Fixed Asset'],
    'Fuel Gas Systems': ['Fixed Asset'],
    'Nitrogen Generation': ['Fixed Asset'],
    'Instrument Air Systems': ['Fixed Asset'],
    'Flare Systems': ['Fixed Asset'],

    // Maintenance Tools
    'Hand Tools': ['Tool & Equipment'],
    'Power Tools': ['Tool & Equipment'],
    'Calibration Equipment': ['Tool & Equipment'],
    'Welding Equipment': ['Tool & Equipment'],
    'Machining Tools': ['Tool & Equipment'],
    'Lifting Equipment': ['Tool & Equipment'],
    'Testing Equipment': ['Tool & Equipment'],
    'Alignment Tools': ['Tool & Equipment'],
    'Condition Monitoring': ['Tool & Equipment'],
    'Vibration Analysis': ['Tool & Equipment'],
    'Thermography Equipment': ['Tool & Equipment'],
    'Ultrasonic Testing': ['Tool & Equipment'],

    // Laboratory Equipment
    'Analytical Instruments': ['Fixed Asset'],
    'Sample Preparation': ['Fixed Asset', 'Tool & Equipment'],
    'Chromatography': ['Fixed Asset'],
    'Spectroscopy': ['Fixed Asset'],
    'Physical Testing': ['Fixed Asset', 'Tool & Equipment'],
    'Environmental Testing': ['Fixed Asset', 'Tool & Equipment'],
    'Calibration Standards': ['Tool & Equipment'],
    'Lab Furniture': ['Fixed Asset'],
    'Safety Equipment': ['Tool & Equipment', 'Fixed Asset'],
    'Storage & Refrigeration': ['Fixed Asset'],
    'Water Purification': ['Fixed Asset'],
    'Lab Automation': ['Fixed Asset'],

    // Electrical Equipment
    'Transformers': ['Fixed Asset'],
    'Switchgear': ['Fixed Asset'],
    'Motor Control Centers': ['Fixed Asset'],
    'UPS Systems': ['Fixed Asset'],
    'Generators & Alternators': ['Fixed Asset', 'Mobile Asset'],
    'Batteries & Chargers': ['Fixed Asset'],
    'Power Distribution Panels': ['Fixed Asset'],
    'Lighting Systems': ['Fixed Asset'],
    'Grounding Systems': ['Fixed Asset'],
    'Cathodic Protection': ['Fixed Asset'],
    'Variable Frequency Drives': ['Fixed Asset'],
    'Power Quality Monitoring': ['Fixed Asset', 'Tool & Equipment'],

    // Instrumentation
    'Pressure Instruments': ['Fixed Asset', 'Tool & Equipment'],
    'Temperature Instruments': ['Fixed Asset', 'Tool & Equipment'],
    'Flow Instruments': ['Fixed Asset', 'Tool & Equipment'],
    'Level Instruments': ['Fixed Asset', 'Tool & Equipment'],
    'Analytical Instruments': ['Fixed Asset'],
    'Control Valves': ['Fixed Asset'],
    'Programmable Logic Controllers': ['Fixed Asset'],
    'Distributed Control Systems': ['Fixed Asset'],
    'Field Transmitters': ['Fixed Asset'],
    'Signal Converters': ['Fixed Asset'],
    'Junction Boxes': ['Fixed Asset'],
    'Instrument Panels': ['Fixed Asset'],

    // Environmental Control
    'Emission Monitoring': ['Fixed Asset'],
    'Effluent Treatment': ['Fixed Asset'],
    'Spill Containment': ['Fixed Asset', 'Tool & Equipment'],
    'Waste Management': ['Fixed Asset', 'Tool & Equipment'],
    'Air Quality Control': ['Fixed Asset'],
    'Noise Control': ['Fixed Asset'],
    'Dust Suppression': ['Fixed Asset'],
    'VOC Recovery': ['Fixed Asset'],
    'Groundwater Monitoring': ['Fixed Asset', 'Tool & Equipment'],
    'Soil Remediation': ['Tool & Equipment'],
    'Environmental Sampling': ['Tool & Equipment'],
    'Meteorological Equipment': ['Fixed Asset'],

    // Facility Infrastructure
    'Buildings & Structures': ['Infrastructure'],
    'Roads & Pavements': ['Infrastructure'],
    'Fencing & Gates': ['Infrastructure'],
    'Drainage Systems': ['Infrastructure'],
    'Lighting Systems': ['Fixed Asset'],
    'HVAC Systems': ['Fixed Asset'],
    'Electrical Distribution': ['Infrastructure'],
    'Water Supply': ['Infrastructure'],
    'Sewage Systems': ['Infrastructure'],
    'Fire Protection': ['Fixed Asset'],
    'Security Systems': ['Fixed Asset'],
    'Landscaping': ['Infrastructure'],

    // Offshore Equipment
    'Drilling Equipment': ['Fixed Asset', 'Mobile Asset'],
    'Production Platforms': ['Infrastructure'],
    'Subsea Equipment': ['Fixed Asset'],
    'Floating Production Systems': ['Mobile Asset'],
    'Mooring Systems': ['Fixed Asset'],
    'Risers & Flowlines': ['Fixed Asset'],
    'Wellheads': ['Fixed Asset'],
    'Marine Loading Systems': ['Fixed Asset'],
    'Offshore Cranes': ['Fixed Asset'],
    'Helidecks': ['Infrastructure'],
    'Living Quarters': ['Infrastructure'],
    'Safety & Rescue Equipment': ['Tool & Equipment']
  }

  const [employeeId, setEmployeeId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [availableAssetTypes, setAvailableAssetTypes] = useState(assetTypes)

  // Update available asset types when sub category changes
  useEffect(() => {
    if (selectedSubCategory && subCategoryToAssetTypes[selectedSubCategory]) {
      setAvailableAssetTypes(subCategoryToAssetTypes[selectedSubCategory])
    } else {
      setAvailableAssetTypes(assetTypes)
    }
  }, [selectedSubCategory])

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      assetName: '',
      primaryCategory: '',
      subCategory: '',
      assetType: '',
      brand: '',
      model: '',
      quantity: '1',
      unitPrice: '',
      totalBudget: '',
      priority: '',
      department: '',
      requestedFor: '',
      location: '',
      supplier: '',
      warrantyPeriod: '',
      maintenanceRequirement: '',
      justification: '',
      expectedDate: '',
      urgencyReason: '',
      technicalSpecs: '',
      complianceRequirements: '',
      environmentalConsiderations: ''
    }
  })

  useEffect(() => {
    // Get employee ID from session storage
    const storedEmployeeId = sessionStorage.getItem('shortcutEmployeeId')
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId)
    }
  }, [])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Asset Request Submitted:', {
        ...data,
        employeeId,
        requestDate: new Date().toISOString()
      })
      
      // Store submission data in sessionStorage for success page
      sessionStorage.setItem('lastAssetRequest', JSON.stringify({
        ...data,
        employeeId,
        requestDate: new Date().toISOString(),
        requestId: 'REQ-' + Date.now().toString().slice(-8)
      }))
      
      // Redirect to success page
      router.push('/front-pages/shortcuts/assets/request/success')
      
    } catch (error) {
      console.error('Error submitting request:', error)
      // Show error message instead of redirecting
      setSubmitSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateDummyData = () => {
    const dummyDataTemplates = [
      {
        assetName: 'Centrifugal Pump Model CP-2500',
        primaryCategory: 'Production Equipment',
        subCategory: 'Pumps & Compressors',
        assetType: 'Fixed Asset',
        brand: 'Grundfos',
        model: 'CR 64-2-2 A-F-A-E-HQQE',
        quantity: '2',
        unitPrice: '85000000',
        totalBudget: '170000000',
        priority: 'high',
        department: 'Operations',
        requestedFor: 'Refinery Unit 2 Upgrade Project',
        location: 'Refinery - Cilacap',
        supplier: 'PT Grundfos Pompa Indonesia',
        warrantyPeriod: '2 years',
        maintenanceRequirement: 'Quarterly inspection and annual overhaul',
        justification: 'Current pump is experiencing frequent breakdowns causing production delays. New pump will improve reliability and reduce maintenance costs by 30%. Critical for maintaining production targets.',
        expectedDate: '2024-12-15',
        urgencyReason: 'Production line shutdown risk if current pump fails completely',
        technicalSpecs: 'Flow rate: 250 m³/h, Head: 120 m, Power: 75 kW, Material: Stainless Steel 316L, Temperature range: -20°C to +120°C',
        complianceRequirements: 'API 610 standard, ATEX certification for hazardous area, ISO 9001 quality certification',
        environmentalConsiderations: 'Energy efficient design with IE3 motor, reduced noise levels <85dB, recyclable materials'
      },
      {
        assetName: 'Industrial Safety Gas Detector System',
        primaryCategory: 'Safety Equipment',
        subCategory: 'Gas Detection Systems',
        assetType: 'Fixed Asset',
        brand: 'Honeywell',
        model: 'Sensepoint XCD RTD',
        quantity: '15',
        unitPrice: '12500000',
        totalBudget: '187500000',
        priority: 'urgent',
        department: 'Security',
        requestedFor: 'Plant Safety Upgrade Initiative',
        location: 'Refinery - Balikpapan',
        supplier: 'PT Honeywell Indonesia',
        warrantyPeriod: '3 years',
        maintenanceRequirement: 'Monthly calibration and sensor replacement every 2 years',
        justification: 'Mandatory safety upgrade required by regulatory compliance. Current system is outdated and does not meet new safety standards. Will prevent potential gas leak incidents and ensure worker safety.',
        expectedDate: '2024-11-30',
        urgencyReason: 'Regulatory deadline approaching, non-compliance will result in operational shutdown',
        technicalSpecs: 'Detection range: 0-100% LEL, Response time: <30 seconds, Operating temp: -40°C to +75°C, IP66 rating, 4-20mA output',
        complianceRequirements: 'SIL 2 certified, ATEX Zone 1 approval, IECEx certification, local regulatory compliance',
        environmentalConsiderations: 'Low power consumption, RoHS compliant, minimal environmental impact during operation'
      },
      {
        assetName: 'High-Performance Workstation for Engineering',
        primaryCategory: 'IT & Telecommunications',
        subCategory: 'Workstations & Computers',
        assetType: 'Fixed Asset',
        brand: 'Dell',
        model: 'Precision 7760 Mobile Workstation',
        quantity: '5',
        unitPrice: '45000000',
        totalBudget: '225000000',
        priority: 'medium',
        department: 'IT & Technology',
        requestedFor: 'CAD Design Team Upgrade',
        location: 'Head Office - Jakarta',
        supplier: 'PT Dell Indonesia',
        warrantyPeriod: '3 years',
        maintenanceRequirement: 'Annual hardware check and software updates',
        justification: 'Current workstations are 5 years old and cannot handle new CAD software requirements. New workstations will improve design productivity by 40% and support latest engineering applications.',
        expectedDate: '2025-01-31',
        urgencyReason: '',
        technicalSpecs: 'Intel Core i9-11950H, 32GB DDR4 RAM, 1TB NVMe SSD, NVIDIA RTX A4000 8GB, 17.3" 4K display, Windows 11 Pro',
        complianceRequirements: 'Energy Star certified, EPEAT Gold rating, corporate security standards compliance',
        environmentalConsiderations: 'Energy efficient components, recyclable packaging, EPEAT environmental certification'
      }
    ]

    // Randomly select one template
    const template = dummyDataTemplates[Math.floor(Math.random() * dummyDataTemplates.length)]
    
    // Set all form values
    Object.keys(template).forEach(key => {
      setValue(key, template[key])
    })

    // Update state variables for dependent dropdowns
    setSelectedPrimaryCategory(template.primaryCategory)
    setSelectedSubCategory(template.subCategory)
    
    // Update available asset types based on selected sub category
    if (subCategoryToAssetTypes[template.subCategory]) {
      setAvailableAssetTypes(subCategoryToAssetTypes[template.subCategory])
    }
  }

  // Category data from asset registration form
  const primaryCategories = [
    'Production Equipment',
    'Processing Units',
    'Storage & Tanks',
    'Transportation',
    'Safety Equipment',
    'IT & Telecommunications',
    'Office Equipment',
    'Utilities',
    'Maintenance Tools',
    'Laboratory Equipment',
    'Electrical Equipment',
    'Instrumentation',
    'Environmental Control',
    'Facility Infrastructure',
    'Offshore Equipment'
  ]

  const subCategories = {
    'Production Equipment': [
      'Pumps & Compressors',
      'Heat Exchangers',
      'Reactors',
      'Distillation Columns',
      'Turbines',
      'Generators',
      'Motors',
      'Mixers & Agitators',
      'Separators',
      'Filters & Strainers',
      'Pressure Vessels',
      'Cooling Towers'
    ],
    'Processing Units': [
      'Crude Distillation Unit',
      'Catalytic Cracking Unit',
      'Hydroprocessing Unit',
      'Reforming Unit',
      'Alkylation Unit',
      'Isomerization Unit',
      'Hydrotreating Unit',
      'Coking Unit',
      'Sulfur Recovery Unit',
      'Hydrogen Production Unit',
      'Amine Treatment Unit',
      'Merox Treatment Unit'
    ],
    'Storage & Tanks': [
      'Crude Oil Tanks',
      'Product Storage Tanks',
      'Chemical Storage',
      'Gas Storage',
      'Underground Storage',
      'Floating Roof Tanks',
      'Fixed Roof Tanks',
      'Spherical Tanks',
      'Horizontal Tanks',
      'Day Tanks',
      'Buffer Tanks',
      'Cryogenic Storage'
    ],
    'Transportation': [
      'Pipelines',
      'Tanker Trucks',
      'Rail Cars',
      'Marine Vessels',
      'Conveyor Systems',
      'Loading Arms',
      'Metering Systems',
      'Transfer Pumps',
      'Valves & Actuators',
      'Pipeline Inspection Equipment',
      'Terminal Equipment',
      'Jetty Equipment'
    ],
    'Safety Equipment': [
      'Fire Protection Systems',
      'Gas Detection Systems',
      'Emergency Shutdown Systems',
      'Personal Protective Equipment',
      'Safety Valves',
      'Fire Extinguishers',
      'Safety Showers & Eyewash',
      'Breathing Apparatus',
      'Fall Protection',
      'Confined Space Equipment',
      'Emergency Lighting',
      'Evacuation Equipment'
    ],
    'IT & Telecommunications': [
      'Servers & Storage',
      'Network Equipment',
      'Workstations & Computers',
      'Radio Communication Systems',
      'Satellite Communication',
      'PABX & Telephone Systems',
      'CCTV & Surveillance',
      'Access Control Systems',
      'Industrial Control Systems',
      'SCADA Equipment',
      'Data Center Infrastructure',
      'Mobile Devices'
    ],
    'Office Equipment': [
      'Furniture & Fixtures',
      'Printers & Scanners',
      'Photocopiers',
      'Meeting Room Equipment',
      'Audiovisual Systems',
      'Office Appliances',
      'Filing & Storage Systems',
      'Mail Room Equipment',
      'Security Systems',
      'Time & Attendance Systems',
      'Shredders & Disposal',
      'Office Supplies'
    ],
    'Utilities': [
      'Power Generation',
      'Power Distribution',
      'Water Treatment',
      'Wastewater Treatment',
      'Steam Generation',
      'Compressed Air Systems',
      'HVAC Systems',
      'Cooling Water Systems',
      'Fuel Gas Systems',
      'Nitrogen Generation',
      'Instrument Air Systems',
      'Flare Systems'
    ],
    'Maintenance Tools': [
      'Hand Tools',
      'Power Tools',
      'Calibration Equipment',
      'Welding Equipment',
      'Machining Tools',
      'Lifting Equipment',
      'Testing Equipment',
      'Alignment Tools',
      'Condition Monitoring',
      'Vibration Analysis',
      'Thermography Equipment',
      'Ultrasonic Testing'
    ],
    'Laboratory Equipment': [
      'Analytical Instruments',
      'Sample Preparation',
      'Chromatography',
      'Spectroscopy',
      'Physical Testing',
      'Environmental Testing',
      'Calibration Standards',
      'Lab Furniture',
      'Safety Equipment',
      'Storage & Refrigeration',
      'Water Purification',
      'Lab Automation'
    ],
    'Electrical Equipment': [
      'Transformers',
      'Switchgear',
      'Motor Control Centers',
      'UPS Systems',
      'Generators & Alternators',
      'Batteries & Chargers',
      'Power Distribution Panels',
      'Lighting Systems',
      'Grounding Systems',
      'Cathodic Protection',
      'Variable Frequency Drives',
      'Power Quality Monitoring'
    ],
    'Instrumentation': [
      'Pressure Instruments',
      'Temperature Instruments',
      'Flow Instruments',
      'Level Instruments',
      'Analytical Instruments',
      'Control Valves',
      'Programmable Logic Controllers',
      'Distributed Control Systems',
      'Field Transmitters',
      'Signal Converters',
      'Junction Boxes',
      'Instrument Panels'
    ],
    'Environmental Control': [
      'Emission Monitoring',
      'Effluent Treatment',
      'Spill Containment',
      'Waste Management',
      'Air Quality Control',
      'Noise Control',
      'Dust Suppression',
      'VOC Recovery',
      'Groundwater Monitoring',
      'Soil Remediation',
      'Environmental Sampling',
      'Meteorological Equipment'
    ],
    'Facility Infrastructure': [
      'Buildings & Structures',
      'Roads & Pavements',
      'Fencing & Gates',
      'Drainage Systems',
      'Lighting Systems',
      'HVAC Systems',
      'Electrical Distribution',
      'Water Supply',
      'Sewage Systems',
      'Fire Protection',
      'Security Systems',
      'Landscaping'
    ],
    'Offshore Equipment': [
      'Drilling Equipment',
      'Production Platforms',
      'Subsea Equipment',
      'Floating Production Systems',
      'Mooring Systems',
      'Risers & Flowlines',
      'Wellheads',
      'Marine Loading Systems',
      'Offshore Cranes',
      'Helidecks',
      'Living Quarters',
      'Safety & Rescue Equipment'
    ]
  }

  const locations = [
    'Head Office - Jakarta',
    'Refinery - Cilacap',
    'Refinery - Balikpapan',
    'Terminal - Tanjung Priok',
    'Terminal - Belawan',
    'Depot - Surabaya',
    'Depot - Makassar',
    'Field Office - Pekanbaru',
    'Training Center - Cepu',
    'Other Location'
  ]

  const warrantyPeriods = [
    '6 months',
    '1 year',
    '2 years',
    '3 years',
    '5 years',
    'Lifetime',
    'No warranty'
  ]

  const priorities = [
    { value: 'low', label: 'Low', color: 'success' },
    { value: 'medium', label: 'Medium', color: 'warning' },
    { value: 'high', label: 'High', color: 'error' },
    { value: 'urgent', label: 'Urgent', color: 'error' }
  ]

  const departments = [
    'Human Resources',
    'Finance & Accounting',
    'Operations',
    'IT & Technology',
    'Marketing & Sales',
    'Procurement',
    'Maintenance',
    'Security',
    'Administration'
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box className='flex items-center gap-2'>
                <i className='ri-file-add-line text-2xl' />
                <Typography variant='h5'>Asset Request Form</Typography>
              </Box>
            }
            subheader={
              <Box className='flex items-center gap-2 mt-2'>
                <Typography variant='body2' color='text.secondary'>
                  Submit a request for new assets or equipment
                </Typography>
                {employeeId && (
                  <Chip 
                    label={`Employee ID: ${employeeId}`} 
                    size='small' 
                    color='primary' 
                    variant='outlined'
                  />
                )}
              </Box>
            }
          />
          <Divider />
          <CardContent>
            {submitSuccess && (
              <Alert severity='success' className='mb-6'>
                <Typography variant='body2'>
                  Asset request submitted successfully! Your request will be reviewed by the procurement team.
                </Typography>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                {/* Basic Asset Information */}
                <Grid item xs={12}>
                  <Typography variant='h6' className='mb-4 text-primary'>
                    <i className='ri-information-line mr-2' />
                    Basic Asset Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='assetName'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Asset Name *'
                        placeholder='Enter asset name or model'
                        error={!!errors.assetName}
                        helperText={errors.assetName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='primaryCategory'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.primaryCategory}>
                        <InputLabel>Primary Category *</InputLabel>
                        <Select 
                          {...field} 
                          label='Primary Category *'
                          onChange={(e) => {
                            field.onChange(e)
                            setSelectedPrimaryCategory(e.target.value)
                            // Reset sub category when primary changes
                            control._formValues.subCategory = ''
                          }}
                        >
                          {primaryCategories.map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.primaryCategory && (
                          <Typography variant='caption' color='error' className='ml-3 mt-1'>
                            {errors.primaryCategory.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='subCategory'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.subCategory} disabled={!selectedPrimaryCategory}>
                        <InputLabel>Sub Category *</InputLabel>
                        <Select 
                          {...field} 
                          label='Sub Category *'
                          onChange={(e) => {
                            field.onChange(e)
                            setSelectedSubCategory(e.target.value)
                            // Reset asset type when sub category changes
                            control._formValues.assetType = ''
                          }}
                        >
                          {selectedPrimaryCategory && subCategories[selectedPrimaryCategory]?.map((subCat) => (
                            <MenuItem key={subCat} value={subCat}>
                              {subCat}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.subCategory && (
                          <Typography variant='caption' color='error' className='ml-3 mt-1'>
                            {errors.subCategory.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='assetType'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.assetType} disabled={!selectedSubCategory}>
                        <InputLabel>Asset Type *</InputLabel>
                        <Select {...field} label='Asset Type *'>
                          {availableAssetTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.assetType && (
                          <Typography variant='caption' color='error' className='ml-3 mt-1'>
                            {errors.assetType.message}
                          </Typography>
                        )}
                        {selectedSubCategory && (
                          <Typography variant='caption' color='text.secondary' className='ml-3 mt-1'>
                            Available types for {selectedSubCategory}: {availableAssetTypes.join(', ')}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='brand'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Brand/Manufacturer *'
                        placeholder='Enter brand or manufacturer name'
                        error={!!errors.brand}
                        helperText={errors.brand?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='model'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Model/Specification *'
                        placeholder='Enter model number or specifications'
                        error={!!errors.model}
                        helperText={errors.model?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='quantity'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type='number'
                        label='Quantity *'
                        inputProps={{ min: 1 }}
                        error={!!errors.quantity}
                        helperText={errors.quantity?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Financial Information */}
                <Grid item xs={12}>
                  <Divider className='my-4' />
                  <Typography variant='h6' className='mb-4 text-primary'>
                    <i className='ri-money-dollar-circle-line mr-2' />
                    Financial Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='unitPrice'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type='number'
                        label='Estimated Unit Price (IDR) *'
                        placeholder='Enter price per unit'
                        InputProps={{
                          startAdornment: <Typography className='mr-2'>Rp</Typography>
                        }}
                        error={!!errors.unitPrice}
                        helperText={errors.unitPrice?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='totalBudget'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type='number'
                        label='Total Budget (IDR) *'
                        placeholder='Enter total budget required'
                        InputProps={{
                          startAdornment: <Typography className='mr-2'>Rp</Typography>
                        }}
                        error={!!errors.totalBudget}
                        helperText={errors.totalBudget?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='supplier'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Preferred Supplier (Optional)'
                        placeholder='Enter preferred supplier name'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='warrantyPeriod'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Warranty Period</InputLabel>
                        <Select {...field} label='Warranty Period'>
                          {warrantyPeriods.map((period) => (
                            <MenuItem key={period} value={period}>
                              {period}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Request Details */}
                <Grid item xs={12}>
                  <Divider className='my-4' />
                  <Typography variant='h6' className='mb-4 text-primary'>
                    <i className='ri-file-text-line mr-2' />
                    Request Details
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='priority'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.priority}>
                        <InputLabel>Priority Level *</InputLabel>
                        <Select {...field} label='Priority Level *'>
                          {priorities.map((priority) => (
                            <MenuItem key={priority.value} value={priority.value}>
                              <Box className='flex items-center gap-2'>
                                <Chip 
                                  label={priority.label} 
                                  size='small' 
                                  color={priority.color}
                                  variant='outlined'
                                />
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.priority && (
                          <Typography variant='caption' color='error' className='ml-3 mt-1'>
                            {errors.priority.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='department'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.department}>
                        <InputLabel>Department *</InputLabel>
                        <Select {...field} label='Department *'>
                          {departments.map((dept) => (
                            <MenuItem key={dept} value={dept}>
                              {dept}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.department && (
                          <Typography variant='caption' color='error' className='ml-3 mt-1'>
                            {errors.department.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='requestedFor'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Requested For *'
                        placeholder='Person name or project name'
                        error={!!errors.requestedFor}
                        helperText={errors.requestedFor?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='location'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.location}>
                        <InputLabel>Installation/Usage Location *</InputLabel>
                        <Select {...field} label='Installation/Usage Location *'>
                          {locations.map((location) => (
                            <MenuItem key={location} value={location}>
                              {location}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.location && (
                          <Typography variant='caption' color='error' className='ml-3 mt-1'>
                            {errors.location.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='expectedDate'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type='date'
                        label='Expected Delivery Date *'
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: new Date().toISOString().split('T')[0] }}
                        error={!!errors.expectedDate}
                        helperText={errors.expectedDate?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='maintenanceRequirement'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Maintenance Requirement'
                        placeholder='Special maintenance needs'
                        multiline
                        rows={2}
                      />
                    )}
                  />
                </Grid>

                {/* Additional Information */}
                <Grid item xs={12}>
                  <Divider className='my-4' />
                  <Typography variant='h6' className='mb-4 text-primary'>
                    <i className='ri-file-list-3-line mr-2' />
                    Additional Information
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='justification'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={4}
                        label='Business Justification *'
                        placeholder='Please provide detailed justification for this asset request (minimum 20 characters)...'
                        error={!!errors.justification}
                        helperText={errors.justification?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='urgencyReason'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={3}
                        label='Urgency Reason (if applicable)'
                        placeholder='Explain why this request is urgent'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='technicalSpecs'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={3}
                        label='Technical Specifications'
                        placeholder='Detailed technical requirements'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='complianceRequirements'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={3}
                        label='Compliance Requirements'
                        placeholder='Safety, regulatory, or certification requirements'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='environmentalConsiderations'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={3}
                        label='Environmental Considerations'
                        placeholder='Environmental impact or sustainability considerations'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box className='flex gap-4 justify-between'>
                    <Button
                      variant='outlined'
                      color='info'
                      onClick={generateDummyData}
                      disabled={isSubmitting}
                      startIcon={<i className='ri-magic-line' />}
                    >
                      Generate Dummy Data
                    </Button>
                    <Box className='flex gap-4'>
                      <Button
                        variant='outlined'
                        color='secondary'
                        onClick={() => reset()}
                        disabled={isSubmitting}
                      >
                        Reset Form
                      </Button>
                      <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={isSubmitting}
                        startIcon={
                          isSubmitting ? 
                          <i className='ri-loader-line animate-spin' /> : 
                          <i className='ri-send-plane-line' />
                        }
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AssetRequestView
