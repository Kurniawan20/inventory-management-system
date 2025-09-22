'use client'

// React Imports
import { useState, useEffect } from 'react'

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
  assetType: pipe(string(), nonEmpty('Asset type is required')),
  quantity: pipe(string(), nonEmpty('Quantity is required')),
  priority: pipe(string(), nonEmpty('Priority is required')),
  department: pipe(string(), nonEmpty('Department is required')),
  justification: pipe(string(), nonEmpty('Justification is required'), minLength(10, 'Please provide detailed justification')),
  expectedDate: pipe(string(), nonEmpty('Expected date is required'))
})

const AssetRequestView = () => {
  const [employeeId, setEmployeeId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      assetName: '',
      assetType: '',
      quantity: '1',
      priority: '',
      department: '',
      justification: '',
      expectedDate: ''
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
      
      setSubmitSuccess(true)
      reset()
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting request:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const assetTypes = [
    'Computer & IT Equipment',
    'Office Furniture',
    'Vehicles',
    'Machinery & Tools',
    'Safety Equipment',
    'Communication Devices',
    'Other'
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
                <Grid item xs={12} md={6}>
                  <Controller
                    name='assetName'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Asset Name'
                        placeholder='Enter asset name or model'
                        error={!!errors.assetName}
                        helperText={errors.assetName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='assetType'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.assetType}>
                        <InputLabel>Asset Type</InputLabel>
                        <Select {...field} label='Asset Type'>
                          {assetTypes.map((type) => (
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
                      </FormControl>
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
                        label='Quantity'
                        inputProps={{ min: 1 }}
                        error={!!errors.quantity}
                        helperText={errors.quantity?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='priority'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.priority}>
                        <InputLabel>Priority Level</InputLabel>
                        <Select {...field} label='Priority Level'>
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
                        <InputLabel>Department</InputLabel>
                        <Select {...field} label='Department'>
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
                    name='expectedDate'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type='date'
                        label='Expected Delivery Date'
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: new Date().toISOString().split('T')[0] }}
                        error={!!errors.expectedDate}
                        helperText={errors.expectedDate?.message}
                      />
                    )}
                  />
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
                        label='Business Justification'
                        placeholder='Please provide detailed justification for this asset request...'
                        error={!!errors.justification}
                        helperText={errors.justification?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box className='flex gap-4 justify-end'>
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
