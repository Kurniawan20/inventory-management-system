'use client'

import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import { getRealTimeStockList, getRealTimeStockSummary } from '@/server/actions/getRealTimeStockData'

const RealTimeStockPage = () => {
  const [stock, setStock] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const loadData = async () => {
    setLoading(true)
    const [stockData, summaryData] = await Promise.all([getRealTimeStockList({ search }), getRealTimeStockSummary()])
    setStock(stockData.stock)
    setSummary(summaryData)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])
  useEffect(() => { const t = setTimeout(loadData, 300); return () => clearTimeout(t) }, [search])

  const getStatusChip = (status, current, min, max) => {
    if (status === 'low') return <Chip label="Low Stock" color="error" size="small" />
    if (status === 'overstock') return <Chip label="Overstock" color="warning" size="small" />
    return <Chip label="Optimal" color="success" size="small" />
  }

  return (
    <Grid container spacing={6}>
      {summary && (
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {[
              { title: 'Total Items', value: summary.total_items, color: 'primary', icon: 'ri-box-3-line' },
              { title: 'Low Stock', value: summary.low_stock_items, color: 'error', icon: 'ri-alert-line' },
              { title: 'Optimal', value: summary.optimal_items, color: 'success', icon: 'ri-check-line' },
              { title: 'Overstocked', value: summary.overstocked_items, color: 'warning', icon: 'ri-inbox-archive-line' }
            ].map((stat, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ minHeight: '120px' }}>
                    <Box className='flex items-center gap-3'>
                      <Box className={`flex items-center justify-center w-12 h-12 rounded bg-${stat.color}-light`}>
                        <i className={`${stat.icon} text-2xl text-${stat.color}`} />
                      </Box>
                      <Box>
                        <Typography variant='h4'>{stat.value}</Typography>
                        <Typography variant='body2' color='text.secondary'>{stat.title}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        <Card>
          <CardHeader title={
            <Box className='flex items-center gap-2'>
              <i className='ri-stock-line text-2xl' />
              <Box>
                <Typography variant='h5'>Real-time Stock</Typography>
                <Typography variant='body2' color='text.secondary'>Monitor warehouse inventory levels in real-time</Typography>
              </Box>
            </Box>
          } />
          <CardContent>
            <TextField size='small' placeholder='Search items...' value={search} onChange={e => setSearch(e.target.value)} className='mb-4 min-w-64' />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Current Stock</TableCell>
                    <TableCell>Min/Max</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={6}><LinearProgress /></TableCell></TableRow>
                  ) : stock.map(s => (
                    <TableRow key={s.stock_id} hover>
                      <TableCell><Typography variant='body2'>{s.item_name}</Typography></TableCell>
                      <TableCell><Chip label={s.location} size='small' variant='outlined' /></TableCell>
                      <TableCell><Typography variant='h6'>{s.current_stock} {s.unit}</Typography></TableCell>
                      <TableCell><Typography variant='caption'>{s.min_stock} / {s.max_stock}</Typography></TableCell>
                      <TableCell>{getStatusChip(s.status, s.current_stock, s.min_stock, s.max_stock)}</TableCell>
                      <TableCell><Typography variant='caption'>{new Date(s.last_updated).toLocaleString()}</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default RealTimeStockPage
