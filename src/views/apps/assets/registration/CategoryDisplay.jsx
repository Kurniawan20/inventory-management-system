'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

// Hook Imports
import { useAssetRegistration } from './AssetRegistrationProvider'

const CategoryDisplay = ({ setActiveStep }) => {
  const { formData } = useAssetRegistration()
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Selected Category</Typography>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">Primary Category:</Typography>
            <Typography variant="subtitle1" color="primary.main" fontWeight="bold">
              {formData.category?.primary || 'Not Selected'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">Sub Category:</Typography>
            <Typography variant="subtitle1" color="primary.main" fontWeight="bold">
              {formData.category?.sub || 'Not Selected'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">Asset Type:</Typography>
            <Typography variant="subtitle1" color="primary.main" fontWeight="bold">
              {formData.category?.type || 'Not Selected'}
            </Typography>
          </Box>

          {formData.category?.classification && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">Classification:</Typography>
              <Chip 
                label={formData.category.classification} 
                size="small" 
                color={
                  formData.category.classification === 'Critical' ? 'error' :
                  formData.category.classification === 'Important' ? 'warning' :
                  'default'
                }
              />
            </Box>
          )}
          
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => setActiveStep(0)}
            startIcon={<i className="ri-edit-line" />}
            sx={{ mt: 2, alignSelf: 'flex-start' }}
          >
            Change Category
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default CategoryDisplay
