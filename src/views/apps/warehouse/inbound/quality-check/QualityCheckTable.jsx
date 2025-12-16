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
import { deleteQualityCheck } from '@/server/actions/getQualityCheckData'

const QualityCheckTable = ({ inspections, loading, onEdit, onDelete }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedInspection, setSelectedInspection] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleMenuClick = (event, inspection) => {
    setAnchorEl(event.currentTarget)
    setSelectedInspection(inspection)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    if (selectedInspection) {
      onEdit(selectedInspection)
    }
    handleMenuClose()
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteConfirm = async () => {
    if (selectedInspection) {
      await deleteQualityCheck(selectedInspection.qc_id)
      onDelete(selectedInspection.qc_id)
    }
    setDeleteDialogOpen(false)
    setSelectedInspection(null)
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
      'in-progress': { color: 'info', label: 'In Progress', icon: 'ri-loader-4-line' },
      'passed': { color: 'success', label: 'Passed', icon: 'ri-checkbox-circle-line' },
      'failed': { color: 'error', label: 'Failed', icon: 'ri-close-circle-line' }
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

  const calculateProgress = (inspection) => {
    if (inspection.total_checks === 0) return 0
    return ((inspection.passed_checks + inspection.failed_checks) / inspection.total_checks) * 100
  }

  const paginatedInspections = inspections.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>QC ID</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Inspection Date</TableCell>
              <TableCell>Inspector</TableCell>
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
            ) : paginatedInspections.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align='center'>
                  <Box className='flex flex-col items-center justify-center py-8'>
                    <i className='ri-clipboard-line text-6xl text-textSecondary mb-2' />
                    <Typography variant='body1' color='text.secondary'>
                      No quality check inspections found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedInspections.map((inspection) => {
                const statusConfig = getStatusConfig(inspection.status)
                const progress = calculateProgress(inspection)
                
                return (
                  <TableRow key={inspection.qc_id} hover>
                    <TableCell>
                      <Typography variant='body2' className='font-medium'>
                        {inspection.qc_id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {inspection.item_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className='text-xs'>
                        {inspection.supplier_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className='text-xs'>
                        {formatDate(inspection.inspection_date)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className='text-xs'>
                        {inspection.inspector_name || '-'}
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
                        label={inspection.priority.toUpperCase()}
                        color={getPriorityColor(inspection.priority)}
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <Box className='flex flex-col gap-1'>
                        <Box className='flex items-center justify-between'>
                          <Typography variant='caption'>
                            {inspection.passed_checks + inspection.failed_checks}/{inspection.total_checks} checks
                          </Typography>
                          <Typography variant='caption' className='font-medium'>
                            {progress.toFixed(0)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant='determinate'
                          value={progress}
                          color={inspection.status === 'passed' ? 'success' : inspection.status === 'failed' ? 'error' : 'primary'}
                          className='h-1.5 rounded'
                        />
                        {inspection.failed_checks > 0 && (
                          <Typography variant='caption' color='error'>
                            {inspection.failed_checks} failed
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align='right'>
                      <Tooltip title='More Actions'>
                        <IconButton
                          size='small'
                          onClick={(e) => handleMenuClick(e, inspection)}
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
          count={inspections.length}
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
            Are you sure you want to delete quality check <strong>{selectedInspection?.qc_id}</strong>?
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

export default QualityCheckTable
