'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const AssetStatCards = ({ statistics }) => {
  const statCards = [
    {
      title: 'Total Assets',
      value: statistics.total || 0,
      icon: 'ri-database-2-line',
      color: 'primary',
      trend: '+12%',
      trendColor: 'success'
    },
    {
      title: 'Active Assets',
      value: statistics.byStatus?.active || 0,
      icon: 'ri-check-line',
      color: 'success',
      trend: '+5%',
      trendColor: 'success'
    },
    {
      title: 'Under Maintenance',
      value: statistics.byStatus?.maintenance || 0,
      icon: 'ri-tools-line',
      color: 'warning',
      trend: '-8%',
      trendColor: 'success'
    },
    {
      title: 'Critical Assets',
      value: statistics.byCriticality?.veryHigh || 0,
      icon: 'ri-alert-line',
      color: 'error',
      trend: '0%',
      trendColor: 'secondary'
    },
    {
      title: 'Maintenance Due',
      value: statistics.maintenanceDue || 0,
      icon: 'ri-calendar-line',
      color: 'info',
      trend: '+3',
      trendColor: 'warning'
    }
  ]

  return (
    <Grid container spacing={6}>
      {statCards.map((stat, index) => (
        <Grid key={index} item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent className='flex justify-between items-center'>
              <Box>
                <Typography variant='h4' className='font-semibold mb-1'>
                  {stat.value.toLocaleString()}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {stat.title}
                </Typography>
                <Box className='flex items-center gap-1 mt-2'>
                  <Typography 
                    variant='caption' 
                    color={`${stat.trendColor}.main`}
                    className='font-medium'
                  >
                    {stat.trend}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    vs last month
                  </Typography>
                </Box>
              </Box>
              <CustomAvatar
                variant='rounded'
                color={stat.color}
                size={50}
              >
                <i className={`${stat.icon} text-xl`} />
              </CustomAvatar>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default AssetStatCards
