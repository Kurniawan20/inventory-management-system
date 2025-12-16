'use client'

// React Imports
import { useState } from 'react'
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
import { createQualityCheck } from '@/server/actions/getQualityCheckData'

const CreateQualityCheckPage = () => {
  const router = useRouter()
  const params = useParams()
  const { lang: locale } = params

  const [formData, setFormData] = useState({
    receiving_id: '',
    po_number: '',
    item_name: '',
    supplier_name: '',
    inspector_name: '',
    priority: 'medium',
    total_checks: 10,
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      await createQualityCheck(formData)
      router.push(`/${locale}/apps/warehouse/inbound/quality-check`)
    } catch (error) {
      console.error('Error creating quality check:', error)
      setError('Failed to create quality check. Please try again.')
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
                <Typography variant='h5'>Create Quality Check Inspection</Typography>
              </Box>
            }
            subheader='Create a new quality check inspection for received goods'
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
                    Receiving Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label='Receiving ID'
                    value={formData.receiving_id}
                    onChange={handleChange('receiving_id')}
                    placeholder='RCV-2024-XXX'
                    required
                  />
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
                  <TextField
                    fullWidth
                    label='Item Name'
                    value={formData.item_name}
                    onChange={handleChange('item_name')}
                    placeholder='Enter item name'
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label='Supplier Name'
                    value={formData.supplier_name}
                    onChange={handleChange('supplier_name')}
                    placeholder='Enter supplier name'
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='h6' className='mb-2'>
                    Inspection Details
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label='Inspector Name'
                    value={formData.inspector_name}
                    onChange={handleChange('inspector_name')}
                    placeholder='Enter inspector name'
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

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Total Quality Checks'
                    value={formData.total_checks}
                    onChange={handleChange('total_checks')}
                    inputProps={{ min: 1 }}
                    helperText='Number of quality check points to inspect'
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
                    placeholder='Add any additional notes or observations...'
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box className='p-4 bg-info-light rounded'>
                    <Typography variant='body2' className='flex items-center gap-2'>
                      <i className='ri-information-line' />
                      <strong>Note:</strong> The quality check will be created with "Pending" status. 
                      Update the inspection results as you perform the quality checks.
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
                    disabled={loading || !formData.receiving_id || !formData.item_name}
                    startIcon={loading ? <i className='ri-loader-4-line animate-spin' /> : <i className='ri-save-line' />}
                  >
                    {loading ? 'Creating...' : 'Create Quality Check'}
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

export default CreateQualityCheckPage
