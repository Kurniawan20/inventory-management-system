'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import InventoryMovementTable from '@views/apps/inventory/movements/InventoryMovementTable'
import InventoryMovementDialog from '@views/apps/inventory/movements/InventoryMovementDialog'
import InventoryMovementStats from '@views/apps/inventory/movements/InventoryMovementStats'

// Server Actions
import { getInventoryMovementList, getInventoryMovementSummary } from '@/server/actions/getInventoryMovementData'

const InventoryMovementPage = () => {
  const [movements, setMovements] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [movementType, setMovementType] = useState('')
  const [trackingMethod, setTrackingMethod] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedMovement, setSelectedMovement] = useState(null)
  const [totalMovements, setTotalMovements] = useState(0)

  // Load movements and summary
  const loadMovements = async (filters = {}) => {
    try {
      setLoading(true)
      const [movementResult, summaryResult] = await Promise.all([
        getInventoryMovementList({
          search: searchTerm,
          movement_type: movementType,
          tracking_method: trackingMethod,
          ...filters
        }),
        getInventoryMovementSummary()
      ])
      
      setMovements(movementResult.movements)
      setTotalMovements(movementResult.total)
      setSummary(summaryResult)
    } catch (error) {
      console.error('Error loading movements:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    loadMovements()
  }, [])

  // Search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadMovements()
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [searchTerm, movementType, trackingMethod])

  const handleAddMovement = () => {
    setSelectedMovement(null)
    setDialogOpen(true)
  }

  const handleEditMovement = (movement) => {
    setSelectedMovement(movement)
    setDialogOpen(true)
  }

  const handleDeleteMovement = async (movementId) => {
    await loadMovements()
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setSelectedMovement(null)
  }

  const handleMovementSaved = () => {
    loadMovements()
    handleDialogClose()
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const movementTypes = [
    { value: 'inbound', label: 'Inbound', color: 'success' },
    { value: 'outbound', label: 'Outbound', color: 'error' },
    { value: 'transfer', label: 'Transfer', color: 'info' },
    { value: 'adjustment', label: 'Adjustment', color: 'warning' }
  ]

  const trackingMethods = [
    { value: 'FIFO', label: 'FIFO (First In, First Out)' },
    { value: 'LIFO', label: 'LIFO (Last In, First Out)' },
    { value: 'FEFO', label: 'FEFO (First Expired, First Out)' }
  ]

  return (
    <Grid container spacing={6}>
      {/* Statistics Cards */}
      {summary && (
        <Grid item xs={12}>
          <InventoryMovementStats summary={summary} />
        </Grid>
      )}

      {/* Main Content */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box className='flex items-center gap-2'>
                <i className='ri-exchange-line text-2xl' />
                <Box>
                  <Typography variant='h5'>Inventory Movement</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Track inventory movements with FIFO/LIFO/FEFO methods
                  </Typography>
                </Box>
              </Box>
            }
            action={
              <Box className='flex items-center gap-4'>
                <Box className='flex items-center gap-2'>
                  <Chip 
                    label={`${totalMovements} Movements`} 
                    color='primary' 
                    variant='tonal'
                  />
                  {summary && (
                    <Chip 
                      label={formatCurrency(summary.total_value)} 
                      color='success' 
                      variant='tonal'
                    />
                  )}
                </Box>
                <Button
                  variant='contained'
                  startIcon={<i className='ri-add-line' />}
                  onClick={handleAddMovement}
                >
                  Add Movement
                </Button>
              </Box>
            }
          />
          <CardContent>
            <Box className='flex items-center justify-between gap-4 mb-6 flex-wrap'>
              <Box className='flex items-center gap-4 flex-wrap'>
                <TextField
                  size='small'
                  placeholder='Search movements...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='min-w-64'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-search-line' />
                      </InputAdornment>
                    )
                  }}
                />
                <FormControl size='small' className='min-w-48'>
                  <InputLabel>Movement Type</InputLabel>
                  <Select
                    value={movementType}
                    label='Movement Type'
                    onChange={(e) => setMovementType(e.target.value)}
                  >
                    <MenuItem value=''>All Types</MenuItem>
                    {movementTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        <Box className='flex items-center gap-2'>
                          <Chip 
                            label={type.label} 
                            color={type.color} 
                            size='small' 
                            variant='outlined'
                          />
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size='small' className='min-w-48'>
                  <InputLabel>Tracking Method</InputLabel>
                  <Select
                    value={trackingMethod}
                    label='Tracking Method'
                    onChange={(e) => setTrackingMethod(e.target.value)}
                  >
                    <MenuItem value=''>All Methods</MenuItem>
                    {trackingMethods.map((method) => (
                      <MenuItem key={method.value} value={method.value}>
                        {method.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box className='flex items-center gap-2'>
                <Button
                  variant='outlined'
                  startIcon={<i className='ri-download-line' />}
                  size='small'
                >
                  Export
                </Button>
                <Button
                  variant='outlined'
                  startIcon={<i className='ri-bar-chart-line' />}
                  size='small'
                >
                  Analytics
                </Button>
              </Box>
            </Box>

            <InventoryMovementTable
              movements={movements}
              loading={loading}
              onEdit={handleEditMovement}
              onDelete={handleDeleteMovement}
            />
          </CardContent>
        </Card>
      </Grid>

      <InventoryMovementDialog
        open={dialogOpen}
        movement={selectedMovement}
        onClose={handleDialogClose}
        onSave={handleMovementSaved}
      />
    </Grid>
  )
}

export default InventoryMovementPage
