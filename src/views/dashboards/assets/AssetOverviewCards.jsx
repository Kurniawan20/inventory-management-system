'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const AssetOverviewCards = ({ data }) => {
  const cardData = [
    {
      title: 'Total Assets',
      value: data?.totalAssets || 0,
      icon: 'ri-building-line',
      color: 'primary',
      trend: `+${data?.monthlyGrowth || 0}%`,
      trendColor: 'success'
    },
    {
      title: 'Active Assets',
      value: data?.activeAssets || 0,
      icon: 'ri-checkbox-circle-line',
      color: 'success',
      trend: 'Operational',
      trendColor: 'success'
    },
    {
      title: 'Under Maintenance',
      value: data?.underMaintenance || 0,
      icon: 'ri-tools-line',
      color: 'warning',
      trend: 'In Progress',
      trendColor: 'warning'
    },
    {
      title: 'Critical Alerts',
      value: data?.criticalAlerts || 0,
      icon: 'ri-alert-line',
      color: 'error',
      trend: 'Requires Action',
      trendColor: 'error'
    }
  ]

  return (
    <Grid container spacing={6}>
      {cardData.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Card>
            <CardContent className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color={item.color} size={42}>
                <i className={item.icon} />
              </CustomAvatar>
              <div className='flex flex-col gap-1'>
                <Typography color='text.primary' variant='h4'>
                  {item.value.toLocaleString()}
                </Typography>
                <div className='flex items-center gap-2'>
                  <Typography variant='body2' color='text.secondary'>
                    {item.title}
                  </Typography>
                  <Chip
                    label={item.trend}
                    color={item.trendColor}
                    size='small'
                    variant='tonal'
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default AssetOverviewCards
