'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import CircularProgress from '@mui/material/CircularProgress'

// Hook Imports
import { useAssetRegistration } from './AssetRegistrationProvider'

const AssetRegistrationHeader = () => {
  const { 
    loading, 
    submitAsset, 
    populateDummyData,
    formData 
  } = useAssetRegistration()
  
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' })

  const handleSubmit = async () => {
    const result = await submitAsset()
    setNotification({
      open: true,
      message: result.message,
      severity: result.success ? 'success' : 'error'
    })
    
    if (result.success) {
      // Redirect to asset list after successful registration
      setTimeout(() => {
        window.location.href = '/en/apps/assets/list'
      }, 2000)
    }
  }

  const handlePopulateDummyData = () => {
    populateDummyData()
    setNotification({
      open: true,
      message: 'Form populated with dummy data for testing',
      severity: 'success'
    })
  }

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }))
  }

  const isFormEmpty = !formData.name && !formData.assetCode && !formData.manufacturer

  return (
    <>
      <Box className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
        <div>
          <Typography variant='h4' className='mb-1'>
            Register New Asset
          </Typography>
          <Typography>
            Add a new asset to the Pertamina inventory management system
          </Typography>
        </div>
        <div className='flex flex-wrap max-sm:flex-col gap-4'>
          <Button 
            variant='outlined' 
            color='info'
            onClick={handlePopulateDummyData}
            disabled={loading}
            startIcon={<i className='ri-magic-line' />}
          >
            Fill with Test Data
          </Button>
          <Button 
            variant='contained'
            onClick={handleSubmit}
            disabled={loading || isFormEmpty}
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            Register Asset
          </Button>
        </div>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant='filled'
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AssetRegistrationHeader
