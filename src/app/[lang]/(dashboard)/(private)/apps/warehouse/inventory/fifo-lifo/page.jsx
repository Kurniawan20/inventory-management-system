'use client'

import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
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
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const FIFOLIFOPage = () => {
  const [tab, setTab] = useState(0)
  
  const batchData = [
    { batch_id: 'BATCH-001', item: 'Oil Filter OF-500', method: 'FIFO', received_date: '2024-01-15', expiry_date: '2025-01-15', qty: 150, priority: 1, status: 'active' },
    { batch_id: 'BATCH-002', item: 'Safety Gloves SG-100', method: 'FEFO', received_date: '2024-02-20', expiry_date: '2024-08-20', qty: 200, priority: 1, status: 'critical' },
    { batch_id: 'BATCH-003', item: 'Steel Bolts SB-M12', method: 'LIFO', received_date: '2024-03-10', expiry_date: null, qty: 500, priority: 2, status: 'active' }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={
            <Box className='flex items-center gap-2'>
              <i className='ri-sort-asc text-2xl' />
              <Box>
                <Typography variant='h5'>FIFO / LIFO / FEFO Tracking</Typography>
                <Typography variant='body2' color='text.secondary'>Inventory rotation method management</Typography>
              </Box>
            </Box>
          } />
          <CardContent>
            <Tabs value={tab} onChange={(e, v) => setTab(v)} className='mb-4'>
              <Tab label="FIFO (First In First Out)" />
              <Tab label="LIFO (Last In First Out)" />
              <Tab label="FEFO (First Expiry First Out)" />
            </Tabs>
            
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Batch ID</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Received Date</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {batchData.filter(b => tab === 0 ? b.method === 'FIFO' : tab === 1 ? b.method === 'LIFO' : b.method === 'FEFO').map(batch => (
                    <TableRow key={batch.batch_id} hover>
                      <TableCell><Typography variant='body2' className='font-medium'>{batch.batch_id}</Typography></TableCell>
                      <TableCell>{batch.item}</TableCell>
                      <TableCell><Chip label={batch.method} size='small' color='primary' /></TableCell>
                      <TableCell><Typography variant='caption'>{new Date(batch.received_date).toLocaleDateString()}</Typography></TableCell>
                      <TableCell><Typography variant='caption'>{batch.expiry_date ? new Date(batch.expiry_date).toLocaleDateString() : 'N/A'}</Typography></TableCell>
                      <TableCell><Chip label={batch.qty} variant='outlined' size='small' /></TableCell>
                      <TableCell><Chip label={`Priority ${batch.priority}`} size='small' color={batch.priority === 1 ? 'error' : 'default'} /></TableCell>
                      <TableCell><Chip label={batch.status === 'critical' ? 'Critical' : 'Active'} color={batch.status === 'critical' ? 'error' : 'success'} size='small' /></TableCell>
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

export default FIFOLIFOPage
