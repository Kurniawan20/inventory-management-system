'use client'

// React Imports
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Badge from '@mui/material/Badge'
import LinearProgress from '@mui/material/LinearProgress'

// Sample data for sales orders
const initialOrders = [
  {
    id: 'SO-20250922-001',
    customer: 'PT Mitra Energi',
    date: '2025-09-22T08:30:00',
    status: 'in-progress',
    type: 'External',
    products: [
      { name: 'Gasoline RON 92', quantity: '16,000', unit: 'liters' }
    ],
    deliveryMethod: 'Truck',
    deliveryLocation: 'Customer Site - Jakarta',
    scheduledDelivery: '2025-09-22T11:00:00',
    paymentStatus: 'Paid',
    warehouseTask: 'LOAD-001',
    progress: 45,
    priority: 'medium',
    notes: 'Regular scheduled delivery'
  },
  {
    id: 'SO-20250922-002',
    customer: 'PT Transportasi Andalan',
    date: '2025-09-22T06:15:00',
    status: 'completed',
    type: 'External',
    products: [
      { name: 'Diesel Fuel', quantity: '18,500', unit: 'liters' }
    ],
    deliveryMethod: 'Truck',
    deliveryLocation: 'Customer Site - Bekasi',
    scheduledDelivery: '2025-09-22T08:30:00',
    actualDelivery: '2025-09-22T08:15:00',
    paymentStatus: 'Paid',
    warehouseTask: 'LOAD-003',
    progress: 100,
    priority: 'medium',
    notes: 'Completed ahead of schedule'
  },
  {
    id: 'SO-20250922-003',
    customer: 'Pertamina Refinery Dumai',
    date: '2025-09-22T07:45:00',
    status: 'pending',
    type: 'Internal',
    products: [
      { name: 'Lubricant Base Oil', quantity: '5,000', unit: 'liters' },
      { name: 'Additives Package A', quantity: '250', unit: 'kg' }
    ],
    deliveryMethod: 'Internal Transfer',
    deliveryLocation: 'Lubricant Plant - Dumai',
    scheduledDelivery: '2025-09-23T10:00:00',
    paymentStatus: 'Internal',
    warehouseTask: null,
    progress: 0,
    priority: 'low',
    notes: 'Internal transfer for lubricant production'
  },
  {
    id: 'SO-20250922-004',
    customer: 'PT Industri Kimia Nusantara',
    date: '2025-09-22T09:00:00',
    status: 'pending',
    type: 'External',
    products: [
      { name: 'Industrial Solvent', quantity: '8,000', unit: 'liters' },
      { name: 'Specialty Chemicals', quantity: '1,200', unit: 'kg' }
    ],
    deliveryMethod: 'Truck',
    deliveryLocation: 'Customer Site - Cikarang',
    scheduledDelivery: '2025-09-22T15:00:00',
    paymentStatus: 'Pending',
    warehouseTask: null,
    progress: 0,
    priority: 'high',
    notes: 'Priority customer, ensure timely delivery'
  },
  {
    id: 'SO-20250922-005',
    customer: 'PT Kereta Logistik',
    date: '2025-09-22T10:30:00',
    status: 'in-progress',
    type: 'External',
    products: [
      { name: 'Diesel Fuel', quantity: '45,000', unit: 'liters' }
    ],
    deliveryMethod: 'Rail',
    deliveryLocation: 'Rail Terminal - Bandung',
    scheduledDelivery: '2025-09-22T16:00:00',
    paymentStatus: 'Paid',
    warehouseTask: 'LOAD-002',
    progress: 0,
    priority: 'medium',
    notes: 'Rail car loading scheduled for 13:00'
  }
]

const SalesOrderIntegration = () => {
  const router = useRouter()
  const [orders, setOrders] = useState(initialOrders)
  const [activeTab, setActiveTab] = useState('all')
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }
  
  const handleOpenDetailsDialog = (order) => {
    setSelectedOrder(order)
    setDetailsDialogOpen(true)
  }
  
  const handleCloseDetailsDialog = () => {
    setDetailsDialogOpen(false)
  }
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'default'
      case 'in-progress':
        return 'warning'
      case 'completed':
        return 'success'
      default:
        return 'default'
    }
  }
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'info'
      case 'medium':
        return 'warning'
      case 'high':
        return 'error'
      default:
        return 'default'
    }
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const filteredOrders = orders.filter(order => {
    // Filter by tab
    if (activeTab !== 'all' && order.status !== activeTab) {
      return false
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.products.some(product => product.name.toLowerCase().includes(query))
      )
    }
    
    return true
  })
  
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab 
              value="all" 
              label="All Orders" 
              icon={<i className="ri-file-list-3-line" />} 
              iconPosition="start"
              sx={{ '& .MuiTab-iconWrapper': { mr: 1 } }}
            />
            <Tab 
              value="pending" 
              label="Pending" 
              icon={<i className="ri-time-line" />} 
              iconPosition="start"
              sx={{ '& .MuiTab-iconWrapper': { mr: 1 } }}
            />
            <Tab 
              value="in-progress" 
              label="In Progress" 
              icon={<i className="ri-loader-4-line" />} 
              iconPosition="start"
              sx={{ '& .MuiTab-iconWrapper': { mr: 1 } }}
            />
            <Tab 
              value="completed" 
              label="Completed" 
              icon={<i className="ri-check-double-line" />} 
              iconPosition="start"
              sx={{ '& .MuiTab-iconWrapper': { mr: 1 } }}
            />
          </Tabs>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              placeholder="Search orders..."
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="ri-search-line" />
                  </InputAdornment>
                )
              }}
            />
            
            <Button 
              variant="contained" 
              startIcon={<i className="ri-add-line" />}
              onClick={() => router.push('/en/apps/warehouse/operations/create-order')}
            >
              New Order
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography color="text.secondary" variant="body2">Total Orders</Typography>
                      <Typography variant="h5">{orders.length}</Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <i className="ri-file-list-3-line" />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography color="text.secondary" variant="body2">In Progress</Typography>
                      <Typography variant="h5">
                        {orders.filter(order => order.status === 'in-progress').length}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                      <i className="ri-loader-4-line" />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography color="text.secondary" variant="body2">Completed Today</Typography>
                      <Typography variant="h5">
                        {orders.filter(order => order.status === 'completed').length}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <i className="ri-check-double-line" />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography color="text.secondary" variant="body2">Pending</Typography>
                      <Typography variant="h5">
                        {orders.filter(order => order.status === 'pending').length}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <i className="ri-time-line" />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Products</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Warehouse Task</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map(order => (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2" fontWeight={500}>{order.id}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(order.date)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2">{order.customer}</Typography>
                      <Chip 
                        label={order.type} 
                        size="small" 
                        color={order.type === 'Internal' ? 'info' : 'default'}
                        variant="outlined"
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    {order.products.map((product, index) => (
                      <Typography key={index} variant="body2">
                        {product.quantity} {product.unit} {product.name}
                        {index < order.products.length - 1 && <Divider sx={{ my: 0.5 }} />}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2">{order.deliveryMethod}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(order.scheduledDelivery)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Chip 
                        label={order.status.replace('-', ' ')} 
                        color={getStatusColor(order.status)} 
                        size="small" 
                      />
                      <Chip 
                        label={order.priority} 
                        color={getPriorityColor(order.priority)} 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={order.progress} 
                        sx={{ width: 60, height: 6, borderRadius: 1 }}
                        color={
                          order.progress === 100 ? 'success' : 
                          order.progress > 50 ? 'primary' : 
                          'warning'
                        }
                      />
                      <Typography variant="caption">{order.progress}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {order.warehouseTask ? (
                      <Chip 
                        label={order.warehouseTask} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">Not assigned</Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Tooltip title="View Details">
                        <IconButton size="small" onClick={() => handleOpenDetailsDialog(order)}>
                          <i className="ri-eye-line" />
                        </IconButton>
                      </Tooltip>
                      
                      {order.status === 'pending' && !order.warehouseTask && (
                        <Tooltip title="Create Warehouse Task">
                          <IconButton size="small" color="primary">
                            <i className="ri-add-line" />
                          </IconButton>
                        </Tooltip>
                      )}
                      
                      <Tooltip title="Print Order">
                        <IconButton size="small">
                          <i className="ri-printer-line" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
      {/* Order Details Dialog */}
      <Dialog open={detailsDialogOpen} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
        {selectedOrder && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Order Details: {selectedOrder.id}</Typography>
                <Chip 
                  label={selectedOrder.status.replace('-', ' ')} 
                  color={getStatusColor(selectedOrder.status)} 
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" gutterBottom>Order Information</Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ width: '30%' }}>Order ID</TableCell>
                          <TableCell>{selectedOrder.id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>{formatDate(selectedOrder.date)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Customer</TableCell>
                          <TableCell>{selectedOrder.customer}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Type</TableCell>
                          <TableCell>
                            <Chip 
                              label={selectedOrder.type} 
                              size="small" 
                              color={selectedOrder.type === 'Internal' ? 'info' : 'default'}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Delivery Method</TableCell>
                          <TableCell>{selectedOrder.deliveryMethod}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Delivery Location</TableCell>
                          <TableCell>{selectedOrder.deliveryLocation}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Scheduled Delivery</TableCell>
                          <TableCell>{formatDate(selectedOrder.scheduledDelivery)}</TableCell>
                        </TableRow>
                        {selectedOrder.actualDelivery && (
                          <TableRow>
                            <TableCell>Actual Delivery</TableCell>
                            <TableCell>{formatDate(selectedOrder.actualDelivery)}</TableCell>
                          </TableRow>
                        )}
                        <TableRow>
                          <TableCell>Payment Status</TableCell>
                          <TableCell>
                            <Chip 
                              label={selectedOrder.paymentStatus} 
                              size="small" 
                              color={
                                selectedOrder.paymentStatus === 'Paid' ? 'success' : 
                                selectedOrder.paymentStatus === 'Pending' ? 'warning' : 
                                'default'
                              }
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Warehouse Task</TableCell>
                          <TableCell>
                            {selectedOrder.warehouseTask ? (
                              <Chip 
                                label={selectedOrder.warehouseTask} 
                                size="small" 
                                color="primary"
                              />
                            ) : (
                              'Not assigned'
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Typography variant="subtitle1" gutterBottom>Products</Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Unit</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.products.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{product.unit}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Typography variant="subtitle1" gutterBottom>Notes</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Typography variant="body2">
                      {selectedOrder.notes || 'No notes available'}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>Order Status</Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Progress</Typography>
                        <Typography variant="body2">{selectedOrder.progress}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={selectedOrder.progress} 
                        color={
                          selectedOrder.progress === 100 ? 'success' : 
                          selectedOrder.progress > 50 ? 'primary' : 
                          'warning'
                        }
                        sx={{ height: 8, borderRadius: 1 }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Status</Typography>
                      <Chip 
                        label={selectedOrder.status.replace('-', ' ')} 
                        color={getStatusColor(selectedOrder.status)} 
                        size="small" 
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Priority</Typography>
                      <Chip 
                        label={selectedOrder.priority} 
                        color={getPriorityColor(selectedOrder.priority)} 
                        size="small" 
                      />
                    </Box>
                  </Paper>
                  
                  <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                    {!selectedOrder.warehouseTask && selectedOrder.status !== 'completed' && (
                      <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<i className="ri-add-line" />}
                        fullWidth
                      >
                        Create Warehouse Task
                      </Button>
                    )}
                    
                    <Button 
                      variant="outlined" 
                      startIcon={<i className="ri-printer-line" />}
                      fullWidth
                    >
                      Print Order
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      color="secondary"
                      startIcon={<i className="ri-file-copy-line" />}
                      fullWidth
                    >
                      Duplicate Order
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailsDialog}>Close</Button>
              <Button variant="outlined" color="primary" startIcon={<i className="ri-edit-line" />}>
                Edit Order
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  )
}

export default SalesOrderIntegration
