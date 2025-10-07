'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Paper from '@mui/material/Paper'

// Hook Imports
import { useAssetRegistration } from './AssetRegistrationProvider'

const AssetSubmission = ({ setActiveStep }) => {
  const { formData, errors, submitAsset } = useAssetRegistration()
  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)
  
  // Check for required fields
  const requiredFields = [
    'name', 
    'assetCode', 
    'manufacturer', 
    'model'
  ]
  
  const missingFields = requiredFields.filter(field => !formData[field])
  const isFormValid = missingFields.length === 0 && 
    formData.category?.primary && 
    formData.category?.sub
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!isFormValid) return
    
    setSubmitting(true)
    
    try {
      const result = await submitAsset()
      setSubmitResult(result)
    } catch (error) {
      setSubmitResult({ 
        success: false, 
        message: 'An error occurred during submission' 
      })
    } finally {
      setSubmitting(false)
    }
  }
  
  // Generate asset summary
  const assetSummary = [
    { label: 'Asset Name', value: formData.name },
    { label: 'Asset Code', value: formData.assetCode },
    { label: 'Category', value: `${formData.category?.primary} / ${formData.category?.sub}` },
    { label: 'Type', value: formData.type },
    { label: 'Color', value: formData.color },
    { label: 'Size', value: formData.size },
    { label: 'Unit of Measure', value: formData.uom },
    { label: 'Manufacturer', value: formData.manufacturer },
    { label: 'Model', value: formData.model },
    { label: 'Serial Number', value: formData.serialNumber },
    { label: 'Status', value: formData.status },
    { label: 'Purchase Date', value: formData.purchaseDate }
  ].filter(item => item.value)
  
  // Generate location summary
  const locationSummary = [
    { label: 'Facility', value: formData.location?.facility },
    { label: 'Location ID', value: formData.location?.location_id },
    { label: 'Location Name', value: formData.location?.location_name },
    { label: 'Building', value: formData.location?.building },
    { label: 'Floor', value: formData.location?.floor },
    { label: 'Room', value: formData.location?.room },
    { label: 'Zone', value: formData.location?.zone },
    { label: 'Rack', value: formData.location?.rack },
    { label: 'Bin Location', value: formData.location?.bin_location },
    { label: 'Contact Person', value: formData.location?.contact_person },
    { label: 'Responsible Person', value: formData.location?.responsiblePerson },
    { label: 'Department', value: formData.location?.department }
  ].filter(item => item.value)
  
  return (
    <Card>
      <CardHeader
        title='Complete Asset Registration'
        subheader='Review and submit asset information'
      />
      <CardContent>
        {submitResult ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            {submitResult.success ? (
              <Alert severity="success" sx={{ mb: 4 }}>
                <AlertTitle>Registration Successful</AlertTitle>
                Asset has been successfully registered in the system.
              </Alert>
            ) : (
              <Alert severity="error" sx={{ mb: 4 }}>
                <AlertTitle>Registration Failed</AlertTitle>
                {submitResult.message || 'An error occurred during submission'}
              </Alert>
            )}
            
            {submitResult.success && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Paper sx={{ p: 3, maxWidth: 400, textAlign: 'left' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Asset Registration Details</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Asset ID:</strong> {submitResult.assetId || 'AST-2023-001'}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Registration Date:</strong> {new Date().toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Status:</strong> <Chip size="small" color="success" label="Active" />
                  </Typography>
                </Paper>
              </Box>
            )}
            
            <Box sx={{ mt: 4 }}>
              <Button 
                variant="outlined" 
                onClick={() => window.location.reload()}
                startIcon={<i className="ri-add-line" />}
              >
                Register Another Asset
              </Button>
            </Box>
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Asset Information</Typography>
                
                <List dense>
                  {assetSummary.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <i className="ri-checkbox-circle-line" style={{ color: 'var(--mui-palette-primary-main)' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.label} 
                        secondary={item.value} 
                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                        secondaryTypographyProps={{ variant: 'subtitle2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Location & Storage</Typography>
                
                <List dense>
                  {locationSummary.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <i className="ri-map-pin-line" style={{ color: 'var(--mui-palette-secondary-main)' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.label} 
                        secondary={item.value}
                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                        secondaryTypographyProps={{ variant: 'subtitle2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Attached Files</Typography>
                
                {formData.files?.images?.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Attached Images: {formData.files.images.length}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {formData.files.images.map((image, index) => (
                        <Chip 
                          key={index} 
                          label={image.name} 
                          size="small" 
                          icon={<i className="ri-image-line" />} 
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                
                {formData.files?.documents?.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Attached Documents: {formData.files.documents.length}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {formData.files.documents.map((doc, index) => (
                        <Chip 
                          key={index} 
                          label={doc.name} 
                          size="small" 
                          icon={<i className="ri-file-line" />} 
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Paper>
            </Grid>
            
            {!isFormValid && (
              <Grid item xs={12}>
                <Alert severity="warning">
                  <AlertTitle>Missing Required Information</AlertTitle>
                  <Typography variant="body2">
                    The following required fields are missing:
                  </Typography>
                  <List dense>
                    {missingFields.map(field => (
                      <ListItem key={field}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <i className="ri-error-warning-line" style={{ color: 'var(--mui-palette-warning-main)' }} />
                        </ListItemIcon>
                        <ListItemText primary={field.charAt(0).toUpperCase() + field.slice(1)} />
                      </ListItem>
                    ))}
                    {!formData.category?.primary && (
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <i className="ri-error-warning-line" style={{ color: 'var(--mui-palette-warning-main)' }} />
                        </ListItemIcon>
                        <ListItemText primary="Primary Category" />
                      </ListItem>
                    )}
                    {!formData.category?.sub && (
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <i className="ri-error-warning-line" style={{ color: 'var(--mui-palette-warning-main)' }} />
                        </ListItemIcon>
                        <ListItemText primary="Sub Category" />
                      </ListItem>
                    )}
                  </List>
                </Alert>
              </Grid>
            )}
          </Grid>
        )}
      </CardContent>
      
      {!submitResult && (
        <CardActions sx={{ justifyContent: 'space-between', p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            variant="outlined"
            onClick={() => setActiveStep(1)}
            startIcon={<i className="ri-arrow-left-line" />}
          >
            Back to Details
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!isFormValid || submitting}
            endIcon={submitting ? <CircularProgress size={16} /> : <i className="ri-check-line" />}
          >
            {submitting ? 'Submitting...' : 'Submit Asset Registration'}
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default AssetSubmission
