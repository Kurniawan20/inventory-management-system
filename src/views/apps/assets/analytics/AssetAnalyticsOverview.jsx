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
import LinearProgress from '@mui/material/LinearProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'

const AssetAnalyticsOverview = ({ data }) => {
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

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'success'
    }
    return colors[priority] || 'default'
  }

  const getRiskIcon = (priority) => {
    const icons = {
      high: 'ri-alert-fill',
      medium: 'ri-error-warning-line',
      low: 'ri-checkbox-circle-line'
    }
    return icons[priority] || 'ri-question-line'
  }

  return (
    <Grid container spacing={4}>
      {/* ML Model Performance */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-brain-line mr-2' />
              ML Model Performance
            </Typography>
            <Box className='space-y-4'>
              <Box>
                <Box className='flex justify-between items-center mb-1'>
                  <Typography variant='body2'>Predictive Maintenance Model</Typography>
                  <Typography variant='body2' className='font-medium'>92%</Typography>
                </Box>
                <LinearProgress variant='determinate' value={92} color='success' sx={{ height: 8, borderRadius: 4 }} />
                <Typography variant='caption' color='text.secondary'>
                  Random Forest + LSTM Neural Network
                </Typography>
              </Box>
              
              <Box>
                <Box className='flex justify-between items-center mb-1'>
                  <Typography variant='body2'>Anomaly Detection Model</Typography>
                  <Typography variant='body2' className='font-medium'>94%</Typography>
                </Box>
                <LinearProgress variant='determinate' value={94} color='success' sx={{ height: 8, borderRadius: 4 }} />
                <Typography variant='caption' color='text.secondary'>
                  Isolation Forest + Autoencoder
                </Typography>
              </Box>
              
              <Box>
                <Box className='flex justify-between items-center mb-1'>
                  <Typography variant='body2'>Performance Optimization</Typography>
                  <Typography variant='body2' className='font-medium'>88%</Typography>
                </Box>
                <LinearProgress variant='determinate' value={88} color='info' sx={{ height: 8, borderRadius: 4 }} />
                <Typography variant='caption' color='text.secondary'>
                  Gradient Boosting + Neural Network
                </Typography>
              </Box>
              
              <Box>
                <Box className='flex justify-between items-center mb-1'>
                  <Typography variant='body2'>Cost Prediction Model</Typography>
                  <Typography variant='body2' className='font-medium'>85%</Typography>
                </Box>
                <LinearProgress variant='determinate' value={85} color='warning' sx={{ height: 8, borderRadius: 4 }} />
                <Typography variant='caption' color='text.secondary'>
                  Linear Regression + Decision Trees
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Risk Distribution */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-pie-chart-line mr-2' />
              Asset Risk Distribution
            </Typography>
            <Box className='space-y-3'>
              <Box className='flex items-center justify-between p-3 border rounded-lg bg-error-light'>
                <Box className='flex items-center gap-3'>
                  <Avatar sx={{ bgcolor: 'error.main', width: 40, height: 40 }}>
                    <i className='ri-alert-fill' />
                  </Avatar>
                  <Box>
                    <Typography variant='body1' className='font-medium'>High Risk</Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Immediate attention required
                    </Typography>
                  </Box>
                </Box>
                <Typography variant='h5' className='font-bold text-error-main'>
                  {data.summary?.high_risk_assets || 0}
                </Typography>
              </Box>
              
              <Box className='flex items-center justify-between p-3 border rounded-lg bg-warning-light'>
                <Box className='flex items-center gap-3'>
                  <Avatar sx={{ bgcolor: 'warning.main', width: 40, height: 40 }}>
                    <i className='ri-error-warning-line' />
                  </Avatar>
                  <Box>
                    <Typography variant='body1' className='font-medium'>Medium Risk</Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Monitor closely
                    </Typography>
                  </Box>
                </Box>
                <Typography variant='h5' className='font-bold text-warning-main'>
                  {data.summary?.medium_risk_assets || 0}
                </Typography>
              </Box>
              
              <Box className='flex items-center justify-between p-3 border rounded-lg bg-success-light'>
                <Box className='flex items-center gap-3'>
                  <Avatar sx={{ bgcolor: 'success.main', width: 40, height: 40 }}>
                    <i className='ri-checkbox-circle-line' />
                  </Avatar>
                  <Box>
                    <Typography variant='body1' className='font-medium'>Low Risk</Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Normal operation
                    </Typography>
                  </Box>
                </Box>
                <Typography variant='h5' className='font-bold text-success-main'>
                  {data.summary?.low_risk_assets || 0}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Top Priority Assets */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box className='flex justify-between items-center mb-4'>
              <Typography variant='h6'>
                <i className='ri-alarm-warning-line mr-2' />
                Priority Assets Requiring Attention
              </Typography>
              <Button variant='outlined' size='small' startIcon={<i className='ri-eye-line' />}>
                View All
              </Button>
            </Box>
            <TableContainer component={Paper} variant='outlined'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset</TableCell>
                    <TableCell>Health Score</TableCell>
                    <TableCell>Risk Level</TableCell>
                    <TableCell>Predicted Failure</TableCell>
                    <TableCell>Cost Impact</TableCell>
                    <TableCell>ML Confidence</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.predictiveMaintenance?.slice(0, 4).map((asset) => (
                    <TableRow key={asset.asset_id} hover>
                      <TableCell>
                        <Box className='flex items-center gap-3'>
                          <Avatar
                            variant='rounded'
                            sx={{ bgcolor: `${getPriorityColor(asset.maintenance_priority)}.main` }}
                          >
                            <i className={getRiskIcon(asset.maintenance_priority)} />
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
                          <Box className='w-16'>
                            <LinearProgress 
                              variant='determinate' 
                              value={asset.current_health_score} 
                              color={getHealthScoreColor(asset.current_health_score)}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                          <Typography variant='body2' className='font-medium'>
                            {asset.current_health_score}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={asset.maintenance_priority.toUpperCase()}
                          color={getPriorityColor(asset.maintenance_priority)}
                          size='small'
                          variant='tonal'
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>
                          {new Date(asset.predicted_failure_date).toLocaleDateString('id-ID')}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {Math.ceil((new Date(asset.predicted_failure_date) - new Date()) / (1000 * 60 * 60 * 24))} days
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' className='font-medium'>
                          {formatCurrency(asset.cost_impact)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box className='flex items-center gap-1'>
                          <Typography variant='body2' className='font-medium'>
                            {(asset.ml_confidence * 100).toFixed(0)}%
                          </Typography>
                          <i className='ri-brain-line text-primary-main' />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant='outlined'
                          size='small'
                          startIcon={<i className='ri-tools-line' />}
                        >
                          Schedule
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Anomalies */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-alert-line mr-2' />
              Recent Anomalies Detected
            </Typography>
            <Box className='space-y-3'>
              {data.anomalyDetection?.map((anomaly, index) => (
                <Box key={index} className='p-3 border rounded-lg'>
                  <Box className='flex items-start justify-between mb-2'>
                    <Box className='flex items-center gap-2'>
                      <Chip
                        label={anomaly.severity.toUpperCase()}
                        color={anomaly.severity === 'high' ? 'error' : 'warning'}
                        size='small'
                      />
                      <Typography variant='body2' className='font-medium'>
                        {anomaly.anomaly_type.replace('_', ' ').toUpperCase()}
                      </Typography>
                    </Box>
                    <Typography variant='caption' color='text.secondary'>
                      {(anomaly.confidence_score * 100).toFixed(0)}% confidence
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary' className='mb-2'>
                    {anomaly.description}
                  </Typography>
                  <Box className='flex items-center gap-2'>
                    <Typography variant='caption' color='text.secondary'>
                      Asset: {anomaly.asset_id}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      • {new Date(anomaly.detected_at).toLocaleString('id-ID')}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Cost Optimization Opportunities */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-money-dollar-circle-line mr-2' />
              Cost Optimization Opportunities
            </Typography>
            <Box className='space-y-3'>
              {data.costOptimization?.map((optimization, index) => (
                <Box key={index} className='p-3 border rounded-lg bg-success-light'>
                  <Box className='flex items-center justify-between mb-2'>
                    <Typography variant='body2' className='font-medium'>
                      Asset {optimization.asset_id}
                    </Typography>
                    <Chip
                      label={`${optimization.savings_percentage.toFixed(1)}% Savings`}
                      color='success'
                      size='small'
                      variant='tonal'
                    />
                  </Box>
                  <Typography variant='h6' className='font-bold text-success-main mb-1'>
                    {formatCurrency(optimization.potential_savings)}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Annual potential savings • ROI: {optimization.roi_timeline}
                  </Typography>
                </Box>
              ))}
              
              <Box className='p-3 border-2 border-dashed border-success-main rounded-lg text-center'>
                <Typography variant='h5' className='font-bold text-success-main'>
                  {formatCurrency(data.summary?.total_potential_savings || 0)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Total Optimization Potential
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* AI Insights Summary */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-lightbulb-line mr-2' />
              AI-Generated Insights & Recommendations
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box className='p-4 border rounded-lg bg-info-light'>
                  <Box className='flex items-center gap-2 mb-2'>
                    <i className='ri-tools-line text-info-main' />
                    <Typography variant='subtitle2' className='font-medium'>
                      Maintenance Optimization
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    ML models predict 30% reduction in unplanned downtime through predictive maintenance implementation.
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className='p-4 border rounded-lg bg-warning-light'>
                  <Box className='flex items-center gap-2 mb-2'>
                    <i className='ri-line-chart-line text-warning-main' />
                    <Typography variant='subtitle2' className='font-medium'>
                      Performance Enhancement
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    Anomaly patterns suggest 15% efficiency improvement possible through operational adjustments.
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className='p-4 border rounded-lg bg-success-light'>
                  <Box className='flex items-center gap-2 mb-2'>
                    <i className='ri-shield-check-line text-success-main' />
                    <Typography variant='subtitle2' className='font-medium'>
                      Risk Mitigation
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    Early warning systems can prevent 85% of critical failures based on historical analysis.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AssetAnalyticsOverview
