'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

// Server Actions
import { deleteGoodsReceiving } from '@/server/actions/getGoodsReceivingData'

const GoodsReceivingTable = ({ orders, loading, onEdit, onDelete }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleMenuClick = (event, order) => {
    setAnchorEl(event.currentTarget)
    setSelectedOrder(order)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    if (selectedOrder) {
      onEdit(selectedOrder)
    }
    handleMenuClose()
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteConfirm = async () => {
    if (selectedOrder) {
      await deleteGoodsReceiving(selectedOrder.receiving_id)
      onDelete(selectedOrder.receiving_id)
    }
    setDeleteDialogOpen(false)
    setSelectedOrder(null)
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  }

  const getStatusConfig = (status) => {
    const configs = {
      'pending': { color: 'warning', label: 'Pending', icon: 'ri-time-line' },
      'scheduled': { color: 'info', label: 'Scheduled', icon: 'ri-calendar-line' },
      'in-progress': { color: 'primary', label: 'In Progress', icon: 'ri-loader-4-line' },
      'completed': { color: 'success', label: 'Completed', icon: 'ri-checkbox-circle-line' },
      'cancelled': { color: 'error', label: 'Cancelled', icon: 'ri-close-circle-line' }
    }
    return configs[status] || configs['pending']
  }

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'default',
      'medium': 'info',
      'high': 'error'
    }
    return colors[priority] || 'default'
  }

  const calculateProgress = (order) => {
    if (order.total_items === 0) return 0
    return (order.received_items / order.total_items) * 100
  }

  const paginatedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Receiving ID</TableCell>
              <TableCell>PO Number</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Warehouse</TableCell>
              <TableCell>Expected Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            ) : paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align='center'>
                  <Box className='flex flex-col items-center justify-center py-8'>
                    <i className='ri-inbox-line text-6xl text-textSecondary mb-2' />
                    <Typography variant='body1' color='text.secondary'>
                      No receiving orders found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status)
                const progress = calculateProgress(order)
                
                return (
                  <TableRow key={order.receiving_id} hover>
                    <TableCell>
                      <Typography variant='body2' className='font-medium'>
                        {order.receiving_id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {order.po_number}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {order.supplier_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className='text-xs'>
                        {order.warehouse_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className='text-xs'>
                        {formatDate(order.expected_date)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={statusConfig.label}
                        color={statusConfig.color}
                        size='small'
                        variant='tonal'
                        icon={<i className={statusConfig.icon} />}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.priority.toUpperCase()}
                        color={getPriorityColor(order.priority)}
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <Box className='flex flex-col gap-1'>
                        <Box className='flex items-center justify-between'>
                          <Typography variant='caption'>
                            {order.received_items}/{order.total_items} items
                          </Typography>
                          <Typography variant='caption' className='font-medium'>
                            {progress.toFixed(0)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant='determinate'
                          value={progress}
                          color={progress === 100 ? 'success' : 'primary'}
                          className='h-1.5 rounded'
                        />
                      </Box>
                    </TableCell>
                    <TableCell align='right'>
                      <Tooltip title='More Actions'>
                        <IconButton
                          size='small'
                          onClick={(e) => handleMenuClick(e, order)}
                        >
                          <i className='ri-more-2-line' />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
        <TablePagination
          component='div'
          count={orders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <i className='ri-edit-line mr-2' />
          Edit
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <i className='ri-eye-line mr-2' />
          View Details
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <i className='ri-delete-bin-line mr-2 text-error' />
          <span className='text-error'>Delete</span>
        </MenuItem>
      </Menu>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete receiving order <strong>{selectedOrder?.receiving_id}</strong>?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color='error' variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GoodsReceivingTable
