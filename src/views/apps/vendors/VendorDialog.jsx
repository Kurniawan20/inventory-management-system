'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Server Actions
import { createVendor, updateVendor } from '@/server/actions/getVendorData'

const VendorDialog = ({ open, vendor, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    vendor_name: '',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    address: '',
    npwp: '',
    notes: ''
  })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const isEdit = Boolean(vendor)

  // Dummy data templates for quick population
  const dummyDataTemplates = [
    {
      vendor_name: 'PT Teknologi Maju Indonesia',
      contact_name: 'Budi Santoso',
      contact_phone: '+62-21-5555-0101',
      contact_email: 'budi@teknologi-maju.co.id',
      address: 'Jl. Sudirman Kav. 52-53, Jakarta Pusat 10210, Indonesia',
      npwp: '01.234.567.8-901.000',
      notes: 'Technology solutions provider specializing in industrial automation and control systems. ISO 9001 certified with 15+ years experience.'
    },
    {
      vendor_name: 'CV Sumber Rejeki Mandiri',
      contact_name: 'Siti Nurhaliza',
      contact_phone: '+62-21-5555-0202',
      contact_email: 'siti@sumberrejeki.com',
      address: 'Jl. Raya Bekasi Km. 18, Bekasi 17530, West Java, Indonesia',
      npwp: '02.345.678.9-012.000',
      notes: 'Local supplier for maintenance materials and spare parts. Competitive pricing with flexible payment terms.'
    },
    {
      vendor_name: 'Global Safety Equipment Ltd',
      contact_name: 'Ahmad Fauzi',
      contact_phone: '+62-21-5555-0303',
      contact_email: 'ahmad@globalsafety.co.id',
      address: 'Kawasan Industri MM2100, Blok A-1, Cikarang Barat 17520, Indonesia',
      npwp: '03.456.789.0-123.000',
      notes: 'International safety equipment distributor. Wide range of PPE products with global certifications and warranty support.'
    }
  ]

  const generateDummyData = () => {
    const randomTemplate = dummyDataTemplates[Math.floor(Math.random() * dummyDataTemplates.length)]
    setFormData(randomTemplate)
    setErrors({}) // Clear any existing errors
  }

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (vendor) {
        setFormData({
          vendor_name: vendor.vendor_name || '',
          contact_name: vendor.contact_name || '',
          contact_phone: vendor.contact_phone || '',
          contact_email: vendor.contact_email || '',
          address: vendor.address || '',
          npwp: vendor.npwp || '',
          notes: vendor.notes || ''
        })
      } else {
        setFormData({
          vendor_name: '',
          contact_name: '',
          contact_phone: '',
          contact_email: '',
          address: '',
          npwp: '',
          notes: ''
        })
      }
      setErrors({})
      setSubmitError('')
    }
  }, [open, vendor])

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
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

    if (!formData.vendor_name.trim()) {
      newErrors.vendor_name = 'Vendor name is required'
    }

    if (!formData.contact_name.trim()) {
      newErrors.contact_name = 'Contact name is required'
    }

    if (!formData.contact_phone.trim()) {
      newErrors.contact_phone = 'Contact phone is required'
    }

    if (!formData.contact_email.trim()) {
      newErrors.contact_email = 'Contact email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
      newErrors.contact_email = 'Please enter a valid email address'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    try {
      setSaving(true)
      setSubmitError('')

      let result
      if (isEdit) {
        result = await updateVendor(vendor.vendor_id, formData)
      } else {
        result = await createVendor(formData)
      }

      if (result.success) {
        onSave()
      } else {
        setSubmitError(result.message || 'An error occurred')
      }
    } catch (error) {
      setSubmitError('An error occurred while saving the vendor')
      console.error('Error saving vendor:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleClose = () => {
    if (!saving) {
      onClose()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: { minHeight: '600px' }
      }}
    >
      <DialogTitle>
        <Box className='flex items-center justify-between'>
          <Box className='flex items-center gap-2'>
            <i className='ri-building-line text-2xl' />
            <Typography variant='h6'>
              {isEdit ? 'Edit Vendor' : 'Add New Vendor'}
            </Typography>
          </Box>
          {!isEdit && (
            <Button
              variant='outlined'
              size='small'
              startIcon={<i className='ri-magic-line' />}
              onClick={generateDummyData}
              sx={{ ml: 2 }}
            >
              Generate Dummy Data
            </Button>
          )}
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {submitError && (
          <Alert severity='error' sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Vendor Name'
              value={formData.vendor_name}
              onChange={handleChange('vendor_name')}
              error={Boolean(errors.vendor_name)}
              helperText={errors.vendor_name}
              placeholder='e.g., PT KSB Indonesia'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Contact Person'
              value={formData.contact_name}
              onChange={handleChange('contact_name')}
              error={Boolean(errors.contact_name)}
              helperText={errors.contact_name}
              placeholder='e.g., Ahmad Supplier'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Contact Phone'
              value={formData.contact_phone}
              onChange={handleChange('contact_phone')}
              error={Boolean(errors.contact_phone)}
              helperText={errors.contact_phone}
              placeholder='e.g., +62-21-5555-0001'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Contact Email'
              type='email'
              value={formData.contact_email}
              onChange={handleChange('contact_email')}
              error={Boolean(errors.contact_email)}
              helperText={errors.contact_email}
              placeholder='e.g., contact@vendor.com'
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Address'
              multiline
              rows={3}
              value={formData.address}
              onChange={handleChange('address')}
              error={Boolean(errors.address)}
              helperText={errors.address}
              placeholder='Complete vendor address'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='NPWP'
              value={formData.npwp}
              onChange={handleChange('npwp')}
              error={Boolean(errors.npwp)}
              helperText={errors.npwp || 'Tax identification number (optional)'}
              placeholder='e.g., 01.234.567.8-901.000'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Notes'
              multiline
              rows={3}
              value={formData.notes}
              onChange={handleChange('notes')}
              placeholder='Additional notes about the vendor'
              helperText='Optional notes about vendor capabilities, certifications, etc.'
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose} disabled={saving}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant='contained'
          disabled={saving}
          startIcon={saving ? <CircularProgress size={16} /> : <i className='ri-save-line' />}
        >
          {saving ? 'Saving...' : (isEdit ? 'Update Vendor' : 'Create Vendor')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default VendorDialog
