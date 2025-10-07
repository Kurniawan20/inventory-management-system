'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useRouter, useParams } from 'next/navigation'
import NextLink from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

// Server Actions
import { deleteInventoryMovement } from '@/server/actions/getInventoryMovementData'

const InventoryMovementTable = ({ movements, loading, onEdit, onDelete }) => {
  const router = useRouter()
  const params = useParams()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedMovement, setSelectedMovement] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleMenuClick = (event, movement) => {
    setAnchorEl(event.currentTarget)
    setSelectedMovement(movement)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedMovement(null)
  }

  const handleEdit = () => {
    onEdit(selectedMovement)
    handleMenuClose()
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true)
      await deleteInventoryMovement(selectedMovement.movement_id)
      onDelete(selectedMovement.movement_id)
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting movement:', error)
    } finally {
      setDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getMovementTypeConfig = (type) => {
    const configs = {
      inbound: { color: 'success', icon: 'ri-arrow-down-line', label: 'Inbound' },
      outbound: { color: 'error', icon: 'ri-arrow-up-line', label: 'Outbound' },
      transfer: { color: 'info', icon: 'ri-arrow-left-right-line', label: 'Transfer' },
      adjustment: { color: 'warning', icon: 'ri-settings-line', label: 'Adjustment' }
    }
    return configs[type] || { color: 'default', icon: 'ri-question-line', label: type }
  }

  const getTrackingMethodColor = (method) => {
    const colors = {
      FIFO: 'primary',
      LIFO: 'secondary', 
      FEFO: 'warning'
    }
    return colors[method] || 'default'
  }

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return null
    
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
    
    if (daysLeft < 0) {
      return { label: 'Expired', color: 'error' }
    } else if (daysLeft < 30) {
      return { label: 'Expiring Soon', color: 'warning' }
    } else {
      return { label: 'Valid', color: 'success' }
    }
  }

  // Pagination
  const paginatedMovements = movements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  if (loading) {
    return (
      <Box className='flex justify-center items-center min-h-96'>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Movement ID</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Batch/Lot</TableCell>
                <TableCell>Tracking</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMovements.map((movement) => {
                const typeConfig = getMovementTypeConfig(movement.movement_type)
                const expiryStatus = getExpiryStatus(movement.expiry_date)
                
                return (
                  <TableRow key={movement.movement_id} hover>
                    <TableCell>
                      <Box className='flex items-center gap-3'>
                        <Avatar
                          variant='rounded'
                          sx={{ bgcolor: `${typeConfig.color}.main` }}
                        >
                          <i className={typeConfig.icon} />
                        </Avatar>
                        <Box>
                          <NextLink href={`/${params.lang}/apps/inventory/movements/${movement.movement_id}`} passHref>
                            <Typography 
                              variant='body2' 
                              className='font-medium cursor-pointer hover:text-primary-main'
                              component="a"
                              sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' } }}
                            >
                              {movement.movement_id}
                            </Typography>
                          </NextLink>
                          <Typography variant='caption' color='text.secondary'>
                            {movement.reference_doc}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant='body2' className='font-medium'>
                          {movement.item_name}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          ID: {movement.item_id}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {movement.location_name}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {movement.location_id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={typeConfig.label}
                        color={typeConfig.color}
                        size='small'
                        variant='tonal'
                        icon={<i className={typeConfig.icon} />}
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        {movement.qty_in > 0 && (
                          <Typography variant='body2' className='text-success-main font-medium'>
                            +{movement.qty_in}
                          </Typography>
                        )}
                        {movement.qty_out > 0 && (
                          <Typography variant='body2' className='text-error-main font-medium'>
                            -{movement.qty_out}
                          </Typography>
                        )}
                        <Typography variant='caption' color='text.secondary'>
                          {formatCurrency(movement.total_value)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className='font-medium'>
                        {movement.balance}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant='body2' className='font-medium'>
                          {movement.batch_number}
                        </Typography>
                        {expiryStatus && (
                          <Chip
                            label={expiryStatus.label}
                            color={expiryStatus.color}
                            size='small'
                            variant='outlined'
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={movement.tracking_method}
                        color={getTrackingMethodColor(movement.tracking_method)}
                        size='small'
                        variant='outlined'
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {formatDate(movement.transaction_date)}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton
                        size='small'
                        onClick={(e) => handleMenuClick(e, movement)}
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
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={movements.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => router.push(`/${params.lang}/apps/inventory/movements/${selectedMovement?.movement_id}`)}>
          <i className='ri-eye-line mr-2' />
          View Details
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <i className='ri-edit-line mr-2' />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <i className='ri-delete-bin-line mr-2' />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>Delete Movement Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete movement "{selectedMovement?.movement_id}"? 
            This action cannot be undone and may affect inventory balances.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color='error'
            variant='contained'
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={16} /> : <i className='ri-delete-bin-line' />}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default InventoryMovementTable
