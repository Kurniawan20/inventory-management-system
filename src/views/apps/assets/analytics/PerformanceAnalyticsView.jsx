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
import CircularProgress from '@mui/material/CircularProgress'
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

const PerformanceAnalyticsView = ({ data }) => {
  if (!data) return null

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getPerformanceColor = (score) => {
    if (score >= 0.9) return 'success'
    if (score >= 0.7) return 'warning'
    return 'error'
  }

  const getTrendColor = (trend) => {
    const colors = {
      improving: 'success',
      stable: 'info',
      declining: 'error'
    }
    return colors[trend] || 'default'
  }

  const getTrendIcon = (trend) => {
    const icons = {
      improving: 'ri-arrow-up-line',
      stable: 'ri-arrow-right-line',
      declining: 'ri-arrow-down-line'
    }
    return icons[trend] || 'ri-minus-line'
  }

  const getBenchmarkColor = (comparison) => {
    if (comparison > 0) return 'success'
    if (comparison === 0) return 'info'
    return 'error'
  }

  // Calculate overall performance metrics
  const overallMetrics = {
    avgEfficiency: Math.round(data.reduce((sum, item) => sum + item.efficiency_score, 0) / data.length),
    avgUtilization: Math.round(data.reduce((sum, item) => sum + item.utilization_rate, 0) / data.length * 100),
    avgOEE: Math.round(data.reduce((sum, item) => sum + item.oee_score, 0) / data.length * 100),
    totalCostPerHour: data.reduce((sum, item) => sum + item.cost_per_hour, 0)
  }

  return (
    <Grid container spacing={4}>
      {/* Performance Overview Cards */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Box className='relative inline-flex mb-3'>
                  <CircularProgress
                    variant='determinate'
                    value={overallMetrics.avgEfficiency}
                    size={80}
                    thickness={4}
                    color={getPerformanceColor(overallMetrics.avgEfficiency / 100)}
                  />
                  <Box className='absolute inset-0 flex items-center justify-center'>
                    <Typography variant='h6' className='font-bold'>
                      {overallMetrics.avgEfficiency}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant='body2' color='text.secondary'>
                  Average Efficiency
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Box className='relative inline-flex mb-3'>
                  <CircularProgress
                    variant='determinate'
                    value={overallMetrics.avgUtilization}
                    size={80}
                    thickness={4}
                    color={getPerformanceColor(overallMetrics.avgUtilization / 100)}
                  />
                  <Box className='absolute inset-0 flex items-center justify-center'>
                    <Typography variant='h6' className='font-bold'>
                      {overallMetrics.avgUtilization}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant='body2' color='text.secondary'>
                  Average Utilization
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Box className='relative inline-flex mb-3'>
                  <CircularProgress
                    variant='determinate'
                    value={overallMetrics.avgOEE}
                    size={80}
                    thickness={4}
                    color={getPerformanceColor(overallMetrics.avgOEE / 100)}
                  />
                  <Box className='absolute inset-0 flex items-center justify-center'>
                    <Typography variant='h6' className='font-bold'>
                      {overallMetrics.avgOEE}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant='body2' color='text.secondary'>
                  Overall Equipment Effectiveness
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-money-dollar-circle-line text-2xl' />
                </Avatar>
                <Typography variant='h6' className='font-bold text-info-main'>
                  {formatCurrency(overallMetrics.totalCostPerHour)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Total Operating Cost/Hour
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Performance Comparison Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box className='flex justify-between items-center mb-4'>
              <Typography variant='h6'>
                <i className='ri-line-chart-line mr-2' />
                Asset Performance Analysis
              </Typography>
              <Box className='flex gap-2'>
                <Button variant='outlined' size='small' startIcon={<i className='ri-download-line' />}>
                  Export Report
                </Button>
                <Button variant='contained' size='small' startIcon={<i className='ri-settings-line' />}>
                  Optimize Performance
                </Button>
              </Box>
            </Box>
            
            <TableContainer component={Paper} variant='outlined'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset</TableCell>
                    <TableCell>Efficiency</TableCell>
                    <TableCell>OEE Score</TableCell>
                    <TableCell>Utilization</TableCell>
                    <TableCell>Trend</TableCell>
                    <TableCell>Benchmark</TableCell>
                    <TableCell>Energy Efficiency</TableCell>
                    <TableCell>Cost/Hour</TableCell>
                    <TableCell>Productivity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((asset) => (
                    <TableRow key={asset.asset_id} hover>
                      <TableCell>
                        <Box className='flex items-center gap-3'>
                          <Avatar
                            variant='rounded'
                            sx={{ bgcolor: `${getPerformanceColor(asset.efficiency_score / 100)}.main` }}
                          >
                            <i className='ri-dashboard-line' />
                          </Avatar>
                          <Box>
                            <Typography variant='body2' className='font-medium'>
                              Asset {asset.asset_id}
                            </Typography>
                            <Typography variant='caption' color='text.secondary'>
                              Performance Analytics
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className='flex items-center gap-2'>
                          <Box className='w-20'>
                            <LinearProgress 
                              variant='determinate' 
                              value={asset.efficiency_score} 
                              color={getPerformanceColor(asset.efficiency_score / 100)}
                              sx={{ height: 8, borderRadius: 4 }}
                            />
                          </Box>
                          <Typography variant='body2' className='font-medium'>
                            {asset.efficiency_score}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className='flex items-center gap-2'>
                          <Box className='w-20'>
                            <LinearProgress 
                              variant='determinate' 
                              value={asset.oee_score * 100} 
                              color={getPerformanceColor(asset.oee_score)}
                              sx={{ height: 8, borderRadius: 4 }}
                            />
                          </Box>
                          <Typography variant='body2' className='font-medium'>
                            {(asset.oee_score * 100).toFixed(0)}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' className='font-medium'>
                          {(asset.utilization_rate * 100).toFixed(0)}%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={asset.trend.toUpperCase()}
                          color={getTrendColor(asset.trend)}
                          size='small'
                          variant='tonal'
                          icon={<i className={getTrendIcon(asset.trend)} />}
                        />
                      </TableCell>
                      <TableCell>
                        <Box className='flex items-center gap-1'>
                          <Typography 
                            variant='body2' 
                            className={`font-medium ${asset.benchmark_comparison >= 0 ? 'text-success-main' : 'text-error-main'}`}
                          >
                            {asset.benchmark_comparison > 0 ? '+' : ''}{asset.benchmark_comparison}%
                          </Typography>
                          <i className={`${asset.benchmark_comparison >= 0 ? 'ri-arrow-up-line text-success-main' : 'ri-arrow-down-line text-error-main'}`} />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className='flex items-center gap-2'>
                          <Box className='w-16'>
                            <LinearProgress 
                              variant='determinate' 
                              value={asset.energy_efficiency * 100} 
                              color={getPerformanceColor(asset.energy_efficiency)}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                          <Typography variant='body2' className='font-medium'>
                            {(asset.energy_efficiency * 100).toFixed(0)}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' className='font-medium'>
                          {formatCurrency(asset.cost_per_hour)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box className='flex items-center gap-2'>
                          <Box className='w-16'>
                            <LinearProgress 
                              variant='determinate' 
                              value={asset.productivity_index * 100} 
                              color={getPerformanceColor(asset.productivity_index)}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                          <Typography variant='body2' className='font-medium'>
                            {(asset.productivity_index * 100).toFixed(0)}%
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* OEE Breakdown */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-pie-chart-line mr-2' />
              OEE Components Breakdown
            </Typography>
            {data.map((asset, index) => (
              <Box key={index} className='mb-4 p-3 border rounded-lg'>
                <Typography variant='subtitle2' className='mb-3'>
                  Asset {asset.asset_id}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box className='text-center'>
                      <Typography variant='caption' color='text.secondary'>Availability</Typography>
                      <Typography variant='h6' className='font-bold text-success-main'>
                        {(asset.availability * 100).toFixed(0)}%
                      </Typography>
                      <LinearProgress 
                        variant='determinate' 
                        value={asset.availability * 100} 
                        color='success'
                        sx={{ height: 4, borderRadius: 2, mt: 1 }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box className='text-center'>
                      <Typography variant='caption' color='text.secondary'>Performance</Typography>
                      <Typography variant='h6' className='font-bold text-info-main'>
                        {(asset.performance_rate * 100).toFixed(0)}%
                      </Typography>
                      <LinearProgress 
                        variant='determinate' 
                        value={asset.performance_rate * 100} 
                        color='info'
                        sx={{ height: 4, borderRadius: 2, mt: 1 }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box className='text-center'>
                      <Typography variant='caption' color='text.secondary'>Quality</Typography>
                      <Typography variant='h6' className='font-bold text-warning-main'>
                        {(asset.quality_rate * 100).toFixed(0)}%
                      </Typography>
                      <LinearProgress 
                        variant='determinate' 
                        value={asset.quality_rate * 100} 
                        color='warning'
                        sx={{ height: 4, borderRadius: 2, mt: 1 }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box className='mt-3 p-2 bg-primary-light rounded'>
                  <Typography variant='body2' className='text-center'>
                    <strong>Overall OEE: {(asset.oee_score * 100).toFixed(1)}%</strong>
                  </Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* ML Insights */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-brain-line mr-2' />
              AI Performance Insights
            </Typography>
            {data.map((asset, index) => (
              <Box key={index} className='mb-4'>
                <Typography variant='subtitle2' className='mb-2'>
                  Asset {asset.asset_id} - ML Recommendations
                </Typography>
                <List dense>
                  {asset.ml_insights?.map((insight, insightIndex) => (
                    <ListItem key={insightIndex}>
                      <ListItemIcon>
                        <i className='ri-lightbulb-line text-warning-main' />
                      </ListItemIcon>
                      <ListItemText 
                        primary={insight}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* Performance Benchmarks */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-bar-chart-line mr-2' />
              Industry Benchmarks Comparison
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box className='text-center p-4 border rounded-lg'>
                  <Typography variant='h4' className='font-bold text-primary-main'>
                    82%
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Industry Average OEE
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Manufacturing sector baseline
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className='text-center p-4 border rounded-lg'>
                  <Typography variant='h4' className='font-bold text-success-main'>
                    95%
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    World Class OEE
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Top 10% performers
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className='text-center p-4 border rounded-lg'>
                  <Typography variant='h4' className='font-bold text-info-main'>
                    85%
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Target Efficiency
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Company goal for 2024
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Box className='mt-4 p-3 bg-info-light rounded-lg'>
              <Typography variant='body2' className='font-medium mb-2'>
                <i className='ri-information-line mr-2' />
                Performance Summary
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Current fleet average OEE of {overallMetrics.avgOEE}% is {overallMetrics.avgOEE >= 82 ? 'above' : 'below'} industry 
                standard. Focus on improving {overallMetrics.avgOEE < 82 ? 'availability and performance rates' : 'quality metrics'} 
                to reach world-class performance levels.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PerformanceAnalyticsView
