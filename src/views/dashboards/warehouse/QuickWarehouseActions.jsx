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

const QuickWarehouseActions = () => {
  const actions = [
    {
      title: 'Goods Receiving',
      description: 'Process inbound items',
      icon: 'ri-download-line',
      color: 'success',
      href: '/apps/warehouse/inbound/receiving'
    },
    {
      title: 'Stock Check',
      description: 'View inventory levels',
      icon: 'ri-search-line',
      color: 'info',
      href: '/apps/warehouse/inventory/real-time'
    },
    {
      title: 'Create Outbound',
      description: 'Process shipments',
      icon: 'ri-upload-line',
      color: 'primary',
      href: '/apps/warehouse/outbound/picking'
    },
    {
      title: 'Generate Report',
      description: 'Warehouse analytics',
      icon: 'ri-file-chart-line',
      color: 'warning',
      href: '/apps/warehouse/reports'
    }
  ]

  return (
    <Card className='h-full'>
      <CardHeader
        title='Quick Actions'
        subheader='Common warehouse operations'
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

export default QuickWarehouseActions
