'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Component Imports
import AssetRegistrationProvider, { useAssetRegistration } from '@views/apps/assets/registration/AssetRegistrationProvider'
import AssetRegistrationHeader from '@views/apps/assets/registration/AssetRegistrationHeader'
import AssetInformation from '@views/apps/assets/registration/AssetInformation'
import AssetFileUpload from '@views/apps/assets/registration/AssetFileUpload'
import AssetSpecifications from '@views/apps/assets/registration/AssetSpecifications'
import AssetLocation from '@views/apps/assets/registration/AssetLocation'
import AssetCategory from '@views/apps/assets/registration/AssetCategory'
import CategoryDisplay from '@views/apps/assets/registration/CategoryDisplay'
import AssetMaintenance from '@views/apps/assets/registration/AssetMaintenance'
import AssetQRCode from '@views/apps/assets/registration/AssetQRCode'
import AssetValidationSummary from '@views/apps/assets/registration/AssetValidationSummary'
import AssetSubmission from '@views/apps/assets/registration/AssetSubmission'

const AssetRegistration = () => {
  const [activeStep, setActiveStep] = useState(0)
  
  const steps = [
    'Select Category',
    'Enter Asset Details',
    'Complete Registration'
  ]
  
  return (
    <AssetRegistrationProvider>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <AssetRegistrationHeader />
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>
        
        {activeStep === 0 && (
          <Grid item xs={12}>
            <AssetCategory setActiveStep={setActiveStep} />
          </Grid>
        )}
        
        {activeStep === 1 && (
          <>
            <Grid item xs={12} md={8}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <AssetInformation />
                </Grid>
                <Grid item xs={12}>
                  <AssetFileUpload />
                </Grid>
                <Grid item xs={12}>
                  <AssetSpecifications />
                </Grid>
                <Grid item xs={12}>
                  <AssetLocation />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setActiveStep(2)}
                    endIcon={<i className="ri-arrow-right-line" />}
                  >
                    Continue to Review & Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <CategoryDisplay setActiveStep={setActiveStep} />
                </Grid>
                <Grid item xs={12}>
                  <AssetMaintenance />
                </Grid>
                <Grid item xs={12}>
                  <AssetQRCode />
                </Grid>
                <Grid item xs={12}>
                  <AssetValidationSummary />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        
        {activeStep === 2 && (
          <Grid item xs={12}>
            <AssetSubmission setActiveStep={setActiveStep} />
          </Grid>
        )}
      </Grid>
    </AssetRegistrationProvider>
  )
}

export default AssetRegistration
