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

const DeliveryOrdersPage = () => {
  const deliveries = [
    { do_id: 'DO-001', order_id: 'SO-001', customer: 'PT ABC Indonesia', destination: 'Jakarta', driver: 'Budi', vehicle: 'B-1234-XYZ', status: 'delivered', eta: '2024-03-15 14:00' },
    { do_id: 'DO-002', order_id: 'SO-002', customer: 'CV XYZ Corp', destination: 'Bandung', driver: 'Ahmad', vehicle: 'D-5678-ABC', status: 'in-transit', eta: '2024-03-16 10:00' },
    { do_id: 'DO-003', order_id: 'SO-003', customer: 'UD Makmur', destination: 'Surabaya', driver: 'Siti', vehicle: 'L-9012-DEF', status: 'scheduled', eta: '2024-03-17 09:00' }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={
            <Box className='flex items-center gap-2'>
              <i className='ri-truck-line text-2xl' />
              <Box>
                <Typography variant='h5'>Delivery Orders</Typography>
                <Typography variant='body2' color='text.secondary'>Track and manage delivery orders</Typography>
              </Box>
            </Box>
          } />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>DO ID</TableCell>
                    <TableCell>Order</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Destination</TableCell>
                    <TableCell>Driver</TableCell>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>ETA</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deliveries.map(delivery => (
                    <TableRow key={delivery.do_id} hover>
                      <TableCell><Typography variant='body2' className='font-medium'>{delivery.do_id}</Typography></TableCell>
                      <TableCell>{delivery.order_id}</TableCell>
                      <TableCell>{delivery.customer}</TableCell>
                      <TableCell><Chip label={delivery.destination} size='small' variant='outlined' /></TableCell>
                      <TableCell>{delivery.driver}</TableCell>
                      <TableCell><Chip label={delivery.vehicle} size='small' /></TableCell>
                      <TableCell><Typography variant='caption'>{delivery.eta}</Typography></TableCell>
                      <TableCell>
                        <Chip label={delivery.status === 'delivered' ? 'Delivered' : delivery.status === 'in-transit' ? 'In Transit' : 'Scheduled'} 
                          color={delivery.status === 'delivered' ? 'success' : delivery.status === 'in-transit' ? 'info' : 'warning'} size='small' />
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

export default DeliveryOrdersPage
