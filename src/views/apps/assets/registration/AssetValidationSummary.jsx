'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

// Hook Imports
import { useAssetRegistration } from './AssetRegistrationProvider'

const AssetValidationSummary = () => {
  const { errors, warnings, businessRules, validationStatus } = useAssetRegistration()
  const [showDetails, setShowDetails] = useState(false)

  const errorCount = Object.keys(errors).length
  const warningCount = warnings.length
  const ruleCount = businessRules.length

  const getValidationIcon = () => {
    if (errorCount > 0) return 'ri-error-warning-line'
    if (warningCount > 0 || ruleCount > 0) return 'ri-alert-line'
    return 'ri-check-line'
  }

  const getValidationColor = () => {
    if (errorCount > 0) return 'error'
    if (warningCount > 0 || ruleCount > 0) return 'warning'
    return 'success'
  }

  const getValidationMessage = () => {
    if (errorCount > 0) return 'Form has validation errors'
    if (warningCount > 0 || ruleCount > 0) return 'Form has warnings or business rule alerts'
    return 'Form validation passed'
  }

  if (errorCount === 0 && warningCount === 0 && ruleCount === 0) {
    return (
      <Card>
        <CardContent>
          <Alert severity="success" icon={<i className="ri-check-line" />}>
            <AlertTitle>Validation Passed</AlertTitle>
            All required fields are completed and business rules are satisfied.
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        title='Validation Summary'
        subheader={validationStatus.lastValidated ? 
          `Last validated: ${new Date(validationStatus.lastValidated).toLocaleTimeString()}` : 
          'Not yet validated'
        }
        action={
          <IconButton onClick={() => setShowDetails(!showDetails)}>
            <i className={showDetails ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} />
          </IconButton>
        }
      />
      <CardContent>
        {/* Summary Alert */}
        <Alert 
          severity={getValidationColor()} 
          icon={<i className={getValidationIcon()} />}
          sx={{ mb: 2 }}
        >
          <AlertTitle>{getValidationMessage()}</AlertTitle>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            {errorCount > 0 && (
              <Chip 
                label={`${errorCount} Error${errorCount > 1 ? 's' : ''}`}
                color="error"
                size="small"
                variant="outlined"
              />
            )}
            {warningCount > 0 && (
              <Chip 
                label={`${warningCount} Warning${warningCount > 1 ? 's' : ''}`}
                color="warning"
                size="small"
                variant="outlined"
              />
            )}
            {ruleCount > 0 && (
              <Chip 
                label={`${ruleCount} Business Rule${ruleCount > 1 ? 's' : ''}`}
                color="info"
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        </Alert>

        {/* Detailed Validation Results */}
        <Collapse in={showDetails}>
          {/* Errors Section */}
          {errorCount > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" color="error" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <i className="ri-error-warning-line" style={{ marginRight: 8 }} />
                Validation Errors
              </Typography>
              <List dense>
                {Object.entries(errors).map(([field, message]) => (
                  <ListItem key={field}>
                    <ListItemIcon>
                      <i className="ri-close-circle-line" style={{ color: 'var(--mui-palette-error-main)' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={message}
                      secondary={`Field: ${field}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Warnings Section */}
          {warningCount > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" color="warning.main" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <i className="ri-alert-line" style={{ marginRight: 8 }} />
                Warnings
              </Typography>
              <List dense>
                {warnings.map((warning, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <i className="ri-alert-line" style={{ color: 'var(--mui-palette-warning-main)' }} />
                    </ListItemIcon>
                    <ListItemText primary={warning} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Business Rules Section */}
          {ruleCount > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" color="info.main" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <i className="ri-information-line" style={{ marginRight: 8 }} />
                Business Rules
              </Typography>
              <List dense>
                {businessRules.map((rule, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <i 
                        className={rule.type === 'error' ? 'ri-error-warning-line' : 'ri-information-line'} 
                        style={{ 
                          color: rule.type === 'error' ? 
                            'var(--mui-palette-error-main)' : 
                            'var(--mui-palette-info-main)' 
                        }} 
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={rule.message}
                      secondary={`Rule: ${rule.rule}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {(errorCount > 0 || warningCount > 0 || ruleCount > 0) && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                <strong>Note:</strong> Errors must be resolved before submission. 
                Warnings and business rules are advisory but should be reviewed.
              </Typography>
            </>
          )}
        </Collapse>
      </CardContent>
    </Card>
  )
}

export default AssetValidationSummary
