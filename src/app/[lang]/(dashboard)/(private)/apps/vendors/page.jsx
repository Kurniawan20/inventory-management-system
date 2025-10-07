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

// Component Imports
import VendorListTable from '@views/apps/vendors/VendorListTable'
import VendorDialog from '@views/apps/vendors/VendorDialog'

// Server Actions
import { getVendorList } from '@/server/actions/getVendorData'

const VendorManagement = () => {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [totalVendors, setTotalVendors] = useState(0)

  // Load vendors
  const loadVendors = async (filters = {}) => {
    try {
      setLoading(true)
      const result = await getVendorList({
        search: searchTerm,
        ...filters
      })
      setVendors(result.vendors)
      setTotalVendors(result.total)
    } catch (error) {
      console.error('Error loading vendors:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    loadVendors()
  }, [])

  // Search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadVendors()
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const handleAddVendor = () => {
    setSelectedVendor(null)
    setDialogOpen(true)
  }

  const handleEditVendor = (vendor) => {
    setSelectedVendor(vendor)
    setDialogOpen(true)
  }

  const handleDeleteVendor = async (vendorId) => {
    // Handle delete logic here
    await loadVendors()
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setSelectedVendor(null)
  }

  const handleVendorSaved = () => {
    loadVendors()
    handleDialogClose()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box className='flex items-center gap-2'>
                <i className='ri-building-line text-2xl' />
                <Box>
                  <Typography variant='h5'>Vendor Management</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Manage suppliers and vendors for asset procurement
                  </Typography>
                </Box>
              </Box>
            }
            action={
              <Box className='flex items-center gap-4'>
                <Chip 
                  label={`${totalVendors} Vendors`} 
                  color='primary' 
                  variant='tonal'
                />
                <Button
                  variant='contained'
                  startIcon={<i className='ri-add-line' />}
                  onClick={handleAddVendor}
                >
                  Add Vendor
                </Button>
              </Box>
            }
          />
          <CardContent>
            <Box className='flex items-center justify-between gap-4 mb-6'>
              <TextField
                size='small'
                placeholder='Search vendors...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='max-sm:is-full'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-search-line' />
                    </InputAdornment>
                  )
                }}
              />
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
                  Filter
                </Button>
              </Box>
            </Box>

            <VendorListTable
              vendors={vendors}
              loading={loading}
              onEdit={handleEditVendor}
              onDelete={handleDeleteVendor}
            />
          </CardContent>
        </Card>
      </Grid>

      <VendorDialog
        open={dialogOpen}
        vendor={selectedVendor}
        onClose={handleDialogClose}
        onSave={handleVendorSaved}
      />
    </Grid>
  )
}

export default VendorManagement
