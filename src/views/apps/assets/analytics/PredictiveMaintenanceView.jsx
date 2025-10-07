'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

const PredictiveMaintenanceView = ({ data }) => {
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)

  if (!data) return null

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getHealthScoreColor = (score) => {
    if (score >= 90) return 'success'
    if (score >= 70) return 'warning'
    return 'error'
  }

  const getPriorityConfig = (priority) => {
    const configs = {
      high: { color: 'error', icon: 'ri-alert-fill', label: 'High Priority' },
      medium: { color: 'warning', icon: 'ri-error-warning-line', label: 'Medium Priority' },
      low: { color: 'success', icon: 'ri-checkbox-circle-line', label: 'Low Priority' }
    }
    return configs[priority] || configs['medium']
  }

  const getMaintenanceTypeColor = (type) => {
    const colors = {
      preventive: 'info',
      condition_based: 'warning',
      corrective: 'error',
      routine: 'success'
    }
    return colors[type] || 'default'
  }

  const getDaysUntilFailure = (failureDate) => {
    const days = Math.ceil((new Date(failureDate) - new Date()) / (1000 * 60 * 60 * 24))
    return days
  }

  const getUrgencyLevel = (days) => {
    if (days <= 30) return { level: 'Critical', color: 'error' }
    if (days <= 90) return { level: 'High', color: 'warning' }
    if (days <= 180) return { level: 'Medium', color: 'info' }
    return { level: 'Low', color: 'success' }
  }

  const handleViewDetails = (asset) => {
    setSelectedAsset(asset)
    setDetailDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDetailDialogOpen(false)
    setSelectedAsset(null)
  }

  return (
    <Grid container spacing={4}>
      {/* Summary Cards */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'error.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-alert-fill text-2xl' />
                </Avatar>
                <Typography variant='h4' className='font-bold text-error-main'>
                  {data.filter(item => item.maintenance_priority === 'high').length}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Critical Assets
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Require immediate attention
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-time-line text-2xl' />
                </Avatar>
                <Typography variant='h4' className='font-bold text-warning-main'>
                  {data.filter(item => getDaysUntilFailure(item.predicted_failure_date) <= 90).length}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Near-term Failures
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Within 90 days
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-brain-line text-2xl' />
                </Avatar>
                <Typography variant='h4' className='font-bold text-info-main'>
                  {Math.round(data.reduce((sum, item) => sum + item.ml_confidence, 0) / data.length * 100)}%
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  ML Confidence
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Average accuracy
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-money-dollar-circle-line text-2xl' />
                </Avatar>
                <Typography variant='h4' className='font-bold text-success-main'>
                  {formatCurrency(data.reduce((sum, item) => sum + item.cost_impact, 0))}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Total Risk Value
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Potential cost impact
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Predictive Maintenance Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box className='flex justify-between items-center mb-4'>
              <Typography variant='h6'>
                <i className='ri-tools-line mr-2' />
                Predictive Maintenance Schedule
              </Typography>
              <Box className='flex gap-2'>
                <Button variant='outlined' size='small' startIcon={<i className='ri-download-line' />}>
                  Export Schedule
                </Button>
                <Button variant='contained' size='small' startIcon={<i className='ri-calendar-line' />}>
                  Schedule All
                </Button>
              </Box>
            </Box>
            
            <TableContainer component={Paper} variant='outlined'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset</TableCell>
                    <TableCell>Health Score</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Predicted Failure</TableCell>
                    <TableCell>Failure Probability</TableCell>
                    <TableCell>Cost Impact</TableCell>
                    <TableCell>Maintenance Type</TableCell>
                    <TableCell>ML Confidence</TableCell>
                    <TableCell align='center'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((asset) => {
                    const priorityConfig = getPriorityConfig(asset.maintenance_priority)
                    const daysUntilFailure = getDaysUntilFailure(asset.predicted_failure_date)
                    const urgency = getUrgencyLevel(daysUntilFailure)
                    
                    return (
                      <TableRow key={asset.asset_id} hover>
                        <TableCell>
                          <Box className='flex items-center gap-3'>
                            <Avatar
                              variant='rounded'
                              sx={{ bgcolor: `${priorityConfig.color}.main` }}
                            >
                              <i className={priorityConfig.icon} />
                            </Avatar>
                            <Box>
                              <Typography variant='body2' className='font-medium'>
                                {asset.asset_name}
                              </Typography>
                              <Typography variant='caption' color='text.secondary'>
                                {asset.asset_id}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box className='flex items-center gap-2'>
                            <Box className='w-20'>
                              <LinearProgress 
                                variant='determinate' 
                                value={asset.current_health_score} 
                                color={getHealthScoreColor(asset.current_health_score)}
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                            </Box>
                            <Typography variant='body2' className='font-medium'>
                              {asset.current_health_score}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={priorityConfig.label}
                            color={priorityConfig.color}
                            size='small'
                            variant='tonal'
                            icon={<i className={priorityConfig.icon} />}
                          />
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant='body2' className='font-medium'>
                              {new Date(asset.predicted_failure_date).toLocaleDateString('id-ID')}
                            </Typography>
                            <Chip
                              label={`${daysUntilFailure} days`}
                              color={urgency.color}
                              size='small'
                              variant='outlined'
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box className='flex items-center gap-2'>
                            <Box className='w-16'>
                              <LinearProgress 
                                variant='determinate' 
                                value={asset.failure_probability * 100} 
                                color='error'
                                sx={{ height: 6, borderRadius: 3 }}
                              />
                            </Box>
                            <Typography variant='body2' className='font-medium'>
                              {(asset.failure_probability * 100).toFixed(0)}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' className='font-medium'>
                            {formatCurrency(asset.cost_impact)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={asset.maintenance_type.replace('_', ' ').toUpperCase()}
                            color={getMaintenanceTypeColor(asset.maintenance_type)}
                            size='small'
                            variant='outlined'
                          />
                        </TableCell>
                        <TableCell>
                          <Box className='flex items-center gap-1'>
                            <Typography variant='body2' className='font-medium'>
                              {(asset.ml_confidence * 100).toFixed(0)}%
                            </Typography>
                            <i className='ri-brain-line text-primary-main' />
                          </Box>
                        </TableCell>
                        <TableCell align='center'>
                          <Button
                            variant='outlined'
                            size='small'
                            onClick={() => handleViewDetails(asset)}
                            startIcon={<i className='ri-eye-line' />}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Asset Detail Dialog */}
      <Dialog open={detailDialogOpen} onClose={handleCloseDialog} maxWidth='md' fullWidth>
        <DialogTitle>
          <Box className='flex items-center gap-2'>
            <i className='ri-tools-line text-2xl' />
            <Box>
              <Typography variant='h6'>Predictive Maintenance Details</Typography>
              <Typography variant='body2' color='text.secondary'>
                {selectedAsset?.asset_name} ({selectedAsset?.asset_id})
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedAsset && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='subtitle1' className='mb-3'>
                      <i className='ri-health-book-line mr-2' />
                      Health Assessment
                    </Typography>
                    <Box className='space-y-3'>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>Current Health Score</Typography>
                        <Box className='flex items-center gap-2 mt-1'>
                          <LinearProgress 
                            variant='determinate' 
                            value={selectedAsset.current_health_score} 
                            color={getHealthScoreColor(selectedAsset.current_health_score)}
                            sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                          />
                          <Typography variant='h6' className='font-bold'>
                            {selectedAsset.current_health_score}%
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>Failure Probability</Typography>
                        <Typography variant='h6' className='font-bold text-error-main'>
                          {(selectedAsset.failure_probability * 100).toFixed(1)}%
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>ML Confidence</Typography>
                        <Typography variant='h6' className='font-bold text-primary-main'>
                          {(selectedAsset.ml_confidence * 100).toFixed(1)}%
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='subtitle1' className='mb-3'>
                      <i className='ri-calendar-line mr-2' />
                      Timeline & Impact
                    </Typography>
                    <Box className='space-y-3'>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>Predicted Failure Date</Typography>
                        <Typography variant='h6' className='font-bold'>
                          {new Date(selectedAsset.predicted_failure_date).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>Days Until Failure</Typography>
                        <Typography variant='h6' className='font-bold text-warning-main'>
                          {getDaysUntilFailure(selectedAsset.predicted_failure_date)} days
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant='body2' color='text.secondary'>Cost Impact</Typography>
                        <Typography variant='h6' className='font-bold text-error-main'>
                          {formatCurrency(selectedAsset.cost_impact)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<i className='ri-arrow-down-s-line' />}>
                    <Typography variant='subtitle1'>
                      <i className='ri-alert-line mr-2' />
                      Key Indicators & Patterns
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant='subtitle2' className='mb-2'>Key Indicators</Typography>
                        <List dense>
                          {selectedAsset.key_indicators?.map((indicator, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <i className='ri-arrow-right-s-line' />
                              </ListItemIcon>
                              <ListItemText 
                                primary={indicator.replace('_', ' ').toUpperCase()}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant='subtitle2' className='mb-2'>Historical Pattern</Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {selectedAsset.historical_pattern}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<i className='ri-arrow-down-s-line' />}>
                    <Typography variant='subtitle1'>
                      <i className='ri-lightbulb-line mr-2' />
                      Recommended Action
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box className='p-3 border rounded-lg bg-info-light'>
                      <Typography variant='body1' className='font-medium mb-2'>
                        {selectedAsset.recommended_action}
                      </Typography>
                      <Box className='flex items-center gap-2'>
                        <Chip
                          label={selectedAsset.maintenance_type?.replace('_', ' ').toUpperCase()}
                          color={getMaintenanceTypeColor(selectedAsset.maintenance_type)}
                          size='small'
                        />
                        <Chip
                          label={`${selectedAsset.downtime_risk?.toUpperCase()} RISK`}
                          color={selectedAsset.downtime_risk === 'high' ? 'error' : 'warning'}
                          size='small'
                          variant='outlined'
                        />
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant='contained' startIcon={<i className='ri-calendar-line' />}>
            Schedule Maintenance
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default PredictiveMaintenanceView
