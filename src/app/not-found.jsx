'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// Component Imports
import Logo from '@components/layout/shared/Logo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

const NotFound = () => {
  // Vars
  const darkImg = '/images/pages/misc-mask-1-dark.png'
  const lightImg = '/images/pages/misc-mask-1-light.png'

  // Hooks
  const miscBackground = useImageVariant('light', lightImg, darkImg)

  return (
    <div className='flex items-center justify-center min-h-screen relative p-6'>
      <Card className='flex flex-col justify-center items-center text-center p-6 max-w-lg w-full'>
        <CardContent className='p-6'>
          <div className='mb-6'>
            <Logo />
          </div>
          
          {/* Under Maintenance Icon */}
          <Box className='mb-6'>
            <i className='ri-tools-line text-6xl text-warning mb-4' />
          </Box>

          <Typography variant='h4' className='mb-4 font-bold'>
            Under Maintenance
          </Typography>
          
          <Typography variant='h6' className='mb-4 text-textSecondary'>
            System Temporarily Unavailable
          </Typography>
          
          <Typography className='mb-6 text-textSecondary'>
            We're currently performing scheduled maintenance to improve your experience. 
            The Pertamina Asset Management System will be back online shortly.
          </Typography>

          <Box className='mb-6 p-4 bg-warning-light rounded-lg'>
            <Typography variant='body2' className='mb-2 font-medium'>
              <i className='ri-information-line mr-2' />
              Maintenance Information:
            </Typography>
            <Typography variant='body2' className='text-textSecondary'>
              • Expected completion: Within 2 hours<br/>
              • All data is safe and secure<br/>
              • Emergency access: Contact IT Support
            </Typography>
          </Box>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              component={Link}
              href='/'
              variant='contained'
              color='primary'
              startIcon={<i className='ri-home-line' />}
            >
              Return to Home
            </Button>
            
            <Button
              variant='outlined'
              color='secondary'
              startIcon={<i className='ri-refresh-line' />}
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </div>

          <Box className='mt-6 pt-4 border-t border-divider'>
            <Typography variant='body2' className='text-textSecondary'>
              Need immediate assistance?
            </Typography>
            <Typography variant='body2' className='text-primary font-medium'>
              Contact IT Support: +62-21-1234-5678
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Background Image */}
      <img 
        src={miscBackground} 
        alt='Under Maintenance Background'
        className='absolute bottom-0 z-[-1] w-full max-md:hidden opacity-50'
      />
    </div>
  )
}

export default NotFound
