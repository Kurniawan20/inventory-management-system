'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

const WarehouseUtilization = ({ data }) => {
  const getUtilizationColor = (percentage) => {
    if (percentage >= 90) return 'error'
    if (percentage >= 75) return 'warning'
    return 'success'
  }

  return (
    <Card className='h-full'>
      <CardHeader
        title='Warehouse Utilization'
        subheader='Storage capacity usage across facilities'
        action={
          <IconButton size='small'>
            <i className='ri-more-2-line' />
          </IconButton>
        }
      />
      <CardContent className='flex flex-col gap-4'>
        {data?.map((warehouse, index) => (
          <Box key={index} className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <Typography variant='body2' className='font-medium'>
                {warehouse.warehouse}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {warehouse.used.toLocaleString()} / {warehouse.capacity.toLocaleString()} ({warehouse.percentage}%)
              </Typography>
            </div>
            <LinearProgress
              variant='determinate'
              value={warehouse.percentage}
              className='h-2 rounded-full'
              color={getUtilizationColor(warehouse.percentage)}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}

export default WarehouseUtilization
