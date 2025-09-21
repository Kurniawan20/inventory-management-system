'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import LinearProgress from '@mui/material/LinearProgress'

// Third-party Imports
import { format, addYears, differenceInMonths } from 'date-fns'

// Dummy data for assets
const dummyAssets = [
  {
    id: 'AST-001',
    name: 'Excavator Komatsu PC200',
    category: 'Heavy Equipment',
    purchaseDate: '2020-01-15',
    purchasePrice: 850000000,
    currentValue: 680000000,
    depreciationMethod: 'straight-line',
    usefulLife: 10,
    salvageValue: 85000000,
    location: 'Site A - Balikpapan',
    status: 'Active'
  },
  {
    id: 'AST-002',
    name: 'Generator Set 500KVA',
    category: 'Power Equipment',
    purchaseDate: '2019-06-20',
    purchasePrice: 450000000,
    currentValue: 315000000,
    depreciationMethod: 'declining-balance',
    usefulLife: 8,
    salvageValue: 45000000,
    location: 'Site B - Cilacap',
    status: 'Active'
  },
  {
    id: 'AST-003',
    name: 'Safety Equipment Set',
    category: 'Safety Equipment',
    purchaseDate: '2021-03-10',
    purchasePrice: 75000000,
    currentValue: 52500000,
    depreciationMethod: 'straight-line',
    usefulLife: 5,
    salvageValue: 7500000,
    location: 'Warehouse Jakarta',
    status: 'Active'
  },
  {
    id: 'AST-004',
    name: 'Drilling Equipment',
    category: 'Drilling Equipment',
    purchaseDate: '2018-11-05',
    purchasePrice: 1200000000,
    currentValue: 720000000,
    depreciationMethod: 'units-of-production',
    usefulLife: 12,
    salvageValue: 120000000,
    location: 'Site C - Dumai',
    status: 'Active'
  }
]

const depreciationMethods = [
  { value: 'straight-line', label: 'Straight Line (Garis Lurus)' },
  { value: 'declining-balance', label: 'Declining Balance (Saldo Menurun)' },
  { value: 'double-declining', label: 'Double Declining Balance' },
  { value: 'units-of-production', label: 'Units of Production' },
  { value: 'sum-of-years', label: 'Sum of Years Digits' }
]

const AssetDepreciation = () => {
  const [assets, setAssets] = useState(dummyAssets)
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [calculationDialog, setCalculationDialog] = useState(false)
  const [adjustmentDialog, setAdjustmentDialog] = useState(false)
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Calculate depreciation for an asset
  const calculateDepreciation = (asset) => {
    const purchaseDate = new Date(asset.purchaseDate)
    const currentDate = new Date()
    const monthsElapsed = differenceInMonths(currentDate, purchaseDate)
    const yearsElapsed = monthsElapsed / 12

    let annualDepreciation = 0
    let accumulatedDepreciation = 0
    let bookValue = asset.purchasePrice

    switch (asset.depreciationMethod) {
      case 'straight-line':
        annualDepreciation = (asset.purchasePrice - asset.salvageValue) / asset.usefulLife
        accumulatedDepreciation = Math.min(annualDepreciation * yearsElapsed, asset.purchasePrice - asset.salvageValue)
        bookValue = asset.purchasePrice - accumulatedDepreciation
        break
      
      case 'declining-balance':
        const rate = 2 / asset.usefulLife // Double declining rate
        let remainingValue = asset.purchasePrice
        accumulatedDepreciation = 0
        for (let year = 1; year <= Math.floor(yearsElapsed); year++) {
          const yearlyDepreciation = remainingValue * rate
          accumulatedDepreciation += yearlyDepreciation
          remainingValue -= yearlyDepreciation
        }
        bookValue = asset.purchasePrice - accumulatedDepreciation
        annualDepreciation = bookValue * rate
        break
      
      default:
        annualDepreciation = (asset.purchasePrice - asset.salvageValue) / asset.usefulLife
        accumulatedDepreciation = Math.min(annualDepreciation * yearsElapsed, asset.purchasePrice - asset.salvageValue)
        bookValue = asset.purchasePrice - accumulatedDepreciation
    }

    return {
      annualDepreciation: Math.max(0, annualDepreciation),
      accumulatedDepreciation: Math.max(0, accumulatedDepreciation),
      bookValue: Math.max(asset.salvageValue, bookValue),
      depreciationRate: ((accumulatedDepreciation / asset.purchasePrice) * 100).toFixed(2),
      remainingLife: Math.max(0, asset.usefulLife - yearsElapsed).toFixed(1)
    }
  }

  // Generate depreciation schedule
  const generateDepreciationSchedule = (asset) => {
    const schedule = []
    const purchaseDate = new Date(asset.purchaseDate)
    let bookValue = asset.purchasePrice
    
    for (let year = 1; year <= asset.usefulLife; year++) {
      let annualDepreciation = 0
      
      switch (asset.depreciationMethod) {
        case 'straight-line':
          annualDepreciation = (asset.purchasePrice - asset.salvageValue) / asset.usefulLife
          break
        case 'declining-balance':
          const rate = 2 / asset.usefulLife
          annualDepreciation = bookValue * rate
          break
        default:
          annualDepreciation = (asset.purchasePrice - asset.salvageValue) / asset.usefulLife
      }
      
      const accumulatedDepreciation = schedule.reduce((sum, item) => sum + item.annualDepreciation, 0) + annualDepreciation
      bookValue = Math.max(asset.salvageValue, asset.purchasePrice - accumulatedDepreciation)
      
      schedule.push({
        year,
        date: format(addYears(purchaseDate, year), 'yyyy-MM-dd'),
        beginningValue: year === 1 ? asset.purchasePrice : schedule[year - 2].endingValue,
        annualDepreciation: Math.round(annualDepreciation),
        accumulatedDepreciation: Math.round(accumulatedDepreciation),
        endingValue: Math.round(bookValue)
      })
    }
    
    return schedule
  }

  // Filter assets
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !filterCategory || asset.category === filterCategory
    const matchesStatus = !filterStatus || asset.status === filterStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get unique categories
  const categories = [...new Set(assets.map(asset => asset.category))]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const handleViewCalculation = (asset) => {
    setSelectedAsset(asset)
    setCalculationDialog(true)
  }

  const handleAdjustValue = (asset) => {
    setSelectedAsset(asset)
    setAdjustmentDialog(true)
  }

  return (
    <Grid container spacing={6}>
      {/* Header and Filters */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Asset Depreciation Management"
            subheader="Kelola penyusutan aset dan perhitungan nilai buku"
          />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Search Assets"
                  placeholder="Search by asset name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={filterCategory}
                    label="Category"
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    label="Status"
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Disposed">Disposed</MenuItem>
                    <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ height: '56px' }}
                  onClick={() => {
                    setSearchTerm('')
                    setFilterCategory('')
                    setFilterStatus('')
                  }}
                >
                  Reset Filters
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Assets Depreciation Table */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Assets Depreciation Overview"
            subheader={`Showing ${filteredAssets.length} assets`}
          />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset ID</TableCell>
                    <TableCell>Asset Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Purchase Price</TableCell>
                    <TableCell>Current Book Value</TableCell>
                    <TableCell>Depreciation Rate</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Remaining Life</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAssets.map((asset) => {
                    const depreciation = calculateDepreciation(asset)
                    return (
                      <TableRow key={asset.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {asset.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {asset.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {asset.location}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={asset.category} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>{formatCurrency(asset.purchasePrice)}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {formatCurrency(depreciation.bookValue)}
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={parseFloat(depreciation.depreciationRate)}
                              sx={{ mt: 1, height: 4, borderRadius: 2 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color={parseFloat(depreciation.depreciationRate) > 75 ? 'error' : 'text.primary'}>
                            {depreciation.depreciationRate}%
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={depreciationMethods.find(m => m.value === asset.depreciationMethod)?.label || asset.depreciationMethod}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {depreciation.remainingLife} years
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="View Calculation">
                              <IconButton
                                size="small"
                                onClick={() => handleViewCalculation(asset)}
                              >
                                <i className='ri-calculator-line' />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Adjust Value">
                              <IconButton
                                size="small"
                                onClick={() => handleAdjustValue(asset)}
                              >
                                <i className='ri-edit-line' />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="View History">
                              <IconButton size="small">
                                <i className='ri-history-line' />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Depreciation Calculation Dialog */}
      <Dialog
        open={calculationDialog}
        onClose={() => setCalculationDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Depreciation Calculation - {selectedAsset?.name}
        </DialogTitle>
        <DialogContent>
          {selectedAsset && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Asset Information" />
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Asset ID:</Typography>
                        <Typography variant="body2">{selectedAsset.id}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Purchase Date:</Typography>
                        <Typography variant="body2">{format(new Date(selectedAsset.purchaseDate), 'dd MMM yyyy')}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Purchase Price:</Typography>
                        <Typography variant="body2">{formatCurrency(selectedAsset.purchasePrice)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Salvage Value:</Typography>
                        <Typography variant="body2">{formatCurrency(selectedAsset.salvageValue)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Useful Life:</Typography>
                        <Typography variant="body2">{selectedAsset.usefulLife} years</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Method:</Typography>
                        <Typography variant="body2">
                          {depreciationMethods.find(m => m.value === selectedAsset.depreciationMethod)?.label}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Current Depreciation" />
                  <CardContent>
                    {(() => {
                      const depreciation = calculateDepreciation(selectedAsset)
                      return (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Annual Depreciation:</Typography>
                            <Typography variant="body2">{formatCurrency(depreciation.annualDepreciation)}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Accumulated Depreciation:</Typography>
                            <Typography variant="body2">{formatCurrency(depreciation.accumulatedDepreciation)}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Current Book Value:</Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {formatCurrency(depreciation.bookValue)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Depreciation Rate:</Typography>
                            <Typography variant="body2">{depreciation.depreciationRate}%</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Remaining Life:</Typography>
                            <Typography variant="body2">{depreciation.remainingLife} years</Typography>
                          </Box>
                        </Box>
                      )
                    })()}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Depreciation Schedule" />
                  <CardContent>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Year</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Beginning Value</TableCell>
                            <TableCell>Annual Depreciation</TableCell>
                            <TableCell>Accumulated Depreciation</TableCell>
                            <TableCell>Ending Book Value</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {generateDepreciationSchedule(selectedAsset).map((row) => (
                            <TableRow key={row.year}>
                              <TableCell>{row.year}</TableCell>
                              <TableCell>{format(new Date(row.date), 'dd MMM yyyy')}</TableCell>
                              <TableCell>{formatCurrency(row.beginningValue)}</TableCell>
                              <TableCell>{formatCurrency(row.annualDepreciation)}</TableCell>
                              <TableCell>{formatCurrency(row.accumulatedDepreciation)}</TableCell>
                              <TableCell>{formatCurrency(row.endingValue)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCalculationDialog(false)}>Close</Button>
          <Button variant="contained">Export Schedule</Button>
        </DialogActions>
      </Dialog>

      {/* Value Adjustment Dialog */}
      <Dialog
        open={adjustmentDialog}
        onClose={() => setAdjustmentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Adjust Asset Value - {selectedAsset?.name}
        </DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            Penyesuaian nilai aset akan mempengaruhi perhitungan penyusutan selanjutnya.
          </Alert>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Book Value"
                value={selectedAsset ? formatCurrency(calculateDepreciation(selectedAsset).bookValue) : ''}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Adjusted Value"
                type="number"
                placeholder="Enter new value..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adjustment Reason"
                multiline
                rows={3}
                placeholder="Enter reason for adjustment..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdjustmentDialog(false)}>Cancel</Button>
          <Button variant="contained">Apply Adjustment</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default AssetDepreciation
