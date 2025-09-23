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
import Avatar from '@mui/material/Avatar'

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

const AssetTrackingList = () => {
  // States
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [scanDialogOpen, setScanDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Sample data - replace with API call
  const sampleData = [
    {
      id: 'AST-001',
      assetCode: 'PMP-2024-001',
      assetName: 'Industrial Pump Unit A',
      category: 'Machinery',
      currentLocation: 'Production Floor - Line A',
      assignedTo: 'John Doe',
      department: 'Production',
      status: 'Active',
      condition: 'Good',
      lastUpdated: '2024-01-20 14:30',
      coordinates: '-6.2088, 106.8456',
      qrCode: 'QR001234567890',
      rfidTag: 'RFID001234567890',
      maintenanceStatus: 'Up to Date',
      nextMaintenance: '2024-03-15'
    },
    {
      id: 'AST-002',
      assetCode: 'SFT-2024-002',
      assetName: 'Safety Helmet Set',
      category: 'Safety Equipment',
      currentLocation: 'Safety Storage Room',
      assignedTo: 'Jane Smith',
      department: 'Safety',
      status: 'Available',
      condition: 'Excellent',
      lastUpdated: '2024-01-19 09:15',
      coordinates: '-6.2089, 106.8457',
      qrCode: 'QR001234567891',
      rfidTag: 'RFID001234567891',
      maintenanceStatus: 'Not Required',
      nextMaintenance: 'N/A'
    },
    {
      id: 'AST-003',
      assetCode: 'CMP-2024-003',
      assetName: 'Air Compressor Unit B',
      category: 'Machinery',
      currentLocation: 'Maintenance Workshop',
      assignedTo: 'Mike Johnson',
      department: 'Maintenance',
      status: 'Under Maintenance',
      condition: 'Fair',
      lastUpdated: '2024-01-18 16:45',
      coordinates: '-6.2090, 106.8458',
      qrCode: 'QR001234567892',
      rfidTag: 'RFID001234567892',
      maintenanceStatus: 'In Progress',
      nextMaintenance: '2024-02-01'
    },
    {
      id: 'AST-004',
      assetCode: 'LAP-2024-004',
      assetName: 'Laptop Computer Dell',
      category: 'IT Equipment',
      currentLocation: 'IT Office - Desk 15',
      assignedTo: 'Sarah Wilson',
      department: 'IT',
      status: 'Active',
      condition: 'Good',
      lastUpdated: '2024-01-21 11:20',
      coordinates: '-6.2091, 106.8459',
      qrCode: 'QR001234567893',
      rfidTag: 'RFID001234567893',
      maintenanceStatus: 'Up to Date',
      nextMaintenance: '2024-06-15'
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
      case 'Active':
        return 'success'
      case 'Available':
        return 'info'
      case 'Under Maintenance':
        return 'warning'
      case 'Out of Service':
        return 'error'
      case 'Disposed':
        return 'default'
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

  const getMaintenanceStatusColor = (status) => {
    switch (status) {
      case 'Up to Date':
        return 'success'
      case 'Due Soon':
        return 'warning'
      case 'Overdue':
        return 'error'
      case 'In Progress':
        return 'info'
      case 'Not Required':
        return 'default'
      default:
        return 'default'
    }
  }

  const columns = [
    columnHelper.accessor('assetCode', {
      header: 'Asset Code',
      cell: ({ row }) => (
        <div className='flex flex-col'>
          <Typography color='primary' className='font-medium'>
            {row.original.assetCode}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            ID: {row.original.id}
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
            {row.original.category}
          </Typography>
        </div>
      )
    }),
    columnHelper.accessor('currentLocation', {
      header: 'Current Location',
      cell: ({ row }) => (
        <div className='flex flex-col'>
          <Typography className='font-medium'>
            {row.original.currentLocation}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {row.original.coordinates}
          </Typography>
        </div>
      )
    }),
    columnHelper.accessor('assignedTo', {
      header: 'Assigned To',
      cell: ({ row }) => (
        <div className='flex items-center gap-3'>
          <CustomAvatar size={34}>
            {getInitials(row.original.assignedTo)}
          </CustomAvatar>
          <div className='flex flex-col'>
            <Typography className='font-medium' color='text.primary'>
              {row.original.assignedTo}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {row.original.department}
            </Typography>
          </div>
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
    columnHelper.accessor('maintenanceStatus', {
      header: 'Maintenance',
      cell: ({ row }) => (
        <div className='flex flex-col'>
          <Chip
            variant='tonal'
            label={row.original.maintenanceStatus}
            size='small'
            color={getMaintenanceStatusColor(row.original.maintenanceStatus)}
          />
          <Typography variant='caption' color='text.secondary' className='mt-1'>
            Next: {row.original.nextMaintenance}
          </Typography>
        </div>
      )
    }),
    columnHelper.accessor('lastUpdated', {
      header: 'Last Updated',
      cell: ({ row }) => (
        <Typography variant='body2'>
          {new Date(row.original.lastUpdated).toLocaleString('id-ID')}
        </Typography>
      )
    }),
    columnHelper.accessor('action', {
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex items-center'>
          <IconButton size='small' href={`/apps/assets/tracking/details/${row.original.id}`}>
            <i className='ri-eye-line text-textSecondary' />
          </IconButton>
          <IconButton size='small' onClick={() => setScanDialogOpen(true)}>
            <i className='ri-qr-scan-line text-textSecondary' />
          </IconButton>
          <OptionMenu
            iconClassName='text-textSecondary'
            options={[
              {
                text: 'View Details',
                href: `/apps/assets/tracking/details/${row.original.id}`,
                icon: 'ri-eye-line'
              },
              {
                text: 'Update Location',
                icon: 'ri-map-pin-line'
              },
              {
                text: 'Transfer Asset',
                icon: 'ri-exchange-line'
              },
              {
                text: 'Maintenance Schedule',
                icon: 'ri-tools-line'
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
        title='Asset Tracking'
        action={
          <div className='flex gap-2'>
            <Button
              variant='outlined'
              startIcon={<i className='ri-qr-scan-line' />}
              onClick={() => setScanDialogOpen(true)}
            >
              Scan Asset
            </Button>
            <Button
              variant='contained'
              startIcon={<i className='ri-map-pin-add-line' />}
            >
              Update Location
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
            placeholder='Search Assets...'
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

      {/* Scan Asset Dialog */}
      <Dialog open={scanDialogOpen} onClose={() => setScanDialogOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Scan Asset</DialogTitle>
        <DialogContent>
          <Grid container spacing={4} className='pbs-5'>
            <Grid item xs={12}>
              <Box className='flex flex-col items-center gap-4 p-6 border-2 border-dashed rounded'>
                <i className='ri-qr-scan-2-line text-6xl text-gray-400' />
                <Typography variant='h6' color='text.secondary'>
                  Position QR Code or RFID Tag
                </Typography>
                <Typography variant='body2' color='text.secondary' className='text-center'>
                  Align the QR code or RFID tag within the frame to scan and update asset location
                </Typography>
                <Button variant='contained' startIcon={<i className='ri-camera-line' />}>
                  Open Camera
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' color='text.secondary' className='mb-2'>
                Or enter manually:
              </Typography>
              <TextField
                fullWidth
                label='Asset Code / QR Code / RFID'
                placeholder='Enter asset identifier'
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScanDialogOpen(false)}>Cancel</Button>
          <Button variant='contained' onClick={() => setScanDialogOpen(false)}>
            Scan Asset
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default AssetTrackingList
