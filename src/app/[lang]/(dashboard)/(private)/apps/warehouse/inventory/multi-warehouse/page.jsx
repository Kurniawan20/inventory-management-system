'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'

const MultiWarehousePage = () => {
  const warehouses = [
    { id: 'WH-001', name: 'Gudang A - Main Warehouse', location: 'Jakarta', capacity: 10000, used: 7500, items: 1250, status: 'operational', utilization: 75 },
    { id: 'WH-002', name: 'Gudang B - Equipment Storage', location: 'Surabaya', capacity: 5000, used: 4200, items: 800, status: 'operational', utilization: 84 },
    { id: 'WH-003', name: 'Safety Equipment Storage', location: 'Bandung', capacity: 3000, used: 1500, items: 450, status: 'operational', utilization: 50 },
    { id: 'WH-004', name: 'Uniform Storage', location: 'Semarang', capacity: 2000, used: 1900, items: 600, status: 'nearfull', utilization: 95 }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='mb-2'>Multi-warehouse Control</Typography>
        <Typography variant='body2' color='text.secondary'>Manage and monitor multiple warehouse locations</Typography>
      </Grid>
      
      {warehouses.map(wh => (
        <Grid item xs={12} md={6} key={wh.id}>
          <Card>
            <CardHeader 
              title={<Box className='flex items-center gap-2'>
                <i className='ri-building-line' />
                <Typography variant='h6'>{wh.name}</Typography>
              </Box>}
              action={<Chip label={wh.status === 'nearfull' ? 'Near Full' : 'Operational'} color={wh.status === 'nearfull' ? 'warning' : 'success'} size='small' />}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant='caption' color='text.secondary'>Location</Typography>
                  <Typography variant='body2'>{wh.location}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='caption' color='text.secondary'>Total Items</Typography>
                  <Typography variant='body2'>{wh.items} items</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='caption' color='text.secondary'>Capacity Utilization</Typography>
                  <Box className='flex items-center gap-2 mt-1'>
                    <LinearProgress variant='determinate' value={wh.utilization} className='flex-1' color={wh.utilization > 90 ? 'warning' : 'primary'} />
                    <Typography variant='caption' className='font-medium'>{wh.utilization}%</Typography>
                  </Box>
                  <Typography variant='caption' color='text.secondary'>{wh.used} / {wh.capacity} m³</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default MultiWarehousePage
