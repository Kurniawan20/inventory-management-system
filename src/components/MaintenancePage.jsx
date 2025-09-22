'use client'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// Component Imports
import Logo from '@components/layout/shared/Logo'

const MaintenancePage = ({ title = "Under Maintenance", feature = "This feature" }) => {
  const router = useRouter()

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
            {title}
          </Typography>
          
          <Typography variant='h6' className='mb-4 text-textSecondary'>
            {feature} is Currently Under Development
          </Typography>
          
          <Typography className='mb-6 text-textSecondary'>
            We're working hard to bring you this feature. The Pertamina Asset Management System 
            is continuously being enhanced to serve you better.
          </Typography>

          <Box className='mb-6 p-4 bg-info-light rounded-lg'>
            <Typography variant='body2' className='mb-2 font-medium'>
              <i className='ri-information-line mr-2' />
              Development Status:
            </Typography>
            <Typography variant='body2' className='text-textSecondary'>
              • Feature in active development<br/>
              • Expected completion: Coming soon<br/>
              • Alternative features available in main menu
            </Typography>
          </Box>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              onClick={() => router.back()}
              variant='contained'
              color='primary'
              startIcon={<i className='ri-arrow-left-line' />}
            >
              Go Back
            </Button>
            
            <Button
              component={Link}
              href='/'
              variant='outlined'
              color='secondary'
              startIcon={<i className='ri-home-line' />}
            >
              Return to Home
            </Button>
          </div>

          <Box className='mt-6 pt-4 border-t border-divider'>
            <Typography variant='body2' className='text-textSecondary'>
              Need assistance with existing features?
            </Typography>
            <Typography variant='body2' className='text-primary font-medium'>
              Contact Support: +62-21-1234-5678
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default MaintenancePage
