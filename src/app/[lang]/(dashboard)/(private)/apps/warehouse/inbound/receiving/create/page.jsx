'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'

// Server Actions
import { createGoodsReceiving } from '@/server/actions/getGoodsReceivingData'

const CreateGoodsReceivingPage = () => {
  const router = useRouter()
  const params = useParams()
  const { lang: locale } = params

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
  const [error, setError] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      await createGoodsReceiving(formData)
      router.push(`/${locale}/apps/warehouse/inbound/receiving`)
    } catch (error) {
      console.error('Error saving receiving order:', error)
      setError('Failed to create receiving order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box className='flex items-center gap-2'>
                <i className='ri-add-line text-2xl' />
                <Typography variant='h5'>Create Goods Receiving Order</Typography>
              </Box>
            }
            subheader='Create a new receiving order for inbound goods'
          />
          <Divider />
          <form onSubmit={handleSubmit}>
            <CardContent>
              {error && (
                <Alert severity='error' className='mb-4'>
                  {error}
                </Alert>
              )}

              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='h6' className='mb-2'>
                    Order Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label='PO Number'
                    value={formData.po_number}
                    onChange={handleChange('po_number')}
                    placeholder='PO-2024-XXX'
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
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

                <Grid item xs={12} md={6}>
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

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={formData.priority}
                      label='Priority'
                      onChange={handleChange('priority')}
                    >
                      <MenuItem value='low'>
                        <Box className='flex items-center gap-2'>
                          <Chip label='Low' size='small' />
                        </Box>
                      </MenuItem>
                      <MenuItem value='medium'>
                        <Box className='flex items-center gap-2'>
                          <Chip label='Medium' color='info' size='small' />
                        </Box>
                      </MenuItem>
                      <MenuItem value='high'>
                        <Box className='flex items-center gap-2'>
                          <Chip label='High' color='error' size='small' />
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='h6' className='mb-2'>
                    Warehouse & Quantity
                  </Typography>
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

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Total Items'
                    value={formData.total_items}
                    onChange={handleChange('total_items')}
                    inputProps={{ min: 0 }}
                    helperText='Number of different item types'
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Total Quantity'
                    value={formData.total_quantity}
                    onChange={handleChange('total_quantity')}
                    inputProps={{ min: 0 }}
                    helperText='Total quantity of all items'
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='h6' className='mb-2'>
                    Additional Notes
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
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
            </CardContent>
            <Divider />
            <CardContent>
              <Box className='flex items-center justify-between'>
                <Button 
                  onClick={handleCancel} 
                  color='secondary' 
                  disabled={loading}
                  startIcon={<i className='ri-arrow-left-line' />}
                >
                  Back
                </Button>
                <Box className='flex gap-4'>
                  <Button 
                    onClick={handleCancel} 
                    variant='outlined' 
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type='submit'
                    variant='contained' 
                    disabled={loading || !formData.po_number || !formData.supplier_id}
                    startIcon={loading ? <i className='ri-loader-4-line animate-spin' /> : <i className='ri-save-line' />}
                  >
                    {loading ? 'Creating...' : 'Create Receiving Order'}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CreateGoodsReceivingPage
