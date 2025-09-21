'use client'

// React Imports
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import FormHelperText from '@mui/material/FormHelperText'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import InputAdornment from '@mui/material/InputAdornment'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

const CreateLoadingOperationPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: 'Truck Loading',
    status: 'pending',
    vehicle: '',
    product: '',
    quantity: '',
    unit: 'liters',
    bay: '',
    startTime: '',
    estimatedEndTime: '',
    customer: '',
    orderNumber: '',
    notes: '',
    operator: null,
    isInternal: false
  })
  
  const [errors, setErrors] = useState({})
  
  // Sample data for operators
  const availableOperators = [
    { id: 'user-001', name: 'Ahmad Suryanto', avatar: '/images/avatars/1.png', role: 'Supervisor', department: 'Operations' },
    { id: 'user-002', name: 'Budi Santoso', avatar: '/images/avatars/2.png', role: 'Operator', department: 'Operations' },
    { id: 'user-003', name: 'Citra Dewi', avatar: '/images/avatars/3.png', role: 'Operator', department: 'Operations' },
    { id: 'user-007', name: 'Gunawan Wibowo', avatar: '/images/avatars/7.png', role: 'Loading Operator', department: 'Logistics' },
    { id: 'user-008', name: 'Hadi Santoso', avatar: '/images/avatars/8.png', role: 'Assistant', department: 'Logistics' }
  ]
  
  // Sample data for loading types
  const loadingTypes = [
    'Truck Loading',
    'Rail Car Loading',
    'Container Loading',
    'Drum Filling',
    'IBC Filling',
    'Tanker Ship Loading'
  ]
  
  // Sample data for products
  const availableProducts = [
    'Gasoline RON 92',
    'Gasoline RON 95',
    'Gasoline RON 98',
    'Diesel Fuel',
    'Jet Fuel',
    'Kerosene',
    'Lubricant Base Oil',
    'Industrial Solvent',
    'Specialty Chemicals',
    'Methanol',
    'Ethanol'
  ]
  
  // Sample data for units
  const availableUnits = [
    'liters',
    'gallons',
    'barrels',
    'cubic meters',
    'metric tons',
    'kilograms'
  ]
  
  // Sample data for loading bays
  const availableLoadingBays = [
    'Loading Bay 1',
    'Loading Bay 2',
    'Loading Bay 3',
    'Loading Bay 4',
    'Rail Terminal 1',
    'Rail Terminal 2',
    'Marine Terminal 1',
    'Drum Filling Station',
    'IBC Filling Area'
  ]
  
  // Sample data for customers
  const availableCustomers = [
    'PT Mitra Energi',
    'PT Transportasi Andalan',
    'PT Industri Kimia Nusantara',
    'PT Kereta Logistik',
    'Pertamina Refinery Dumai',
    'PT Logistik Nusantara',
    'PT Energi Persada',
    'PT Distribusi Bahan Bakar',
    'PT Transportasi Energi Indonesia'
  ]
  
  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    })
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      })
    }
  }
  
  const handleAutocompleteChange = (field) => (event, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      })
    }
  }
  
  const handleSwitchChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.checked
    })
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.type) {
      newErrors.type = 'Loading type is required'
    }
    
    if (!formData.vehicle) {
      newErrors.vehicle = 'Vehicle/vessel information is required'
    }
    
    if (!formData.product) {
      newErrors.product = 'Product is required'
    }
    
    if (!formData.quantity || isNaN(formData.quantity)) {
      newErrors.quantity = 'Valid quantity is required'
    }
    
    if (!formData.bay) {
      newErrors.bay = 'Loading bay/location is required'
    }
    
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required'
    }
    
    if (!formData.estimatedEndTime) {
      newErrors.estimatedEndTime = 'Estimated end time is required'
    }
    
    if (!formData.customer) {
      newErrors.customer = formData.isInternal ? 'Internal department is required' : 'Customer is required'
    }
    
    if (!formData.operator) {
      newErrors.operator = 'Operator assignment is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate an operation ID
      const operationId = `LOAD-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
      
      // Simulate successful operation creation
      console.log('Loading operation created:', { id: operationId, ...formData })
      
      // Navigate back to the operations page
      router.push('/en/apps/warehouse/operations')
    } catch (error) {
      console.error('Error creating loading operation:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleCancel = () => {
    router.back()
  }
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/en/dashboards/warehouse" underline="hover" color="inherit">
              Warehouse
            </Link>
            <Link href="/en/apps/warehouse/operations" underline="hover" color="inherit">
              Operations
            </Link>
            <Typography color="text.primary">New Loading Operation</Typography>
          </Breadcrumbs>
          
          <Typography variant="h4" sx={{ mt: 2 }}>
            Create New Loading Operation
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Schedule a new product loading operation
          </Typography>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title="Operation Details" />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={loadingTypes}
                  value={formData.type}
                  onChange={handleAutocompleteChange('type')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Loading Type"
                      error={Boolean(errors.type)}
                      helperText={errors.type}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(errors.status)}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    value={formData.status}
                    onChange={handleChange('status')}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                  {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Vehicle/Vessel"
                  fullWidth
                  value={formData.vehicle}
                  onChange={handleChange('vehicle')}
                  error={Boolean(errors.vehicle)}
                  helperText={errors.vehicle || "Enter vehicle details (e.g., 'Tanker Truck B-9012 CD')"}
                  placeholder="Enter vehicle or vessel identification"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={availableProducts}
                  value={formData.product}
                  onChange={handleAutocompleteChange('product')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product"
                      error={Boolean(errors.product)}
                      helperText={errors.product}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <TextField
                  label="Quantity"
                  fullWidth
                  value={formData.quantity}
                  onChange={handleChange('quantity')}
                  error={Boolean(errors.quantity)}
                  helperText={errors.quantity}
                  type="number"
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Unit</InputLabel>
                  <Select
                    label="Unit"
                    value={formData.unit}
                    onChange={handleChange('unit')}
                  >
                    {availableUnits.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={availableLoadingBays}
                  value={formData.bay}
                  onChange={handleAutocompleteChange('bay')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Loading Bay/Location"
                      error={Boolean(errors.bay)}
                      helperText={errors.bay}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={formData.isInternal} 
                      onChange={handleSwitchChange('isInternal')}
                    />
                  }
                  label="Internal Transfer"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Start Time"
                  type="datetime-local"
                  fullWidth
                  value={formData.startTime}
                  onChange={handleChange('startTime')}
                  error={Boolean(errors.startTime)}
                  helperText={errors.startTime}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Estimated End Time"
                  type="datetime-local"
                  fullWidth
                  value={formData.estimatedEndTime}
                  onChange={handleChange('estimatedEndTime')}
                  error={Boolean(errors.estimatedEndTime)}
                  helperText={errors.estimatedEndTime}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={availableCustomers}
                  value={formData.customer}
                  onChange={handleAutocompleteChange('customer')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={formData.isInternal ? "Department/Unit" : "Customer"}
                      error={Boolean(errors.customer)}
                      helperText={errors.customer}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label={formData.isInternal ? "Internal Reference" : "Order Number"}
                  fullWidth
                  value={formData.orderNumber}
                  onChange={handleChange('orderNumber')}
                  placeholder={formData.isInternal ? "Enter internal reference number" : "Enter sales order number"}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange('notes')}
                  placeholder="Any special instructions or requirements"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Assign Operator" />
              <CardContent>
                <Autocomplete
                  options={availableOperators}
                  getOptionLabel={(option) => option.name}
                  value={formData.operator}
                  onChange={handleAutocompleteChange('operator')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assigned Operator"
                      placeholder="Select operator"
                      error={Boolean(errors.operator)}
                      helperText={errors.operator}
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={option.avatar} alt={option.name} sx={{ width: 30, height: 30 }} />
                        <Box>
                          <Typography variant="body2">{option.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.role} • {option.department}
                          </Typography>
                        </Box>
                      </Box>
                    </li>
                  )}
                />
                
                {formData.operator && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Selected Operator
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          src={formData.operator.avatar} 
                          alt={formData.operator.name}
                          sx={{ width: 50, height: 50 }}
                        />
                        <Box>
                          <Typography variant="body1">{formData.operator.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formData.operator.role}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formData.operator.department}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Safety Checklist" />
              <CardContent>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'warning.main' }}>
                        <i className="ri-checkbox-circle-line" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Verify proper grounding"
                      secondary="Ensure static electricity prevention"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'warning.main' }}>
                        <i className="ri-checkbox-circle-line" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Check loading equipment"
                      secondary="Ensure all equipment is in working order"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'warning.main' }}>
                        <i className="ri-checkbox-circle-line" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Verify PPE requirements"
                      secondary="Ensure all personnel have proper safety equipment"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'warning.main' }}>
                        <i className="ri-checkbox-circle-line" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Emergency procedures"
                      secondary="Review emergency shutdown procedures"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Required Documents" />
              <CardContent>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Loading Permit" />
                    <ListItemSecondaryAction>
                      <Chip label="Required" color="primary" size="small" />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Safety Data Sheet (SDS)" />
                    <ListItemSecondaryAction>
                      <Chip label="Required" color="primary" size="small" />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Quality Certificate" />
                    <ListItemSecondaryAction>
                      <Chip label="Optional" variant="outlined" size="small" />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Vehicle Inspection" />
                    <ListItemSecondaryAction>
                      <Chip label="Required" color="primary" size="small" />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                startIcon={<i className="ri-arrow-left-line" />}
              >
                Cancel
              </Button>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                >
                  Save as Draft
                </Button>
                
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={16} /> : <i className="ri-check-line" />}
                >
                  {loading ? 'Creating...' : 'Create Loading Operation'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CreateLoadingOperationPage
