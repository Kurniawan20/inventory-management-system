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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'

// Server Actions
import { createPurchase, updatePurchase } from '@/server/actions/getPurchaseData'
import { getAssetList } from '@/server/actions/getAssetData'

const PurchaseDialog = ({ open, purchase, vendors, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    item_id: '',
    vendor_id: '',
    purchase_date: '',
    document_ref: '',
    acquisition_value: '',
    qty: '',
    uom: 'unit',
    warranty_expiry: '',
    notes: ''
  })
  const [assets, setAssets] = useState([])
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [loadingAssets, setLoadingAssets] = useState(false)

  const isEdit = Boolean(purchase)

  // Dummy data templates for quick population
  const dummyDataTemplates = [
    {
      item_id: 'AST-001',
      vendor_id: 'VND-001',
      purchase_date: '2024-01-15',
      document_ref: 'PO-001/INV-2024-0115',
      acquisition_value: '125000000',
      qty: '1',
      uom: 'unit',
      warranty_expiry: '2027-01-15',
      notes: 'Industrial equipment procurement with installation and commissioning services included.'
    },
    {
      item_id: 'AST-002',
      vendor_id: 'VND-002',
      purchase_date: '2024-02-20',
      document_ref: 'PO-002/INV-2024-0220',
      acquisition_value: '275000000',
      qty: '1',
      uom: 'unit',
      warranty_expiry: '2027-02-20',
      notes: 'High-efficiency equipment with extended warranty and maintenance support.'
    },
    {
      item_id: 'AST-006',
      vendor_id: 'VND-006',
      purchase_date: '2024-01-15',
      document_ref: 'PO-006/INV-2024-0115',
      acquisition_value: '2500000',
      qty: '50',
      uom: 'pcs',
      warranty_expiry: '2026-01-15',
      notes: 'Safety equipment bulk purchase with certification and training materials.'
    }
  ]

  const generateDummyData = () => {
    const randomTemplate = dummyDataTemplates[Math.floor(Math.random() * dummyDataTemplates.length)]
    setFormData(randomTemplate)
    setErrors({})
  }

  // Load assets
  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoadingAssets(true)
        const result = await getAssetList()
        setAssets(result.assets || [])
      } catch (error) {
        console.error('Error loading assets:', error)
      } finally {
        setLoadingAssets(false)
      }
    }
    
    if (open) {
      loadAssets()
    }
  }, [open])

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (purchase) {
        setFormData({
          item_id: purchase.item_id || '',
          vendor_id: purchase.vendor_id || '',
          purchase_date: purchase.purchase_date || '',
          document_ref: purchase.document_ref || '',
          acquisition_value: purchase.acquisition_value?.toString() || '',
          qty: purchase.qty?.toString() || '',
          uom: purchase.uom || 'unit',
          warranty_expiry: purchase.warranty_expiry || '',
          notes: purchase.notes || ''
        })
      } else {
        setFormData({
          item_id: '',
          vendor_id: '',
          purchase_date: '',
          document_ref: '',
          acquisition_value: '',
          qty: '',
          uom: 'unit',
          warranty_expiry: '',
          notes: ''
        })
      }
      setErrors({})
      setSubmitError('')
    }
  }, [open, purchase])

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

    if (!formData.item_id) {
      newErrors.item_id = 'Item is required'
    }

    if (!formData.vendor_id) {
      newErrors.vendor_id = 'Vendor is required'
    }

    if (!formData.purchase_date) {
      newErrors.purchase_date = 'Purchase date is required'
    }

    if (!formData.document_ref.trim()) {
      newErrors.document_ref = 'Document reference is required'
    }

    if (!formData.acquisition_value) {
      newErrors.acquisition_value = 'Acquisition value is required'
    } else if (isNaN(formData.acquisition_value) || parseFloat(formData.acquisition_value) <= 0) {
      newErrors.acquisition_value = 'Please enter a valid positive number'
    }

    if (!formData.qty) {
      newErrors.qty = 'Quantity is required'
    } else if (isNaN(formData.qty) || parseInt(formData.qty) <= 0) {
      newErrors.qty = 'Please enter a valid positive number'
    }

    if (!formData.warranty_expiry) {
      newErrors.warranty_expiry = 'Warranty expiry is required'
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

      const submitData = {
        ...formData,
        acquisition_value: parseFloat(formData.acquisition_value),
        qty: parseInt(formData.qty)
      }

      let result
      if (isEdit) {
        result = await updatePurchase(purchase.purchase_id, submitData)
      } else {
        result = await createPurchase(submitData)
      }

      if (result.success) {
        onSave()
      } else {
        setSubmitError(result.message || 'An error occurred')
      }
    } catch (error) {
      setSubmitError('An error occurred while saving the purchase')
      console.error('Error saving purchase:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleClose = () => {
    if (!saving) {
      onClose()
    }
  }

  const formatCurrency = (value) => {
    if (!value) return ''
    return new Intl.NumberFormat('id-ID').format(value)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: { minHeight: '700px' }
      }}
    >
      <DialogTitle>
        <Box className='flex items-center justify-between'>
          <Box className='flex items-center gap-2'>
            <i className='ri-shopping-cart-line text-2xl' />
            <Typography variant='h6'>
              {isEdit ? 'Edit Purchase' : 'Add New Purchase'}
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
            <Autocomplete
              options={assets}
              getOptionLabel={(option) => `${option.name} (${option.assetCode})`}
              value={assets.find(a => a.assetCode === formData.item_id) || null}
              onChange={(event, newValue) => {
                setFormData(prev => ({
                  ...prev,
                  item_id: newValue?.assetCode || ''
                }))
              }}
              loading={loadingAssets}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Item/Asset'
                  error={Boolean(errors.item_id)}
                  helperText={errors.item_id}
                  required
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Box>
                    <Typography variant="body2">{option.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.assetCode} • {option.manufacturer}
                    </Typography>
                  </Box>
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={Boolean(errors.vendor_id)}>
              <InputLabel>Vendor</InputLabel>
              <Select
                value={formData.vendor_id}
                label='Vendor'
                onChange={handleChange('vendor_id')}
              >
                {vendors.map((vendor) => (
                  <MenuItem key={vendor.vendor_id} value={vendor.vendor_id}>
                    {vendor.vendor_name}
                  </MenuItem>
                ))}
              </Select>
              {errors.vendor_id && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                  {errors.vendor_id}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Purchase Date'
              type='date'
              value={formData.purchase_date}
              onChange={handleChange('purchase_date')}
              error={Boolean(errors.purchase_date)}
              helperText={errors.purchase_date}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Document Reference'
              value={formData.document_ref}
              onChange={handleChange('document_ref')}
              error={Boolean(errors.document_ref)}
              helperText={errors.document_ref}
              placeholder='e.g., PO-001/INV-2024-0115'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Acquisition Value'
              type='number'
              value={formData.acquisition_value}
              onChange={handleChange('acquisition_value')}
              error={Boolean(errors.acquisition_value)}
              helperText={errors.acquisition_value || `≈ IDR ${formatCurrency(formData.acquisition_value)}`}
              InputProps={{
                startAdornment: <InputAdornment position="start">IDR</InputAdornment>
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label='Quantity'
              type='number'
              value={formData.qty}
              onChange={handleChange('qty')}
              error={Boolean(errors.qty)}
              helperText={errors.qty}
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Unit</InputLabel>
              <Select
                value={formData.uom}
                label='Unit'
                onChange={handleChange('uom')}
              >
                <MenuItem value='unit'>unit</MenuItem>
                <MenuItem value='pcs'>pcs</MenuItem>
                <MenuItem value='set'>set</MenuItem>
                <MenuItem value='kg'>kg</MenuItem>
                <MenuItem value='liter'>liter</MenuItem>
                <MenuItem value='meter'>meter</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Warranty Expiry'
              type='date'
              value={formData.warranty_expiry}
              onChange={handleChange('warranty_expiry')}
              error={Boolean(errors.warranty_expiry)}
              helperText={errors.warranty_expiry}
              InputLabelProps={{ shrink: true }}
              required
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
              placeholder='Additional notes about the purchase'
              helperText='Optional notes about purchase terms, conditions, etc.'
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
          {saving ? 'Saving...' : (isEdit ? 'Update Purchase' : 'Create Purchase')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PurchaseDialog
