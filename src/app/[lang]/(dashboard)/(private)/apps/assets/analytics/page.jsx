'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import AssetAnalyticsOverview from '@views/apps/assets/analytics/AssetAnalyticsOverview'
import PredictiveMaintenanceView from '@views/apps/assets/analytics/PredictiveMaintenanceView'
import PerformanceAnalyticsView from '@views/apps/assets/analytics/PerformanceAnalyticsView'
import CostOptimizationView from '@views/apps/assets/analytics/CostOptimizationView'
import AnomalyDetectionView from '@views/apps/assets/analytics/AnomalyDetectionView'
import RiskAssessmentView from '@views/apps/assets/analytics/RiskAssessmentView'

// Server Actions
import { getAssetAnalyticsDashboard } from '@/server/actions/getAssetAnalyticsData'

const AssetAnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  // Load analytics data
  const loadAnalyticsData = async () => {
    try {
      setLoading(true)
      const data = await getAssetAnalyticsDashboard()
      setAnalyticsData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error loading analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    loadAnalyticsData()
  }, [])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const tabs = [
    { label: 'Overview', icon: 'ri-dashboard-line' },
    { label: 'Predictive Maintenance', icon: 'ri-tools-line' },
    { label: 'Performance Analytics', icon: 'ri-line-chart-line' },
    { label: 'Cost Optimization', icon: 'ri-money-dollar-circle-line' },
    { label: 'Anomaly Detection', icon: 'ri-alert-line' },
    { label: 'Risk Assessment', icon: 'ri-shield-check-line' }
  ]

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-96">
        <CircularProgress size={40} />
      </Box>
    )
  }

  return (
    <Grid container spacing={6}>
      {/* Header */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box className='flex items-center gap-2'>
                <i className='ri-robot-line text-2xl' />
                <Box>
                  <Typography variant='h5'>Asset Analytics & Machine Learning</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    AI-powered insights for intelligent asset management
                  </Typography>
                </Box>
              </Box>
            }
            action={
              <Box className='flex items-center gap-4'>
                <Box className='flex items-center gap-2'>
                  <Chip 
                    label={`${analyticsData?.summary?.total_assets_analyzed || 0} Assets Analyzed`} 
                    color='primary' 
                    variant='tonal'
                    icon={<i className='ri-cpu-line' />}
                  />
                  <Chip 
                    label={`${analyticsData?.summary?.anomalies_detected || 0} Anomalies`} 
                    color='warning' 
                    variant='tonal'
                    icon={<i className='ri-alert-line' />}
                  />
                  <Chip 
                    label={`${(analyticsData?.summary?.ml_model_accuracy * 100 || 0).toFixed(1)}% Accuracy`} 
                    color='success' 
                    variant='tonal'
                    icon={<i className='ri-brain-line' />}
                  />
                </Box>
                <Button
                  variant='contained'
                  startIcon={<i className='ri-refresh-line' />}
                  onClick={loadAnalyticsData}
                  disabled={loading}
                >
                  Refresh ML Models
                </Button>
              </Box>
            }
          />
          <CardContent>
            {/* Quick Stats */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Box className='text-center p-4 border rounded-lg bg-error-light'>
                  <Typography variant='h4' className='font-bold text-error-main'>
                    {analyticsData?.summary?.high_risk_assets || 0}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    High Risk Assets
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className='text-center p-4 border rounded-lg bg-success-light'>
                  <Typography variant='h4' className='font-bold text-success-main'>
                    {formatCurrency(analyticsData?.summary?.total_potential_savings || 0)}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Potential Savings
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className='text-center p-4 border rounded-lg bg-info-light'>
                  <Typography variant='h4' className='font-bold text-info-main'>
                    {analyticsData?.summary?.average_health_score || 0}%
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Avg Health Score
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className='text-center p-4 border rounded-lg bg-warning-light'>
                  <Typography variant='h4' className='font-bold text-warning-main'>
                    {analyticsData?.summary?.anomalies_detected || 0}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Active Anomalies
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Last Updated Info */}
            {lastUpdated && (
              <Box className='flex items-center gap-2 mb-4'>
                <i className='ri-time-line text-gray-500' />
                <Typography variant='caption' color='text.secondary'>
                  Last updated: {lastUpdated.toLocaleString('id-ID')}
                </Typography>
                <Chip 
                  label='Real-time ML Processing' 
                  size='small' 
                  color='success' 
                  variant='outlined'
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Analytics Tabs */}
      <Grid item xs={12}>
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {tabs.map((tab, index) => (
                <Tab 
                  key={index}
                  label={
                    <Box className='flex items-center gap-2'>
                      <i className={tab.icon} />
                      {tab.label}
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Box>

          {/* Tab Content */}
          <CardContent>
            {activeTab === 0 && (
              <AssetAnalyticsOverview data={analyticsData} />
            )}
            {activeTab === 1 && (
              <PredictiveMaintenanceView data={analyticsData?.predictiveMaintenance} />
            )}
            {activeTab === 2 && (
              <PerformanceAnalyticsView data={analyticsData?.performanceAnalytics} />
            )}
            {activeTab === 3 && (
              <CostOptimizationView data={analyticsData?.costOptimization} />
            )}
            {activeTab === 4 && (
              <AnomalyDetectionView data={analyticsData?.anomalyDetection} />
            )}
            {activeTab === 5 && (
              <RiskAssessmentView data={analyticsData?.riskAssessment} />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AssetAnalyticsPage
