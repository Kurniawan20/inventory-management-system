'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import GoodsReceivingTable from '@views/apps/warehouse/inbound/receiving/GoodsReceivingTable'
import GoodsReceivingStats from '@views/apps/warehouse/inbound/receiving/GoodsReceivingStats'

// Server Actions
import { getGoodsReceivingList, getGoodsReceivingSummary } from '@/server/actions/getGoodsReceivingData'

const GoodsReceivingPage = () => {
  const router = useRouter()
  const params = useParams()
  const { lang: locale } = params

  const [orders, setOrders] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [totalOrders, setTotalOrders] = useState(0)

  // Load orders and summary
  const loadOrders = async (filters = {}) => {
    try {
      setLoading(true)
      const [ordersResult, summaryResult] = await Promise.all([
        getGoodsReceivingList({
          search: searchTerm,
          status: statusFilter,
          priority: priorityFilter,
          ...filters
        }),
        getGoodsReceivingSummary()
      ])
      
      setOrders(ordersResult.orders)
      setTotalOrders(ordersResult.total)
      setSummary(summaryResult)
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    loadOrders()
  }, [])

  // Search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadOrders()
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [searchTerm, statusFilter, priorityFilter])

  const handleAddOrder = () => {
    router.push(`/${locale}/apps/warehouse/inbound/receiving/create`)
  }

  const handleEditOrder = (order) => {
    router.push(`/${locale}/apps/warehouse/inbound/receiving/${order.receiving_id}`)
  }

  const handleDeleteOrder = async (orderId) => {
    await loadOrders()
  }

  return (
    <Grid container spacing={6}>
      {/* Statistics Cards */}
      {summary && (
        <Grid item xs={12}>
          <GoodsReceivingStats summary={summary} />
        </Grid>
      )}

      {/* Main Content */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box className='flex items-center gap-2'>
                <i className='ri-truck-line text-2xl' />
                <Box>
                  <Typography variant='h5'>Goods Receiving</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Manage inbound goods receipt and verification
                  </Typography>
                </Box>
              </Box>
            }
            action={
              <Box className='flex items-center gap-4'>
                <Chip 
                  label={`${totalOrders} Orders`} 
                  color='primary' 
                  variant='tonal'
                />
                <Button
                  variant='contained'
                  startIcon={<i className='ri-add-line' />}
                  onClick={handleAddOrder}
                >
                  Create Receiving
                </Button>
              </Box>
            }
          />
          <CardContent>
            <Box className='flex items-center justify-between gap-4 mb-6 flex-wrap'>
              <Box className='flex items-center gap-4 flex-wrap'>
                <TextField
                  size='small'
                  placeholder='Search orders...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='min-w-64'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-search-line' />
                      </InputAdornment>
                    )
                  }}
                />
                <FormControl size='small' className='min-w-40'>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label='Status'
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value=''>All Status</MenuItem>
                    <MenuItem value='pending'>Pending</MenuItem>
                    <MenuItem value='scheduled'>Scheduled</MenuItem>
                    <MenuItem value='in-progress'>In Progress</MenuItem>
                    <MenuItem value='completed'>Completed</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size='small' className='min-w-40'>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={priorityFilter}
                    label='Priority'
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <MenuItem value=''>All Priority</MenuItem>
                    <MenuItem value='low'>Low</MenuItem>
                    <MenuItem value='medium'>Medium</MenuItem>
                    <MenuItem value='high'>High</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className='flex items-center gap-2'>
                <Button
                  variant='outlined'
                  startIcon={<i className='ri-download-line' />}
                  size='small'
                >
                  Export
                </Button>
              </Box>
            </Box>

            <GoodsReceivingTable
              orders={orders}
              loading={loading}
              onEdit={handleEditOrder}
              onDelete={handleDeleteOrder}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default GoodsReceivingPage


