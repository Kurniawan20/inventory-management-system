'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const WarehouseOverviewCards = ({ data }) => {
  const cardData = [
    {
      title: 'Total Items',
      value: data?.totalItems || 0,
      icon: 'ri-stack-line',
      color: 'primary',
      trend: `${data?.monthlyTurnover || 0}% Turnover`,
      trendColor: 'info'
    },
    {
      title: 'In Stock',
      value: data?.inStock || 0,
      icon: 'ri-checkbox-circle-line',
      color: 'success',
      trend: 'Available',
      trendColor: 'success'
    },
    {
      title: 'Low Stock',
      value: data?.lowStock || 0,
      icon: 'ri-error-warning-line',
      color: 'warning',
      trend: 'Needs Reorder',
      trendColor: 'warning'
    },
    {
      title: 'Out of Stock',
      value: data?.outOfStock || 0,
      icon: 'ri-close-circle-line',
      color: 'error',
      trend: 'Critical',
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

export default WarehouseOverviewCards
