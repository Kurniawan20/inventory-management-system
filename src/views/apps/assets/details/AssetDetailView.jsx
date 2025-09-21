'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// Next Imports
import { useRouter, useParams } from 'next/navigation'
import NextLink from 'next/link'

const AssetDetailView = ({ asset }) => {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState(0)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)

  if (!asset) {
    return (
      <Box className="flex justify-center items-center min-h-96">
        <Typography variant="h6">Asset not found</Typography>
      </Box>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Under Maintenance': return 'warning'
      case 'Inactive': return 'secondary'
      case 'Disposed': return 'error'
      default: return 'default'
    }
  }

  const getCriticalityColor = (criticality) => {
    switch (criticality) {
      case 'Very High': return 'error'
      case 'High': return 'warning'
      case 'Medium': return 'info'
      case 'Low': return 'success'
      default: return 'default'
    }
  }

  const formatCurrency = (amount, currency = 'IDR') => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Grid container spacing={6}>
      {/* Breadcrumbs */}
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <NextLink href={`/${params.lang}/apps/assets/list`} passHref>
            <Link underline="hover" color="inherit">
              Assets
            </Link>
          </NextLink>
          <Typography color="text.primary">{asset.name}</Typography>
        </Breadcrumbs>
      </Grid>

      {/* Asset Header */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box className="flex justify-between items-start mb-4">
              <Box className="flex items-center gap-4">
                <Avatar
                  variant="rounded"
                  sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}
                >
                  <i className="ri-settings-3-line text-3xl" />
                </Avatar>
                <Box>
                  <Typography variant="h4" className="font-bold mb-2">
                    {asset.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" className="mb-2">
                    {asset.description}
                  </Typography>
                  <Box className="flex gap-2 mb-2">
                    <Chip 
                      label={asset.status} 
                      color={getStatusColor(asset.status)} 
                      size="small" 
                    />
                    <Chip 
                      label={asset.criticality} 
                      color={getCriticalityColor(asset.criticality)} 
                      size="small" 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Asset Code: <strong>{asset.assetCode}</strong> • Serial: <strong>{asset.serialNumber}</strong>
                  </Typography>
                </Box>
              </Box>
              <Box className="flex gap-2">
                <Button
                  variant="outlined"
                  startIcon={<i className="ri-arrow-left-line" />}
                  onClick={() => router.back()}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  startIcon={<i className="ri-edit-line" />}
                >
                  Edit Asset
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<i className="ri-qr-code-line" />}
                  onClick={() => setQrDialogOpen(true)}
                >
                  QR Code
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Asset Details Tabs */}
      <Grid item xs={12}>
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Overview" />
              <Tab label="Specifications" />
              <Tab label="Location" />
              <Tab label="Maintenance" />
              <Tab label="Financial" />
              <Tab label="Files" />
            </Tabs>
          </Box>

          {/* Overview Tab */}
          {activeTab === 0 && (
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className="mb-3">Basic Information</Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Asset Code</strong></TableCell>
                          <TableCell>{asset.assetCode}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Serial Number</strong></TableCell>
                          <TableCell>{asset.serialNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Manufacturer</strong></TableCell>
                          <TableCell>{asset.manufacturer}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Model</strong></TableCell>
                          <TableCell>{asset.model}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Category</strong></TableCell>
                          <TableCell>{asset.category.primary} - {asset.category.sub}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Classification</strong></TableCell>
                          <TableCell>{asset.category.classification}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className="mb-3">Status & Risk</Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell>
                            <Chip label={asset.status} color={getStatusColor(asset.status)} size="small" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Criticality</strong></TableCell>
                          <TableCell>
                            <Chip label={asset.criticality} color={getCriticalityColor(asset.criticality)} size="small" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Risk Level</strong></TableCell>
                          <TableCell>{asset.riskLevel}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Purchase Date</strong></TableCell>
                          <TableCell>{formatDate(asset.purchaseDate)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Warranty Expiry</strong></TableCell>
                          <TableCell>{formatDate(asset.warrantyExpiry)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </CardContent>
          )}

          {/* Specifications Tab */}
          {activeTab === 1 && (
            <CardContent>
              <Typography variant="h6" className="mb-3">Technical Specifications</Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Dimensions</strong></TableCell>
                          <TableCell>
                            {asset.specifications.dimensions.length} × {asset.specifications.dimensions.width} × {asset.specifications.dimensions.height} {asset.specifications.dimensions.unit}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Weight</strong></TableCell>
                          <TableCell>{asset.specifications.weight} {asset.specifications.weightUnit || 'kg'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Power Rating</strong></TableCell>
                          <TableCell>{asset.specifications.powerRating} {asset.specifications.powerUnit || 'kW'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Voltage</strong></TableCell>
                          <TableCell>{asset.specifications.voltage}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Frequency</strong></TableCell>
                          <TableCell>{asset.specifications.frequency}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Capacity</strong></TableCell>
                          <TableCell>{asset.specifications.capacity} {asset.specifications.capacityUnit || 'L/min'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Operating Temperature</strong></TableCell>
                          <TableCell>{asset.specifications.operatingTemp.min}°C - {asset.specifications.operatingTemp.max}°C</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Pressure</strong></TableCell>
                          <TableCell>{asset.specifications.pressure} {asset.specifications.pressureUnit || 'bar'}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </CardContent>
          )}

          {/* Location Tab */}
          {activeTab === 2 && (
            <CardContent>
              <Typography variant="h6" className="mb-3">Location Details</Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Facility</strong></TableCell>
                      <TableCell>{asset.location.facility}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Building</strong></TableCell>
                      <TableCell>{asset.location.building}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Floor</strong></TableCell>
                      <TableCell>{asset.location.floor}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Room</strong></TableCell>
                      <TableCell>{asset.location.room}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Zone</strong></TableCell>
                      <TableCell>{asset.location.zone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Responsible Person</strong></TableCell>
                      <TableCell>{asset.location.responsiblePerson}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Department</strong></TableCell>
                      <TableCell>{asset.location.department}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Coordinates</strong></TableCell>
                      <TableCell>{asset.location.coordinates?.latitude}, {asset.location.coordinates?.longitude}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          )}

          {/* Maintenance Tab */}
          {activeTab === 3 && (
            <CardContent>
              <Typography variant="h6" className="mb-3">Maintenance Information</Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Maintenance Type</strong></TableCell>
                      <TableCell>{asset.maintenance.type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Frequency</strong></TableCell>
                      <TableCell>{asset.maintenance.frequency}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Last Maintenance</strong></TableCell>
                      <TableCell>{formatDate(asset.maintenance.lastDate)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Next Maintenance</strong></TableCell>
                      <TableCell>{formatDate(asset.maintenance.nextDate)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Maintenance Team</strong></TableCell>
                      <TableCell>{asset.maintenance.team}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Estimated Cost</strong></TableCell>
                      <TableCell>{formatCurrency(asset.maintenance.estimatedCost)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          )}

          {/* Financial Tab */}
          {activeTab === 4 && asset.financial && (
            <CardContent>
              <Typography variant="h6" className="mb-3">Financial Information</Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Purchase Price</strong></TableCell>
                      <TableCell>{formatCurrency(asset.financial.purchasePrice, asset.financial.currency)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Purchase Date</strong></TableCell>
                      <TableCell>{formatDate(asset.financial.purchaseDate)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Supplier</strong></TableCell>
                      <TableCell>{asset.financial.supplier}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Depreciation Method</strong></TableCell>
                      <TableCell>{asset.financial.depreciationMethod}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Depreciation Rate</strong></TableCell>
                      <TableCell>{asset.financial.depreciationRate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Current Book Value</strong></TableCell>
                      <TableCell>{formatCurrency(asset.financial.bookValue, asset.financial.currency)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Salvage Value</strong></TableCell>
                      <TableCell>{formatCurrency(asset.financial.salvageValue, asset.financial.currency)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          )}

          {/* Files Tab */}
          {activeTab === 5 && asset.files && (
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className="mb-3">Documents</Typography>
                  <List>
                    {asset.files.documents?.map((file, index) => (
                      <ListItem key={index} divider>
                        <ListItemIcon>
                          <i className="ri-file-pdf-line text-red-500" />
                        </ListItemIcon>
                        <ListItemText
                          primary={file.name}
                          secondary={`${file.size} • ${file.type} • ${formatDate(file.uploadedAt)}`}
                        />
                        <IconButton size="small">
                          <i className="ri-download-line" />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className="mb-3">Images</Typography>
                  <List>
                    {asset.files.images?.map((file, index) => (
                      <ListItem key={index} divider>
                        <ListItemIcon>
                          <i className="ri-image-line text-blue-500" />
                        </ListItemIcon>
                        <ListItemText
                          primary={file.name}
                          secondary={`${file.size} • ${file.type} • ${formatDate(file.uploadedAt)}`}
                        />
                        <IconButton size="small">
                          <i className="ri-download-line" />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          )}
        </Card>
      </Grid>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onClose={() => setQrDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Asset QR Code</DialogTitle>
        <DialogContent>
          <Box className="flex flex-col items-center gap-4 p-4">
            <Box className="w-64 h-64 bg-gray-100 flex items-center justify-center border-2 border-dashed">
              <Typography variant="body2" color="text.secondary">
                QR Code for {asset.assetCode}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" className="text-center">
              Scan this QR code to quickly access asset details
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQrDialogOpen(false)}>Close</Button>
          <Button variant="contained">Download</Button>
          <Button variant="outlined">Print</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default AssetDetailView
