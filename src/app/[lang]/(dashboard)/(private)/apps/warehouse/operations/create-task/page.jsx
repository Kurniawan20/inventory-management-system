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
import AvatarGroup from '@mui/material/AvatarGroup'
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

const CreateTaskPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
    location: '',
    equipment: [],
    notes: '',
    assignedTo: []
  })
  
  const [errors, setErrors] = useState({})
  
  // Sample data for staff
  const availableStaff = [
    { id: 'user-001', name: 'Ahmad Suryanto', avatar: '/images/avatars/1.png', role: 'Supervisor', department: 'Operations' },
    { id: 'user-002', name: 'Budi Santoso', avatar: '/images/avatars/2.png', role: 'Operator', department: 'Operations' },
    { id: 'user-003', name: 'Citra Dewi', avatar: '/images/avatars/3.png', role: 'Operator', department: 'Operations' },
    { id: 'user-004', name: 'Dian Kusuma', avatar: '/images/avatars/4.png', role: 'Operator', department: 'Operations' },
    { id: 'user-005', name: 'Eko Prasetyo', avatar: '/images/avatars/5.png', role: 'Operator', department: 'Operations' },
    { id: 'user-006', name: 'Fira Rahmawati', avatar: '/images/avatars/6.png', role: 'QC Specialist', department: 'Quality Control' },
    { id: 'user-007', name: 'Gunawan Wibowo', avatar: '/images/avatars/7.png', role: 'Loading Operator', department: 'Logistics' },
    { id: 'user-008', name: 'Hadi Santoso', avatar: '/images/avatars/8.png', role: 'Assistant', department: 'Logistics' },
    { id: 'user-009', name: 'Indah Permata', avatar: '/images/avatars/9.png', role: 'Inventory Specialist', department: 'Warehouse' }
  ]
  
  // Sample data for equipment
  const availableEquipment = [
    'Pump P-101',
    'Pump P-102',
    'Valve V-203',
    'Valve V-204',
    'Flow Meter FM-12',
    'Flow Meter FM-13',
    'Tank T-501',
    'Tank T-502',
    'Loading Arm LA-3',
    'Loading Arm LA-4',
    'Forklift FL-01',
    'Forklift FL-02',
    'Barcode Scanner BS-01',
    'Tablet TB-01',
    'GC Analyzer',
    'Density Meter',
    'Flash Point Tester'
  ]
  
  // Sample data for locations
  const availableLocations = [
    'Jetty 1, Dock Area',
    'Jetty 2, Dock Area',
    'Tank Farm Area, Section A',
    'Tank Farm Area, Section B',
    'Laboratory, Building C',
    'Truck Loading Terminal',
    'Rail Terminal 1',
    'Rail Terminal 2',
    'Warehouse Section A',
    'Warehouse Section B',
    'Warehouse Section C',
    'Main Processing Unit',
    'Pump House A',
    'Pump House B'
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
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required'
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required'
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required'
    }
    
    if (formData.assignedTo.length === 0) {
      newErrors.assignedTo = 'At least one staff member must be assigned'
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
      
      // Generate a task ID
      const taskId = `TASK-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
      
      // Simulate successful task creation
      console.log('Task created:', { id: taskId, ...formData })
      
      // Navigate back to the operations page
      router.push('/en/apps/warehouse/operations')
    } catch (error) {
      console.error('Error creating task:', error)
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
            <Typography color="text.primary">Create Task</Typography>
          </Breadcrumbs>
          
          <Typography variant="h4" sx={{ mt: 2 }}>
            Create New Warehouse Task
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create a new task for warehouse staff to complete
          </Typography>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title="Task Details" />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  label="Task Title"
                  fullWidth
                  value={formData.title}
                  onChange={handleChange('title')}
                  error={Boolean(errors.title)}
                  helperText={errors.title}
                  placeholder="Enter a descriptive title for the task"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange('description')}
                  error={Boolean(errors.description)}
                  helperText={errors.description}
                  placeholder="Provide detailed instructions for this task"
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
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(errors.priority)}>
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
                  {errors.priority && <FormHelperText>{errors.priority}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Due Date"
                  type="datetime-local"
                  fullWidth
                  value={formData.dueDate}
                  onChange={handleChange('dueDate')}
                  error={Boolean(errors.dueDate)}
                  helperText={errors.dueDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={availableLocations}
                  value={formData.location}
                  onChange={handleAutocompleteChange('location')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location"
                      error={Boolean(errors.location)}
                      helperText={errors.location}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={availableEquipment}
                  value={formData.equipment}
                  onChange={handleAutocompleteChange('equipment')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Equipment"
                      placeholder="Select equipment needed for this task"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        key={option}
                        variant="outlined"
                        icon={<i className="ri-tools-line" />}
                      />
                    ))
                  }
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
                  placeholder="Any additional notes or special instructions"
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
              <CardHeader title="Assign Staff" />
              <CardContent>
                <Autocomplete
                  multiple
                  options={availableStaff}
                  getOptionLabel={(option) => option.name}
                  value={formData.assignedTo}
                  onChange={handleAutocompleteChange('assignedTo')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assigned Staff"
                      placeholder="Select staff members"
                      error={Boolean(errors.assignedTo)}
                      helperText={errors.assignedTo}
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
                
                {formData.assignedTo.length > 0 && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Selected Staff ({formData.assignedTo.length})
                    </Typography>
                    <List dense>
                      {formData.assignedTo.map((staff) => (
                        <ListItem key={staff.id}>
                          <ListItemAvatar>
                            <Avatar src={staff.avatar} alt={staff.name} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={staff.name}
                            secondary={`${staff.role} • ${staff.department}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Related Orders" />
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Optionally link this task to a sales or purchase order
                </Typography>
                
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<i className="ri-link" />}
                  sx={{ mb: 2 }}
                >
                  Link to Sales Order
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<i className="ri-link" />}
                >
                  Link to Purchase Order
                </Button>
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
                  {loading ? 'Creating...' : 'Create Task'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CreateTaskPage
