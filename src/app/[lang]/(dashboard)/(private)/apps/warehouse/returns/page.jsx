'use client'

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

const ReturnsPage = () => {
  const returns = [
    { return_id: 'RET-001', order_id: 'SO-001', customer: 'PT ABC', reason: 'Defective', items: 2, status: 'approved', requested_date: '2024-03-10', processed_by: 'Admin 1' },
    { return_id: 'RET-002', order_id: 'SO-002', customer: 'CV XYZ', reason: 'Wrong Item', items: 1, status: 'pending', requested_date: '2024-03-14', processed_by: null },
    { return_id: 'RET-003', order_id: 'SO-003', customer: 'UD Makmur', reason: 'Damaged', items: 3, status: 'processing', requested_date: '2024-03-12', processed_by: 'Admin 2' },
    { return_id: 'RET-004', order_id: 'SO-004', customer: 'PT Sejahtera', reason: 'Not as Described', items: 1, status: 'completed', requested_date: '2024-03-08', processed_by: 'Admin 1' }
  ]

  const stats = [
    { title: 'Total Returns', value: returns.length, color: 'primary' },
    { title: 'Pending', value: returns.filter(r => r.status === 'pending').length, color: 'warning' },
    { title: 'Processing', value: returns.filter(r => r.status === 'processing').length, color: 'info' },
    { title: 'Completed', value: returns.filter(r => r.status === 'completed').length, color: 'success' }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          {stats.map((stat, i) => (
            <Grid item xs={12} sm={3} key={i}>
              <Card>
                <CardContent sx={{ minHeight: '100px' }}>
                  <Typography variant='h4'>{stat.value}</Typography>
                  <Typography variant='body2' color='text.secondary'>{stat.title}</Typography>
                  <Chip label='Active' color={stat.color} size='small' className='mt-2' />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title={
            <Box className='flex items-center gap-2'>
              <i className='ri-arrow-go-back-line text-2xl' />
              <Box>
                <Typography variant='h5'>Return & Reverse Logistics</Typography>
                <Typography variant='body2' color='text.secondary'>Manage product returns and reverse logistics operations</Typography>
              </Box>
            </Box>
          } />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Return ID</TableCell>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell>Requested Date</TableCell>
                    <TableCell>Processed By</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {returns.map(ret => (
                    <TableRow key={ret.return_id} hover>
                      <TableCell><Typography variant='body2' className='font-medium'>{ret.return_id}</Typography></TableCell>
                      <TableCell>{ret.order_id}</TableCell>
                      <TableCell>{ret.customer}</TableCell>
                      <TableCell><Chip label={ret.reason} size='small' variant='outlined' /></TableCell>
                      <TableCell>{ret.items}</TableCell>
                      <TableCell><Typography variant='caption'>{new Date(ret.requested_date).toLocaleDateString()}</Typography></TableCell>
                      <TableCell>{ret.processed_by || '-'}</TableCell>
                      <TableCell>
                        <Chip 
                          label={ret.status.charAt(0).toUpperCase() + ret.status.slice(1)} 
                          color={ret.status === 'completed' ? 'success' : ret.status === 'processing' ? 'info' : ret.status === 'approved' ? 'success' : 'warning'} 
                          size='small' 
                        />
                      </TableCell>
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

export default ReturnsPage
