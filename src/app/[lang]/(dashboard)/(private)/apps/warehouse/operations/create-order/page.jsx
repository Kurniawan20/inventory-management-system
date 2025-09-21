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
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const CreateOrderPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customer: '',
    type: 'External',
    products: [],
    deliveryMethod: 'Truck',
    deliveryLocation: '',
    scheduledDelivery: '',
    paymentStatus: 'Pending',
    priority: 'medium',
    notes: ''
  })
  
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    quantity: '',
    unit: 'liters'
  })
  
  const [errors, setErrors] = useState({})
  
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
  
  // Sample data for delivery methods
  const deliveryMethods = [
    'Truck',
    'Rail',
    'Internal Transfer',
    'Customer Pickup',
    'Marine Vessel'
  ]
  
  // Sample data for delivery locations
  const availableLocations = [
    'Customer Site - Jakarta',
    'Customer Site - Bekasi',
    'Customer Site - Cikarang',
    'Rail Terminal - Bandung',
    'Marine Terminal - Surabaya',
    'Lubricant Plant - Dumai',
    'Distribution Center - Medan',
    'Distribution Center - Makassar',
    'Customer Warehouse - Jakarta'
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
  
  const handleProductChange = (field) => (event) => {
    setCurrentProduct({
      ...currentProduct,
      [field]: event.target.value
    })
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
  
  const handleProductAutocompleteChange = (field) => (event, value) => {
    setCurrentProduct({
      ...currentProduct,
      [field]: value
    })
  }
  
  const handleSwitchChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.checked ? 'Internal' : 'External'
    })
  }
  
  const handleAddProduct = () => {
    if (!currentProduct.name || !currentProduct.quantity) {
      return
    }
    
    setFormData({
      ...formData,
      products: [...formData.products, { ...currentProduct }]
    })
    
    setCurrentProduct({
      name: '',
      quantity: '',
      unit: 'liters'
    })
    
    // Clear products error if it exists
    if (errors.products) {
      setErrors({
        ...errors,
        products: null
      })
    }
  }
  
  const handleRemoveProduct = (index) => {
    const updatedProducts = [...formData.products]
    updatedProducts.splice(index, 1)
    
    setFormData({
      ...formData,
      products: updatedProducts
    })
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.customer) {
      newErrors.customer = formData.type === 'Internal' ? 'Internal department is required' : 'Customer is required'
    }
    
    if (formData.products.length === 0) {
      newErrors.products = 'At least one product is required'
    }
    
    if (!formData.deliveryMethod) {
      newErrors.deliveryMethod = 'Delivery method is required'
    }
    
    if (!formData.deliveryLocation) {
      newErrors.deliveryLocation = 'Delivery location is required'
    }
    
    if (!formData.scheduledDelivery) {
      newErrors.scheduledDelivery = 'Scheduled delivery date is required'
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
      
      // Generate an order ID
      const orderId = `SO-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
      
      // Simulate successful order creation
      console.log('Order created:', { id: orderId, ...formData })
      
      // Navigate back to the operations page
      router.push('/en/apps/warehouse/operations')
    } catch (error) {
      console.error('Error creating order:', error)
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
            <Typography color="text.primary">New Order</Typography>
          </Breadcrumbs>
          
          <Typography variant="h4" sx={{ mt: 2 }}>
            Create New Order
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create a new sales or internal transfer order
          </Typography>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title="Order Details" />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={availableCustomers}
                  value={formData.customer}
                  onChange={handleAutocompleteChange('customer')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={formData.type === 'Internal' ? "Department/Unit" : "Customer"}
                      error={Boolean(errors.customer)}
                      helperText={errors.customer}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={formData.type === 'Internal'} 
                      onChange={handleSwitchChange('type')}
                    />
                  }
                  label="Internal Transfer"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Products
                </Typography>
                
                {errors.products && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {errors.products}
                  </Alert>
                )}
                
                <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.products.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.unit}</TableCell>
                          <TableCell align="right">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleRemoveProduct(index)}
                            >
                              <i className="ri-delete-bin-line" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {formData.products.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            <Typography variant="body2" color="text.secondary">
                              No products added yet
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Add Product
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                      <Autocomplete
                        options={availableProducts}
                        value={currentProduct.name}
                        onChange={handleProductAutocompleteChange('name')}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Product"
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={3}>
                      <TextField
                        label="Quantity"
                        fullWidth
                        value={currentProduct.quantity}
                        onChange={handleProductChange('quantity')}
                        type="number"
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={2}>
                      <FormControl fullWidth>
                        <InputLabel>Unit</InputLabel>
                        <Select
                          label="Unit"
                          value={currentProduct.unit}
                          onChange={handleProductChange('unit')}
                        >
                          {availableUnits.map((unit) => (
                            <MenuItem key={unit} value={unit}>
                              {unit}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button 
                        variant="contained" 
                        fullWidth
                        onClick={handleAddProduct}
                        disabled={!currentProduct.name || !currentProduct.quantity}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(errors.deliveryMethod)}>
                  <InputLabel>Delivery Method</InputLabel>
                  <Select
                    label="Delivery Method"
                    value={formData.deliveryMethod}
                    onChange={handleChange('deliveryMethod')}
                  >
                    {deliveryMethods.map((method) => (
                      <MenuItem key={method} value={method}>
                        {method}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.deliveryMethod && <FormHelperText>{errors.deliveryMethod}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={availableLocations}
                  value={formData.deliveryLocation}
                  onChange={handleAutocompleteChange('deliveryLocation')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Delivery Location"
                      error={Boolean(errors.deliveryLocation)}
                      helperText={errors.deliveryLocation}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Scheduled Delivery"
                  type="datetime-local"
                  fullWidth
                  value={formData.scheduledDelivery}
                  onChange={handleChange('scheduledDelivery')}
                  error={Boolean(errors.scheduledDelivery)}
                  helperText={errors.scheduledDelivery}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Payment Status</InputLabel>
                  <Select
                    label="Payment Status"
                    value={formData.paymentStatus}
                    onChange={handleChange('paymentStatus')}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Internal">Internal (No Payment)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    label="Priority"
                    value={formData.priority}
                    onChange={handleChange('priority')}
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                </FormControl>
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
              <CardHeader title="Order Summary" />
              <CardContent>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Order Type" 
                      secondary={formData.type} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary={formData.type === 'Internal' ? 'Department' : 'Customer'} 
                      secondary={formData.customer || 'Not selected'} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Products" 
                      secondary={`${formData.products.length} product(s)`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Delivery Method" 
                      secondary={formData.deliveryMethod} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Delivery Location" 
                      secondary={formData.deliveryLocation || 'Not specified'} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Scheduled Delivery" 
                      secondary={formData.scheduledDelivery ? new Date(formData.scheduledDelivery).toLocaleString() : 'Not scheduled'} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Payment Status" 
                      secondary={
                        <Chip 
                          label={formData.paymentStatus} 
                          color={
                            formData.paymentStatus === 'Paid' ? 'success' : 
                            formData.paymentStatus === 'Pending' ? 'warning' : 
                            'default'
                          }
                          size="small"
                        />
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Priority" 
                      secondary={
                        <Chip 
                          label={formData.priority} 
                          color={
                            formData.priority === 'high' ? 'error' : 
                            formData.priority === 'medium' ? 'warning' : 
                            'info'
                          }
                          size="small"
                        />
                      } 
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Warehouse Tasks" />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  After creating this order, you can create warehouse tasks for:
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <i className="ri-stack-line" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Picking" 
                      secondary="Select products from inventory" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <i className="ri-archive-line" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Packing" 
                      secondary="Package products for shipment" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <i className="ri-truck-line" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Loading" 
                      secondary="Load products onto transport vehicle" 
                    />
                  </ListItem>
                </List>
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Warehouse tasks will be created automatically based on this order.
                </Typography>
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
                  {loading ? 'Creating...' : 'Create Order'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CreateOrderPage
