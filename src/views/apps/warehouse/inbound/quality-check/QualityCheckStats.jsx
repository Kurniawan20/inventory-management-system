'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

const QualityCheckStats = ({ summary }) => {
  if (!summary) return null

  const statsData = [
    {
      title: 'Total Inspections',
      value: summary.total_inspections,
      icon: 'ri-clipboard-line',
      color: 'primary',
      bgColor: 'bg-primary-light'
    },
    {
      title: 'Passed',
      value: summary.passed_inspections,
      icon: 'ri-checkbox-circle-line',
      color: 'success',
      bgColor: 'bg-success-light'
    },
    {
      title: 'Failed',
      value: summary.failed_inspections,
      icon: 'ri-close-circle-line',
      color: 'error',
      bgColor: 'bg-error-light'
    },
    {
      title: 'In Progress',
      value: summary.in_progress_inspections,
      icon: 'ri-loader-4-line',
      color: 'info',
      bgColor: 'bg-info-light'
    },
    {
      title: 'Pass Rate',
      value: `${summary.pass_rate}%`,
      icon: 'ri-pie-chart-line',
      color: 'success',
      bgColor: 'bg-success-light'
    },
    {
      title: 'Total Defects',
      value: summary.total_defects,
      icon: 'ri-error-warning-line',
      color: 'warning',
      bgColor: 'bg-warning-light'
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
                  label={stat.color === 'success' ? 'Good' : 'Active'} 
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
                  {/* Reserved space for subtitle if needed */}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default QualityCheckStats
