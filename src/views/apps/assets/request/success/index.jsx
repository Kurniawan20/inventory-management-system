'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

const AssetRequestSuccessView = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [requestId] = useState(() => 'REQ-' + Date.now().toString().slice(-8))
  const [submissionTime] = useState(() => new Date().toLocaleString('id-ID'))
  const [employeeId, setEmployeeId] = useState('')

  useEffect(() => {
    // Get employee ID from session storage
    const storedEmployeeId = sessionStorage.getItem('shortcutEmployeeId')
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId)
    }
  }, [])

  const handleBackToForm = () => {
    router.push('/front-pages/shortcuts/assets/request')
  }

  const handleGoToDashboard = () => {
    router.push('/en/dashboards/crm')
  }

  const nextSteps = [
    'Your request has been forwarded to the Procurement Department',
    'Initial review will be completed within 2-3 business days',
    'You will receive email notifications for status updates',
    'Budget approval may require additional documentation',
    'Technical specifications will be verified by subject matter experts',
    'Final approval timeline: 5-10 business days for standard requests'
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='text-center'>
            {/* Success Icon and Header */}
            <Avatar 
              sx={{ 
                bgcolor: 'success.main', 
                width: 80, 
                height: 80, 
                mx: 'auto', 
                mb: 3 
              }}
            >
              <i className='ri-check-line text-4xl text-white' />
            </Avatar>
            
            <Typography variant='h4' className='mb-2 text-success-main font-bold'>
              Request Submitted Successfully!
            </Typography>
            
            <Typography variant='body1' color='text.secondary' className='mb-4'>
              Your asset request has been received and is now being processed by our team.
            </Typography>

            {/* Request Details */}
            <Box className='mb-6'>
              <Grid container spacing={3} justifyContent='center'>
                <Grid item xs={12} sm={6} md={4}>
                  <Box className='p-4 border rounded-lg bg-primary-light'>
                    <Typography variant='h6' className='font-bold text-primary-main'>
                      {requestId}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Request ID
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Box className='p-4 border rounded-lg bg-info-light'>
                    <Typography variant='h6' className='font-bold text-info-main'>
                      {submissionTime}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Submitted At
                    </Typography>
                  </Box>
                </Grid>
                
                {employeeId && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Box className='p-4 border rounded-lg bg-warning-light'>
                      <Typography variant='h6' className='font-bold text-warning-main'>
                        {employeeId}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Employee ID
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>

            <Divider className='my-6' />

            {/* Important Information */}
            <Alert severity='info' className='mb-6 text-left'>
              <Typography variant='body2' className='font-medium mb-2'>
                <i className='ri-information-line mr-2' />
                Important Information
              </Typography>
              <Typography variant='body2'>
                Please save your <strong>Request ID: {requestId}</strong> for future reference. 
                You will need this ID to track your request status or for any inquiries with the Procurement Department.
              </Typography>
            </Alert>

            {/* Next Steps */}
            <Box className='text-left mb-6'>
              <Typography variant='h6' className='mb-4 text-primary-main'>
                <i className='ri-roadmap-line mr-2' />
                What Happens Next?
              </Typography>
              
              <List>
                {nextSteps.map((step, index) => (
                  <ListItem key={index} className='py-2'>
                    <ListItemIcon>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main', 
                          width: 24, 
                          height: 24,
                          fontSize: '0.75rem'
                        }}
                      >
                        {index + 1}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={step}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Contact Information */}
            <Box className='p-4 border rounded-lg bg-secondary-light mb-6'>
              <Typography variant='h6' className='mb-3 text-secondary-main'>
                <i className='ri-customer-service-line mr-2' />
                Need Help?
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box className='flex items-center gap-2 mb-2'>
                    <i className='ri-mail-line text-secondary-main' />
                    <Typography variant='body2'>
                      <strong>Email:</strong> procurement@pertamina.com
                    </Typography>
                  </Box>
                  <Box className='flex items-center gap-2'>
                    <i className='ri-phone-line text-secondary-main' />
                    <Typography variant='body2'>
                      <strong>Phone:</strong> +62 21 3815 5555 ext. 2100
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className='flex items-center gap-2 mb-2'>
                    <i className='ri-time-line text-secondary-main' />
                    <Typography variant='body2'>
                      <strong>Office Hours:</strong> Mon-Fri, 8:00-17:00 WIB
                    </Typography>
                  </Box>
                  <Box className='flex items-center gap-2'>
                    <i className='ri-map-pin-line text-secondary-main' />
                    <Typography variant='body2'>
                      <strong>Location:</strong> Procurement Dept, Floor 15
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Action Buttons */}
            <Box className='flex gap-4 justify-center flex-wrap'>
              <Button
                variant='outlined'
                color='primary'
                onClick={handleBackToForm}
                startIcon={<i className='ri-add-line' />}
                size='large'
              >
                Submit Another Request
              </Button>
              
              <Button
                variant='contained'
                color='primary'
                onClick={handleGoToDashboard}
                startIcon={<i className='ri-dashboard-line' />}
                size='large'
              >
                Go to Dashboard
              </Button>
            </Box>

            {/* Footer Note */}
            <Typography variant='caption' color='text.secondary' className='mt-6 block'>
              This is an automated confirmation. Please do not reply to this page.
              For any questions, please contact the Procurement Department using the information above.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AssetRequestSuccessView
