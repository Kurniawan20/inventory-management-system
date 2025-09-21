'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const QuickAssetActions = () => {
  const actions = [
    {
      title: 'Register New Asset',
      description: 'Add new asset to inventory',
      icon: 'ri-add-circle-line',
      color: 'primary',
      href: '/apps/assets/registration'
    },
    {
      title: 'Asset Search',
      description: 'Find and track assets',
      icon: 'ri-search-line',
      color: 'secondary',
      href: '/apps/assets/tracking'
    },
    {
      title: 'Generate Report',
      description: 'Create asset reports',
      icon: 'ri-file-text-line',
      color: 'success',
      href: '/apps/assets/reports'
    },
    {
      title: 'Maintenance Schedule',
      description: 'View upcoming maintenance',
      icon: 'ri-calendar-line',
      color: 'warning',
      href: '/apps/assets/maintenance/schedule'
    }
  ]

  return (
    <Card className='h-full'>
      <CardHeader
        title='Quick Actions'
        subheader='Frequently used asset management functions'
      />
      <CardContent className='flex flex-col gap-4'>
        {actions.map((action, index) => (
          <Button
            key={index}
            variant='outlined'
            className='flex items-center justify-start gap-3 p-4 h-auto'
            fullWidth
          >
            <CustomAvatar variant='rounded' color={action.color} size={40}>
              <i className={action.icon} />
            </CustomAvatar>
            <Box className='flex flex-col items-start text-left'>
              <Typography variant='body1' className='font-medium'>
                {action.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {action.description}
              </Typography>
            </Box>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}

export default QuickAssetActions
