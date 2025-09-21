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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'

// Component Imports
import InventoryTable from './InventoryTable'
import InventoryStatCards from './InventoryStatCards'

const WarehouseInventoryView = ({ initialInventory, warehouses, statistics, initialFilters }) => {
  const [inventory, setInventory] = useState(initialInventory)
  const [filteredInventory, setFilteredInventory] = useState(initialInventory)
  const [filters, setFilters] = useState({
    search: initialFilters.search || '',
    warehouseId: initialFilters.warehouseId || '',
    category: initialFilters.category || '',
    status: initialFilters.status || ''
  })
  const [loading, setLoading] = useState(false)

  // Filter inventory based on current filters
  useEffect(() => {
    let filtered = inventory

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(item => 
        item.itemName.toLowerCase().includes(searchTerm) ||
        item.itemCode.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.warehouseId) {
      filtered = filtered.filter(item => item.warehouseId === filters.warehouseId)
    }

    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category)
    }

    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status)
    }

    setFilteredInventory(filtered)
  }, [inventory, filters])

  const handleFilterChange = (field) => (event) => {
    setFilters(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      warehouseId: '',
      category: '',
      status: ''
    })
  }

  const refreshData = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    'Raw Materials',
    'Chemicals',
    'Spare Parts',
    'Finished Products',
    'Lubricants',
    'Safety Equipment',
    'Consumables'
  ]

  const statusOptions = ['Available', 'Low Stock', 'Out of Stock', 'Reserved', 'Expired']

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length

  return (
    <Grid container spacing={6}>
      {/* Statistics Cards */}
      <Grid item xs={12}>
        <InventoryStatCards statistics={statistics} />
      </Grid>

      {/* Filters */}
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Inventory Filters'
            action={
              <Box className='flex gap-2'>
                <Button
                  variant='outlined'
                  onClick={refreshData}
                  disabled={loading}
                  startIcon={<i className='ri-refresh-line' />}
                >
                  Refresh
                </Button>
                {activeFiltersCount > 0 && (
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={clearFilters}
                    startIcon={<i className='ri-close-line' />}
                  >
                    Clear Filters ({activeFiltersCount})
                  </Button>
                )}
              </Box>
            }
          />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label='Search Items'
                  value={filters.search}
                  onChange={handleFilterChange('search')}
                  placeholder='Item name, code, category...'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-search-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Warehouse</InputLabel>
                  <Select
                    value={filters.warehouseId}
                    onChange={handleFilterChange('warehouseId')}
                    label='Warehouse'
                  >
                    <MenuItem value=''>All Warehouses</MenuItem>
                    {warehouses.map((warehouse) => (
                      <MenuItem key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={filters.category}
                    onChange={handleFilterChange('category')}
                    label='Category'
                  >
                    <MenuItem value=''>All Categories</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filters.status}
                    onChange={handleFilterChange('status')}
                    label='Status'
                  >
                    <MenuItem value=''>All Status</MenuItem>
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <Box className='mt-4'>
                <Typography variant='body2' className='mb-2'>
                  Active Filters:
                </Typography>
                <Box className='flex flex-wrap gap-2'>
                  {filters.search && (
                    <Chip
                      label={`Search: "${filters.search}"`}
                      onDelete={() => setFilters(prev => ({ ...prev, search: '' }))}
                      size='small'
                    />
                  )}
                  {filters.warehouseId && (
                    <Chip
                      label={`Warehouse: ${warehouses.find(w => w.id === filters.warehouseId)?.name}`}
                      onDelete={() => setFilters(prev => ({ ...prev, warehouseId: '' }))}
                      size='small'
                    />
                  )}
                  {filters.category && (
                    <Chip
                      label={`Category: ${filters.category}`}
                      onDelete={() => setFilters(prev => ({ ...prev, category: '' }))}
                      size='small'
                    />
                  )}
                  {filters.status && (
                    <Chip
                      label={`Status: ${filters.status}`}
                      onDelete={() => setFilters(prev => ({ ...prev, status: '' }))}
                      size='small'
                    />
                  )}
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Results Summary */}
      <Grid item xs={12}>
        <Box className='flex justify-between items-center mb-4'>
          <Typography variant='h6'>
            Inventory Items ({filteredInventory.length} of {inventory.length})
          </Typography>
          <Box className='flex gap-2'>
            <Button
              variant='outlined'
              startIcon={<i className='ri-download-line' />}
            >
              Export
            </Button>
            <Button
              variant='contained'
              startIcon={<i className='ri-add-line' />}
            >
              Add Item
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* Inventory Table */}
      <Grid item xs={12}>
        <InventoryTable 
          inventory={filteredInventory}
          warehouses={warehouses}
          loading={loading}
        />
      </Grid>
    </Grid>
  )
}

export default WarehouseInventoryView
