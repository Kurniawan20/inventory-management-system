'use client'

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
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Alert from '@mui/material/Alert'

const RiskAssessmentView = ({ data }) => {
  if (!data) return null

  const getRiskLevelConfig = (score) => {
    if (score >= 80) return { level: 'Critical', color: 'error', icon: 'ri-alert-fill' }
    if (score >= 60) return { level: 'High', color: 'warning', icon: 'ri-error-warning-line' }
    if (score >= 40) return { level: 'Medium', color: 'info', icon: 'ri-information-line' }
    return { level: 'Low', color: 'success', icon: 'ri-checkbox-circle-line' }
  }

  const getTrendColor = (trend) => {
    const colors = {
      increasing: 'error',
      stable: 'info',
      decreasing: 'success'
    }
    return colors[trend] || 'default'
  }

  const getTrendIcon = (trend) => {
    const icons = {
      increasing: 'ri-arrow-up-line',
      stable: 'ri-arrow-right-line',
      decreasing: 'ri-arrow-down-line'
    }
    return icons[trend] || 'ri-minus-line'
  }

  // Sample data if none provided
  const riskData = data.length > 0 ? data : [
    {
      asset_id: 'AST-001',
      overall_risk_score: 78,
      financial_risk: 85,
      operational_risk: 75,
      safety_risk: 70,
      environmental_risk: 45,
      risk_factors: [
        'High replacement cost',
        'Critical process dependency',
        'Aging equipment',
        'Limited spare parts availability'
      ],
      mitigation_strategies: [
        'Implement condition monitoring',
        'Establish backup procedures',
        'Secure spare parts inventory',
        'Train additional operators'
      ],
      risk_trend: 'increasing',
      ml_prediction: 'Risk level expected to increase 15% over next 6 months'
    }
  ]

  return (
    <Grid container spacing={4}>
      {/* Risk Overview Cards */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'error.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-alert-fill text-2xl' />
                </Avatar>
                <Typography variant='h4' className='font-bold text-error-main'>
                  {riskData.filter(item => item.overall_risk_score >= 80).length}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Critical Risk Assets
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Score ≥ 80
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
                  {riskData.filter(item => item.overall_risk_score >= 60 && item.overall_risk_score < 80).length}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  High Risk Assets
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Score 60-79
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
                  {riskData.filter(item => item.overall_risk_score >= 40 && item.overall_risk_score < 60).length}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Medium Risk Assets
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Score 40-59
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-checkbox-circle-line text-2xl' />
                </Avatar>
                <Typography variant='h4' className='font-bold text-success-main'>
                  {riskData.filter(item => item.overall_risk_score < 40).length}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Low Risk Assets
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Score &lt; 40
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* High Risk Alert */}
      {riskData.some(item => item.overall_risk_score >= 80) && (
        <Grid item xs={12}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6" className="font-bold mb-2">
              ⚠️ Critical Risk Assets Identified
            </Typography>
            <Typography variant="body2">
              {riskData.filter(item => item.overall_risk_score >= 80).length} asset(s) have critical risk scores. 
              Immediate risk mitigation strategies should be implemented to prevent potential failures and safety incidents.
            </Typography>
          </Alert>
        </Grid>
      )}

      {/* Risk Matrix */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-dashboard-line mr-2' />
              Risk Category Breakdown
            </Typography>
            {riskData.map((asset, index) => (
              <Box key={index} className='mb-4 p-3 border rounded-lg'>
                <Typography variant='subtitle2' className='mb-3'>
                  Asset {asset.asset_id} - Overall Risk: {asset.overall_risk_score}
                </Typography>
                <Box className='space-y-3'>
                  <Box>
                    <Box className='flex justify-between items-center mb-1'>
                      <Typography variant='body2'>Financial Risk</Typography>
                      <Typography variant='body2' className='font-medium text-error-main'>
                        {asset.financial_risk}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant='determinate' 
                      value={asset.financial_risk} 
                      color='error'
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  
                  <Box>
                    <Box className='flex justify-between items-center mb-1'>
                      <Typography variant='body2'>Operational Risk</Typography>
                      <Typography variant='body2' className='font-medium text-warning-main'>
                        {asset.operational_risk}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant='determinate' 
                      value={asset.operational_risk} 
                      color='warning'
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  
                  <Box>
                    <Box className='flex justify-between items-center mb-1'>
                      <Typography variant='body2'>Safety Risk</Typography>
                      <Typography variant='body2' className='font-medium text-info-main'>
                        {asset.safety_risk}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant='determinate' 
                      value={asset.safety_risk} 
                      color='info'
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  
                  <Box>
                    <Box className='flex justify-between items-center mb-1'>
                      <Typography variant='body2'>Environmental Risk</Typography>
                      <Typography variant='body2' className='font-medium text-success-main'>
                        {asset.environmental_risk}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant='determinate' 
                      value={asset.environmental_risk} 
                      color='success'
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </Box>
                
                <Box className='mt-3 flex items-center gap-2'>
                  <Chip
                    label={`${getRiskLevelConfig(asset.overall_risk_score).level} Risk`}
                    color={getRiskLevelConfig(asset.overall_risk_score).color}
                    size='small'
                    variant='tonal'
                  />
                  <Chip
                    label={`Trend: ${asset.risk_trend.toUpperCase()}`}
                    color={getTrendColor(asset.risk_trend)}
                    size='small'
                    variant='outlined'
                    icon={<i className={getTrendIcon(asset.risk_trend)} />}
                  />
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* Risk Factors */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-alert-line mr-2' />
              Risk Factors Analysis
            </Typography>
            {riskData.map((asset, index) => (
              <Box key={index} className='mb-4 p-3 border rounded-lg'>
                <Box className='flex items-center gap-2 mb-3'>
                  <Avatar
                    variant='rounded'
                    sx={{ bgcolor: `${getRiskLevelConfig(asset.overall_risk_score).color}.main`, width: 40, height: 40 }}
                  >
                    <i className={getRiskLevelConfig(asset.overall_risk_score).icon} />
                  </Avatar>
                  <Box>
                    <Typography variant='subtitle2'>Asset {asset.asset_id}</Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Risk Score: {asset.overall_risk_score}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant='body2' className='font-medium mb-2'>
                  Key Risk Factors:
                </Typography>
                <List dense>
                  {asset.risk_factors?.map((factor, factorIndex) => (
                    <ListItem key={factorIndex} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <i className='ri-arrow-right-s-line text-error-main' />
                      </ListItemIcon>
                      <ListItemText 
                        primary={factor}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Box className='mt-3 p-2 bg-warning-light rounded'>
                  <Typography variant='body2' className='font-medium'>
                    <i className='ri-brain-line mr-1' />
                    ML Prediction:
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {asset.ml_prediction}
                  </Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* Risk Assessment Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box className='flex justify-between items-center mb-4'>
              <Typography variant='h6'>
                <i className='ri-shield-check-line mr-2' />
                Comprehensive Risk Assessment
              </Typography>
              <Box className='flex gap-2'>
                <Button variant='outlined' size='small' startIcon={<i className='ri-download-line' />}>
                  Export Risk Report
                </Button>
                <Button variant='contained' size='small' startIcon={<i className='ri-shield-line' />}>
                  Implement Mitigation
                </Button>
              </Box>
            </Box>
            
            <TableContainer component={Paper} variant='outlined'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset</TableCell>
                    <TableCell>Overall Risk</TableCell>
                    <TableCell>Financial Risk</TableCell>
                    <TableCell>Operational Risk</TableCell>
                    <TableCell>Safety Risk</TableCell>
                    <TableCell>Environmental Risk</TableCell>
                    <TableCell>Risk Trend</TableCell>
                    <TableCell align='center'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {riskData.map((asset) => {
                    const riskConfig = getRiskLevelConfig(asset.overall_risk_score)
                    return (
                      <TableRow key={asset.asset_id} hover>
                        <TableCell>
                          <Box className='flex items-center gap-3'>
                            <Avatar
                              variant='rounded'
                              sx={{ bgcolor: `${riskConfig.color}.main` }}
                            >
                              <i className={riskConfig.icon} />
                            </Avatar>
                            <Box>
                              <Typography variant='body2' className='font-medium'>
                                Asset {asset.asset_id}
                              </Typography>
                              <Typography variant='caption' color='text.secondary'>
                                Risk Assessment
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box className='flex items-center gap-2'>
                            <Box className='w-20'>
                              <LinearProgress 
                                variant='determinate' 
                                value={asset.overall_risk_score} 
                                color={riskConfig.color}
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                            </Box>
                            <Typography variant='body2' className='font-medium'>
                              {asset.overall_risk_score}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' className='font-medium text-error-main'>
                            {asset.financial_risk}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' className='font-medium text-warning-main'>
                            {asset.operational_risk}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' className='font-medium text-info-main'>
                            {asset.safety_risk}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' className='font-medium text-success-main'>
                            {asset.environmental_risk}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={asset.risk_trend.toUpperCase()}
                            color={getTrendColor(asset.risk_trend)}
                            size='small'
                            variant='tonal'
                            icon={<i className={getTrendIcon(asset.risk_trend)} />}
                          />
                        </TableCell>
                        <TableCell align='center'>
                          <Button
                            variant='outlined'
                            size='small'
                            startIcon={<i className='ri-shield-line' />}
                          >
                            Mitigate
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

      {/* Mitigation Strategies */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-shield-check-line mr-2' />
              Risk Mitigation Strategies
            </Typography>
            <Grid container spacing={3}>
              {riskData.map((asset, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box className='p-4 border rounded-lg'>
                    <Box className='flex items-center gap-2 mb-3'>
                      <Chip
                        label={`${getRiskLevelConfig(asset.overall_risk_score).level} Risk`}
                        color={getRiskLevelConfig(asset.overall_risk_score).color}
                        size='small'
                        variant='tonal'
                      />
                      <Typography variant='subtitle2'>
                        Asset {asset.asset_id}
                      </Typography>
                    </Box>
                    
                    <Typography variant='body2' className='font-medium mb-2'>
                      Recommended Mitigation Strategies:
                    </Typography>
                    <List dense>
                      {asset.mitigation_strategies?.map((strategy, strategyIndex) => (
                        <ListItem key={strategyIndex} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <i className='ri-check-line text-success-main' />
                          </ListItemIcon>
                          <ListItemText 
                            primary={strategy}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Box className='mt-3 flex gap-2'>
                      <Button
                        variant='outlined'
                        size='small'
                        startIcon={<i className='ri-calendar-line' />}
                      >
                        Schedule
                      </Button>
                      <Button
                        variant='contained'
                        size='small'
                        startIcon={<i className='ri-play-line' />}
                      >
                        Implement
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Risk Summary */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-file-chart-line mr-2' />
              Risk Assessment Summary
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box className='text-center p-4 border rounded-lg bg-error-light'>
                  <Typography variant='h4' className='font-bold text-error-main'>
                    {Math.round(riskData.reduce((sum, item) => sum + item.overall_risk_score, 0) / riskData.length)}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Average Risk Score
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Portfolio risk level
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className='text-center p-4 border rounded-lg bg-warning-light'>
                  <Typography variant='h4' className='font-bold text-warning-main'>
                    {riskData.filter(item => item.risk_trend === 'increasing').length}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Increasing Risk Assets
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Require immediate attention
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className='text-center p-4 border rounded-lg bg-info-light'>
                  <Typography variant='h4' className='font-bold text-info-main'>
                    {Math.round(riskData.reduce((sum, item) => sum + item.financial_risk, 0) / riskData.length)}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Avg Financial Risk
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Cost impact potential
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Box className='mt-4 p-3 bg-primary-light rounded-lg'>
              <Typography variant='body2' className='font-medium mb-2'>
                <i className='ri-information-line mr-2' />
                Risk Management Recommendations
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Current portfolio shows elevated risk levels with {riskData.filter(item => item.overall_risk_score >= 70).length} assets 
                requiring priority attention. Focus on implementing predictive maintenance, establishing backup procedures, 
                and securing critical spare parts to mitigate operational risks. Regular risk reassessment is recommended 
                every 3 months to track improvement progress.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default RiskAssessmentView
