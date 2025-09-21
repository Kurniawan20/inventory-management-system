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
import LinearProgress from '@mui/material/LinearProgress'
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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Badge from '@mui/material/Badge'

// Sample data for loading/unloading operations
const initialOperations = {
  loading: [
    {
      id: 'LOAD-001',
      type: 'Truck Loading',
      status: 'in-progress',
      vehicle: 'Tanker Truck B-9012 CD',
      product: 'Gasoline RON 92',
      quantity: '16,000',
      unit: 'liters',
      bay: 'Loading Bay 3',
      startTime: '2025-09-22T09:30:00',
      estimatedEndTime: '2025-09-22T11:00:00',
      progress: 45,
      operator: {
        id: 'user-007',
        name: 'Gunawan Wibowo',
        avatar: '/images/avatars/7.png'
      },
      customer: 'PT Mitra Energi',
      orderNumber: 'SO-20250922-001',
      notes: 'Regular scheduled delivery'
    },
    {
      id: 'LOAD-002',
      type: 'Rail Car Loading',
      status: 'pending',
      vehicle: 'Rail Car RC-5678',
      product: 'Diesel Fuel',
      quantity: '45,000',
      unit: 'liters',
      bay: 'Rail Terminal 2',
      startTime: '2025-09-22T13:00:00',
      estimatedEndTime: '2025-09-22T16:00:00',
      progress: 0,
      operator: {
        id: 'user-008',
        name: 'Hadi Santoso',
        avatar: '/images/avatars/8.png'
      },
      customer: 'PT Kereta Logistik',
      orderNumber: 'SO-20250922-005',
      notes: 'Ensure proper grounding before loading'
    },
    {
      id: 'LOAD-003',
      type: 'Truck Loading',
      status: 'completed',
      vehicle: 'Tanker Truck B-8765 EF',
      product: 'Diesel Fuel',
      quantity: '18,500',
      unit: 'liters',
      bay: 'Loading Bay 1',
      startTime: '2025-09-22T07:00:00',
      estimatedEndTime: '2025-09-22T08:30:00',
      actualEndTime: '2025-09-22T08:15:00',
      progress: 100,
      operator: {
        id: 'user-009',
        name: 'Indah Permata',
        avatar: '/images/avatars/9.png'
      },
      customer: 'PT Transportasi Andalan',
      orderNumber: 'SO-20250922-002',
      notes: 'Completed ahead of schedule'
    }
  ],
  unloading: [
    {
      id: 'UNLOAD-001',
      type: 'Marine Vessel Unloading',
      status: 'in-progress',
      vehicle: 'Tanker Ship MT Pertiwi',
      product: 'Crude Oil',
      quantity: '850,000',
      unit: 'barrels',
      bay: 'Jetty 2',
      startTime: '2025-09-21T20:00:00',
      estimatedEndTime: '2025-09-22T18:00:00',
      progress: 65,
      operator: {
        id: 'user-001',
        name: 'Ahmad Suryanto',
        avatar: '/images/avatars/1.png'
      },
      supplier: 'Saudi Aramco',
      shipmentNumber: 'IMP-20250921-001',
      notes: 'Major crude oil shipment for refinery'
    },
    {
      id: 'UNLOAD-002',
      type: 'Truck Unloading',
      status: 'pending',
      vehicle: 'Chemical Truck B-4567 GH',
      product: 'Methanol',
      quantity: '12,000',
      unit: 'liters',
      bay: 'Chemical Unloading Area 2',
      startTime: '2025-09-22T14:00:00',
      estimatedEndTime: '2025-09-22T15:30:00',
      progress: 0,
      operator: {
        id: 'user-002',
        name: 'Budi Santoso',
        avatar: '/images/avatars/2.png'
      },
      supplier: 'PT Kimia Nusantara',
      shipmentNumber: 'IMP-20250922-003',
      notes: 'Hazardous material - special handling required'
    },
    {
      id: 'UNLOAD-003',
      type: 'Truck Unloading',
      status: 'completed',
      vehicle: 'Tanker Truck B-7890 IJ',
      product: 'Base Oil',
      quantity: '15,000',
      unit: 'liters',
      bay: 'Unloading Bay 4',
      startTime: '2025-09-22T08:00:00',
      estimatedEndTime: '2025-09-22T09:30:00',
      actualEndTime: '2025-09-22T09:45:00',
      progress: 100,
      operator: {
        id: 'user-003',
        name: 'Citra Dewi',
        avatar: '/images/avatars/3.png'
      },
      supplier: 'PT Lubricant Supply',
      shipmentNumber: 'IMP-20250922-002',
      notes: 'Quality check completed and approved'
    }
  ]
}

const LoadingUnloading = () => {
  const router = useRouter()
  const [operations, setOperations] = useState(initialOperations)
  const [activeTab, setActiveTab] = useState('loading')
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedOperation, setSelectedOperation] = useState(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }
  
  const handleOpenDetailsDialog = (operation) => {
    setSelectedOperation(operation)
    setDetailsDialogOpen(true)
  }
  
  const handleCloseDetailsDialog = () => {
    setDetailsDialogOpen(false)
  }
  
  const handleOpenEditDialog = () => {
    setEditDialogOpen(true)
    setDetailsDialogOpen(false)
  }
  
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false)
  }
  
  const handleStatusChange = (operationType, id, newStatus) => {
    setOperations(prev => {
      const updatedOperations = { ...prev }
      
      updatedOperations[operationType] = prev[operationType].map(op => {
        if (op.id === id) {
          const updatedOp = { ...op, status: newStatus }
          
          // Update progress based on status
          if (newStatus === 'completed') {
            updatedOp.progress = 100
            updatedOp.actualEndTime = new Date().toISOString()
          } else if (newStatus === 'in-progress' && op.status === 'pending') {
            updatedOp.progress = 5
          }
          
          return updatedOp
        }
        return op
      })
      
      return updatedOperations
    })
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
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const getOperationTypeIcon = (type) => {
    if (type.includes('Truck')) {
      return 'ri-truck-line'
    } else if (type.includes('Rail')) {
      return 'ri-train-line'
    } else if (type.includes('Marine') || type.includes('Ship')) {
      return 'ri-ship-line'
    } else {
      return 'ri-gas-station-line'
    }
  }
  
  const renderOperationTable = (operationType) => {
    const data = operations[operationType]
    
    return (
      <TableContainer component={Paper} variant="outlined">
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Vehicle/Vessel</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(operation => (
              <TableRow key={operation.id} hover>
                <TableCell>{operation.id}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <i className={getOperationTypeIcon(operation.type)} />
                    {operation.type}
                  </Box>
                </TableCell>
                <TableCell>{operation.vehicle}</TableCell>
                <TableCell>{operation.product}</TableCell>
                <TableCell>{operation.quantity} {operation.unit}</TableCell>
                <TableCell>{operation.bay}</TableCell>
                <TableCell>
                  {formatDate(operation.startTime)}
                  {operation.status === 'completed' && operation.actualEndTime && (
                    <Typography variant="caption" display="block" color="text.secondary">
                      to {formatDate(operation.actualEndTime)}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={operation.status.replace('-', ' ')} 
                    color={getStatusColor(operation.status)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={operation.progress} 
                      sx={{ width: 60, height: 6, borderRadius: 1 }}
                      color={
                        operation.progress === 100 ? 'success' : 
                        operation.progress > 50 ? 'primary' : 
                        'warning'
                      }
                    />
                    <Typography variant="caption">{operation.progress}%</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title="View Details">
                      <IconButton size="small" onClick={() => handleOpenDetailsDialog(operation)}>
                        <i className="ri-eye-line" />
                      </IconButton>
                    </Tooltip>
                    
                    {operation.status === 'pending' && (
                      <Tooltip title="Start Operation">
                        <IconButton 
                          size="small" 
                          color="warning"
                          onClick={() => handleStatusChange(operationType, operation.id, 'in-progress')}
                        >
                          <i className="ri-play-line" />
                        </IconButton>
                      </Tooltip>
                    )}
                    
                    {operation.status === 'in-progress' && (
                      <Tooltip title="Complete Operation">
                        <IconButton 
                          size="small" 
                          color="success"
                          onClick={() => handleStatusChange(operationType, operation.id, 'completed')}
                        >
                          <i className="ri-check-line" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab 
              value="loading" 
              label="Loading Operations" 
              icon={<i className="ri-upload-2-line" />} 
              iconPosition="start"
              sx={{ '& .MuiTab-iconWrapper': { mr: 1 } }}
            />
            <Tab 
              value="unloading" 
              label="Unloading Operations" 
              icon={<i className="ri-download-2-line" />} 
              iconPosition="start"
              sx={{ '& .MuiTab-iconWrapper': { mr: 1 } }}
            />
          </Tabs>
          
          <Button 
            variant="contained" 
            startIcon={<i className="ri-add-line" />}
            onClick={() => router.push('/en/apps/warehouse/operations/create-loading')}
          >
            New {activeTab === 'loading' ? 'Loading' : 'Unloading'} Operation
          </Button>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography color="text.secondary" variant="body2">Total Operations</Typography>
                      <Typography variant="h5">
                        {operations.loading.length + operations.unloading.length}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <i className="ri-gas-station-line" />
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
                        {operations.loading.filter(op => op.status === 'in-progress').length + 
                         operations.unloading.filter(op => op.status === 'in-progress').length}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                      <i className="ri-time-line" />
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
                        {operations.loading.filter(op => op.status === 'completed').length + 
                         operations.unloading.filter(op => op.status === 'completed').length}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <i className="ri-check-line" />
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
                        {operations.loading.filter(op => op.status === 'pending').length + 
                         operations.unloading.filter(op => op.status === 'pending').length}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <i className="ri-hourglass-line" />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        
        {activeTab === 'loading' && renderOperationTable('loading')}
        {activeTab === 'unloading' && renderOperationTable('unloading')}
      </Box>
      
      {/* Operation Details Dialog */}
      <Dialog open={detailsDialogOpen} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
        {selectedOperation && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  {selectedOperation.type} Details
                </Typography>
                <Chip 
                  label={selectedOperation.status.replace('-', ' ')} 
                  color={getStatusColor(selectedOperation.status)} 
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" gutterBottom>Operation Information</Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ width: '30%' }}>Operation ID</TableCell>
                          <TableCell>{selectedOperation.id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Type</TableCell>
                          <TableCell>{selectedOperation.type}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Vehicle/Vessel</TableCell>
                          <TableCell>{selectedOperation.vehicle}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>{selectedOperation.product}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Quantity</TableCell>
                          <TableCell>{selectedOperation.quantity} {selectedOperation.unit}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Location</TableCell>
                          <TableCell>{selectedOperation.bay}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Start Time</TableCell>
                          <TableCell>{formatDate(selectedOperation.startTime)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Estimated End Time</TableCell>
                          <TableCell>{formatDate(selectedOperation.estimatedEndTime)}</TableCell>
                        </TableRow>
                        {selectedOperation.actualEndTime && (
                          <TableRow>
                            <TableCell>Actual End Time</TableCell>
                            <TableCell>{formatDate(selectedOperation.actualEndTime)}</TableCell>
                          </TableRow>
                        )}
                        <TableRow>
                          <TableCell>
                            {selectedOperation.id.startsWith('LOAD') ? 'Customer' : 'Supplier'}
                          </TableCell>
                          <TableCell>
                            {selectedOperation.id.startsWith('LOAD') ? selectedOperation.customer : selectedOperation.supplier}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            {selectedOperation.id.startsWith('LOAD') ? 'Order Number' : 'Shipment Number'}
                          </TableCell>
                          <TableCell>
                            {selectedOperation.id.startsWith('LOAD') ? selectedOperation.orderNumber : selectedOperation.shipmentNumber}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Typography variant="subtitle1" gutterBottom>Notes</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Typography variant="body2">
                      {selectedOperation.notes || 'No notes available'}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>Progress</Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{selectedOperation.progress}% Complete</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={selectedOperation.progress} 
                        color={
                          selectedOperation.progress === 100 ? 'success' : 
                          selectedOperation.progress > 50 ? 'primary' : 
                          'warning'
                        }
                        sx={{ height: 8, borderRadius: 1 }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Status</Typography>
                      <Chip 
                        label={selectedOperation.status.replace('-', ' ')} 
                        color={getStatusColor(selectedOperation.status)} 
                        size="small" 
                      />
                    </Box>
                  </Paper>
                  
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Operator</Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar src={selectedOperation.operator.avatar} alt={selectedOperation.operator.name} />
                      <Box>
                        <Typography variant="body2">{selectedOperation.operator.name}</Typography>
                        <Typography variant="caption" color="text.secondary">Assigned Operator</Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailsDialog}>Close</Button>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<i className="ri-edit-line" />}
                onClick={handleOpenEditDialog}
              >
                Edit Operation
              </Button>
              {selectedOperation.status !== 'completed' && (
                <Button 
                  variant="contained" 
                  color="success" 
                  startIcon={<i className="ri-check-line" />}
                  onClick={() => {
                    const operationType = selectedOperation.id.startsWith('LOAD') ? 'loading' : 'unloading'
                    handleStatusChange(operationType, selectedOperation.id, 'completed')
                    handleCloseDetailsDialog()
                  }}
                >
                  Mark as Complete
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Edit Operation Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        {selectedOperation && (
          <>
            <DialogTitle>Edit {selectedOperation.type}</DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 0 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Operation ID"
                    fullWidth
                    defaultValue={selectedOperation.id}
                    InputProps={{ readOnly: true }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      label="Status"
                      defaultValue={selectedOperation.status}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Type"
                    fullWidth
                    defaultValue={selectedOperation.type}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Vehicle/Vessel"
                    fullWidth
                    defaultValue={selectedOperation.vehicle}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Product"
                    fullWidth
                    defaultValue={selectedOperation.product}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Quantity"
                    fullWidth
                    defaultValue={selectedOperation.quantity}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Unit"
                    fullWidth
                    defaultValue={selectedOperation.unit}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Location"
                    fullWidth
                    defaultValue={selectedOperation.bay}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Start Time"
                    type="datetime-local"
                    fullWidth
                    defaultValue={selectedOperation.startTime.slice(0, 16)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Estimated End Time"
                    type="datetime-local"
                    fullWidth
                    defaultValue={selectedOperation.estimatedEndTime.slice(0, 16)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label={selectedOperation.id.startsWith('LOAD') ? 'Customer' : 'Supplier'}
                    fullWidth
                    defaultValue={selectedOperation.id.startsWith('LOAD') ? selectedOperation.customer : selectedOperation.supplier}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label={selectedOperation.id.startsWith('LOAD') ? 'Order Number' : 'Shipment Number'}
                    fullWidth
                    defaultValue={selectedOperation.id.startsWith('LOAD') ? selectedOperation.orderNumber : selectedOperation.shipmentNumber}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Notes"
                    fullWidth
                    multiline
                    rows={3}
                    defaultValue={selectedOperation.notes}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog}>Cancel</Button>
              <Button variant="contained" onClick={handleCloseEditDialog}>Save Changes</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  )
}

export default LoadingUnloading
