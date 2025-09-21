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
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

// Component Imports
import AssetListTable from './AssetListTable'
import AssetStatCards from './AssetStatCards'

const AssetListView = ({ initialAssets, categories, statistics, initialFilters }) => {
  const [assets, setAssets] = useState(initialAssets)
  const [filteredAssets, setFilteredAssets] = useState(initialAssets)
  const [filters, setFilters] = useState({
    search: initialFilters.search || '',
    status: initialFilters.status || '',
    category: initialFilters.category || '',
    facility: initialFilters.facility || '',
    criticality: initialFilters.criticality || ''
  })
  const [loading, setLoading] = useState(false)

  // Filter assets based on current filters
  useEffect(() => {
    let filtered = assets

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm) ||
        asset.assetCode.toLowerCase().includes(searchTerm) ||
        asset.description.toLowerCase().includes(searchTerm) ||
        asset.manufacturer.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.status) {
      filtered = filtered.filter(asset => asset.status === filters.status)
    }

    if (filters.category) {
      filtered = filtered.filter(asset => asset.category.primary === filters.category)
    }

    if (filters.facility) {
      filtered = filtered.filter(asset => asset.location.facility === filters.facility)
    }

    if (filters.criticality) {
      filtered = filtered.filter(asset => asset.criticality === filters.criticality)
    }

    setFilteredAssets(filtered)
  }, [assets, filters])

  const handleFilterChange = (field) => (event) => {
    setFilters(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      category: '',
      facility: '',
      criticality: ''
    })
  }

  const refreshData = async () => {
    setLoading(true)
    try {
      // In a real app, this would call the API
      // For demo, we'll just simulate a refresh
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setLoading(false)
    }
  }

  const facilities = [
    'Pertamina Refinery Cilacap',
    'Pertamina Refinery Balikpapan',
    'Pertamina Refinery Dumai',
    'Pertamina Terminal Tanjung Priok',
    'Pertamina Office Jakarta'
  ]

  const statusOptions = ['Active', 'Under Maintenance', 'Inactive', 'Disposed']
  const criticalityOptions = ['Very High', 'High', 'Medium', 'Low', 'Very Low']

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length

  return (
    <Grid container spacing={6}>
      {/* Statistics Cards */}
      <Grid item xs={12}>
        <AssetStatCards statistics={statistics} />
      </Grid>

      {/* Filters */}
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Asset Filters'
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
                  label='Search Assets'
                  value={filters.search}
                  onChange={handleFilterChange('search')}
                  placeholder='Name, code, description...'
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
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={filters.category}
                    onChange={handleFilterChange('category')}
                    label='Category'
                  >
                    <MenuItem value=''>All Categories</MenuItem>
                    {categories.primaryCategories?.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Facility</InputLabel>
                  <Select
                    value={filters.facility}
                    onChange={handleFilterChange('facility')}
                    label='Facility'
                  >
                    <MenuItem value=''>All Facilities</MenuItem>
                    {facilities.map((facility) => (
                      <MenuItem key={facility} value={facility}>
                        {facility}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Criticality</InputLabel>
                  <Select
                    value={filters.criticality}
                    onChange={handleFilterChange('criticality')}
                    label='Criticality'
                  >
                    <MenuItem value=''>All Criticality</MenuItem>
                    {criticalityOptions.map((criticality) => (
                      <MenuItem key={criticality} value={criticality}>
                        <Box className='flex items-center gap-2'>
                          <Box
                            className={`w-3 h-3 rounded-full ${
                              criticality === 'Very High' ? 'bg-red-500' :
                              criticality === 'High' ? 'bg-orange-500' :
                              criticality === 'Medium' ? 'bg-yellow-500' :
                              criticality === 'Low' ? 'bg-blue-500' : 'bg-green-500'
                            }`}
                          />
                          {criticality}
                        </Box>
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
                  {filters.status && (
                    <Chip
                      label={`Status: ${filters.status}`}
                      onDelete={() => setFilters(prev => ({ ...prev, status: '' }))}
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
                  {filters.facility && (
                    <Chip
                      label={`Facility: ${filters.facility}`}
                      onDelete={() => setFilters(prev => ({ ...prev, facility: '' }))}
                      size='small'
                    />
                  )}
                  {filters.criticality && (
                    <Chip
                      label={`Criticality: ${filters.criticality}`}
                      onDelete={() => setFilters(prev => ({ ...prev, criticality: '' }))}
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
            Assets ({filteredAssets.length} of {assets.length})
          </Typography>
          <Button
            variant='contained'
            startIcon={<i className='ri-add-line' />}
            href='/en/apps/assets/registration'
          >
            Register New Asset
          </Button>
        </Box>
      </Grid>

      {/* Asset List Table */}
      <Grid item xs={12}>
        <AssetListTable 
          assets={filteredAssets}
          loading={loading}
        />
      </Grid>
    </Grid>
  )
}

export default AssetListView
