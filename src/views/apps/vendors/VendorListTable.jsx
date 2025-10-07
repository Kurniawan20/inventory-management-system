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

// Server Actions
import { deleteVendor } from '@/server/actions/getVendorData'

const VendorListTable = ({ vendors, loading, onEdit, onDelete }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleMenuClick = (event, vendor) => {
    setAnchorEl(event.currentTarget)
    setSelectedVendor(vendor)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedVendor(null)
  }

  const handleEdit = () => {
    onEdit(selectedVendor)
    handleMenuClose()
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true)
      await deleteVendor(selectedVendor.vendor_id)
      onDelete(selectedVendor.vendor_id)
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting vendor:', error)
    } finally {
      setDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }

  // Pagination
  const paginatedVendors = vendors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

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
                <TableCell>Vendor</TableCell>
                <TableCell>Contact Person</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>NPWP</TableCell>
                <TableCell>Address</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedVendors.map((vendor) => (
                <TableRow key={vendor.vendor_id} hover>
                  <TableCell>
                    <Box className='flex items-center gap-3'>
                      <Avatar
                        variant='rounded'
                        sx={{ bgcolor: 'primary.main' }}
                      >
                        <i className='ri-building-line' />
                      </Avatar>
                      <Box>
                        <Typography variant='body2' className='font-medium'>
                          {vendor.vendor_name}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {vendor.vendor_id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>
                      {vendor.contact_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>
                      {vendor.contact_phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>
                      {vendor.contact_email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={vendor.npwp || 'No NPWP'}
                      size='small'
                      variant={vendor.npwp ? 'outlined' : 'filled'}
                      color={vendor.npwp ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' className='max-w-xs truncate'>
                      {vendor.address}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      size='small'
                      onClick={(e) => handleMenuClick(e, vendor)}
                    >
                      <i className='ri-more-2-line' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={vendors.length}
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
        <DialogTitle>Delete Vendor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete vendor "{selectedVendor?.vendor_name}"? 
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

export default VendorListTable
