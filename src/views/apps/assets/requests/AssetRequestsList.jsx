'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import { useRouter, useParams } from 'next/navigation'

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

const AssetRequestsList = () => {
  // Hooks
  const router = useRouter()
  const params = useParams()
  const { lang: locale } = params

  // States
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [loading, setLoading] = useState(true)

  // Sample data - replace with API call
  const sampleData = [
    {
      id: 'REQ-001',
      requestType: 'New Asset',
      assetName: 'Industrial Pump',
      category: 'Machinery',
      requestedBy: 'John Doe',
      department: 'Production',
      priority: 'High',
      status: 'Pending Approval',
      requestDate: '2024-01-15',
      expectedDate: '2024-02-15',
      budget: 15000000,
      description: 'Need new industrial pump for production line A'
    },
    {
      id: 'REQ-002',
      requestType: 'Replacement',
      assetName: 'Safety Helmet',
      category: 'Safety Equipment',
      requestedBy: 'Jane Smith',
      department: 'Safety',
      priority: 'Medium',
      status: 'Approved',
      requestDate: '2024-01-10',
      expectedDate: '2024-01-25',
      budget: 2500000,
      description: 'Replace damaged safety helmets for field workers'
    },
    {
      id: 'REQ-003',
      requestType: 'Maintenance',
      assetName: 'Compressor Unit',
      category: 'Machinery',
      requestedBy: 'Mike Johnson',
      department: 'Maintenance',
      priority: 'High',
      status: 'In Progress',
      requestDate: '2024-01-12',
      expectedDate: '2024-01-20',
      budget: 8000000,
      description: 'Scheduled maintenance for compressor unit'
    },
    {
      id: 'REQ-004',
      requestType: 'New Asset',
      assetName: 'Laptop Computer',
      category: 'IT Equipment',
      requestedBy: 'Sarah Wilson',
      department: 'IT',
      priority: 'Low',
      status: 'Rejected',
      requestDate: '2024-01-08',
      expectedDate: '2024-01-30',
      budget: 12000000,
      description: 'New laptop for software development team'
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
      case 'Pending Approval':
        return 'warning'
      case 'Approved':
        return 'success'
      case 'In Progress':
        return 'info'
      case 'Rejected':
        return 'error'
      case 'Completed':
        return 'success'
      default:
        return 'default'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error'
      case 'Medium':
        return 'warning'
      case 'Low':
        return 'success'
      default:
        return 'default'
    }
  }

  const columns = [
    columnHelper.accessor('id', {
      header: 'Request ID',
      cell: ({ row }) => (
        <Typography color='primary' className='font-medium'>
          {row.original.id}
        </Typography>
      )
    }),
    columnHelper.accessor('requestType', {
      header: 'Type',
      cell: ({ row }) => (
        <Chip
          variant='tonal'
          label={row.original.requestType}
          size='small'
          color='primary'
        />
      )
    }),
    columnHelper.accessor('assetName', {
      header: 'Asset Name',
      cell: ({ row }) => (
        <div className='flex items-center gap-3'>
          <div className='flex flex-col'>
            <Typography className='font-medium' color='text.primary'>
              {row.original.assetName}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {row.original.category}
            </Typography>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('requestedBy', {
      header: 'Requested By',
      cell: ({ row }) => (
        <div className='flex items-center gap-3'>
          <CustomAvatar size={34}>
            {getInitials(row.original.requestedBy)}
          </CustomAvatar>
          <div className='flex flex-col'>
            <Typography className='font-medium' color='text.primary'>
              {row.original.requestedBy}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {row.original.department}
            </Typography>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('priority', {
      header: 'Priority',
      cell: ({ row }) => (
        <Chip
          variant='tonal'
          label={row.original.priority}
          size='small'
          color={getPriorityColor(row.original.priority)}
        />
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
    columnHelper.accessor('budget', {
      header: 'Budget',
      cell: ({ row }) => (
        <Typography className='font-medium'>
          Rp {row.original.budget.toLocaleString('id-ID')}
        </Typography>
      )
    }),
    columnHelper.accessor('requestDate', {
      header: 'Request Date',
      cell: ({ row }) => (
        <Typography>{new Date(row.original.requestDate).toLocaleDateString('id-ID')}</Typography>
      )
    }),
    columnHelper.accessor('action', {
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex items-center'>
          <IconButton size='small' href={`/apps/assets/requests/details/${row.original.id}`}>
            <i className='ri-eye-line text-textSecondary' />
          </IconButton>
          <OptionMenu
            iconClassName='text-textSecondary'
            options={[
              {
                text: 'View Details',
                href: `/apps/assets/requests/details/${row.original.id}`,
                icon: 'ri-eye-line'
              },
              {
                text: 'Edit Request',
                icon: 'ri-edit-box-line'
              },
              {
                text: 'Delete Request',
                icon: 'ri-delete-bin-7-line'
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
        title='Asset Requests'
        action={
          <Button
            variant='contained'
            startIcon={<i className='ri-add-line' />}
            onClick={() => router.push(`/${locale}/shortcuts/assets/request`)}
          >
            New Request
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
    </Card>
  )
}

export default AssetRequestsList
