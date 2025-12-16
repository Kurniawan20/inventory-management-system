'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

const GoodsReceivingStats = ({ summary }) => {
  if (!summary) return null

  const statsData = [
    {
      title: 'Total Orders',
      value: summary.total_orders,
      icon: 'ri-file-list-3-line',
      color: 'primary',
      bgColor: 'bg-primary-light'
    },
    {
      title: 'Pending',
      value: summary.pending_orders,
      icon: 'ri-time-line',
      color: 'warning',
      bgColor: 'bg-warning-light'
    },
    {
      title: 'In Progress',
      value: summary.in_progress_orders,
      icon: 'ri-loader-4-line',
      color: 'info',
      bgColor: 'bg-info-light'
    },
    {
      title: 'Completed',
      value: summary.completed_orders,
      icon: 'ri-checkbox-circle-line',
      color: 'success',
      bgColor: 'bg-success-light'
    },
    {
      title: 'Total Items',
      value: summary.total_items,
      subtitle: `${summary.received_items} received`,
      icon: 'ri-inbox-line',
      color: 'secondary',
      bgColor: 'bg-secondary-light'
    },
    {
      title: 'Completion Rate',
      value: `${summary.completion_rate}%`,
      icon: 'ri-bar-chart-line',
      color: 'success',
      bgColor: 'bg-success-light'
    }
  ]

  return (
    <Grid container spacing={6}>
      {statsData.map((stat, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <Card sx={{ height: '100%' }}>
            <CardContent className='flex flex-col gap-2' sx={{ minHeight: '140px' }}>
              <Box className='flex items-center justify-between'>
                <Box className={`flex items-center justify-center w-12 h-12 rounded ${stat.bgColor}`}>
                  <i className={`${stat.icon} text-2xl text-${stat.color}`} />
                </Box>
                <Chip 
                  label={stat.color === 'success' ? 'On Track' : 'Active'} 
                  color={stat.color} 
                  size='small' 
                  variant='tonal'
                />
              </Box>
              <Box className='flex flex-col' sx={{ minHeight: '60px' }}>
                <Typography variant='h4' className='font-bold'>
                  {stat.value}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {stat.title}
                </Typography>
                <Box sx={{ minHeight: '20px' }}>
                  {stat.subtitle && (
                    <Typography variant='caption' color='text.secondary'>
                      {stat.subtitle}
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default GoodsReceivingStats
