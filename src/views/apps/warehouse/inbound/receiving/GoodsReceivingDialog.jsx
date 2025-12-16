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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'

// Server Actions
import { createGoodsReceiving, updateGoodsReceiving } from '@/server/actions/getGoodsReceivingData'

const GoodsReceivingDialog = ({ open, order, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    po_number: '',
    supplier_id: '',
    supplier_name: '',
    expected_date: '',
    priority: 'medium',
    warehouse_id: 'WH-001',
    warehouse_name: 'Gudang A - Main Warehouse',
    total_items: 0,
    total_quantity: 0,
    notes: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (order) {
      setFormData({
        po_number: order.po_number || '',
        supplier_id: order.supplier_id || '',
        supplier_name: order.supplier_name || '',
        expected_date: order.expected_date ? order.expected_date.split('T')[0] : '',
        priority: order.priority || 'medium',
        warehouse_id: order.warehouse_id || 'WH-001',
        warehouse_name: order.warehouse_name || 'Gudang A - Main Warehouse',
        total_items: order.total_items || 0,
        total_quantity: order.total_quantity || 0,
        notes: order.notes || ''
      })
    } else {
      setFormData({
        po_number: '',
        supplier_id: '',
        supplier_name: '',
        expected_date: '',
        priority: 'medium',
        warehouse_id: 'WH-001',
        warehouse_name: 'Gudang A - Main Warehouse',
        total_items: 0,
        total_quantity: 0,
        notes: ''
      })
    }
  }, [order, open])

  const handleChange = (field) => (event) => {
    const value = event.target.value
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Auto-update warehouse name when warehouse_id changes
    if (field === 'warehouse_id') {
      const warehouseNames = {
        'WH-001': 'Gudang A - Main Warehouse',
        'WH-002': 'Gudang B - Equipment Storage',
        'WH-003': 'Safety Equipment Storage',
        'WH-004': 'Uniform Storage'
      }
      setFormData(prev => ({
        ...prev,
        warehouse_name: warehouseNames[value] || value
      }))
    }
  }

  const handleSupplierChange = (event) => {
    const supplierId = event.target.value
    const supplierNames = {
      'SUP-001': 'PT Industrial Supplies Indonesia',
      'SUP-002': 'PT Equipment Solutions',
      'SUP-003': 'CV Safety Equipment',
      'SUP-004': 'PT Pertamina Lubricants',
      'SUP-005': 'PT Valve & Instrument'
    }
    
    setFormData(prev => ({
      ...prev,
      supplier_id: supplierId,
      supplier_name: supplierNames[supplierId] || ''
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (order) {
        await updateGoodsReceiving(order.receiving_id, formData)
      } else {
        await createGoodsReceiving(formData)
      }
      onSave()
    } catch (error) {
      console.error('Error saving receiving order:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Box className='flex items-center gap-2'>
          <i className='ri-inbox-line text-2xl' />
          <Typography variant='h5'>
            {order ? 'Edit Receiving Order' : 'Create Receiving Order'}
          </Typography>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={4} className='mt-2'>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='PO Number'
              value={formData.po_number}
              onChange={handleChange('po_number')}
              placeholder='PO-2024-XXX'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Supplier</InputLabel>
              <Select
                value={formData.supplier_id}
                label='Supplier'
                onChange={handleSupplierChange}
              >
                <MenuItem value='SUP-001'>PT Industrial Supplies Indonesia</MenuItem>
                <MenuItem value='SUP-002'>PT Equipment Solutions</MenuItem>
                <MenuItem value='SUP-003'>CV Safety Equipment</MenuItem>
                <MenuItem value='SUP-004'>PT Pertamina Lubricants</MenuItem>
                <MenuItem value='SUP-005'>PT Valve & Instrument</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='date'
              label='Expected Date'
              value={formData.expected_date}
              onChange={handleChange('expected_date')}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                label='Priority'
                onChange={handleChange('priority')}
              >
                <MenuItem value='low'>
                  <Chip label='Low' size='small' />
                </MenuItem>
                <MenuItem value='medium'>
                  <Chip label='Medium' color='info' size='small' />
                </MenuItem>
                <MenuItem value='high'>
                  <Chip label='High' color='error' size='small' />
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Warehouse</InputLabel>
              <Select
                value={formData.warehouse_id}
                label='Warehouse'
                onChange={handleChange('warehouse_id')}
              >
                <MenuItem value='WH-001'>Gudang A - Main Warehouse</MenuItem>
                <MenuItem value='WH-002'>Gudang B - Equipment Storage</MenuItem>
                <MenuItem value='WH-003'>Safety Equipment Storage</MenuItem>
                <MenuItem value='WH-004'>Uniform Storage</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Total Items'
              value={formData.total_items}
              onChange={handleChange('total_items')}
              inputProps={{ min: 0 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Total Quantity'
              value={formData.total_quantity}
              onChange={handleChange('total_quantity')}
              inputProps={{ min: 0 }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label='Notes'
              value={formData.notes}
              onChange={handleChange('notes')}
              placeholder='Add any additional notes or special instructions...'
            />
          </Grid>

          <Grid item xs={12}>
            <Box className='p-4 bg-info-light rounded'>
              <Typography variant='body2' className='flex items-center gap-2'>
                <i className='ri-information-line' />
                <strong>Note:</strong> The receiving order will be created with "Scheduled" status. 
                Update the status to "In Progress" when goods arrive.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions className='p-4'>
        <Button onClick={handleCancel} color='secondary' disabled={loading}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant='contained' 
          disabled={loading || !formData.po_number || !formData.supplier_id}
          startIcon={loading ? <i className='ri-loader-4-line animate-spin' /> : <i className='ri-save-line' />}
        >
          {loading ? 'Saving...' : order ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GoodsReceivingDialog
