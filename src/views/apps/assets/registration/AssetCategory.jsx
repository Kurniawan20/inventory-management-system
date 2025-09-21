'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'

// Hook Imports
import { useAssetRegistration } from './AssetRegistrationProvider'

const AssetCategory = ({ setActiveStep }) => {
  const { formData, updateFormData, updateNestedFormData, errors } = useAssetRegistration()
  
  console.log('AssetCategory formData:', formData)

  const handleChange = (field) => (event) => {
    const newValue = event.target.value
    console.log('AssetCategory handleChange:', field, newValue)
    
    // Map field names to the correct nested structure
    const fieldMapping = {
      'primaryCategory': 'primary',
      'subCategory': 'sub',
      'assetType': 'type',
      'classification': 'classification'
    }
    
    if (fieldMapping[field]) {
      console.log('Updating nested field:', 'category', fieldMapping[field], newValue)
      updateNestedFormData('category', fieldMapping[field], newValue)
      
      // Clear sub category when primary category changes
      if (field === 'primaryCategory') {
        console.log('Clearing sub category')
        updateNestedFormData('category', 'sub', '')
      }
    } else {
      console.log('Updating root field:', field, newValue)
      updateFormData(field, newValue)
    }
  }

  const handleAutocompleteChange = (field) => (event, value) => {
    const newValue = value
    console.log('AssetCategory handleAutocompleteChange:', field, newValue)
    updateFormData(field, newValue)
  }

  const handleSwitchChange = (field) => (event) => {
    updateFormData(field, event.target.checked)
  }

  // Category data based on Pertamina asset management
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

  const assetTypes = [
    'Fixed Asset',
    'Mobile Asset',
    'Consumable',
    'Tool & Equipment',
    'Infrastructure',
    'Software License',
    'Intangible Asset'
  ]

  const classifications = [
    'Critical',
    'Important',
    'Standard',
    'Non-Critical',
    'Spare Parts',
    'Consumable'
  ]

  const criticalityLevels = [
    'Very High',
    'High',
    'Medium',
    'Low',
    'Very Low'
  ]

  const riskLevels = [
    'Extreme',
    'High',
    'Medium',
    'Low',
    'Negligible'
  ]

  const environmentalImpacts = [
    'High Impact',
    'Medium Impact',
    'Low Impact',
    'No Impact',
    'Positive Impact'
  ]

  const safetyCategories = [
    'Hazardous',
    'Safety Critical',
    'Standard Safety',
    'Low Risk',
    'Non-Hazardous'
  ]

  const availableTags = [
    'Rotating Equipment',
    'Static Equipment',
    'Electrical',
    'Instrumentation',
    'Piping',
    'Structural',
    'HVAC',
    'Fire & Gas',
    'Process Critical',
    'Environmental',
    'High Pressure',
    'High Temperature',
    'Corrosive Service',
    'Explosion Proof',
    'Redundant System'
  ]

  return (
    <Card>
      <CardHeader
        title='Asset Category & Classification'
        subheader='Define the category, type, and classification of the asset'
      />
      <CardContent>
        <Grid container spacing={6}>
          {/* Primary Classification */}
          <Grid item xs={12}>
            <Typography variant='h6' className='mb-4'>
              Primary Classification
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Primary Category</InputLabel>
              <Select
                value={formData.category.primary}
                onChange={handleChange('primaryCategory')}
                label='Primary Category'
              >
                {primaryCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={!formData.category.primary}>
              <InputLabel>Sub Category</InputLabel>
              <Select
                value={formData.category.sub}
                onChange={handleChange('subCategory')}
                label='Sub Category'
              >
                {formData.category.primary && subCategories[formData.category.primary]?.map((subCat) => (
                  <MenuItem key={subCat} value={subCat}>
                    {subCat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Asset Type</InputLabel>
              <Select
                value={formData.category.type}
                onChange={handleChange('assetType')}
                label='Asset Type'
              >
                {assetTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Classification</InputLabel>
              <Select
                value={formData.category.classification}
                onChange={handleChange('classification')}
                label='Classification'
              >
                {classifications.map((classification) => (
                  <MenuItem key={classification} value={classification}>
                    {classification}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Risk & Criticality Assessment */}
          <Grid item xs={12}>
            <Typography variant='h6' className='mb-4'>
              Risk & Criticality Assessment
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Criticality Level</InputLabel>
              <Select
                value={formData.criticality}
                onChange={handleChange('criticality')}
                label='Criticality Level'
              >
                {criticalityLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    <Box className='flex items-center gap-2'>
                      <Box
                        className={`w-3 h-3 rounded-full ${
                          level === 'Very High' ? 'bg-red-500' :
                          level === 'High' ? 'bg-orange-500' :
                          level === 'Medium' ? 'bg-yellow-500' :
                          level === 'Low' ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                      />
                      {level}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Risk Level</InputLabel>
              <Select
                value={formData.riskLevel}
                onChange={handleChange('riskLevel')}
                label='Risk Level'
              >
                {riskLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    <Box className='flex items-center gap-2'>
                      <Box
                        className={`w-3 h-3 rounded-full ${
                          level === 'Extreme' ? 'bg-red-600' :
                          level === 'High' ? 'bg-red-400' :
                          level === 'Medium' ? 'bg-yellow-500' :
                          level === 'Low' ? 'bg-blue-400' : 'bg-green-500'
                        }`}
                      />
                      {level}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Safety & Environmental */}
          <Grid item xs={12}>
            <Typography variant='h6' className='mb-4'>
              Safety & Environmental
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Safety Category</InputLabel>
              <Select
                value={formData.safetyCategory}
                onChange={handleChange('safetyCategory')}
                label='Safety Category'
              >
                {safetyCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Environmental Impact</InputLabel>
              <Select
                value={formData.environmentalImpact}
                onChange={handleChange('environmentalImpact')}
                label='Environmental Impact'
              >
                {environmentalImpacts.map((impact) => (
                  <MenuItem key={impact} value={impact}>
                    {impact}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.complianceRequired}
                  onChange={handleSwitchChange('complianceRequired')}
                />
              }
              label='Compliance/Regulatory Requirements'
            />
          </Grid>

          {/* Tags */}
          <Grid item xs={12}>
            <Typography variant='h6' className='mb-4'>
              Asset Tags
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={availableTags}
              value={formData.tags}
              onChange={handleAutocompleteChange('tags')}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant='outlined'
                    label={option}
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Asset Tags'
                  placeholder='Select or add tags'
                  helperText='Tags help in searching and filtering assets'
                />
              )}
            />
          </Grid>

          {/* Category Summary */}
          {(formData.category.primary || formData.category.type) && (
            <Grid item xs={12}>
              <Box className='p-4 bg-blue-50 rounded-lg'>
                <Typography variant='subtitle2' className='mb-2'>
                  Category Summary:
                </Typography>
                <Box className='flex flex-wrap gap-2'>
                  {formData.category.primary && (
                    <Chip label={formData.category.primary} size='small' color='primary' />
                  )}
                  {formData.category.sub && (
                    <Chip label={formData.category.sub} size='small' color='secondary' />
                  )}
                  {formData.category.type && (
                    <Chip label={formData.category.type} size='small' />
                  )}
                  {formData.criticality && (
                    <Chip 
                      label={`Criticality: ${formData.criticality}`} 
                      size='small' 
                      color={
                        formData.criticality === 'Very High' ? 'error' :
                        formData.criticality === 'High' ? 'warning' :
                        formData.criticality === 'Medium' ? 'info' : 'success'
                      }
                    />
                  )}
                  {formData.complianceRequired && (
                    <Chip label='Compliance Required' size='small' color='warning' />
                  )}
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setActiveStep(1)}
          disabled={!formData.category?.primary || !formData.category?.sub}
          startIcon={<i className="ri-arrow-right-line" />}
        >
          Continue to Asset Details
        </Button>
      </Box>
    </Card>
  )
}

export default AssetCategory
