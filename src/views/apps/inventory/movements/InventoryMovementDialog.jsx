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
import Chip from '@mui/material/Chip'

// Server Actions
import { createInventoryMovement, updateInventoryMovement } from '@/server/actions/getInventoryMovementData'
import { getAssetList } from '@/server/actions/getAssetData'

const InventoryMovementDialog = ({ open, movement, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    item_id: '',
    location_id: '',
    movement_type: 'inbound',
    reference_doc: '',
    qty_in: '',
    qty_out: '',
    batch_number: '',
    expiry_date: '',
    tracking_method: 'FIFO',
    notes: ''
  })
  const [assets, setAssets] = useState([])
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [loadingAssets, setLoadingAssets] = useState(false)

  const isEdit = Boolean(movement)

  // Dummy data templates for quick population
  const dummyDataTemplates = [
    {
      item_id: 'AST-001',
      location_id: 'WH-001',
      movement_type: 'inbound',
      reference_doc: 'PO-2024-001',
      qty_in: '1',
      qty_out: '0',
      batch_number: 'BATCH-001-2024',
      expiry_date: '2027-01-15',
      tracking_method: 'FIFO',
      notes: 'Equipment received from vendor. Quality checked and ready for use.'
    },
    {
      item_id: 'AST-006',
      location_id: 'WH-003',
      movement_type: 'outbound',
      reference_doc: 'REQ-2024-001',
      qty_in: '0',
      qty_out: '15',
      batch_number: 'BATCH-PPE-001',
      expiry_date: '2026-01-15',
      tracking_method: 'FEFO',
      notes: 'Safety equipment issued to field operations team.'
    },
    {
      item_id: 'AST-003',
      location_id: 'WH-001',
      movement_type: 'transfer',
      reference_doc: 'TRF-2024-001',
      qty_in: '1',
      qty_out: '0',
      batch_number: 'BATCH-003-2024',
      expiry_date: '2026-03-10',
      tracking_method: 'FIFO',
      notes: 'Equipment transferred between warehouse locations.'
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
      if (movement) {
        setFormData({
          item_id: movement.item_id || '',
          location_id: movement.location_id || '',
          movement_type: movement.movement_type || 'inbound',
          reference_doc: movement.reference_doc || '',
          qty_in: movement.qty_in?.toString() || '',
          qty_out: movement.qty_out?.toString() || '',
          batch_number: movement.batch_number || '',
          expiry_date: movement.expiry_date || '',
          tracking_method: movement.tracking_method || 'FIFO',
          notes: movement.notes || ''
        })
      } else {
        setFormData({
          item_id: '',
          location_id: '',
          movement_type: 'inbound',
          reference_doc: '',
          qty_in: '',
          qty_out: '',
          batch_number: '',
          expiry_date: '',
          tracking_method: 'FIFO',
          notes: ''
        })
      }
      setErrors({})
      setSubmitError('')
    }
  }, [open, movement])

  const handleChange = (field) => (event) => {
    const value = event.target.value
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Auto-adjust quantities based on movement type
    if (field === 'movement_type') {
      if (value === 'inbound' || value === 'transfer') {
        setFormData(prev => ({ ...prev, qty_out: '0' }))
      } else if (value === 'outbound') {
        setFormData(prev => ({ ...prev, qty_in: '0' }))
      }
    }
    
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

    if (!formData.location_id) {
      newErrors.location_id = 'Location is required'
    }

    if (!formData.reference_doc.trim()) {
      newErrors.reference_doc = 'Reference document is required'
    }

    if (!formData.batch_number.trim()) {
      newErrors.batch_number = 'Batch number is required'
    }

    // Validate quantities based on movement type
    if (formData.movement_type === 'inbound' || formData.movement_type === 'transfer') {
      if (!formData.qty_in || parseInt(formData.qty_in) <= 0) {
        newErrors.qty_in = 'Quantity in must be greater than 0'
      }
    }

    if (formData.movement_type === 'outbound' || formData.movement_type === 'adjustment') {
      if (!formData.qty_out || parseInt(formData.qty_out) <= 0) {
        newErrors.qty_out = 'Quantity out must be greater than 0'
      }
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
        qty_in: parseInt(formData.qty_in) || 0,
        qty_out: parseInt(formData.qty_out) || 0,
        balance: parseInt(formData.qty_in || 0) - parseInt(formData.qty_out || 0)
      }

      let result
      if (isEdit) {
        result = await updateInventoryMovement(movement.movement_id, submitData)
      } else {
        result = await createInventoryMovement(submitData)
      }

      if (result.success) {
        onSave()
      } else {
        setSubmitError(result.message || 'An error occurred')
      }
    } catch (error) {
      setSubmitError('An error occurred while saving the movement')
      console.error('Error saving movement:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleClose = () => {
    if (!saving) {
      onClose()
    }
  }

  const movementTypes = [
    { value: 'inbound', label: 'Inbound', color: 'success', description: 'Items coming into inventory' },
    { value: 'outbound', label: 'Outbound', color: 'error', description: 'Items going out of inventory' },
    { value: 'transfer', label: 'Transfer', color: 'info', description: 'Items moving between locations' },
    { value: 'adjustment', label: 'Adjustment', color: 'warning', description: 'Inventory corrections' }
  ]

  const trackingMethods = [
    { value: 'FIFO', label: 'FIFO', description: 'First In, First Out' },
    { value: 'LIFO', label: 'LIFO', description: 'Last In, First Out' },
    { value: 'FEFO', label: 'FEFO', description: 'First Expired, First Out' }
  ]

  const locations = [
    { id: 'WH-001', name: 'Gudang A - Main Warehouse' },
    { id: 'WH-002', name: 'Gudang B - Equipment Storage' },
    { id: 'WH-003', name: 'Safety Equipment Storage' },
    { id: 'WH-004', name: 'Uniform Storage' },
    { id: 'CR-001', name: 'Control Room Storage' }
  ]

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
            <i className='ri-exchange-line text-2xl' />
            <Typography variant='h6'>
              {isEdit ? 'Edit Movement' : 'Add New Movement'}
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
            <FormControl fullWidth required error={Boolean(errors.location_id)}>
              <InputLabel>Location</InputLabel>
              <Select
                value={formData.location_id}
                label='Location'
                onChange={handleChange('location_id')}
              >
                {locations.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.location_id && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                  {errors.location_id}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Movement Type</InputLabel>
              <Select
                value={formData.movement_type}
                label='Movement Type'
                onChange={handleChange('movement_type')}
              >
                {movementTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    <Box className='flex items-center gap-2'>
                      <Chip 
                        label={type.label} 
                        color={type.color} 
                        size='small' 
                        variant='outlined'
                      />
                      <Typography variant='caption' color='text.secondary'>
                        {type.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Reference Document'
              value={formData.reference_doc}
              onChange={handleChange('reference_doc')}
              error={Boolean(errors.reference_doc)}
              helperText={errors.reference_doc}
              placeholder='e.g., PO-2024-001, REQ-2024-001'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Quantity In'
              type='number'
              value={formData.qty_in}
              onChange={handleChange('qty_in')}
              error={Boolean(errors.qty_in)}
              helperText={errors.qty_in}
              disabled={formData.movement_type === 'outbound'}
              required={formData.movement_type === 'inbound' || formData.movement_type === 'transfer'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Quantity Out'
              type='number'
              value={formData.qty_out}
              onChange={handleChange('qty_out')}
              error={Boolean(errors.qty_out)}
              helperText={errors.qty_out}
              disabled={formData.movement_type === 'inbound' || formData.movement_type === 'transfer'}
              required={formData.movement_type === 'outbound' || formData.movement_type === 'adjustment'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Batch/Lot Number'
              value={formData.batch_number}
              onChange={handleChange('batch_number')}
              error={Boolean(errors.batch_number)}
              helperText={errors.batch_number}
              placeholder='e.g., BATCH-001-2024'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Expiry Date'
              type='date'
              value={formData.expiry_date}
              onChange={handleChange('expiry_date')}
              error={Boolean(errors.expiry_date)}
              helperText={errors.expiry_date || 'Leave empty if no expiry date'}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Tracking Method</InputLabel>
              <Select
                value={formData.tracking_method}
                label='Tracking Method'
                onChange={handleChange('tracking_method')}
              >
                {trackingMethods.map((method) => (
                  <MenuItem key={method.value} value={method.value}>
                    <Box>
                      <Typography variant='body2'>{method.label}</Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {method.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Notes'
              multiline
              rows={3}
              value={formData.notes}
              onChange={handleChange('notes')}
              placeholder='Additional notes about the movement'
              helperText='Optional notes about the inventory movement'
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
          {saving ? 'Saving...' : (isEdit ? 'Update Movement' : 'Create Movement')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InventoryMovementDialog
