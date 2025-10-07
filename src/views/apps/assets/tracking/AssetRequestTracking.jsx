'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

// Utils Imports
import { assetRequestStorage } from '@/utils/assetRequestStorage'
import { getInitials } from '@/utils/getInitials'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({
    itemRank
  })
  return itemRank.passed
}

// Column Definitions
const columnHelper = createColumnHelper()

const AssetRequestTracking = () => {
  // States
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState({})

  // Load data from localStorage
  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = () => {
    setLoading(true)
    try {
      const requests = assetRequestStorage.getAll()
      const summaryData = assetRequestStorage.getSummary()
      
      setData(requests)
      setFilteredData(requests)
      setSummary(summaryData)
    } catch (error) {
      console.error('Error loading requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Review':
        return 'warning'
      case 'Under Review':
        return 'info'
      case 'Approved':
        return 'success'
      case 'Rejected':
        return 'error'
      case 'In Procurement':
        return 'primary'
      case 'Ordered':
        return 'info'
      case 'Delivered':
        return 'success'
      case 'Completed':
        return 'success'
      case 'Cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'error'
      case 'high':
        return 'warning'
      case 'medium':
        return 'info'
      case 'low':
        return 'success'
      default:
        return 'default'
    }
  }

  const handleViewDetails = (request) => {
    setSelectedRequest(request)
    setDetailDialogOpen(true)
  }

  const handleStatusUpdate = (requestId, newStatus) => {
    const updatedRequest = assetRequestStorage.updateStatus(
      requestId, 
      newStatus, 
      `Status updated to ${newStatus}`, 
      'System Admin'
    )
    
    if (updatedRequest) {
      loadRequests() // Reload data
    }
  }

  const columns = [
    columnHelper.accessor('requestId', {
      header: 'Request ID',
      cell: ({ row }) => (
        <div className='flex flex-col'>
          <Typography color='primary' className='font-medium'>
            {row.original.requestId}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {new Date(row.original.submittedAt).toLocaleDateString('id-ID')}
          </Typography>
        </div>
      )
    }),
    columnHelper.accessor('assetName', {
      header: 'Asset Details',
      cell: ({ row }) => (
        <div className='flex flex-col'>
          <Typography className='font-medium' color='text.primary'>
            {row.original.assetName}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {row.original.primaryCategory} • {row.original.brand}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Qty: {row.original.quantity} • {row.original.assetType}
          </Typography>
        </div>
      )
    }),
    columnHelper.accessor('department', {
      header: 'Requestor',
      cell: ({ row }) => (
        <div className='flex items-center gap-3'>
          <CustomAvatar size={34}>
            {row.original.employeeId ? getInitials(row.original.employeeId) : 'U'}
          </CustomAvatar>
          <div className='flex flex-col'>
            <Typography className='font-medium' color='text.primary'>
              {row.original.employeeId || 'Unknown'}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {row.original.department}
            </Typography>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('totalBudget', {
      header: 'Budget',
      cell: ({ row }) => (
        <div className='flex flex-col'>
          <Typography className='font-medium'>
            {formatCurrency(row.original.totalBudget)}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Unit: {formatCurrency(row.original.unitPrice)}
          </Typography>
        </div>
      )
    }),
    columnHelper.accessor('priority', {
      header: 'Priority',
      cell: ({ row }) => (
        <Chip
          variant='tonal'
          label={row.original.priority?.toUpperCase()}
          size='small'
          color={getPriorityColor(row.original.priority)}
        />
      )
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => (
        <div className='flex flex-col'>
          <Chip
            variant='tonal'
            label={row.original.status}
            size='small'
            color={getStatusColor(row.original.status)}
          />
          <Typography variant='caption' color='text.secondary' className='mt-1'>
            {row.original.approvalStage}
          </Typography>
        </div>
      )
    }),
    columnHelper.accessor('expectedDate', {
      header: 'Timeline',
      cell: ({ row }) => (
        <div className='flex flex-col'>
          <Typography variant='body2' className='font-medium'>
            Expected: {new Date(row.original.expectedDate).toLocaleDateString('id-ID')}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Est. Completion: {new Date(row.original.estimatedCompletion).toLocaleDateString('id-ID')}
          </Typography>
        </div>
      )
    }),
    columnHelper.accessor('action', {
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex items-center'>
          <IconButton size='small' onClick={() => handleViewDetails(row.original)}>
            <i className='ri-eye-line text-textSecondary' />
          </IconButton>
          <OptionMenu
            iconClassName='text-textSecondary'
            options={[
              {
                text: 'View Details',
                icon: 'ri-eye-line',
                menuItemProps: {
                  onClick: () => handleViewDetails(row.original)
                }
              },
              {
                text: 'Update Status',
                icon: 'ri-edit-line',
                menuItemProps: {
                  onClick: () => handleStatusUpdate(row.original.requestId, 'Under Review')
                }
              },
              {
                text: 'Approve Request',
                icon: 'ri-check-line',
                menuItemProps: {
                  onClick: () => handleStatusUpdate(row.original.requestId, 'Approved')
                }
              },
              {
                text: 'Reject Request',
                icon: 'ri-close-line',
                menuItemProps: {
                  onClick: () => handleStatusUpdate(row.original.requestId, 'Rejected')
                }
              }
            ]}
          />
        </div>
      ),
      enableSorting: false
    })
  ]

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      {/* Summary Cards */}
      <Grid container spacing={4} className='mb-6'>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent className='text-center'>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                <i className='ri-file-list-line text-2xl' />
              </Avatar>
              <Typography variant='h4' className='font-bold text-primary-main'>
                {summary.total || 0}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Total Requests
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent className='text-center'>
              <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                <i className='ri-time-line text-2xl' />
              </Avatar>
              <Typography variant='h4' className='font-bold text-warning-main'>
                {summary.pending || 0}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Pending Review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent className='text-center'>
              <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                <i className='ri-check-line text-2xl' />
              </Avatar>
              <Typography variant='h4' className='font-bold text-success-main'>
                {summary.approved || 0}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Approved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent className='text-center'>
              <Avatar sx={{ bgcolor: 'error.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                <i className='ri-close-line text-2xl' />
              </Avatar>
              <Typography variant='h4' className='font-bold text-error-main'>
                {summary.rejected || 0}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Rejected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Table */}
      <Card>
        <CardHeader
          title='Asset Request Tracking'
          action={
            <div className='flex gap-2'>
              <Button
                variant='outlined'
                startIcon={<i className='ri-refresh-line' />}
                onClick={loadRequests}
              >
                Refresh
              </Button>
              <Button
                variant='contained'
                startIcon={<i className='ri-add-line' />}
                href='/front-pages/shortcuts/assets/request'
              >
                New Request
              </Button>
            </div>
          }
        />
        <CardContent className='flex justify-between flex-col items-start md:flex-row md:items-center gap-4'>
          <TextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </TextField>
          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <TextField
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(String(e.target.value))}
              placeholder='Search Requests...'
              className='is-full sm:is-auto'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='ri-search-line' />
                  </InputAdornment>
                )
              }}
            />
          </div>
        </CardContent>
        
        {data.length === 0 ? (
          <CardContent>
            <Alert severity='info' className='text-center'>
              <Typography variant='h6' className='mb-2'>No Asset Requests Found</Typography>
              <Typography variant='body2'>
                No asset requests have been submitted yet. Click "New Request" to submit your first asset request.
              </Typography>
            </Alert>
          </CardContent>
        ) : (
          <>
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id}>
                          {header.isPlaceholder ? null : (
                            <div
                              className={classnames({
                                'flex items-center': header.column.getIsSorted(),
                                'cursor-pointer select-none': header.column.getCanSort()
                              })}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <i className='ri-arrow-up-s-line text-xl' />,
                                desc: <i className='ri-arrow-down-s-line text-xl' />
                              }[header.column.getIsSorted()] ?? null}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                {table.getFilteredRowModel().rows.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                        No data available
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {table
                      .getRowModel()
                      .rows.slice(0, table.getState().pagination.pageSize)
                      .map(row => {
                        return (
                          <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                            {row.getVisibleCells().map(cell => (
                              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                          </tr>
                        )
                      })}
                  </tbody>
                )}
              </table>
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component='div'
              className='border-bs'
              count={table.getFilteredRowModel().rows.length}
              rowsPerPage={table.getState().pagination.pageSize}
              page={table.getState().pagination.pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' }
              }}
              onPageChange={(_, page) => {
                table.setPageIndex(page)
              }}
              onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
            />
          </>
        )}
      </Card>

      {/* Request Detail Dialog */}
      <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth='md' fullWidth>
        <DialogTitle>
          <Box className='flex items-center gap-2'>
            <i className='ri-file-text-line text-2xl' />
            <Box>
              <Typography variant='h6'>Asset Request Details</Typography>
              <Typography variant='body2' color='text.secondary'>
                {selectedRequest?.requestId}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='subtitle1' className='mb-3'>
                      <i className='ri-information-line mr-2' />
                      Asset Information
                    </Typography>
                    <Box className='space-y-2'>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>Asset Name</Typography>
                        <Typography variant='body1' className='font-medium'>{selectedRequest.assetName}</Typography>
                      </Box>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>Category</Typography>
                        <Typography variant='body1'>{selectedRequest.primaryCategory} &gt; {selectedRequest.subCategory}</Typography>
                      </Box>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>Brand & Model</Typography>
                        <Typography variant='body1'>{selectedRequest.brand} - {selectedRequest.model}</Typography>
                      </Box>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>Quantity & Budget</Typography>
                        <Typography variant='body1'>{selectedRequest.quantity} units • {formatCurrency(selectedRequest.totalBudget)}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='subtitle1' className='mb-3'>
                      <i className='ri-user-line mr-2' />
                      Request Details
                    </Typography>
                    <Box className='space-y-2'>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>Requested By</Typography>
                        <Typography variant='body1' className='font-medium'>{selectedRequest.employeeId}</Typography>
                      </Box>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>Department</Typography>
                        <Typography variant='body1'>{selectedRequest.department}</Typography>
                      </Box>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>Priority</Typography>
                        <Chip label={selectedRequest.priority?.toUpperCase()} color={getPriorityColor(selectedRequest.priority)} size='small' />
                      </Box>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>Expected Date</Typography>
                        <Typography variant='body1'>{new Date(selectedRequest.expectedDate).toLocaleDateString('id-ID')}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='subtitle1' className='mb-3'>
                      <i className='ri-file-text-line mr-2' />
                      Justification
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {selectedRequest.justification}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='subtitle1' className='mb-3'>
                      <i className='ri-history-line mr-2' />
                      Status History
                    </Typography>
                    <List>
                      {selectedRequest.statusHistory?.map((history, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                              <i className='ri-time-line' />
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={history.status}
                            secondary={
                              <Box>
                                <Typography variant='caption' color='text.secondary'>
                                  {new Date(history.timestamp).toLocaleString('id-ID')} • {history.updatedBy}
                                </Typography>
                                {history.note && (
                                  <Typography variant='body2' color='text.secondary'>
                                    {history.note}
                                  </Typography>
                                )}
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
          <Button variant='outlined' startIcon={<i className='ri-edit-line' />}>
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AssetRequestTracking
