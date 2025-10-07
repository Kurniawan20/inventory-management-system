'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'

const InventoryMovementStats = ({ summary }) => {
  if (!summary) return null

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getMovementTypePercentage = (count) => {
    return summary.total_movements > 0 ? (count / summary.total_movements) * 100 : 0
  }

  const getTrackingMethodPercentage = (count) => {
    const totalTracking = Object.values(summary.tracking_methods).reduce((sum, val) => sum + val, 0)
    return totalTracking > 0 ? (count / totalTracking) * 100 : 0
  }

  return (
    <Grid container spacing={4}>
      {/* Total Movements */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box className='flex items-center justify-between mb-2'>
              <Box className='flex items-center gap-2'>
                <Box className='p-2 rounded-lg bg-primary-light'>
                  <i className='ri-exchange-line text-primary-main text-xl' />
                </Box>
                <Typography variant='body2' color='text.secondary'>
                  Total Movements
                </Typography>
              </Box>
            </Box>
            <Typography variant='h4' className='font-bold mb-1'>
              {summary.total_movements.toLocaleString()}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              All transaction types
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Value */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box className='flex items-center justify-between mb-2'>
              <Box className='flex items-center gap-2'>
                <Box className='p-2 rounded-lg bg-success-light'>
                  <i className='ri-money-dollar-circle-line text-success-main text-xl' />
                </Box>
                <Typography variant='body2' color='text.secondary'>
                  Total Value
                </Typography>
              </Box>
            </Box>
            <Typography variant='h4' className='font-bold mb-1'>
              {formatCurrency(summary.total_value)}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Inventory value
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Movement Types Breakdown */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box className='flex items-center gap-2 mb-3'>
              <Box className='p-2 rounded-lg bg-info-light'>
                <i className='ri-pie-chart-line text-info-main text-xl' />
              </Box>
              <Typography variant='body2' color='text.secondary'>
                Movement Types
              </Typography>
            </Box>
            <Box className='space-y-2'>
              <Box className='flex items-center justify-between'>
                <Box className='flex items-center gap-2'>
                  <Chip label='Inbound' color='success' size='small' variant='outlined' />
                  <Typography variant='body2'>{summary.inbound_movements}</Typography>
                </Box>
                <Typography variant='caption' color='text.secondary'>
                  {getMovementTypePercentage(summary.inbound_movements).toFixed(1)}%
                </Typography>
              </Box>
              <LinearProgress 
                variant='determinate' 
                value={getMovementTypePercentage(summary.inbound_movements)} 
                color='success'
                sx={{ height: 4, borderRadius: 2 }}
              />
              
              <Box className='flex items-center justify-between'>
                <Box className='flex items-center gap-2'>
                  <Chip label='Outbound' color='error' size='small' variant='outlined' />
                  <Typography variant='body2'>{summary.outbound_movements}</Typography>
                </Box>
                <Typography variant='caption' color='text.secondary'>
                  {getMovementTypePercentage(summary.outbound_movements).toFixed(1)}%
                </Typography>
              </Box>
              <LinearProgress 
                variant='determinate' 
                value={getMovementTypePercentage(summary.outbound_movements)} 
                color='error'
                sx={{ height: 4, borderRadius: 2 }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Tracking Methods */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box className='flex items-center gap-2 mb-3'>
              <Box className='p-2 rounded-lg bg-warning-light'>
                <i className='ri-sort-asc text-warning-main text-xl' />
              </Box>
              <Typography variant='body2' color='text.secondary'>
                Tracking Methods
              </Typography>
            </Box>
            <Box className='space-y-2'>
              <Box className='flex items-center justify-between'>
                <Box className='flex items-center gap-2'>
                  <Chip label='FIFO' color='primary' size='small' variant='outlined' />
                  <Typography variant='body2'>{summary.tracking_methods.FIFO}</Typography>
                </Box>
                <Typography variant='caption' color='text.secondary'>
                  {getTrackingMethodPercentage(summary.tracking_methods.FIFO).toFixed(1)}%
                </Typography>
              </Box>
              
              <Box className='flex items-center justify-between'>
                <Box className='flex items-center gap-2'>
                  <Chip label='FEFO' color='warning' size='small' variant='outlined' />
                  <Typography variant='body2'>{summary.tracking_methods.FEFO}</Typography>
                </Box>
                <Typography variant='caption' color='text.secondary'>
                  {getTrackingMethodPercentage(summary.tracking_methods.FEFO).toFixed(1)}%
                </Typography>
              </Box>
              
              <Box className='flex items-center justify-between'>
                <Box className='flex items-center gap-2'>
                  <Chip label='LIFO' color='secondary' size='small' variant='outlined' />
                  <Typography variant='body2'>{summary.tracking_methods.LIFO}</Typography>
                </Box>
                <Typography variant='caption' color='text.secondary'>
                  {getTrackingMethodPercentage(summary.tracking_methods.LIFO).toFixed(1)}%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Additional Stats */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>Movement Summary</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Box className='text-center p-4 border rounded-lg'>
                  <Box className='flex items-center justify-center gap-2 mb-2'>
                    <i className='ri-arrow-down-line text-success-main text-2xl' />
                    <Typography variant='h5' className='font-bold text-success-main'>
                      {summary.inbound_movements}
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    Inbound Transactions
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Box className='text-center p-4 border rounded-lg'>
                  <Box className='flex items-center justify-center gap-2 mb-2'>
                    <i className='ri-arrow-up-line text-error-main text-2xl' />
                    <Typography variant='h5' className='font-bold text-error-main'>
                      {summary.outbound_movements}
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    Outbound Transactions
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Box className='text-center p-4 border rounded-lg'>
                  <Box className='flex items-center justify-center gap-2 mb-2'>
                    <i className='ri-arrow-left-right-line text-info-main text-2xl' />
                    <Typography variant='h5' className='font-bold text-info-main'>
                      {summary.transfer_movements}
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    Transfer Transactions
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Box className='text-center p-4 border rounded-lg'>
                  <Box className='flex items-center justify-center gap-2 mb-2'>
                    <i className='ri-settings-line text-warning-main text-2xl' />
                    <Typography variant='h5' className='font-bold text-warning-main'>
                      {summary.adjustment_movements}
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    Adjustment Transactions
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default InventoryMovementStats
