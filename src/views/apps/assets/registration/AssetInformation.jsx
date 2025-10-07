'use client'

// React Imports
import { useState, useEffect } from 'react'

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
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Autocomplete from '@mui/material/Autocomplete'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

// Hook Imports
import { useAssetRegistration } from './AssetRegistrationProvider'

// Server Actions
import { getVendorList } from '@/server/actions/getVendorData'

// Utils
import { isFieldVisible } from '../../../../utils/categoryFieldsConfig'

const AssetInformation = () => {
  const { formData, updateFormData, errors } = useAssetRegistration()
  const [isGeneratingCode, setIsGeneratingCode] = useState(false)
  const [isValidatingCode, setIsValidatingCode] = useState(false)
  const [vendors, setVendors] = useState([])
  const [loadingVendors, setLoadingVendors] = useState(false)
  const [codeValidationStatus, setCodeValidationStatus] = useState(null) // 'available', 'taken', 'error'

  // Load vendors on component mount
  useEffect(() => {
    const loadVendors = async () => {
      try {
        setLoadingVendors(true)
        const result = await getVendorList()
        setVendors(result.vendors || [])
      } catch (error) {
        console.error('Error loading vendors:', error)
      } finally {
        setLoadingVendors(false)
      }
    }
    
    loadVendors()
  }, [])

  const handleChange = (field) => (event) => {
    const value = event.target.value
    updateFormData(field, value)
    
    // Validate asset code in real-time
    if (field === 'assetCode' && value.trim()) {
      validateAssetCode(value.trim())
    } else if (field === 'assetCode') {
      setCodeValidationStatus(null)
    }
  }

  // Simulate asset code validation against existing assets
  const validateAssetCode = async (code) => {
    if (!code || code.length < 3) {
      setCodeValidationStatus(null)
      return
    }

    setIsValidatingCode(true)
    setCodeValidationStatus(null)

    try {
      // Simulate API call to check for duplicate asset codes
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock existing asset codes for demonstration
      const existingCodes = [
        'PROD-2024-0001',
        'MAINT-2024-0001', 
        'LAB-2024-0001',
        'EQ-2024-001',
        'PUMP-001',
        'GEN-2024-0001'
      ]
      
      const isDuplicate = existingCodes.includes(code.toUpperCase())
      setCodeValidationStatus(isDuplicate ? 'taken' : 'available')
      
    } catch (error) {
      console.error('Asset code validation error:', error)
      setCodeValidationStatus('error')
    } finally {
      setIsValidatingCode(false)
    }
  }

  const generateAssetCode = async () => {
    setIsGeneratingCode(true)
    
    // Generate asset code based on category and current year
    const year = new Date().getFullYear()
    const category = formData.category?.primary || 'GEN'
    
    // Create category prefix
    const categoryPrefix = {
      'Production Equipment': 'PROD',
      'Processing Units': 'PROC',
      'Storage & Tanks': 'TANK',
      'Transportation': 'TRAN',
      'Safety Equipment': 'SAFE',
      'IT & Telecommunications': 'IT',
      'Office Equipment': 'OFF',
      'Utilities': 'UTIL',
      'Maintenance Tools': 'MAINT',
      'Laboratory Equipment': 'LAB'
    }[category] || 'GEN'
    
    // Generate sequential number (in real app, this would check database)
    const randomNum = Math.floor(Math.random() * 9999) + 1
    const paddedNum = randomNum.toString().padStart(4, '0')
    
    const generatedCode = `${categoryPrefix}-${year}-${paddedNum}`
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    updateFormData('assetCode', generatedCode)
    setIsGeneratingCode(false)
    
    // Validate the generated code
    validateAssetCode(generatedCode)
  }

  const statusOptions = [
    { value: 'active', label: 'Active', color: 'success' },
    { value: 'inactive', label: 'Inactive', color: 'default' },
    { value: 'maintenance', label: 'Under Maintenance', color: 'warning' },
    { value: 'disposed', label: 'Disposed', color: 'error' }
  ]

  // Check if a field should be displayed based on category
  const shouldDisplayField = (fieldName) => {
    const primaryCategory = formData.category?.primary || ''
    const subCategory = formData.category?.sub || ''
    
    // Always show basic fields
    const alwaysVisibleFields = ['name', 'assetCode', 'description', 'status', 'warrantyExpiry']
    if (alwaysVisibleFields.includes(fieldName)) return true
    
    return isFieldVisible(fieldName, primaryCategory, subCategory)
  }
  
  // Render category-specific fields for PPE (Personal Protective Equipment)
  const renderPPEFields = () => {
    const isPPE = formData.category?.sub === 'Personal Protective Equipment'
    
    if (!isPPE) return null
    
    return (
      <>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
            PPE Specific Information
          </Typography>
          <Divider sx={{ mb: 4 }} />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Size'
            placeholder={formData.specifications?.size ? '' : 'e.g., 42 EU / 8 US, Large'}
            value={formData.specifications?.size || ''}
            onChange={(e) => updateFormData('specifications.size', e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Material'
            placeholder={formData.specifications?.material ? '' : 'e.g., Leather, HDPE, Nylon'}
            value={formData.specifications?.material || ''}
            onChange={(e) => updateFormData('specifications.material', e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Color'
            placeholder={formData.specifications?.color ? '' : 'e.g., Yellow, Blue, Black'}
            value={formData.specifications?.color || ''}
            onChange={(e) => updateFormData('specifications.color', e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Safety Standards'
            placeholder={formData.specifications?.standards ? '' : 'e.g., EN ISO 20345:2011, ANSI Z89.1'}
            value={formData.specifications?.standards || ''}
            onChange={(e) => updateFormData('specifications.standards', e.target.value)}
          />
        </Grid>
      </>
    )
  }
  
  // Render category-specific fields for Pumps & Compressors
  const renderPumpFields = () => {
    const isPump = formData.category?.sub === 'Pumps & Compressors'
    
    if (!isPump) return null
    
    return (
      <>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
            Pump & Compressor Specifications
          </Typography>
          <Divider sx={{ mb: 4 }} />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Flow Rate'
            placeholder={formData.specifications?.flowRate ? '' : 'e.g., 500 L/min'}
            value={formData.specifications?.flowRate || ''}
            onChange={(e) => updateFormData('specifications.flowRate', e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Pressure'
            placeholder={formData.specifications?.pressure ? '' : 'e.g., 16 bar'}
            value={formData.specifications?.pressure || ''}
            onChange={(e) => updateFormData('specifications.pressure', e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='RPM'
            placeholder={formData.specifications?.rpm ? '' : 'e.g., 1450 rpm'}
            value={formData.specifications?.rpm || ''}
            onChange={(e) => updateFormData('specifications.rpm', e.target.value)}
          />
        </Grid>
      </>
    )
  }
  
  // Render category-specific fields for IT Equipment
  const renderITFields = () => {
    const isIT = formData.category?.primary === 'IT & Telecommunications'
    
    if (!isIT) return null
    
    return (
      <>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
            IT & Telecommunications Details
          </Typography>
          <Divider sx={{ mb: 4 }} />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='MAC Address'
            placeholder={formData.macAddress ? '' : 'e.g., 00:1A:2B:3C:4D:5E'}
            value={formData.macAddress || ''}
            onChange={(e) => updateFormData('macAddress', e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='IP Address'
            placeholder={formData.ipAddress ? '' : 'e.g., 192.168.1.100'}
            value={formData.ipAddress || ''}
            onChange={(e) => updateFormData('ipAddress', e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Operating System'
            placeholder={formData.specifications?.operatingSystem ? '' : 'e.g., Windows 11, Ubuntu 22.04'}
            value={formData.specifications?.operatingSystem || ''}
            onChange={(e) => updateFormData('specifications.operatingSystem', e.target.value)}
          />
        </Grid>
      </>
    )
  }

  return (
    <Card>
      <CardHeader
        title='Asset Information'
        subheader='Enter basic asset details and identification'
      />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Asset Name'
              placeholder='e.g., Generator Unit A-01'
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
              placeholder='e.g., PROD-2024-0001'
              value={formData.assetCode}
              onChange={handleChange('assetCode')}
              required
              error={!!errors.assetCode || codeValidationStatus === 'taken'}
              helperText={
                errors.assetCode || 
                (codeValidationStatus === 'taken' ? 'Asset code already exists' :
                 codeValidationStatus === 'available' ? 'Asset code is available' :
                 codeValidationStatus === 'error' ? 'Validation error occurred' :
                 'Unique identifier for the asset')
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isValidatingCode && (
                      <Tooltip title="Validating...">
                        <i className='ri-loader-4-line animate-spin' style={{ marginRight: 8, color: 'var(--mui-palette-text-secondary)' }} />
                      </Tooltip>
                    )}
                    {codeValidationStatus === 'available' && (
                      <Tooltip title="Asset code is available">
                        <i className='ri-check-line' style={{ marginRight: 8, color: 'var(--mui-palette-success-main)' }} />
                      </Tooltip>
                    )}
                    {codeValidationStatus === 'taken' && (
                      <Tooltip title="Asset code already exists">
                        <i className='ri-close-line' style={{ marginRight: 8, color: 'var(--mui-palette-error-main)' }} />
                      </Tooltip>
                    )}
                    <Tooltip title="Generate Asset Code">
                      <IconButton
                        onClick={generateAssetCode}
                        disabled={isGeneratingCode}
                        edge="end"
                      >
                        {isGeneratingCode ? (
                          <i className='ri-loader-4-line animate-spin' />
                        ) : (
                          <i className='ri-refresh-line' />
                        )}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Asset Type</InputLabel>
              <Select
                value={formData.type}
                label='Asset Type'
                onChange={handleChange('type')}
              >
                <MenuItem value='S3 SRC'>S3 SRC</MenuItem>
                <MenuItem value='4 Susun'>4 Susun</MenuItem>
                <MenuItem value='Jumper'>Jumper</MenuItem>
                <MenuItem value='Informa'>Informa</MenuItem>
                <MenuItem value='Equipment'>Equipment</MenuItem>
                <MenuItem value='Tool'>Tool</MenuItem>
                <MenuItem value='Furniture'>Furniture</MenuItem>
                <MenuItem value='Vehicle'>Vehicle</MenuItem>
                <MenuItem value='IT Equipment'>IT Equipment</MenuItem>
                <MenuItem value='Safety Equipment'>Safety Equipment</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* Spacer for layout */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label='Description'
              placeholder='Detailed description of the asset...'
              value={formData.description}
              onChange={handleChange('description')}
            />
          </Grid>
          
          {/* Category-specific fields */}
          {renderPPEFields()}
          {renderPumpFields()}
          {renderITFields()}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Serial Number'
              placeholder='Manufacturer serial number'
              value={formData.serialNumber}
              onChange={handleChange('serialNumber')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Manufacturer'
              placeholder='e.g., Caterpillar, Siemens'
              value={formData.manufacturer}
              onChange={handleChange('manufacturer')}
              required
              error={!!errors.manufacturer}
              helperText={errors.manufacturer}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={vendors}
              getOptionLabel={(option) => `${option.vendor_name} (${option.vendor_id})`}
              value={vendors.find(v => v.vendor_id === formData.financial?.vendor_id) || null}
              onChange={(event, newValue) => {
                updateFormData('financial.vendor_id', newValue?.vendor_id || '')
                updateFormData('financial.supplier', newValue?.vendor_name || '')
              }}
              loading={loadingVendors}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Vendor/Supplier'
                  placeholder='Select vendor/supplier'
                  helperText='Select the vendor who supplied this asset'
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Box>
                    <Typography variant="body2">{option.vendor_name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.vendor_id} • {option.contact_name}
                    </Typography>
                  </Box>
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Model'
              placeholder='Model number/name'
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
              label='Color'
              placeholder='e.g., Red, Blue, Silver'
              value={formData.color}
              onChange={handleChange('color')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Size'
              placeholder='e.g., 35, 36, 42, Large, Medium'
              value={formData.size}
              onChange={handleChange('size')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Unit of Measure (UOM)</InputLabel>
              <Select
                value={formData.uom}
                label='Unit of Measure (UOM)'
                onChange={handleChange('uom')}
              >
                <MenuItem value='pcs'>Pieces (pcs)</MenuItem>
                <MenuItem value='unit'>Unit</MenuItem>
                <MenuItem value='lembar'>Lembar</MenuItem>
                <MenuItem value='set'>Set</MenuItem>
                <MenuItem value='kg'>Kilogram (kg)</MenuItem>
                <MenuItem value='liter'>Liter</MenuItem>
                <MenuItem value='meter'>Meter</MenuItem>
                <MenuItem value='box'>Box</MenuItem>
                <MenuItem value='roll'>Roll</MenuItem>
                <MenuItem value='pair'>Pair</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Part Number'
              placeholder='Part/Article number'
              value={formData.partNumber}
              onChange={handleChange('partNumber')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Manufacturing Year'
              placeholder={formData.manufacturingYear ? '' : 'e.g., 2023'}
              value={formData.manufacturingYear}
              onChange={handleChange('manufacturingYear')}
              InputProps={{
                inputProps: { min: 1900, max: new Date().getFullYear() + 1 }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='date'
              label='Purchase Date'
              value={formData.purchaseDate}
              onChange={handleChange('purchaseDate')}
              InputLabelProps={{ shrink: true }}
              required={formData.category?.type === 'Fixed Asset'}
              error={!!errors.purchaseDate}
              helperText={errors.purchaseDate}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label='Purchase Price'
              placeholder='0.00'
              type='number'
              value={formData.purchasePrice}
              onChange={handleChange('purchasePrice')}
              required={formData.category?.type === 'Fixed Asset'}
              error={!!errors.purchasePrice}
              helperText={errors.purchasePrice || 'Required for Fixed Assets'}
              InputProps={{
                inputProps: { min: 0, step: 0.01 }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel>Currency</InputLabel>
              <Select
                value={formData.currency}
                label="Currency"
                onChange={handleChange('currency')}
              >
                <MenuItem value="IDR">IDR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="SGD">SGD</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label='Status'
                onChange={handleChange('status')}
              >
                <MenuItem value='tersedia'>Tersedia</MenuItem>
                <MenuItem value='dipakai'>Dipakai</MenuItem>
                <MenuItem value='rusak'>Rusak</MenuItem>
                <MenuItem value='habis'>Habis</MenuItem>
                <MenuItem value='dipensiunkan'>Dipensiunkan</MenuItem>
              </Select>
            </FormControl>
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
  )
}

export default AssetInformation
