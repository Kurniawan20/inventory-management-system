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
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Collapse from '@mui/material/Collapse'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, pipe, nonEmpty } from 'valibot'

const schema = object({
  searchQuery: pipe(string(), nonEmpty('Please enter asset ID, barcode, or name to search'))
})

const AssetTrackingView = () => {
  const [employeeId, setEmployeeId] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [expandedRows, setExpandedRows] = useState(new Set())

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      searchQuery: ''
    }
  })

  const searchQuery = watch('searchQuery')

  useEffect(() => {
    // Get employee ID from session storage
    const storedEmployeeId = sessionStorage.getItem('shortcutEmployeeId')
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId)
    }
  }, [])

  const onSubmit = async (data) => {
    setIsSearching(true)
    setHasSearched(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Enhanced mock search results with more detailed information
      const mockResults = [
        {
          id: 'AST-001',
          name: 'Dell Laptop OptiPlex 7090',
          barcode: 'BC123456789',
          status: 'In Use',
          location: 'IT Department - Floor 3, Desk 15',
          assignedTo: 'John Doe (EMP-12345)',
          lastUpdated: '2024-01-15 14:30',
          condition: 'Good',
          category: 'Computer & IT Equipment',
          serialNumber: 'DL7090-2024-001',
          purchaseDate: '2023-06-15',
          warrantyExpiry: '2026-06-15',
          value: 'Rp 15,000,000',
          department: 'Information Technology',
          maintenanceSchedule: '2024-03-15',
          notes: 'Regular maintenance completed. Performance optimal.'
        },
        {
          id: 'AST-002', 
          name: 'Office Chair Ergonomic Herman Miller',
          barcode: 'BC987654321',
          status: 'Available',
          location: 'Warehouse - Section A, Shelf 12',
          assignedTo: '-',
          lastUpdated: '2024-01-14 09:15',
          condition: 'Excellent',
          category: 'Office Furniture',
          serialNumber: 'HM-ERG-2024-002',
          purchaseDate: '2023-08-20',
          warrantyExpiry: '2033-08-20',
          value: 'Rp 8,500,000',
          department: 'General Pool',
          maintenanceSchedule: '2024-08-20',
          notes: 'New condition, ready for assignment.'
        },
        {
          id: 'AST-003',
          name: 'Safety Helmet MSA V-Gard',
          barcode: 'BC456789123',
          status: 'In Use',
          location: 'Field Operations - Site B',
          assignedTo: 'Ahmad Rizki (EMP-67890)',
          lastUpdated: '2024-01-16 08:45',
          condition: 'Good',
          category: 'Safety Equipment',
          serialNumber: 'MSA-VG-2024-003',
          purchaseDate: '2023-11-10',
          warrantyExpiry: '2025-11-10',
          value: 'Rp 450,000',
          department: 'Field Operations',
          maintenanceSchedule: '2024-05-10',
          notes: 'Regular safety inspection passed.'
        }
      ].filter(asset => 
        asset.name.toLowerCase().includes(data.searchQuery.toLowerCase()) ||
        asset.id.toLowerCase().includes(data.searchQuery.toLowerCase()) ||
        asset.barcode.toLowerCase().includes(data.searchQuery.toLowerCase()) ||
        asset.serialNumber.toLowerCase().includes(data.searchQuery.toLowerCase()) ||
        asset.assignedTo.toLowerCase().includes(data.searchQuery.toLowerCase())
      )
      
      setSearchResults(mockResults)
    } catch (error) {
      console.error('Error searching assets:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in use': return 'primary'
      case 'available': return 'success'
      case 'maintenance': return 'warning'
      case 'retired': return 'error'
      default: return 'default'
    }
  }

  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'excellent': return 'success'
      case 'good': return 'primary'
      case 'fair': return 'warning'
      case 'poor': return 'error'
      default: return 'default'
    }
  }

  const handleScanBarcode = () => {
    // Simulate barcode scanning
    alert('Barcode scanner functionality would be implemented here')
  }

  const handleViewDetails = (asset) => {
    setSelectedAsset(asset)
    setDetailsOpen(true)
  }

  const handleCloseDetails = () => {
    setDetailsOpen(false)
    setSelectedAsset(null)
  }

  const toggleRowExpansion = (assetId) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(assetId)) {
      newExpanded.delete(assetId)
    } else {
      newExpanded.add(assetId)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box className='flex items-center gap-2'>
                <i className='ri-map-pin-line text-2xl' />
                <Typography variant='h5'>Asset Tracking</Typography>
              </Box>
            }
            subheader={
              <Box className='flex items-center gap-2 mt-2'>
                <Typography variant='body2' color='text.secondary'>
                  Search and track assets by ID, barcode, or name
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4} alignItems='end'>
                <Grid item xs={12} md={8}>
                  <Controller
                    name='searchQuery'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Search Assets'
                        placeholder='Enter Asset ID, Barcode, or Asset Name'
                        error={!!errors.searchQuery}
                        helperText={errors.searchQuery?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <i className='ri-search-line' />
                            </InputAdornment>
                          ),
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
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    disabled={isSearching || !searchQuery.trim()}
                    startIcon={
                      isSearching ? 
                      <i className='ri-loader-line animate-spin' /> : 
                      <i className='ri-search-line' />
                    }
                  >
                    {isSearching ? 'Searching...' : 'Search Assets'}
                  </Button>
                </Grid>
              </Grid>
            </form>

            {hasSearched && (
              <Box className='mt-6'>
                <Divider className='mb-4' />
                
                {searchResults.length > 0 ? (
                  <>
                    <Alert severity='success' className='mb-4'>
                      <Typography variant='body2' fontWeight='medium'>
                        ✅ Search Successful! Found {searchResults.length} asset{searchResults.length > 1 ? 's' : ''} matching your inquiry.
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Inquiry processed by Employee ID: {employeeId} at {new Date().toLocaleString()}
                      </Typography>
                    </Alert>
                    
                    <Typography variant='h6' className='mb-4'>
                      Asset Inquiry Results ({searchResults.length} found)
                    </Typography>
                    <TableContainer component={Paper} variant='outlined'>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Asset ID</TableCell>
                            <TableCell>Asset Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Assigned To</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {searchResults.map((asset) => (
                            <>
                              <TableRow key={asset.id} hover>
                                <TableCell>
                                  <IconButton 
                                    size='small' 
                                    onClick={() => toggleRowExpansion(asset.id)}
                                    title='Toggle Details'
                                  >
                                    <i className={expandedRows.has(asset.id) ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} />
                                  </IconButton>
                                </TableCell>
                                <TableCell>
                                  <Typography variant='body2' fontWeight='medium' color='primary'>
                                    {asset.id}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography variant='body2' fontWeight='medium'>
                                    {asset.name}
                                  </Typography>
                                  <Typography variant='caption' color='text.secondary'>
                                    {asset.category}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Chip 
                                    label={asset.status} 
                                    size='small' 
                                    color={getStatusColor(asset.status)}
                                    variant='outlined'
                                  />
                                </TableCell>
                                <TableCell>
                                  <Typography variant='body2'>
                                    {asset.location}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography variant='body2'>
                                    {asset.assignedTo}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Chip 
                                    label={asset.condition} 
                                    size='small' 
                                    color={getConditionColor(asset.condition)}
                                    variant='filled'
                                  />
                                </TableCell>
                                <TableCell>
                                  <Box className='flex gap-1'>
                                    <IconButton 
                                      size='small' 
                                      title='View Full Details'
                                      onClick={() => handleViewDetails(asset)}
                                    >
                                      <i className='ri-eye-line' />
                                    </IconButton>
                                    <IconButton size='small' title='Update Location'>
                                      <i className='ri-map-pin-line' />
                                    </IconButton>
                                  </Box>
                                </TableCell>
                              </TableRow>
                              
                              {/* Expandable Row Details */}
                              <TableRow>
                                <TableCell colSpan={8} style={{ paddingBottom: 0, paddingTop: 0 }}>
                                  <Collapse in={expandedRows.has(asset.id)} timeout="auto" unmountOnExit>
                                    <Box className='p-4 bg-gray-50'>
                                      <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                          <Typography variant='subtitle2' className='mb-2'>Asset Information</Typography>
                                          <Box className='space-y-1'>
                                            <Typography variant='body2'><strong>Barcode:</strong> {asset.barcode}</Typography>
                                            <Typography variant='body2'><strong>Serial Number:</strong> {asset.serialNumber}</Typography>
                                            <Typography variant='body2'><strong>Department:</strong> {asset.department}</Typography>
                                            <Typography variant='body2'><strong>Value:</strong> {asset.value}</Typography>
                                          </Box>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                          <Typography variant='subtitle2' className='mb-2'>Dates & Maintenance</Typography>
                                          <Box className='space-y-1'>
                                            <Typography variant='body2'><strong>Purchase Date:</strong> {asset.purchaseDate}</Typography>
                                            <Typography variant='body2'><strong>Warranty Expiry:</strong> {asset.warrantyExpiry}</Typography>
                                            <Typography variant='body2'><strong>Next Maintenance:</strong> {asset.maintenanceSchedule}</Typography>
                                            <Typography variant='body2'><strong>Last Updated:</strong> {asset.lastUpdated}</Typography>
                                          </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Typography variant='subtitle2' className='mb-1'>Notes</Typography>
                                          <Typography variant='body2' color='text.secondary'>
                                            {asset.notes}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  </Collapse>
                                </TableCell>
                              </TableRow>
                            </>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                ) : (
                  <Alert severity='warning'>
                    <Typography variant='body2' fontWeight='medium'>
                      ❌ No Assets Found
                    </Typography>
                    <Typography variant='body2'>
                      No assets found matching your search criteria "{searchQuery}". Please verify the Asset ID, Barcode, or Name and try again.
                    </Typography>
                  </Alert>
                )}
              </Box>
            )}

            {!hasSearched && (
              <Box className='mt-6 p-6 bg-gray-50 rounded-lg text-center'>
                <i className='ri-search-line text-4xl text-gray-400 mb-2' />
                <Typography variant='h6' color='text.secondary' className='mb-2'>
                  Start Asset Tracking
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Enter an Asset ID, Barcode, or Asset Name to begin tracking
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Asset Details Modal */}
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        maxWidth='md'
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle className='flex items-center justify-between'>
          <Box>
            <Typography variant='h5' component='div'>
              Asset Details
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Complete information for {selectedAsset?.id}
            </Typography>
          </Box>
          <IconButton onClick={handleCloseDetails} size='small'>
            <i className='ri-close-line' />
          </IconButton>
        </DialogTitle>

        <DialogContent className='pt-4'>
          {selectedAsset && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='h6' className='mb-3'>Basic Information</Typography>
                    <Box className='space-y-2'>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Asset ID:</Typography>
                        <Typography variant='body2' fontWeight='medium'>{selectedAsset.id}</Typography>
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Asset Name:</Typography>
                        <Typography variant='body2' fontWeight='medium'>{selectedAsset.name}</Typography>
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Category:</Typography>
                        <Typography variant='body2'>{selectedAsset.category}</Typography>
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Barcode:</Typography>
                        <Typography variant='body2' fontFamily='monospace'>{selectedAsset.barcode}</Typography>
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Serial Number:</Typography>
                        <Typography variant='body2' fontFamily='monospace'>{selectedAsset.serialNumber}</Typography>
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Value:</Typography>
                        <Typography variant='body2' fontWeight='medium' color='primary'>{selectedAsset.value}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='h6' className='mb-3'>Status & Location</Typography>
                    <Box className='space-y-2'>
                      <Box className='flex justify-between items-center'>
                        <Typography variant='body2' color='text.secondary'>Status:</Typography>
                        <Chip 
                          label={selectedAsset.status} 
                          size='small' 
                          color={getStatusColor(selectedAsset.status)}
                          variant='outlined'
                        />
                      </Box>
                      <Box className='flex justify-between items-center'>
                        <Typography variant='body2' color='text.secondary'>Condition:</Typography>
                        <Chip 
                          label={selectedAsset.condition} 
                          size='small' 
                          color={getConditionColor(selectedAsset.condition)}
                          variant='filled'
                        />
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Location:</Typography>
                        <Typography variant='body2'>{selectedAsset.location}</Typography>
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Assigned To:</Typography>
                        <Typography variant='body2'>{selectedAsset.assignedTo}</Typography>
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Department:</Typography>
                        <Typography variant='body2'>{selectedAsset.department}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='h6' className='mb-3'>Purchase & Warranty</Typography>
                    <Box className='space-y-2'>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Purchase Date:</Typography>
                        <Typography variant='body2'>{selectedAsset.purchaseDate}</Typography>
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Warranty Expiry:</Typography>
                        <Typography variant='body2'>{selectedAsset.warrantyExpiry}</Typography>
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Next Maintenance:</Typography>
                        <Typography variant='body2'>{selectedAsset.maintenanceSchedule}</Typography>
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Last Updated:</Typography>
                        <Typography variant='body2'>{selectedAsset.lastUpdated}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='h6' className='mb-3'>Inquiry Information</Typography>
                    <Box className='space-y-2'>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Inquired By:</Typography>
                        <Typography variant='body2' fontWeight='medium'>Employee ID: {employeeId}</Typography>
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Inquiry Time:</Typography>
                        <Typography variant='body2'>{new Date().toLocaleString()}</Typography>
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' color='text.secondary'>Access Level:</Typography>
                        <Chip label='Shortcut Access' size='small' color='info' variant='outlined' />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='h6' className='mb-2'>Notes & Comments</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {selectedAsset.notes}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions className='p-6 pt-4'>
          <Button
            onClick={handleCloseDetails}
            variant='outlined'
            color='secondary'
          >
            Close
          </Button>
          <Button
            variant='contained'
            color='primary'
            startIcon={<i className='ri-printer-line' />}
          >
            Print Details
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default AssetTrackingView
