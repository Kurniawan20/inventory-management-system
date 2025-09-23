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
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'

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

// Util Imports
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

const AssetReturnsList = () => {
  // States
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [addReturnOpen, setAddReturnOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Sample data - replace with API call
  const sampleData = [
    {
      id: 'RET-001',
      returnType: 'Asset Return',
      assetCode: 'LAP-2024-004',
      assetName: 'Laptop Computer Dell',
      category: 'IT Equipment',
      returnedBy: 'Sarah Wilson',
      department: 'IT',
      returnDate: '2024-01-20',
      expectedReturnDate: '2024-01-18',
      status: 'Returned',
      condition: 'Good',
      returnReason: 'Project completion',
      borrowDuration: '30 days',
      isOverdue: true,
      overdueDays: 2
    },
    {
      id: 'RET-002',
      returnType: 'Equipment Return',
      assetCode: 'SFT-2024-002',
      assetName: 'Safety Helmet Set',
      category: 'Safety Equipment',
      returnedBy: 'Mike Johnson',
      department: 'Maintenance',
      returnDate: '2024-01-19',
      expectedReturnDate: '2024-01-20',
      status: 'Pending Inspection',
      condition: 'Fair',
      returnReason: 'Maintenance work completed',
      borrowDuration: '7 days',
      isOverdue: false,
      overdueDays: 0
    },
    {
      id: 'RET-003',
      returnType: 'Tool Return',
      assetCode: 'TLS-2024-005',
      assetName: 'Drilling Machine',
      category: 'Tools',
      returnedBy: 'John Doe',
      department: 'Production',
      returnDate: '2024-01-18',
      expectedReturnDate: '2024-01-15',
      status: 'Inspection Failed',
      condition: 'Poor',
      returnReason: 'Equipment malfunction during use',
      borrowDuration: '14 days',
      isOverdue: true,
      overdueDays: 3
    },
    {
      id: 'RET-004',
      returnType: 'Asset Return',
      assetCode: 'VEH-2024-001',
      assetName: 'Company Vehicle',
      category: 'Vehicle',
      returnedBy: 'Jane Smith',
      department: 'Sales',
      returnDate: '2024-01-17',
      expectedReturnDate: '2024-01-17',
      status: 'Approved',
      condition: 'Excellent',
      returnReason: 'Business trip completed',
      borrowDuration: '5 days',
      isOverdue: false,
      overdueDays: 0
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(sampleData)
      setFilteredData(sampleData)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Returned':
        return 'success'
      case 'Pending Inspection':
        return 'warning'
      case 'Inspection Failed':
        return 'error'
      case 'Approved':
        return 'success'
      case 'Rejected':
        return 'error'
      default:
        return 'default'
    }
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent':
        return 'success'
      case 'Good':
        return 'info'
      case 'Fair':
        return 'warning'
      case 'Poor':
        return 'error'
      default:
        return 'default'
    }
  }

  const getReturnTypeColor = (type) => {
    switch (type) {
      case 'Asset Return':
        return 'primary'
      case 'Equipment Return':
        return 'info'
      case 'Tool Return':
        return 'warning'
      default:
        return 'default'
    }
  }

  const columns = [
    columnHelper.accessor('id', {
      header: 'Return ID',
      cell: ({ row }) => (
        <div className='flex flex-col'>
          <Typography color='primary' className='font-medium'>
            {row.original.id}
          </Typography>
          {row.original.isOverdue && (
            <Chip
              label={`${row.original.overdueDays} days overdue`}
              size='small'
              color='error'
              variant='tonal'
            />
          )}
        </div>
      )
    }),
    columnHelper.accessor('returnType', {
      header: 'Type',
      cell: ({ row }) => (
        <Chip
          variant='tonal'
          label={row.original.returnType}
          size='small'
          color={getReturnTypeColor(row.original.returnType)}
        />
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
            {row.original.assetCode} • {row.original.category}
          </Typography>
        </div>
      )
    }),
    columnHelper.accessor('returnedBy', {
      header: 'Returned By',
      cell: ({ row }) => (
        <div className='flex items-center gap-3'>
          <CustomAvatar size={34}>
            {getInitials(row.original.returnedBy)}
          </CustomAvatar>
          <div className='flex flex-col'>
            <Typography className='font-medium' color='text.primary'>
              {row.original.returnedBy}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {row.original.department}
            </Typography>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('returnDate', {
      header: 'Return Date',
      cell: ({ row }) => (
        <div className='flex flex-col'>
          <Typography className='font-medium'>
            {new Date(row.original.returnDate).toLocaleDateString('id-ID')}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Expected: {new Date(row.original.expectedReturnDate).toLocaleDateString('id-ID')}
          </Typography>
        </div>
      )
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => (
        <Chip
          variant='tonal'
          label={row.original.status}
          size='small'
          color={getStatusColor(row.original.status)}
        />
      )
    }),
    columnHelper.accessor('condition', {
      header: 'Condition',
      cell: ({ row }) => (
        <Chip
          variant='tonal'
          label={row.original.condition}
          size='small'
          color={getConditionColor(row.original.condition)}
        />
      )
    }),
    columnHelper.accessor('borrowDuration', {
      header: 'Duration',
      cell: ({ row }) => (
        <Typography className='font-medium'>
          {row.original.borrowDuration}
        </Typography>
      )
    }),
    columnHelper.accessor('action', {
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex items-center'>
          <IconButton size='small' href={`/apps/assets/returns/details/${row.original.id}`}>
            <i className='ri-eye-line text-textSecondary' />
          </IconButton>
          <OptionMenu
            iconClassName='text-textSecondary'
            options={[
              {
                text: 'View Details',
                href: `/apps/assets/returns/details/${row.original.id}`,
                icon: 'ri-eye-line'
              },
              {
                text: 'Approve Return',
                icon: 'ri-check-line'
              },
              {
                text: 'Reject Return',
                icon: 'ri-close-line'
              },
              {
                text: 'Schedule Inspection',
                icon: 'ri-search-eye-line'
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
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <Card>
      <CardHeader
        title='Asset Returns'
        action={
          <Button
            variant='contained'
            startIcon={<i className='ri-add-line' />}
            onClick={() => setAddReturnOpen(true)}
          >
            Process Return
          </Button>
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
            placeholder='Search Returns...'
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

      {/* Process Return Dialog */}
      <Dialog open={addReturnOpen} onClose={() => setAddReturnOpen(false)} maxWidth='md' fullWidth>
        <DialogTitle>Process Asset Return</DialogTitle>
        <DialogContent>
          <Grid container spacing={4} className='pbs-5'>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Asset Code / Scan QR'
                placeholder='Enter asset code or scan QR code'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Return Type</InputLabel>
                <Select label='Return Type'>
                  <MenuItem value='Asset Return'>Asset Return</MenuItem>
                  <MenuItem value='Equipment Return'>Equipment Return</MenuItem>
                  <MenuItem value='Tool Return'>Tool Return</MenuItem>
                  <MenuItem value='Vehicle Return'>Vehicle Return</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Condition</InputLabel>
                <Select label='Condition'>
                  <MenuItem value='Excellent'>Excellent</MenuItem>
                  <MenuItem value='Good'>Good</MenuItem>
                  <MenuItem value='Fair'>Fair</MenuItem>
                  <MenuItem value='Poor'>Poor</MenuItem>
                  <MenuItem value='Damaged'>Damaged</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Return Date' type='date' InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Return Reason'
                placeholder='Reason for return...'
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Inspection Notes'
                placeholder='Add inspection notes and observations...'
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <Box className='flex items-center gap-2 p-4 border-2 border-dashed rounded'>
                <i className='ri-camera-line text-2xl text-gray-400' />
                <div>
                  <Typography variant='body2' className='font-medium'>
                    Upload Photos
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Take photos of the returned asset condition
                  </Typography>
                </div>
                <Button variant='outlined' size='small'>
                  Browse Files
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddReturnOpen(false)}>Cancel</Button>
          <Button variant='contained' onClick={() => setAddReturnOpen(false)}>
            Process Return
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default AssetReturnsList
