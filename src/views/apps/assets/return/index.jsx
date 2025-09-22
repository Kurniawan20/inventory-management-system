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
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, pipe, nonEmpty, minLength } from 'valibot'

const schema = object({
  assetId: pipe(string(), nonEmpty('Asset ID is required')),
  returnReason: pipe(string(), nonEmpty('Return reason is required')),
  condition: pipe(string(), nonEmpty('Asset condition is required')),
  notes: pipe(string(), minLength(5, 'Please provide detailed notes about the return')),
  returnDate: pipe(string(), nonEmpty('Return date is required'))
})

const AssetReturnView = () => {
  const [employeeId, setEmployeeId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [assetFound, setAssetFound] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      assetId: '',
      returnReason: '',
      condition: '',
      notes: '',
      returnDate: new Date().toISOString().split('T')[0]
    }
  })

  const assetId = watch('assetId')

  useEffect(() => {
    // Get employee ID from session storage
    const storedEmployeeId = sessionStorage.getItem('shortcutEmployeeId')
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId)
    }
  }, [])

  const searchAsset = async () => {
    if (!assetId.trim()) return
    
    setIsSearching(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock asset data
      const mockAsset = {
        id: assetId,
        name: 'Dell Laptop OptiPlex 7090',
        barcode: 'BC123456789',
        assignedTo: employeeId,
        location: 'IT Department - Floor 3',
        assignedDate: '2024-01-01'
      }
      
      setAssetFound(mockAsset)
    } catch (error) {
      console.error('Error searching asset:', error)
      setAssetFound(null)
    } finally {
      setIsSearching(false)
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Asset Return Submitted:', {
        ...data,
        employeeId,
        assetDetails: assetFound,
        returnTimestamp: new Date().toISOString()
      })
      
      setSubmitSuccess(true)
      reset()
      setAssetFound(null)
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting return:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const returnReasons = [
    'End of Assignment',
    'Equipment Upgrade',
    'Malfunction/Repair Needed',
    'Department Transfer',
    'Employee Resignation',
    'Project Completion',
    'Temporary Use Ended',
    'Other'
  ]

  const conditions = [
    { value: 'excellent', label: 'Excellent', color: 'success' },
    { value: 'good', label: 'Good', color: 'primary' },
    { value: 'fair', label: 'Fair', color: 'warning' },
    { value: 'poor', label: 'Poor', color: 'error' },
    { value: 'damaged', label: 'Damaged', color: 'error' }
  ]

  const handleScanBarcode = () => {
    // Simulate barcode scanning
    setValue('assetId', 'AST-001')
    searchAsset()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box className='flex items-center gap-2'>
                <i className='ri-arrow-go-back-line text-2xl' />
                <Typography variant='h5'>Asset Return Form</Typography>
              </Box>
            }
            subheader={
              <Box className='flex items-center gap-2 mt-2'>
                <Typography variant='body2' color='text.secondary'>
                  Return assets back to inventory
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
                  Asset return submitted successfully! The asset will be processed by the inventory team.
                </Typography>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                {/* Asset Search Section */}
                <Grid item xs={12}>
                  <Typography variant='h6' className='mb-3'>
                    1. Asset Identification
                  </Typography>
                  <Grid container spacing={2} alignItems='end'>
                    <Grid item xs={12} md={8}>
                      <Controller
                        name='assetId'
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='Asset ID or Barcode'
                            placeholder='Enter Asset ID or scan barcode'
                            error={!!errors.assetId}
                            helperText={errors.assetId?.message}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  <IconButton 
                                    onClick={handleScanBarcode}
                                    edge='end'
                                    title='Scan Barcode'
                                  >
                                    <i className='ri-qr-scan-line' />
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Button
                        variant='outlined'
                        color='primary'
                        fullWidth
                        onClick={searchAsset}
                        disabled={isSearching || !assetId.trim()}
                        startIcon={
                          isSearching ? 
                          <i className='ri-loader-line animate-spin' /> : 
                          <i className='ri-search-line' />
                        }
                      >
                        {isSearching ? 'Searching...' : 'Search Asset'}
                      </Button>
                    </Grid>
                  </Grid>

                  {assetFound && (
                    <Alert severity='success' className='mt-3'>
                      <Typography variant='body2' fontWeight='medium'>
                        Asset Found: {assetFound.name}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Barcode: {assetFound.barcode} | Location: {assetFound.location}
                      </Typography>
                    </Alert>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                  <Typography variant='h6' className='mt-4 mb-3'>
                    2. Return Details
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='returnReason'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.returnReason}>
                        <InputLabel>Return Reason</InputLabel>
                        <Select {...field} label='Return Reason'>
                          {returnReasons.map((reason) => (
                            <MenuItem key={reason} value={reason}>
                              {reason}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.returnReason && (
                          <Typography variant='caption' color='error' className='ml-3 mt-1'>
                            {errors.returnReason.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='condition'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.condition}>
                        <InputLabel>Asset Condition</InputLabel>
                        <Select {...field} label='Asset Condition'>
                          {conditions.map((condition) => (
                            <MenuItem key={condition.value} value={condition.value}>
                              <Box className='flex items-center gap-2'>
                                <Chip 
                                  label={condition.label} 
                                  size='small' 
                                  color={condition.color}
                                  variant='outlined'
                                />
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.condition && (
                          <Typography variant='caption' color='error' className='ml-3 mt-1'>
                            {errors.condition.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='returnDate'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type='date'
                        label='Return Date'
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ max: new Date().toISOString().split('T')[0] }}
                        error={!!errors.returnDate}
                        helperText={errors.returnDate?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label='All accessories included (cables, chargers, etc.)'
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='notes'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={4}
                        label='Return Notes'
                        placeholder='Please provide detailed notes about the asset condition, any issues, or special instructions...'
                        error={!!errors.notes}
                        helperText={errors.notes?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box className='flex gap-4 justify-end'>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => {
                        reset()
                        setAssetFound(null)
                      }}
                      disabled={isSubmitting}
                    >
                      Reset Form
                    </Button>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      disabled={isSubmitting || !assetFound}
                      startIcon={
                        isSubmitting ? 
                        <i className='ri-loader-line animate-spin' /> : 
                        <i className='ri-check-line' />
                      }
                    >
                      {isSubmitting ? 'Processing Return...' : 'Submit Return'}
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

export default AssetReturnView
