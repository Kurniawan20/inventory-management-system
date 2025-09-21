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
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

// Sample data for tasks
const initialTasks = [
  {
    id: 'TASK-001',
    title: 'Unload Crude Oil Shipment',
    description: 'Unload crude oil from tanker ship at Jetty 2',
    status: 'in-progress',
    priority: 'high',
    progress: 65,
    dueDate: '2025-09-22T14:00:00',
    assignedTo: [
      { id: 'user-001', name: 'Ahmad Suryanto', avatar: '/images/avatars/1.png', role: 'Supervisor' },
      { id: 'user-002', name: 'Budi Santoso', avatar: '/images/avatars/2.png', role: 'Operator' },
      { id: 'user-003', name: 'Citra Dewi', avatar: '/images/avatars/3.png', role: 'Operator' }
    ],
    location: 'Jetty 2, Dock Area',
    equipment: ['Pump P-101', 'Valve V-203', 'Flow Meter FM-12'],
    notes: 'Ensure proper safety protocols for flammable materials'
  },
  {
    id: 'TASK-002',
    title: 'Transfer Product to Storage Tank',
    description: 'Transfer gasoline from processing unit to storage tank T-501',
    status: 'pending',
    priority: 'medium',
    progress: 0,
    dueDate: '2025-09-22T16:30:00',
    assignedTo: [
      { id: 'user-004', name: 'Dian Kusuma', avatar: '/images/avatars/4.png', role: 'Operator' },
      { id: 'user-005', name: 'Eko Prasetyo', avatar: '/images/avatars/5.png', role: 'Operator' }
    ],
    location: 'Tank Farm Area, Section B',
    equipment: ['Pump P-203', 'Valve V-512', 'Tank T-501'],
    notes: 'Check tank level before starting transfer'
  },
  {
    id: 'TASK-003',
    title: 'Quality Check on Diesel Batch',
    description: 'Perform quality check on diesel batch #D-20250921',
    status: 'completed',
    priority: 'high',
    progress: 100,
    dueDate: '2025-09-21T10:00:00',
    completedDate: '2025-09-21T09:45:00',
    assignedTo: [
      { id: 'user-006', name: 'Fira Rahmawati', avatar: '/images/avatars/6.png', role: 'QC Specialist' }
    ],
    location: 'Laboratory, Building C',
    equipment: ['GC Analyzer', 'Density Meter', 'Flash Point Tester'],
    notes: 'All parameters within specification',
    results: {
      density: '0.832 g/cm³',
      sulfurContent: '8 ppm',
      flashPoint: '62°C',
      status: 'passed'
    }
  },
  {
    id: 'TASK-004',
    title: 'Prepare Truck Loading Bay',
    description: 'Prepare loading bay for scheduled tanker truck shipments',
    status: 'in-progress',
    priority: 'medium',
    progress: 30,
    dueDate: '2025-09-22T12:00:00',
    assignedTo: [
      { id: 'user-007', name: 'Gunawan Wibowo', avatar: '/images/avatars/7.png', role: 'Loading Operator' },
      { id: 'user-008', name: 'Hadi Santoso', avatar: '/images/avatars/8.png', role: 'Assistant' }
    ],
    location: 'Truck Loading Terminal',
    equipment: ['Loading Arm LA-3', 'Flow Meter FM-32', 'Safety Equipment'],
    notes: 'Verify all safety equipment is functional'
  },
  {
    id: 'TASK-005',
    title: 'Inventory Count - Lubricant Section',
    description: 'Perform physical inventory count in lubricant storage section',
    status: 'pending',
    priority: 'low',
    progress: 0,
    dueDate: '2025-09-23T15:00:00',
    assignedTo: [
      { id: 'user-009', name: 'Indah Permata', avatar: '/images/avatars/9.png', role: 'Inventory Specialist' }
    ],
    location: 'Warehouse Section C, Lubricant Storage',
    equipment: ['Barcode Scanner', 'Tablet', 'Forklift'],
    notes: 'Compare physical count with system inventory'
  }
]

const TaskManagement = () => {
  const router = useRouter()
  const [tasks, setTasks] = useState(initialTasks)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  
  const handleMenuOpen = (event, task) => {
    setAnchorEl(event.currentTarget)
    setSelectedTask(task)
  }
  
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  
  const handleOpenDialog = () => {
    setDialogOpen(true)
    handleMenuClose()
  }
  
  const handleCloseDialog = () => {
    setDialogOpen(false)
  }
  
  const handleOpenDetailsDialog = (task) => {
    setSelectedTask(task)
    setDetailsDialogOpen(true)
  }
  
  const handleCloseDetailsDialog = () => {
    setDetailsDialogOpen(false)
  }
  
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, status: newStatus }
        
        // Update progress based on status
        if (newStatus === 'completed') {
          updatedTask.progress = 100
          updatedTask.completedDate = new Date().toISOString()
        } else if (newStatus === 'in-progress' && task.status === 'pending') {
          updatedTask.progress = 10
        }
        
        return updatedTask
      }
      return task
    }))
    
    handleMenuClose()
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
  
  const isOverdue = (task) => {
    if (task.status === 'completed') return false
    
    const now = new Date()
    const dueDate = new Date(task.dueDate)
    return now > dueDate
  }
  
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {tasks.map(task => (
            <Grid item xs={12} md={6} lg={4} key={task.id}>
              <Card 
                sx={{ 
                  position: 'relative',
                  border: isOverdue(task) ? '1px solid' : 'none',
                  borderColor: 'error.main'
                }}
              >
                {isOverdue(task) && (
                  <Chip 
                    label="OVERDUE" 
                    color="error" 
                    size="small" 
                    sx={{ 
                      position: 'absolute', 
                      top: 12, 
                      right: 12,
                      zIndex: 1
                    }} 
                  />
                )}
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {task.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {task.id} • {formatDate(task.dueDate)}
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      onClick={(e) => handleMenuOpen(e, task)}
                      sx={{ mt: -1, mr: -1 }}
                    >
                      <i className="ri-more-2-fill" />
                    </IconButton>
                  </Box>
                  
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {task.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip 
                      label={task.status.replace('-', ' ')} 
                      color={getStatusColor(task.status)} 
                      size="small" 
                      variant="outlined"
                    />
                    <Chip 
                      label={task.priority} 
                      color={getPriorityColor(task.priority)} 
                      size="small" 
                      variant="outlined"
                    />
                    <Chip 
                      label={task.location.split(',')[0]} 
                      size="small" 
                      variant="outlined"
                      icon={<i className="ri-map-pin-line" />}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">Progress</Typography>
                      <Typography variant="caption" color="text.secondary">{task.progress}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={task.progress} 
                      color={
                        task.progress === 100 ? 'success' : 
                        task.progress > 50 ? 'primary' : 
                        'warning'
                      }
                      sx={{ height: 6, borderRadius: 1 }}
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex' }}>
                      {task.assignedTo.slice(0, 3).map((user, index) => (
                        <Tooltip key={user.id} title={`${user.name} (${user.role})`}>
                          <Avatar 
                            src={user.avatar} 
                            alt={user.name}
                            sx={{ 
                              width: 30, 
                              height: 30,
                              ml: index === 0 ? 0 : -1,
                              border: '2px solid',
                              borderColor: 'background.paper'
                            }}
                          />
                        </Tooltip>
                      ))}
                      {task.assignedTo.length > 3 && (
                        <Avatar 
                          sx={{ 
                            width: 30, 
                            height: 30,
                            ml: -1,
                            fontSize: '0.75rem',
                            border: '2px solid',
                            borderColor: 'background.paper'
                          }}
                        >
                          +{task.assignedTo.length - 3}
                        </Avatar>
                      )}
                    </Box>
                    <Button 
                      size="small" 
                      variant="text" 
                      onClick={() => handleOpenDetailsDialog(task)}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Task Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOpenDialog}>
          <ListItemIcon>
            <i className="ri-edit-line" style={{ fontSize: '1.25rem' }} />
          </ListItemIcon>
          <ListItemText>Edit Task</ListItemText>
        </MenuItem>
        
        {selectedTask?.status !== 'in-progress' && (
          <MenuItem onClick={() => handleStatusChange(selectedTask?.id, 'in-progress')}>
            <ListItemIcon>
              <i className="ri-play-line" style={{ fontSize: '1.25rem', color: 'var(--mui-palette-warning-main)' }} />
            </ListItemIcon>
            <ListItemText>Start Task</ListItemText>
          </MenuItem>
        )}
        
        {selectedTask?.status !== 'completed' && (
          <MenuItem onClick={() => handleStatusChange(selectedTask?.id, 'completed')}>
            <ListItemIcon>
              <i className="ri-check-line" style={{ fontSize: '1.25rem', color: 'var(--mui-palette-success-main)' }} />
            </ListItemIcon>
            <ListItemText>Complete Task</ListItemText>
          </MenuItem>
        )}
        
        {selectedTask?.status !== 'pending' && (
          <MenuItem onClick={() => handleStatusChange(selectedTask?.id, 'pending')}>
            <ListItemIcon>
              <i className="ri-time-line" style={{ fontSize: '1.25rem' }} />
            </ListItemIcon>
            <ListItemText>Set as Pending</ListItemText>
          </MenuItem>
        )}
        
        <Divider />
        
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <i className="ri-user-add-line" style={{ fontSize: '1.25rem' }} />
          </ListItemIcon>
          <ListItemText>Assign Staff</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <i className="ri-attachment-line" style={{ fontSize: '1.25rem' }} />
          </ListItemIcon>
          <ListItemText>Add Attachment</ListItemText>
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <i className="ri-delete-bin-line" style={{ fontSize: '1.25rem', color: 'var(--mui-palette-error-main)' }} />
          </ListItemIcon>
          <ListItemText>Delete Task</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Edit Task Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <TextField
                label="Task Title"
                fullWidth
                defaultValue={selectedTask?.title}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                defaultValue={selectedTask?.description}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  defaultValue={selectedTask?.status || 'pending'}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  label="Priority"
                  defaultValue={selectedTask?.priority || 'medium'}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Due Date"
                type="datetime-local"
                fullWidth
                defaultValue={selectedTask?.dueDate ? selectedTask.dueDate.slice(0, 16) : ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Location"
                fullWidth
                defaultValue={selectedTask?.location}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={2}
                defaultValue={selectedTask?.notes}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>Save Changes</Button>
        </DialogActions>
      </Dialog>
      
      {/* Task Details Dialog */}
      <Dialog open={detailsDialogOpen} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{selectedTask?.title}</Typography>
            <Chip 
              label={selectedTask?.status?.replace('-', ' ')} 
              color={getStatusColor(selectedTask?.status)} 
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" gutterBottom>Description</Typography>
              <Typography variant="body2" paragraph>
                {selectedTask?.description}
              </Typography>
              
              <Typography variant="subtitle1" gutterBottom>Notes</Typography>
              <Typography variant="body2" paragraph>
                {selectedTask?.notes || 'No notes available'}
              </Typography>
              
              {selectedTask?.results && (
                <>
                  <Typography variant="subtitle1" gutterBottom>Results</Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Parameter</TableCell>
                          <TableCell>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(selectedTask.results).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
                            <TableCell>
                              {key === 'status' ? (
                                <Chip 
                                  label={value} 
                                  color={value === 'passed' ? 'success' : 'error'} 
                                  size="small" 
                                />
                              ) : value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
              
              <Typography variant="subtitle1" gutterBottom>Equipment Used</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                {selectedTask?.equipment.map(item => (
                  <Chip 
                    key={item}
                    label={item} 
                    variant="outlined"
                    icon={<i className="ri-tools-line" />}
                  />
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Task Details</Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">ID</Typography>
                  <Typography variant="body2">{selectedTask?.id}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Priority</Typography>
                  <Chip 
                    label={selectedTask?.priority} 
                    color={getPriorityColor(selectedTask?.priority)} 
                    size="small" 
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Due Date</Typography>
                  <Typography variant="body2">
                    {selectedTask?.dueDate ? formatDate(selectedTask.dueDate) : 'N/A'}
                  </Typography>
                </Box>
                
                {selectedTask?.completedDate && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Completed</Typography>
                    <Typography variant="body2">
                      {formatDate(selectedTask.completedDate)}
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Location</Typography>
                  <Typography variant="body2">{selectedTask?.location}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Progress</Typography>
                  <Typography variant="body2">{selectedTask?.progress}%</Typography>
                </Box>
              </Paper>
              
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Assigned Staff</Typography>
                <Divider sx={{ mb: 2 }} />
                
                {selectedTask?.assignedTo.map(user => (
                  <Box 
                    key={user.id}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1.5,
                      mb: 2
                    }}
                  >
                    <Avatar src={user.avatar} alt={user.name} />
                    <Box>
                      <Typography variant="body2">{user.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{user.role}</Typography>
                    </Box>
                  </Box>
                ))}
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
            onClick={() => {
              handleCloseDetailsDialog()
              setDialogOpen(true)
            }}
          >
            Edit Task
          </Button>
          {selectedTask?.status !== 'completed' && (
            <Button 
              variant="contained" 
              color="success" 
              startIcon={<i className="ri-check-line" />}
              onClick={() => {
                handleStatusChange(selectedTask?.id, 'completed')
                handleCloseDetailsDialog()
              }}
            >
              Mark as Complete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TaskManagement
