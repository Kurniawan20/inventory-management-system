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

const CostOptimizationView = ({ data }) => {
  if (!data) return null

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getRiskLevelColor = (risk) => {
    const colors = {
      low: 'success',
      medium: 'warning',
      high: 'error'
    }
    return colors[risk] || 'default'
  }

  const getSavingsColor = (percentage) => {
    if (percentage >= 20) return 'success'
    if (percentage >= 10) return 'info'
    return 'warning'
  }

  // Calculate totals
  const totals = {
    currentCost: data.reduce((sum, item) => sum + item.current_annual_cost, 0),
    optimizedCost: data.reduce((sum, item) => sum + item.optimized_annual_cost, 0),
    totalSavings: data.reduce((sum, item) => sum + item.potential_savings, 0),
    implementationCost: data.reduce((sum, item) => sum + item.implementation_cost, 0)
  }

  const averageROI = data.reduce((sum, item) => {
    const months = parseInt(item.roi_timeline.split(' ')[0])
    return sum + months
  }, 0) / data.length

  return (
    <Grid container spacing={4}>
      {/* Cost Overview Cards */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'error.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-money-dollar-circle-line text-2xl' />
                </Avatar>
                <Typography variant='h6' className='font-bold text-error-main'>
                  {formatCurrency(totals.currentCost)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Current Annual Cost
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-arrow-down-circle-line text-2xl' />
                </Avatar>
                <Typography variant='h6' className='font-bold text-success-main'>
                  {formatCurrency(totals.optimizedCost)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Optimized Annual Cost
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className='text-center'>
                <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <i className='ri-coin-line text-2xl' />
                </Avatar>
                <Typography variant='h6' className='font-bold text-info-main'>
                  {formatCurrency(totals.totalSavings)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Total Potential Savings
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
                <Typography variant='h6' className='font-bold text-warning-main'>
                  {Math.round(averageROI)} months
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Average ROI Timeline
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Savings Potential Chart */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-bar-chart-line mr-2' />
              Cost Savings Breakdown
            </Typography>
            <Box className='space-y-4'>
              {data.map((item, index) => (
                <Box key={index}>
                  <Box className='flex justify-between items-center mb-2'>
                    <Typography variant='body2' className='font-medium'>
                      Asset {item.asset_id}
                    </Typography>
                    <Box className='flex items-center gap-2'>
                      <Typography variant='body2' className='font-bold text-success-main'>
                        {formatCurrency(item.potential_savings)}
                      </Typography>
                      <Chip
                        label={`${item.savings_percentage.toFixed(1)}%`}
                        color={getSavingsColor(item.savings_percentage)}
                        size='small'
                        variant='tonal'
                      />
                    </Box>
                  </Box>
                  <LinearProgress 
                    variant='determinate' 
                    value={item.savings_percentage} 
                    color={getSavingsColor(item.savings_percentage)}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Box className='flex justify-between items-center mt-1'>
                    <Typography variant='caption' color='text.secondary'>
                      Current: {formatCurrency(item.current_annual_cost)}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Optimized: {formatCurrency(item.optimized_annual_cost)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* ROI Analysis */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-line-chart-line mr-2' />
              ROI Analysis
            </Typography>
            <Box className='space-y-4'>
              {data.map((item, index) => (
                <Box key={index} className='p-3 border rounded-lg'>
                  <Box className='flex justify-between items-center mb-2'>
                    <Typography variant='subtitle2'>Asset {item.asset_id}</Typography>
                    <Chip
                      label={item.roi_timeline}
                      color='info'
                      size='small'
                      variant='outlined'
                    />
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant='caption' color='text.secondary'>Investment</Typography>
                      <Typography variant='body2' className='font-medium'>
                        {formatCurrency(item.implementation_cost)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='caption' color='text.secondary'>Annual Savings</Typography>
                      <Typography variant='body2' className='font-medium text-success-main'>
                        {formatCurrency(item.potential_savings)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box className='mt-2'>
                    <Typography variant='caption' color='text.secondary'>Risk Level</Typography>
                    <Box className='flex items-center gap-2 mt-1'>
                      <Chip
                        label={item.risk_level.toUpperCase()}
                        color={getRiskLevelColor(item.risk_level)}
                        size='small'
                        variant='tonal'
                      />
                      <Typography variant='caption' color='text.secondary'>
                        ROI: {((item.potential_savings / item.implementation_cost) * 100).toFixed(0)}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Optimization Opportunities Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box className='flex justify-between items-center mb-4'>
              <Typography variant='h6'>
                <i className='ri-settings-line mr-2' />
                Optimization Opportunities
              </Typography>
              <Box className='flex gap-2'>
                <Button variant='outlined' size='small' startIcon={<i className='ri-download-line' />}>
                  Export Analysis
                </Button>
                <Button variant='contained' size='small' startIcon={<i className='ri-play-line' />}>
                  Implement All
                </Button>
              </Box>
            </Box>
            
            <TableContainer component={Paper} variant='outlined'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset</TableCell>
                    <TableCell>Current Cost</TableCell>
                    <TableCell>Optimized Cost</TableCell>
                    <TableCell>Potential Savings</TableCell>
                    <TableCell>Savings %</TableCell>
                    <TableCell>Implementation Cost</TableCell>
                    <TableCell>ROI Timeline</TableCell>
                    <TableCell>Risk Level</TableCell>
                    <TableCell align='center'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.asset_id} hover>
                      <TableCell>
                        <Box className='flex items-center gap-3'>
                          <Avatar
                            variant='rounded'
                            sx={{ bgcolor: `${getSavingsColor(item.savings_percentage)}.main` }}
                          >
                            <i className='ri-money-dollar-circle-line' />
                          </Avatar>
                          <Box>
                            <Typography variant='body2' className='font-medium'>
                              Asset {item.asset_id}
                            </Typography>
                            <Typography variant='caption' color='text.secondary'>
                              Cost Optimization
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' className='font-medium'>
                          {formatCurrency(item.current_annual_cost)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' className='font-medium text-success-main'>
                          {formatCurrency(item.optimized_annual_cost)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' className='font-bold text-info-main'>
                          {formatCurrency(item.potential_savings)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`${item.savings_percentage.toFixed(1)}%`}
                          color={getSavingsColor(item.savings_percentage)}
                          size='small'
                          variant='tonal'
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>
                          {formatCurrency(item.implementation_cost)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.roi_timeline}
                          color='info'
                          size='small'
                          variant='outlined'
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.risk_level.toUpperCase()}
                          color={getRiskLevelColor(item.risk_level)}
                          size='small'
                          variant='tonal'
                        />
                      </TableCell>
                      <TableCell align='center'>
                        <Button
                          variant='outlined'
                          size='small'
                          startIcon={<i className='ri-play-line' />}
                        >
                          Implement
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

      {/* Optimization Areas */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-lightbulb-line mr-2' />
              ML-Recommended Optimization Areas
            </Typography>
            <Grid container spacing={3}>
              {data.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box className='p-4 border rounded-lg'>
                    <Box className='flex items-center gap-2 mb-3'>
                      <Avatar
                        variant='rounded'
                        sx={{ bgcolor: `${getSavingsColor(item.savings_percentage)}.main`, width: 40, height: 40 }}
                      >
                        <i className='ri-settings-line' />
                      </Avatar>
                      <Box>
                        <Typography variant='subtitle2'>Asset {item.asset_id}</Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {formatCurrency(item.potential_savings)} potential savings
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant='body2' className='font-medium mb-2'>
                      Optimization Areas:
                    </Typography>
                    <List dense>
                      {item.optimization_areas?.map((area, areaIndex) => (
                        <ListItem key={areaIndex} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <i className='ri-arrow-right-s-line text-primary-main' />
                          </ListItemIcon>
                          <ListItemText 
                            primary={area}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Box className='mt-3 p-2 bg-info-light rounded'>
                      <Typography variant='body2' className='font-medium'>
                        <i className='ri-brain-line mr-1' />
                        ML Recommendation:
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {item.ml_recommendation}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Implementation Summary */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              <i className='ri-file-chart-line mr-2' />
              Implementation Summary
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box className='text-center p-4 border rounded-lg bg-success-light'>
                  <Typography variant='h4' className='font-bold text-success-main'>
                    {formatCurrency(totals.totalSavings)}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Total Annual Savings
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {((totals.totalSavings / totals.currentCost) * 100).toFixed(1)}% cost reduction
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className='text-center p-4 border rounded-lg bg-warning-light'>
                  <Typography variant='h4' className='font-bold text-warning-main'>
                    {formatCurrency(totals.implementationCost)}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Total Implementation Cost
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    One-time investment required
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className='text-center p-4 border rounded-lg bg-info-light'>
                  <Typography variant='h4' className='font-bold text-info-main'>
                    {((totals.totalSavings / totals.implementationCost) * 100).toFixed(0)}%
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Overall ROI
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Return on investment
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Box className='mt-4 p-3 bg-primary-light rounded-lg'>
              <Typography variant='body2' className='font-medium mb-2'>
                <i className='ri-information-line mr-2' />
                Executive Summary
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                ML analysis identifies {formatCurrency(totals.totalSavings)} in annual cost savings opportunities 
                across {data.length} assets. With an implementation investment of {formatCurrency(totals.implementationCost)}, 
                the portfolio can achieve a {((totals.totalSavings / totals.implementationCost) * 100).toFixed(0)}% ROI 
                within an average of {Math.round(averageROI)} months.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CostOptimizationView
