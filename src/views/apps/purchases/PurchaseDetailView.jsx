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
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

// Next Imports
import { useRouter, useParams } from 'next/navigation'

const PurchaseDetailView = ({ purchase }) => {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState(0)
  const [printDialogOpen, setPrintDialogOpen] = useState(false)

  if (!purchase) {
    return (
      <Box className="flex justify-center items-center min-h-96">
        <Typography variant="h6">Purchase not found</Typography>
      </Box>
    )
  }

  const formatCurrency = (amount, currency = 'IDR') => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getWarrantyStatus = (warrantyExpiry) => {
    const today = new Date()
    const expiry = new Date(warrantyExpiry)
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
    
    if (daysLeft < 0) {
      return { label: 'Expired', color: 'error', days: Math.abs(daysLeft) }
    } else if (daysLeft < 90) {
      return { label: 'Expiring Soon', color: 'warning', days: daysLeft }
    } else {
      return { label: 'Valid', color: 'success', days: daysLeft }
    }
  }

  const warrantyStatus = getWarrantyStatus(purchase.warranty_expiry)

  return (
    <Grid container spacing={6}>
      {/* Purchase Header */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box className="flex justify-between items-start mb-4">
              <Box className="flex items-center gap-4">
                <Avatar
                  variant="rounded"
                  sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}
                >
                  <i className="ri-shopping-cart-line text-3xl" />
                </Avatar>
                <Box>
                  <Typography variant="h4" className="font-bold mb-2">
                    {purchase.purchase_id}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" className="mb-2">
                    Purchase Order for {purchase.item_name}
                  </Typography>
                  <Box className="flex gap-2 mb-2">
                    <Chip 
                      label={formatDate(purchase.purchase_date)} 
                      color="primary" 
                      size="small" 
                      icon={<i className="ri-calendar-line" />}
                    />
                    <Chip 
                      label={warrantyStatus.label} 
                      color={warrantyStatus.color} 
                      size="small" 
                      icon={<i className="ri-shield-check-line" />}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Document: <strong>{purchase.document_ref}</strong>
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
                  variant="outlined"
                  startIcon={<i className="ri-edit-line" />}
                >
                  Edit Purchase
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<i className="ri-printer-line" />}
                  onClick={() => setPrintDialogOpen(true)}
                >
                  Print
                </Button>
              </Box>
            </Box>

            {/* Quick Stats */}
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="text-center p-4 border rounded-lg">
                  <Typography variant="h4" className="font-bold text-primary-main">
                    {formatCurrency(purchase.acquisition_value)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Value
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="text-center p-4 border rounded-lg">
                  <Typography variant="h4" className="font-bold text-success-main">
                    {purchase.qty} {purchase.uom}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="text-center p-4 border rounded-lg">
                  <Typography variant="h4" className="font-bold text-warning-main">
                    {warrantyStatus.days}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {warrantyStatus.days < 0 ? 'Days Overdue' : 'Days Left'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="text-center p-4 border rounded-lg">
                  <Typography variant="h4" className="font-bold text-info-main">
                    {formatCurrency(purchase.acquisition_value / purchase.qty)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Unit Cost
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Purchase Details Tabs */}
      <Grid item xs={12}>
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Overview" />
              <Tab label="Item Details" />
              <Tab label="Vendor Information" />
              <Tab label="Financial Details" />
              <Tab label="Documents" />
            </Tabs>
          </Box>

          {/* Overview Tab */}
          {activeTab === 0 && (
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className="mb-3">Purchase Information</Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Purchase ID</strong></TableCell>
                          <TableCell>{purchase.purchase_id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Purchase Date</strong></TableCell>
                          <TableCell>{formatDate(purchase.purchase_date)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Document Reference</strong></TableCell>
                          <TableCell>{purchase.document_ref}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Created Date</strong></TableCell>
                          <TableCell>{formatDate(purchase.createdAt)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Last Updated</strong></TableCell>
                          <TableCell>{formatDate(purchase.updatedAt)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className="mb-3">Warranty & Status</Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Warranty Expiry</strong></TableCell>
                          <TableCell>{formatDate(purchase.warranty_expiry)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Warranty Status</strong></TableCell>
                          <TableCell>
                            <Chip 
                              label={warrantyStatus.label} 
                              color={warrantyStatus.color} 
                              size="small" 
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Days Remaining</strong></TableCell>
                          <TableCell>
                            {warrantyStatus.days < 0 
                              ? `${Math.abs(warrantyStatus.days)} days overdue`
                              : `${warrantyStatus.days} days left`
                            }
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Purchase Status</strong></TableCell>
                          <TableCell>
                            <Chip label="Completed" color="success" size="small" />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              
              {purchase.notes && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" className="mb-3">Notes</Typography>
                  <Paper variant="outlined" sx={{ p: 3 }}>
                    <Typography variant="body2">
                      {purchase.notes}
                    </Typography>
                  </Paper>
                </Box>
              )}
            </CardContent>
          )}

          {/* Item Details Tab */}
          {activeTab === 1 && (
            <CardContent>
              <Typography variant="h6" className="mb-3">Item Information</Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Item ID</strong></TableCell>
                          <TableCell>{purchase.item_id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Item Name</strong></TableCell>
                          <TableCell>{purchase.item_name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Quantity Purchased</strong></TableCell>
                          <TableCell>{purchase.qty} {purchase.uom}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Unit of Measure</strong></TableCell>
                          <TableCell>
                            <Chip label={purchase.uom} size="small" variant="outlined" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Unit Cost</strong></TableCell>
                          <TableCell>{formatCurrency(purchase.acquisition_value / purchase.qty)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className="border rounded-lg p-4">
                    <Typography variant="subtitle1" className="mb-2">
                      <i className="ri-information-line mr-2" />
                      Item Summary
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This purchase record tracks the acquisition of {purchase.item_name} 
                      with a total quantity of {purchase.qty} {purchase.uom} at a unit cost of {formatCurrency(purchase.acquisition_value / purchase.qty)}.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          )}

          {/* Vendor Information Tab */}
          {activeTab === 2 && (
            <CardContent>
              <Typography variant="h6" className="mb-3">Vendor Details</Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Vendor ID</strong></TableCell>
                          <TableCell>{purchase.vendor_id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Vendor Name</strong></TableCell>
                          <TableCell>{purchase.vendor_name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Contact Person</strong></TableCell>
                          <TableCell>{purchase.vendor_contact}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Vendor Rating</strong></TableCell>
                          <TableCell>
                            <Box className="flex items-center gap-1">
                              {[1,2,3,4,5].map((star) => (
                                <i key={star} className="ri-star-fill text-yellow-400" />
                              ))}
                              <Typography variant="caption" className="ml-1">
                                (5.0)
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className="border rounded-lg p-4">
                    <Typography variant="subtitle1" className="mb-2">
                      <i className="ri-building-line mr-2" />
                      Vendor Performance
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <i className="ri-check-line text-green-500" />
                        </ListItemIcon>
                        <ListItemText primary="On-time delivery: 98%" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <i className="ri-check-line text-green-500" />
                        </ListItemIcon>
                        <ListItemText primary="Quality rating: Excellent" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <i className="ri-check-line text-green-500" />
                        </ListItemIcon>
                        <ListItemText primary="Payment terms: Flexible" />
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          )}

          {/* Financial Details Tab */}
          {activeTab === 3 && (
            <CardContent>
              <Typography variant="h6" className="mb-3">Financial Breakdown</Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Unit Price</strong></TableCell>
                          <TableCell>{formatCurrency(purchase.acquisition_value / purchase.qty)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Quantity</strong></TableCell>
                          <TableCell>{purchase.qty} {purchase.uom}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Subtotal</strong></TableCell>
                          <TableCell>{formatCurrency(purchase.acquisition_value)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Tax (11%)</strong></TableCell>
                          <TableCell>{formatCurrency(purchase.acquisition_value * 0.11)}</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderTop: 2 }}>
                          <TableCell><strong>Total Amount</strong></TableCell>
                          <TableCell><strong>{formatCurrency(purchase.acquisition_value * 1.11)}</strong></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className="border rounded-lg p-4">
                    <Typography variant="subtitle1" className="mb-2">
                      <i className="ri-money-dollar-circle-line mr-2" />
                      Payment Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="Payment Method" 
                          secondary="Bank Transfer" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Payment Terms" 
                          secondary="Net 30 days" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Payment Status" 
                          secondary={
                            <Chip label="Paid" color="success" size="small" />
                          }
                        />
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          )}

          {/* Documents Tab */}
          {activeTab === 4 && (
            <CardContent>
              <Typography variant="h6" className="mb-3">Related Documents</Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" className="mb-2">Purchase Documents</Typography>
                  <List>
                    <ListItem divider>
                      <ListItemIcon>
                        <i className="ri-file-pdf-line text-red-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Purchase Order"
                        secondary={`${purchase.document_ref}.pdf • 245 KB`}
                      />
                      <IconButton size="small">
                        <i className="ri-download-line" />
                      </IconButton>
                    </ListItem>
                    <ListItem divider>
                      <ListItemIcon>
                        <i className="ri-file-pdf-line text-red-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Invoice"
                        secondary={`INV-${purchase.purchase_id}.pdf • 189 KB`}
                      />
                      <IconButton size="small">
                        <i className="ri-download-line" />
                      </IconButton>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <i className="ri-file-pdf-line text-red-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Delivery Receipt"
                        secondary={`DR-${purchase.purchase_id}.pdf • 156 KB`}
                      />
                      <IconButton size="small">
                        <i className="ri-download-line" />
                      </IconButton>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" className="mb-2">Warranty Documents</Typography>
                  <List>
                    <ListItem divider>
                      <ListItemIcon>
                        <i className="ri-file-pdf-line text-blue-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Warranty Certificate"
                        secondary={`WC-${purchase.purchase_id}.pdf • 298 KB`}
                      />
                      <IconButton size="small">
                        <i className="ri-download-line" />
                      </IconButton>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <i className="ri-file-pdf-line text-blue-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="User Manual"
                        secondary={`UM-${purchase.item_id}.pdf • 1.2 MB`}
                      />
                      <IconButton size="small">
                        <i className="ri-download-line" />
                      </IconButton>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          )}
        </Card>
      </Grid>

      {/* Print Dialog */}
      <Dialog open={printDialogOpen} onClose={() => setPrintDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Print Purchase Details</DialogTitle>
        <DialogContent>
          <Box className="flex flex-col items-center gap-4 p-4">
            <i className="ri-printer-line text-6xl text-gray-400" />
            <Typography variant="body1" className="text-center">
              Print purchase details for {purchase.purchase_id}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="text-center">
              This will generate a comprehensive purchase report including all financial and vendor details.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPrintDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<i className="ri-printer-line" />}>
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default PurchaseDetailView
