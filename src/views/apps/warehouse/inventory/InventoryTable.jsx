'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Tooltip from '@mui/material/Tooltip'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const InventoryTable = ({ inventory, warehouses, loading }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget)
    setSelectedItem(item)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedItem(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'success'
      case 'Low Stock':
        return 'warning'
      case 'Out of Stock':
        return 'error'
      case 'Reserved':
        return 'info'
      case 'Expired':
        return 'error'
      default:
        return 'default'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Raw Materials':
        return 'ri-oil-line'
      case 'Chemicals':
        return 'ri-flask-line'
      case 'Spare Parts':
        return 'ri-tools-line'
      case 'Finished Products':
        return 'ri-product-hunt-line'
      case 'Lubricants':
        return 'ri-drop-line'
      case 'Safety Equipment':
        return 'ri-shield-check-line'
      default:
        return 'ri-box-3-line'
    }
  }

  const getStockLevel = (current, min, max) => {
    const percentage = (current / max) * 100
    let color = 'success'
    
    if (current <= min) {
      color = 'error'
    } else if (current <= min * 1.5) {
      color = 'warning'
    }
    
    return { percentage, color }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getWarehouseName = (warehouseId) => {
    const warehouse = warehouses.find(w => w.id === warehouseId)
    return warehouse ? warehouse.name : 'Unknown'
  }

  const paginatedInventory = inventory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  if (loading) {
    return (
      <Card>
        <Box className='flex justify-center items-center p-8'>
          <CircularProgress />
        </Box>
      </Card>
    )
  }

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Warehouse</TableCell>
              <TableCell>Stock Level</TableCell>
              <TableCell>Unit Cost</TableCell>
              <TableCell>Total Value</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInventory.map((item) => {
              const stockLevel = getStockLevel(item.currentStock, item.minStock, item.maxStock)
              
              return (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box className='flex items-center gap-3'>
                      <CustomAvatar
                        variant='rounded'
                        color='primary'
                        size={40}
                      >
                        <i className={getCategoryIcon(item.category)} />
                      </CustomAvatar>
                      <Box>
                        <Typography variant='body2' className='font-medium'>
                          {item.itemName}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {item.itemCode} • {item.batchNumber}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' className='font-medium'>
                      {item.category}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {item.supplier}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant='body2' className='font-medium'>
                        {getWarehouseName(item.warehouseId)}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {item.location}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className='min-w-32'>
                      <Box className='flex justify-between items-center mb-1'>
                        <Typography variant='body2' className='font-medium'>
                          {item.currentStock.toLocaleString()} {item.unit}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {Math.round(stockLevel.percentage)}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant='determinate'
                        value={stockLevel.percentage}
                        color={stockLevel.color}
                        className='h-2 rounded'
                      />
                      <Typography variant='caption' color='text.secondary' className='mt-1'>
                        Min: {item.minStock} • Max: {item.maxStock}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' className='font-medium'>
                      {formatCurrency(item.unitCost)}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      per {item.unit}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' className='font-medium'>
                      {formatCurrency(item.totalValue)}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {item.currentStock} × {formatCurrency(item.unitCost)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={getStatusColor(item.status)}
                      size='small'
                      variant='tonal'
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>
                      {formatDate(item.expiryDate)}
                    </Typography>
                    {item.expiryDate && (
                      <Typography variant='caption' color='text.secondary'>
                        {new Date(item.expiryDate) < new Date() ? 'Expired' : 
                         Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)) + ' days left'}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      size='small'
                      onClick={(e) => handleMenuClick(e, item)}
                    >
                      <i className='ri-more-2-line' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        component='div'
        count={inventory.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <i className='ri-eye-line mr-2' />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className='ri-edit-line mr-2' />
          Edit Item
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className='ri-add-line mr-2' />
          Adjust Stock
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className='ri-truck-line mr-2' />
          Create Transfer
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className='ri-qr-code-line mr-2' />
          Generate Barcode
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className='ri-history-line mr-2' />
          View History
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className='ri-file-download-line mr-2' />
          Export Data
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <i className='ri-delete-bin-line mr-2' />
          Remove Item
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default InventoryTable
