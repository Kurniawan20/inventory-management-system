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

const PackingPage = () => {
  const packs = [
    { pack_id: 'PACK-001', order_id: 'SO-001', boxes: 3, weight: '25 kg', carrier: 'JNE', tracking: 'TRK-001', status: 'shipped', packed_by: 'Ahmad' },
    { pack_id: 'PACK-002', order_id: 'SO-002', boxes: 5, weight: '40 kg', carrier: 'JNT', tracking: 'TRK-002', status: 'packing', packed_by: 'Siti' },
    { pack_id: 'PACK-003', order_id: 'SO-003', boxes: 2, weight: '15 kg', carrier: 'SiCepat', tracking: null, status: 'pending', packed_by: null }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={
            <Box className='flex items-center gap-2'>
              <i className='ri-box-3-line text-2xl' />
              <Box>
                <Typography variant='h5'>Packing &amp; Shipping</Typography>
                <Typography variant='body2' color='text.secondary'>Pack orders and manage shipments</Typography>
              </Box>
            </Box>
          } />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Pack ID</TableCell>
                    <TableCell>Order</TableCell>
                    <TableCell>Boxes</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Carrier</TableCell>
                    <TableCell>Tracking</TableCell>
                    <TableCell>Packed By</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {packs.map(pack => (
                    <TableRow key={pack.pack_id} hover>
                      <TableCell><Typography variant='body2' className='font-medium'>{pack.pack_id}</Typography></TableCell>
                      <TableCell>{pack.order_id}</TableCell>
                      <TableCell><Chip label={pack.boxes} size='small' variant='outlined' /></TableCell>
                      <TableCell>{pack.weight}</TableCell>
                      <TableCell><Chip label={pack.carrier} size='small' /></TableCell>
                      <TableCell>{pack.tracking || '-'}</TableCell>
                      <TableCell>{pack.packed_by || '-'}</TableCell>
                      <TableCell>
                        <Chip label={pack.status === 'shipped' ? 'Shipped' : pack.status === 'packing' ? 'Packing' : 'Pending'} 
                          color={pack.status === 'shipped' ? 'success' : pack.status === 'packing' ? 'info' : 'warning'} size='small' />
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

export default PackingPage
