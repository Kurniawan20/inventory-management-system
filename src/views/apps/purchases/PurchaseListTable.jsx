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
import { deletePurchase } from '@/server/actions/getPurchaseData'

const PurchaseListTable = ({ purchases, loading, onEdit, onDelete }) => {
  const router = useRouter()
  const params = useParams()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedPurchase, setSelectedPurchase] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleMenuClick = (event, purchase) => {
    setAnchorEl(event.currentTarget)
    setSelectedPurchase(purchase)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedPurchase(null)
  }

  const handleEdit = () => {
    onEdit(selectedPurchase)
    handleMenuClose()
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true)
      await deletePurchase(selectedPurchase.purchase_id)
      onDelete(selectedPurchase.purchase_id)
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting purchase:', error)
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
      day: 'numeric'
    })
  }

  const getWarrantyStatus = (warrantyExpiry) => {
    const today = new Date()
    const expiry = new Date(warrantyExpiry)
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
    
    if (daysLeft < 0) {
      return { label: 'Expired', color: 'error' }
    } else if (daysLeft < 90) {
      return { label: `${daysLeft} days left`, color: 'warning' }
    } else {
      return { label: 'Valid', color: 'success' }
    }
  }

  // Pagination
  const paginatedPurchases = purchases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

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
                <TableCell>Purchase ID</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Purchase Date</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Warranty</TableCell>
                <TableCell>Document</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPurchases.map((purchase) => {
                const warrantyStatus = getWarrantyStatus(purchase.warranty_expiry)
                return (
                  <TableRow key={purchase.purchase_id} hover>
                    <TableCell>
                      <Box className='flex items-center gap-3'>
                        <Avatar
                          variant='rounded'
                          sx={{ bgcolor: 'primary.main' }}
                        >
                          <i className='ri-shopping-cart-line' />
                        </Avatar>
                        <Box>
                          <NextLink href={`/${params.lang}/apps/purchases/${purchase.purchase_id}`} passHref>
                            <Typography 
                              variant='body2' 
                              className='font-medium cursor-pointer hover:text-primary-main'
                              component="a"
                              sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' } }}
                            >
                              {purchase.purchase_id}
                            </Typography>
                          </NextLink>
                          <Typography variant='caption' color='text.secondary'>
                            {formatDate(purchase.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant='body2' className='font-medium'>
                          {purchase.item_name}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          ID: {purchase.item_id}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant='body2' className='font-medium'>
                          {purchase.vendor_name}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {purchase.vendor_contact}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {formatDate(purchase.purchase_date)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box className='flex items-center gap-1'>
                        <Typography variant='body2' className='font-medium'>
                          {purchase.qty}
                        </Typography>
                        <Chip
                          label={purchase.uom}
                          size='small'
                          variant='outlined'
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className='font-medium'>
                        {formatCurrency(purchase.acquisition_value)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={`Expires: ${formatDate(purchase.warranty_expiry)}`}>
                        <Chip
                          label={warrantyStatus.label}
                          size='small'
                          color={warrantyStatus.color}
                          variant='tonal'
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className='max-w-xs truncate'>
                        {purchase.document_ref}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton
                        size='small'
                        onClick={(e) => handleMenuClick(e, purchase)}
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
          count={purchases.length}
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
        <MenuItem onClick={handleEdit}>
          <i className='ri-edit-line mr-2' />
          Edit
        </MenuItem>
        <MenuItem onClick={() => router.push(`/${params.lang}/apps/purchases/${selectedPurchase.purchase_id}`)}>
          <i className='ri-eye-line mr-2' />
          View Details
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
        <DialogTitle>Delete Purchase Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete purchase "{selectedPurchase?.purchase_id}"? 
            This action cannot be undone.
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

export default PurchaseListTable
