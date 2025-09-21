'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

const AssetLocationDistribution = ({ data }) => {
  return (
    <Card className='h-full'>
      <CardHeader
        title='Asset Distribution by Location'
        subheader='Assets across different facilities'
        action={
          <IconButton size='small'>
            <i className='ri-more-2-line' />
          </IconButton>
        }
      />
      <CardContent className='flex flex-col gap-4'>
        {data?.map((location, index) => (
          <Box key={index} className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <Typography variant='body2' className='font-medium'>
                {location.location}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {location.count} ({location.percentage}%)
              </Typography>
            </div>
            <LinearProgress
              variant='determinate'
              value={location.percentage}
              className='h-2 rounded-full'
              color='primary'
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}

export default AssetLocationDistribution
