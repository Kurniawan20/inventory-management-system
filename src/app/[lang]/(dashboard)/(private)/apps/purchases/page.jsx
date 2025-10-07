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
import PurchaseListTable from '@views/apps/purchases/PurchaseListTable'
import PurchaseDialog from '@views/apps/purchases/PurchaseDialog'

// Server Actions
import { getPurchaseList } from '@/server/actions/getPurchaseData'
import { getVendorList } from '@/server/actions/getVendorData'

const PurchaseManagement = () => {
  const [purchases, setPurchases] = useState([])
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVendor, setSelectedVendor] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState(null)
  const [totalPurchases, setTotalPurchases] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  // Load purchases and vendors
  const loadPurchases = async (filters = {}) => {
    try {
      setLoading(true)
      const result = await getPurchaseList({
        search: searchTerm,
        vendor_id: selectedVendor,
        ...filters
      })
      setPurchases(result.purchases)
      setTotalPurchases(result.total)
      
      // Calculate total value
      const total = result.purchases.reduce((sum, purchase) => sum + purchase.acquisition_value, 0)
      setTotalValue(total)
    } catch (error) {
      console.error('Error loading purchases:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadVendors = async () => {
    try {
      const result = await getVendorList()
      setVendors(result.vendors)
    } catch (error) {
      console.error('Error loading vendors:', error)
    }
  }

  // Initial load
  useEffect(() => {
    loadPurchases()
    loadVendors()
  }, [])

  // Search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadPurchases()
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedVendor])

  const handleAddPurchase = () => {
    setSelectedPurchase(null)
    setDialogOpen(true)
  }

  const handleEditPurchase = (purchase) => {
    setSelectedPurchase(purchase)
    setDialogOpen(true)
  }

  const handleDeletePurchase = async (purchaseId) => {
    await loadPurchases()
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setSelectedPurchase(null)
  }

  const handlePurchaseSaved = () => {
    loadPurchases()
    handleDialogClose()
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box className='flex items-center gap-2'>
                <i className='ri-shopping-cart-line text-2xl' />
                <Box>
                  <Typography variant='h5'>Purchase Management</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Track asset purchases and acquisitions
                  </Typography>
                </Box>
              </Box>
            }
            action={
              <Box className='flex items-center gap-4'>
                <Box className='flex items-center gap-2'>
                  <Chip 
                    label={`${totalPurchases} Purchases`} 
                    color='primary' 
                    variant='tonal'
                  />
                  <Chip 
                    label={formatCurrency(totalValue)} 
                    color='success' 
                    variant='tonal'
                  />
                </Box>
                <Button
                  variant='contained'
                  startIcon={<i className='ri-add-line' />}
                  onClick={handleAddPurchase}
                >
                  Add Purchase
                </Button>
              </Box>
            }
          />
          <CardContent>
            <Box className='flex items-center justify-between gap-4 mb-6 flex-wrap'>
              <Box className='flex items-center gap-4 flex-wrap'>
                <TextField
                  size='small'
                  placeholder='Search purchases...'
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
                  <InputLabel>Filter by Vendor</InputLabel>
                  <Select
                    value={selectedVendor}
                    label='Filter by Vendor'
                    onChange={(e) => setSelectedVendor(e.target.value)}
                  >
                    <MenuItem value=''>All Vendors</MenuItem>
                    {vendors.map((vendor) => (
                      <MenuItem key={vendor.vendor_id} value={vendor.vendor_id}>
                        {vendor.vendor_name}
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
                  startIcon={<i className='ri-filter-line' />}
                  size='small'
                >
                  More Filters
                </Button>
              </Box>
            </Box>

            <PurchaseListTable
              purchases={purchases}
              loading={loading}
              onEdit={handleEditPurchase}
              onDelete={handleDeletePurchase}
            />
          </CardContent>
        </Card>
      </Grid>

      <PurchaseDialog
        open={dialogOpen}
        purchase={selectedPurchase}
        vendors={vendors}
        onClose={handleDialogClose}
        onSave={handlePurchaseSaved}
      />
    </Grid>
  )
}

export default PurchaseManagement
