'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

// Sample data for reports
const monthlyDepreciationData = [
  { month: 'Jan', amount: 45000000, assets: 12 },
  { month: 'Feb', amount: 47000000, assets: 13 },
  { month: 'Mar', amount: 44000000, assets: 12 },
  { month: 'Apr', amount: 48000000, assets: 14 },
  { month: 'May', amount: 46000000, assets: 13 },
  { month: 'Jun', amount: 49000000, assets: 15 }
]

const categoryDepreciationData = [
  { name: 'Heavy Equipment', value: 285000000, percentage: 45, color: '#8884d8' },
  { name: 'Power Equipment', value: 190000000, percentage: 30, color: '#82ca9d' },
  { name: 'Safety Equipment', value: 95000000, percentage: 15, color: '#ffc658' },
  { name: 'Drilling Equipment', value: 63000000, percentage: 10, color: '#ff7c7c' }
]

const depreciationTrendData = [
  { year: '2020', accumulated: 125000000, annual: 125000000 },
  { year: '2021', accumulated: 275000000, annual: 150000000 },
  { year: '2022', accumulated: 450000000, annual: 175000000 },
  { year: '2023', accumulated: 650000000, annual: 200000000 },
  { year: '2024', accumulated: 875000000, annual: 225000000 }
]

const DepreciationReports = () => {
  const [reportPeriod, setReportPeriod] = useState('current-year')
  const [reportType, setReportType] = useState('summary')

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const totalDepreciation = categoryDepreciationData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Grid container spacing={6}>
      {/* Report Controls */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Depreciation Reports & Analytics"
            subheader="Laporan dan analisis penyusutan aset"
          />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Report Period</InputLabel>
                  <Select
                    value={reportPeriod}
                    label="Report Period"
                    onChange={(e) => setReportPeriod(e.target.value)}
                  >
                    <MenuItem value="current-month">Current Month</MenuItem>
                    <MenuItem value="current-quarter">Current Quarter</MenuItem>
                    <MenuItem value="current-year">Current Year</MenuItem>
                    <MenuItem value="last-year">Last Year</MenuItem>
                    <MenuItem value="custom">Custom Range</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    label="Report Type"
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <MenuItem value="summary">Summary Report</MenuItem>
                    <MenuItem value="detailed">Detailed Report</MenuItem>
                    <MenuItem value="category">By Category</MenuItem>
                    <MenuItem value="location">By Location</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ height: '56px' }}
                  startIcon={<i className='ri-download-line' />}
                >
                  Export PDF
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ height: '56px' }}
                  startIcon={<i className='ri-file-excel-line' />}
                >
                  Export Excel
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Summary Cards */}
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" color="primary">
                  {formatCurrency(totalDepreciation)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Accumulated Depreciation
                </Typography>
              </Box>
              <Box sx={{ 
                backgroundColor: 'primary.main', 
                borderRadius: 2, 
                p: 1.5,
                display: 'flex',
                alignItems: 'center'
              }}>
                <i className='ri-money-dollar-circle-line' style={{ fontSize: '2rem', color: 'white' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" color="success.main">
                  {formatCurrency(225000000)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Annual Depreciation (2024)
                </Typography>
              </Box>
              <Box sx={{ 
                backgroundColor: 'success.main', 
                borderRadius: 2, 
                p: 1.5,
                display: 'flex',
                alignItems: 'center'
              }}>
                <i className='ri-line-chart-line' style={{ fontSize: '2rem', color: 'white' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" color="warning.main">
                  54
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Assets Under Depreciation
                </Typography>
              </Box>
              <Box sx={{ 
                backgroundColor: 'warning.main', 
                borderRadius: 2, 
                p: 1.5,
                display: 'flex',
                alignItems: 'center'
              }}>
                <i className='ri-building-line' style={{ fontSize: '2rem', color: 'white' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" color="error.main">
                  8
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fully Depreciated Assets
                </Typography>
              </Box>
              <Box sx={{ 
                backgroundColor: 'error.main', 
                borderRadius: 2, 
                p: 1.5,
                display: 'flex',
                alignItems: 'center'
              }}>
                <i className='ri-alert-line' style={{ fontSize: '2rem', color: 'white' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Monthly Depreciation Trend */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader
            title="Monthly Depreciation Trend"
            subheader="Tren penyusutan bulanan tahun 2024"
          />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyDepreciationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Depreciation Amount']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Depreciation by Category */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader
            title="Depreciation by Category"
            subheader="Distribusi penyusutan per kategori"
          />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDepreciationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {categoryDepreciationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 2 }}>
              {categoryDepreciationData.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: 1 }} />
                    <Typography variant="body2">{item.name}</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="medium">
                    {formatCurrency(item.value)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Depreciation Trend Over Years */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Depreciation Trend Analysis"
            subheader="Analisis tren penyusutan selama 5 tahun terakhir"
          />
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={depreciationTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                <Tooltip 
                  formatter={(value, name) => [
                    formatCurrency(value), 
                    name === 'accumulated' ? 'Accumulated Depreciation' : 'Annual Depreciation'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="accumulated" 
                  stroke="#8884d8" 
                  strokeWidth={3}
                  name="accumulated"
                />
                <Line 
                  type="monotone" 
                  dataKey="annual" 
                  stroke="#82ca9d" 
                  strokeWidth={3}
                  name="annual"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Key Insights */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Key Insights & Recommendations"
            subheader="Wawasan dan rekomendasi berdasarkan analisis penyusutan"
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, backgroundColor: 'primary.50' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <i className='ri-lightbulb-line' style={{ fontSize: '1.5rem', color: '#1976d2' }} />
                    <Typography variant="h6" color="primary">
                      Asset Replacement Planning
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    8 aset telah mencapai penyusutan penuh dan perlu evaluasi untuk penggantian atau perpanjangan masa manfaat.
                  </Typography>
                  <Chip label="High Priority" color="error" size="small" sx={{ mt: 1 }} />
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, backgroundColor: 'success.50' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <i className='ri-trending-up-line' style={{ fontSize: '1.5rem', color: '#2e7d32' }} />
                    <Typography variant="h6" color="success.main">
                      Depreciation Optimization
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Pertimbangkan untuk meninjau metode penyusutan pada kategori Heavy Equipment untuk optimasi pajak.
                  </Typography>
                  <Chip label="Medium Priority" color="warning" size="small" sx={{ mt: 1 }} />
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, backgroundColor: 'warning.50' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <i className='ri-file-chart-line' style={{ fontSize: '1.5rem', color: '#ed6c02' }} />
                    <Typography variant="h6" color="warning.main">
                      Financial Impact
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Total penyusutan tahunan sebesar Rp 225M mempengaruhi laporan keuangan dan perencanaan anggaran.
                  </Typography>
                  <Chip label="Monitor" color="info" size="small" sx={{ mt: 1 }} />
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, backgroundColor: 'info.50' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <i className='ri-shield-check-line' style={{ fontSize: '1.5rem', color: '#0288d1' }} />
                    <Typography variant="h6" color="info.main">
                      Compliance Status
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Semua perhitungan penyusutan sesuai dengan standar akuntansi PSAK dan regulasi perpajakan.
                  </Typography>
                  <Chip label="Compliant" color="success" size="small" sx={{ mt: 1 }} />
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DepreciationReports
