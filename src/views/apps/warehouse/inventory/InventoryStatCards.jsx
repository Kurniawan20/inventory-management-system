'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const InventoryStatCards = ({ statistics }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('id-ID').format(value)
  }

  const utilizationPercentage = statistics.warehouses ? 
    Math.round((statistics.warehouses.totalUtilization / statistics.warehouses.totalCapacity) * 100) : 0

  const statCards = [
    {
      title: 'Total Items',
      value: statistics.inventory?.totalItems || 0,
      icon: 'ri-database-2-line',
      color: 'primary',
      trend: '+8%',
      trendColor: 'success',
      format: 'number'
    },
    {
      title: 'Total Value',
      value: statistics.inventory?.totalValue || 0,
      icon: 'ri-money-dollar-circle-line',
      color: 'success',
      trend: '+15%',
      trendColor: 'success',
      format: 'currency'
    },
    {
      title: 'Low Stock Items',
      value: statistics.inventory?.lowStockItems || 0,
      icon: 'ri-alert-line',
      color: 'warning',
      trend: '-12%',
      trendColor: 'success',
      format: 'number'
    },
    {
      title: 'Out of Stock',
      value: statistics.inventory?.outOfStockItems || 0,
      icon: 'ri-close-circle-line',
      color: 'error',
      trend: '-5%',
      trendColor: 'success',
      format: 'number'
    },
    {
      title: 'Warehouse Utilization',
      value: utilizationPercentage,
      icon: 'ri-pie-chart-line',
      color: 'info',
      trend: '+3%',
      trendColor: 'success',
      format: 'percentage'
    }
  ]

  const formatValue = (value, format) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value)
      case 'number':
        return formatNumber(value)
      case 'percentage':
        return `${value}%`
      default:
        return value.toString()
    }
  }

  return (
    <Grid container spacing={6}>
      {statCards.map((stat, index) => (
        <Grid key={index} item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent className='flex justify-between items-center'>
              <Box>
                <Typography variant='h4' className='font-semibold mb-1'>
                  {formatValue(stat.value, stat.format)}
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

export default InventoryStatCards
