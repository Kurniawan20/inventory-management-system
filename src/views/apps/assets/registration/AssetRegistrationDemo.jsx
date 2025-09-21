'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'

// Server Action Imports
import { createAsset } from '@/server/actions/getAssetData'

const AssetRegistrationDemo = () => {
  const [formData, setFormData] = useState({
    name: '',
    assetCode: '',
    description: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    status: 'Active',
    purchaseDate: '',
    warrantyExpiry: '',
    facility: '',
    building: '',
    responsiblePerson: '',
    department: '',
    primaryCategory: '',
    criticality: '',
    maintenanceType: '',
    maintenanceFrequency: ''
  })

  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' })
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (event, value) => {
    const newValue = value !== undefined ? value : event.target.value
    setFormData(prev => ({
      ...prev,
      [field]: newValue
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Asset name is required'
    if (!formData.assetCode.trim()) newErrors.assetCode = 'Asset code is required'
    if (!formData.manufacturer.trim()) newErrors.manufacturer = 'Manufacturer is required'
    if (!formData.model.trim()) newErrors.model = 'Model is required'
    if (!formData.facility) newErrors.facility = 'Facility is required'
    if (!formData.responsiblePerson) newErrors.responsiblePerson = 'Responsible person is required'
    if (!formData.department) newErrors.department = 'Department is required'
    if (!formData.primaryCategory) newErrors.primaryCategory = 'Primary category is required'
    if (!formData.criticality) newErrors.criticality = 'Criticality level is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      setNotification({
        open: true,
        message: 'Please fix validation errors',
        severity: 'error'
      })
      return
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
        category: {
          primary: formData.primaryCategory,
          sub: '',
          type: 'Fixed Asset',
          classification: 'Standard'
        },
        location: {
          facility: formData.facility,
          building: formData.building,
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
          responsiblePerson: formData.responsiblePerson,
          department: formData.department,
          costCenter: ''
        },
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
        maintenance: {
          type: formData.maintenanceType,
          frequency: formData.maintenanceFrequency,
          lastDate: '',
          nextDate: '',
          team: '',
          estimatedCost: ''
        },
        criticality: formData.criticality,
        riskLevel: 'Medium',
        tags: []
      }
      
      const result = await createAsset(assetData)
      
      if (result.success) {
        setNotification({
          open: true,
          message: 'Asset registered successfully!',
          severity: 'success'
        })
        
        // Reset form
        setFormData({
          name: '',
          assetCode: '',
          description: '',
          manufacturer: '',
          model: '',
          serialNumber: '',
          status: 'Active',
          purchaseDate: '',
          warrantyExpiry: '',
          facility: '',
          building: '',
          responsiblePerson: '',
          department: '',
          primaryCategory: '',
          criticality: '',
          maintenanceType: '',
          maintenanceFrequency: ''
        })
        
        // Redirect to asset list after 2 seconds
        setTimeout(() => {
          window.location.href = '/en/apps/assets/list'
        }, 2000)
      } else {
        setNotification({
          open: true,
          message: result.message || 'Failed to register asset',
          severity: 'error'
        })
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'An error occurred while registering the asset',
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFillSample = () => {
    setFormData({
      name: 'Crude Oil Pump P-102B',
      assetCode: 'P-102B',
      description: 'Secondary crude oil transfer pump for distillation unit backup',
      manufacturer: 'KSB',
      model: 'Etanorm G 200-150-400',
      serialNumber: 'KSB-2024-002',
      status: 'Active',
      purchaseDate: '2024-03-15',
      warrantyExpiry: '2027-03-15',
      facility: 'Pertamina Refinery Cilacap',
      building: 'Main Processing Unit',
      responsiblePerson: 'Budi Santoso',
      department: 'Operations',
      primaryCategory: 'Production Equipment',
      criticality: 'High',
      maintenanceType: 'Preventive Maintenance',
      maintenanceFrequency: 'Monthly'
    })
  }

  const facilities = [
    'Pertamina Refinery Cilacap',
    'Pertamina Refinery Balikpapan',
    'Pertamina Refinery Dumai',
    'Pertamina Terminal Tanjung Priok',
    'Pertamina Office Jakarta'
  ]

  const buildings = [
    'Main Processing Unit',
    'Administration Building',
    'Warehouse A',
    'Warehouse B',
    'Maintenance Workshop',
    'Control Room Building'
  ]

  const departments = [
    'Operations',
    'Maintenance',
    'Engineering',
    'Safety & Environment',
    'Quality Control',
    'Administration'
  ]

  const responsiblePersons = [
    'Ahmad Suryanto',
    'Siti Nurhaliza',
    'Budi Santoso',
    'Dewi Kartika',
    'Eko Prasetyo',
    'Fitri Handayani'
  ]

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
    'Laboratory Equipment'
  ]

  const criticalityLevels = ['Very High', 'High', 'Medium', 'Low', 'Very Low']
  const maintenanceTypes = ['Preventive Maintenance', 'Predictive Maintenance', 'Corrective Maintenance', 'Routine Inspection']
  const maintenanceFrequencies = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Semi-Annual', 'Annual']

  return (
    <Grid container spacing={6}>
      {/* Header */}
      <Grid item xs={12}>
        <Box className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
          <div>
            <Typography variant='h4' className='mb-1'>
              Asset Registration Demo
            </Typography>
            <Typography>
              Simplified asset registration form with working functionality
            </Typography>
          </div>
          <div className='flex flex-wrap max-sm:flex-col gap-4'>
            <Button 
              variant='outlined' 
              color='secondary'
              onClick={handleFillSample}
              disabled={loading}
            >
              Fill Sample Data
            </Button>
            <Button 
              variant='contained'
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={16} /> : null}
            >
              Register Asset
            </Button>
          </div>
        </Box>
      </Grid>

      {/* Basic Information */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title='Basic Information' />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Asset Name'
                  value={formData.name}
                  onChange={handleChange('name')}
                  required
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Asset Code'
                  value={formData.assetCode}
                  onChange={handleChange('assetCode')}
                  required
                  error={!!errors.assetCode}
                  helperText={errors.assetCode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label='Description'
                  value={formData.description}
                  onChange={handleChange('description')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Manufacturer'
                  value={formData.manufacturer}
                  onChange={handleChange('manufacturer')}
                  required
                  error={!!errors.manufacturer}
                  helperText={errors.manufacturer}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Model'
                  value={formData.model}
                  onChange={handleChange('model')}
                  required
                  error={!!errors.model}
                  helperText={errors.model}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Serial Number'
                  value={formData.serialNumber}
                  onChange={handleChange('serialNumber')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={handleChange('status')}
                    label='Status'
                  >
                    <MenuItem value='Active'>Active</MenuItem>
                    <MenuItem value='Inactive'>Inactive</MenuItem>
                    <MenuItem value='Under Maintenance'>Under Maintenance</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='date'
                  label='Purchase Date'
                  value={formData.purchaseDate}
                  onChange={handleChange('purchaseDate')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='date'
                  label='Warranty Expiry'
                  value={formData.warrantyExpiry}
                  onChange={handleChange('warrantyExpiry')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Location & Category */}
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Location & Assignment' />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Autocomplete
                      options={facilities}
                      value={formData.facility}
                      onChange={handleChange('facility')}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          label='Facility' 
                          required
                          error={!!errors.facility}
                          helperText={errors.facility}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      options={buildings}
                      value={formData.building}
                      onChange={handleChange('building')}
                      renderInput={(params) => (
                        <TextField {...params} label='Building' />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      options={responsiblePersons}
                      value={formData.responsiblePerson}
                      onChange={handleChange('responsiblePerson')}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          label='Responsible Person' 
                          required
                          error={!!errors.responsiblePerson}
                          helperText={errors.responsiblePerson}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      options={departments}
                      value={formData.department}
                      onChange={handleChange('department')}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          label='Department' 
                          required
                          error={!!errors.department}
                          helperText={errors.department}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Category & Maintenance' />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Primary Category</InputLabel>
                      <Select
                        value={formData.primaryCategory}
                        onChange={handleChange('primaryCategory')}
                        label='Primary Category'
                        required
                        error={!!errors.primaryCategory}
                      >
                        {primaryCategories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.primaryCategory && (
                        <Typography variant='caption' color='error' className='ml-3 mt-1'>
                          {errors.primaryCategory}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Criticality</InputLabel>
                      <Select
                        value={formData.criticality}
                        onChange={handleChange('criticality')}
                        label='Criticality'
                        required
                        error={!!errors.criticality}
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
                      {errors.criticality && (
                        <Typography variant='caption' color='error' className='ml-3 mt-1'>
                          {errors.criticality}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Maintenance Type</InputLabel>
                      <Select
                        value={formData.maintenanceType}
                        onChange={handleChange('maintenanceType')}
                        label='Maintenance Type'
                      >
                        {maintenanceTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Maintenance Frequency</InputLabel>
                      <Select
                        value={formData.maintenanceFrequency}
                        onChange={handleChange('maintenanceFrequency')}
                        label='Maintenance Frequency'
                      >
                        {maintenanceFrequencies.map((freq) => (
                          <MenuItem key={freq} value={freq}>
                            {freq}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setNotification(prev => ({ ...prev, open: false }))} 
          severity={notification.severity}
          variant='filled'
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default AssetRegistrationDemo
