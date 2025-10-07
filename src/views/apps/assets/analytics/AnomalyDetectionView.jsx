'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Alert from '@mui/material/Alert'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'

const AnomalyDetectionView = ({ data }) => {
  if (!data) return null

  const getSeverityConfig = (severity) => {
    const configs = {
      high: { color: 'error', icon: 'ri-alert-fill', label: 'High Severity' },
      medium: { color: 'warning', icon: 'ri-error-warning-line', label: 'Medium Severity' },
      low: { color: 'info', icon: 'ri-information-line', label: 'Low Severity' }
    }
    return configs[severity] || configs['medium']
  }

  const getAnomalyTypeIcon = (type) => {
    const icons = {
      vibration_spike: 'ri-pulse-line',
      temperature_anomaly: 'ri-temp-hot-line',
      pressure_variation: 'ri-dashboard-line',
      corrosion_acceleration: 'ri-rust-line',
      efficiency_decline: 'ri-arrow-down-line',
      leak_detection: 'ri-drop-line'
    }
    return icons[type] || 'ri-alert-line'
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'success'
    if (confidence >= 0.7) return 'warning'
    return 'error'
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Group anomalies by severity
  const anomaliesBySeverity = {
    high: data.filter(item => item.severity === 'high'),
    medium: data.filter(item => item.severity === 'medium'),
    low: data.filter(item => item.severity === 'low')
  }

  return (
    <Grid container spacing={4}>
      {/* Anomaly Summary Cards */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'error.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-alert-fill text-2xl' />
                </Avatar>
                <Typography variant='h4' className='font-bold text-error-main'>
                  {anomaliesBySeverity.high.length}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Critical Anomalies
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Require immediate action
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-error-warning-line text-2xl' />
                </Avatar>
                <Typography variant='h4' className='font-bold text-warning-main'>
                  {anomaliesBySeverity.medium.length}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Medium Anomalies
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Monitor closely
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-information-line text-2xl' />
                </Avatar>
                <Typography variant='h4' className='font-bold text-info-main'>
                  {anomaliesBySeverity.low.length}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Low Anomalies
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  For awareness
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-brain-line text-2xl' />
                </Avatar>
                <Typography variant='h4' className='font-bold text-success-main'>
                  {Math.round(data.reduce((sum, item) => sum + item.confidence_score, 0) / data.length * 100)}%
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Avg ML Confidence
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Detection accuracy
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Critical Alerts */}
      {anomaliesBySeverity.high.length > 0 && (
        <Grid item xs={12}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6" className="font-bold mb-2">
              🚨 Critical Anomalies Detected
            </Typography>
            <Typography variant="body2">
              {anomaliesBySeverity.high.length} high-severity anomalies require immediate attention. 
              Review and take corrective action to prevent potential failures.
            </Typography>
          </Alert>
        </Grid>
      )}

      {/* Anomaly Timeline */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-time-line mr-2' />
              Anomaly Detection Timeline
            </Typography>
            <Timeline>
              {data.slice(0, 5).map((anomaly, index) => {
                const severityConfig = getSeverityConfig(anomaly.severity)
                return (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot sx={{ bgcolor: `${severityConfig.color}.main` }}>
                        <i className={getAnomalyTypeIcon(anomaly.anomaly_type)} />
                      </TimelineDot>
                      {index < 4 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Box className='pb-4'>
                        <Box className='flex items-center gap-2 mb-1'>
                          <Typography variant='body2' className='font-medium'>
                            {anomaly.anomaly_type.replace('_', ' ').toUpperCase()}
                          </Typography>
                          <Chip
                            label={severityConfig.label}
                            color={severityConfig.color}
                            size='small'
                            variant='tonal'
                          />
                        </Box>
                        <Typography variant='body2' color='text.secondary' className='mb-1'>
                          Asset {anomaly.asset_id} • {formatDateTime(anomaly.detected_at)}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {anomaly.description}
                        </Typography>
                        <Box className='flex items-center gap-1 mt-1'>
                          <i className='ri-brain-line text-primary-main' />
                          <Typography variant='caption'>
                            {(anomaly.confidence_score * 100).toFixed(0)}% confidence
                          </Typography>
                        </Box>
                      </Box>
                    </TimelineContent>
                  </TimelineItem>
                )
              })}
            </Timeline>
          </CardContent>
        </Card>
      </Grid>

      {/* Anomaly Types Distribution */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-pie-chart-line mr-2' />
              Anomaly Types Distribution
            </Typography>
            <Box className='space-y-3'>
              {Object.entries(
                data.reduce((acc, anomaly) => {
                  acc[anomaly.anomaly_type] = (acc[anomaly.anomaly_type] || 0) + 1
                  return acc
                }, {})
              ).map(([type, count], index) => (
                <Box key={index} className='flex items-center justify-between p-3 border rounded-lg'>
                  <Box className='flex items-center gap-3'>
                    <Avatar
                      variant='rounded'
                      sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}
                    >
                      <i className={getAnomalyTypeIcon(type)} />
                    </Avatar>
                    <Box>
                      <Typography variant='body2' className='font-medium'>
                        {type.replace('_', ' ').toUpperCase()}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {count} occurrence{count > 1 ? 's' : ''}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant='h6' className='font-bold text-primary-main'>
                    {count}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Detailed Anomaly Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box className='flex justify-between items-center mb-4'>
              <Typography variant='h6'>
                <i className='ri-search-eye-line mr-2' />
                Anomaly Detection Results
              </Typography>
              <Box className='flex gap-2'>
                <Button variant='outlined' size='small' startIcon={<i className='ri-download-line' />}>
                  Export Report
                </Button>
                <Button variant='contained' size='small' startIcon={<i className='ri-notification-line' />}>
                  Set Alerts
                </Button>
              </Box>
            </Box>
            
            <TableContainer component={Paper} variant='outlined'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Anomaly Type</TableCell>
                    <TableCell>Asset</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Detection Time</TableCell>
                    <TableCell>ML Confidence</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Historical Pattern</TableCell>
                    <TableCell align='center'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((anomaly, index) => {
                    const severityConfig = getSeverityConfig(anomaly.severity)
                    return (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Box className='flex items-center gap-3'>
                            <Avatar
                              variant='rounded'
                              sx={{ bgcolor: `${severityConfig.color}.main` }}
                            >
                              <i className={getAnomalyTypeIcon(anomaly.anomaly_type)} />
                            </Avatar>
                            <Box>
                              <Typography variant='body2' className='font-medium'>
                                {anomaly.anomaly_type.replace('_', ' ').toUpperCase()}
                              </Typography>
                              <Typography variant='caption' color='text.secondary'>
                                ML Detection
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' className='font-medium'>
                            {anomaly.asset_id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={severityConfig.label}
                            color={severityConfig.color}
                            size='small'
                            variant='tonal'
                            icon={<i className={severityConfig.icon} />}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>
                            {formatDateTime(anomaly.detected_at)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box className='flex items-center gap-2'>
                            <Typography 
                              variant='body2' 
                              className={`font-medium text-${getConfidenceColor(anomaly.confidence_score)}-main`}
                            >
                              {(anomaly.confidence_score * 100).toFixed(0)}%
                            </Typography>
                            <i className='ri-brain-line text-primary-main' />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' className='max-w-xs'>
                            {anomaly.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='caption' color='text.secondary' className='max-w-xs'>
                            {anomaly.historical_correlation}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Button
                            variant='outlined'
                            size='small'
                            startIcon={<i className='ri-tools-line' />}
                          >
                            Investigate
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

      {/* Recommended Actions */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-lightbulb-line mr-2' />
              AI-Recommended Actions
            </Typography>
            <Grid container spacing={3}>
              {data.map((anomaly, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box className='p-4 border rounded-lg'>
                    <Box className='flex items-center gap-2 mb-3'>
                      <Chip
                        label={anomaly.severity.toUpperCase()}
                        color={getSeverityConfig(anomaly.severity).color}
                        size='small'
                        variant='tonal'
                      />
                      <Typography variant='subtitle2'>
                        {anomaly.anomaly_type.replace('_', ' ').toUpperCase()}
                      </Typography>
                    </Box>
                    
                    <Typography variant='body2' className='mb-3'>
                      <strong>Asset:</strong> {anomaly.asset_id}
                    </Typography>
                    
                    <Typography variant='body2' className='font-medium mb-2'>
                      Potential Causes:
                    </Typography>
                    <List dense>
                      {anomaly.potential_causes?.map((cause, causeIndex) => (
                        <ListItem key={causeIndex} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <i className='ri-arrow-right-s-line text-warning-main' />
                          </ListItemIcon>
                          <ListItemText 
                            primary={cause}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Typography variant='body2' className='font-medium mb-2 mt-3'>
                      Recommended Actions:
                    </Typography>
                    <List dense>
                      {anomaly.recommended_actions?.map((action, actionIndex) => (
                        <ListItem key={actionIndex} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <i className='ri-check-line text-success-main' />
                          </ListItemIcon>
                          <ListItemText 
                            primary={action}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* ML Model Information */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-cpu-line mr-2' />
              ML Model Performance
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box className='text-center p-4 border rounded-lg bg-success-light'>
                  <Typography variant='h4' className='font-bold text-success-main'>
                    94%
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Detection Accuracy
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Isolation Forest + Autoencoder
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className='text-center p-4 border rounded-lg bg-info-light'>
                  <Typography variant='h4' className='font-bold text-info-main'>
                    91%
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Precision Rate
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    True positive accuracy
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className='text-center p-4 border rounded-lg bg-warning-light'>
                  <Typography variant='h4' className='font-bold text-warning-main'>
                    96%
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Recall Rate
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Anomaly detection coverage
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Box className='mt-4 p-3 bg-primary-light rounded-lg'>
              <Typography variant='body2' className='font-medium mb-2'>
                <i className='ri-information-line mr-2' />
                Model Features
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                The anomaly detection system uses advanced ML algorithms including Isolation Forest for outlier detection 
                and Autoencoder neural networks for pattern recognition. Features analyzed include sensor readings, 
                operational parameters, and historical patterns with real-time processing capabilities.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AnomalyDetectionView
