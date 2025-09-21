'use client'

// React Imports
import { useState } from 'react'

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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AvatarGroup from '@mui/material/AvatarGroup'
import Badge from '@mui/material/Badge'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

// Sample data for staff
const initialStaff = [
  {
    id: 'user-001',
    name: 'Ahmad Suryanto',
    avatar: '/images/avatars/1.png',
    role: 'Supervisor',
    department: 'Operations',
    status: 'on-duty',
    location: 'Jetty 2, Dock Area',
    currentTask: 'TASK-001',
    taskTitle: 'Unload Crude Oil Shipment',
    skills: ['Loading', 'Unloading', 'Supervision', 'Safety'],
    contact: '+62 812-3456-7890',
    schedule: '07:00 - 15:00',
    assignedTasks: 2,
    completedTasks: 5
  },
  {
    id: 'user-002',
    name: 'Budi Santoso',
    avatar: '/images/avatars/2.png',
    role: 'Operator',
    department: 'Operations',
    status: 'on-duty',
    location: 'Jetty 2, Dock Area',
    currentTask: 'TASK-001',
    taskTitle: 'Unload Crude Oil Shipment',
    skills: ['Loading', 'Unloading', 'Equipment Operation'],
    contact: '+62 813-2345-6789',
    schedule: '07:00 - 15:00',
    assignedTasks: 1,
    completedTasks: 3
  },
  {
    id: 'user-003',
    name: 'Citra Dewi',
    avatar: '/images/avatars/3.png',
    role: 'Operator',
    department: 'Operations',
    status: 'on-duty',
    location: 'Jetty 2, Dock Area',
    currentTask: 'TASK-001',
    taskTitle: 'Unload Crude Oil Shipment',
    skills: ['Loading', 'Unloading', 'Documentation'],
    contact: '+62 814-3456-7890',
    schedule: '07:00 - 15:00',
    assignedTasks: 1,
    completedTasks: 4
  },
  {
    id: 'user-004',
    name: 'Dian Kusuma',
    avatar: '/images/avatars/4.png',
    role: 'Operator',
    department: 'Operations',
    status: 'on-duty',
    location: 'Tank Farm Area, Section B',
    currentTask: 'TASK-002',
    taskTitle: 'Transfer Product to Storage Tank',
    skills: ['Tank Operations', 'Transfer', 'Monitoring'],
    contact: '+62 815-4567-8901',
    schedule: '07:00 - 15:00',
    assignedTasks: 1,
    completedTasks: 2
  },
  {
    id: 'user-005',
    name: 'Eko Prasetyo',
    avatar: '/images/avatars/5.png',
    role: 'Operator',
    department: 'Operations',
    status: 'on-duty',
    location: 'Tank Farm Area, Section B',
    currentTask: 'TASK-002',
    taskTitle: 'Transfer Product to Storage Tank',
    skills: ['Tank Operations', 'Transfer', 'Safety'],
    contact: '+62 816-5678-9012',
    schedule: '07:00 - 15:00',
    assignedTasks: 1,
    completedTasks: 3
  },
  {
    id: 'user-006',
    name: 'Fira Rahmawati',
    avatar: '/images/avatars/6.png',
    role: 'QC Specialist',
    department: 'Quality Control',
    status: 'available',
    location: 'Laboratory, Building C',
    currentTask: null,
    taskTitle: null,
    skills: ['Quality Control', 'Laboratory', 'Analysis', 'Documentation'],
    contact: '+62 817-6789-0123',
    schedule: '08:00 - 16:00',
    assignedTasks: 0,
    completedTasks: 6
  },
  {
    id: 'user-007',
    name: 'Gunawan Wibowo',
    avatar: '/images/avatars/7.png',
    role: 'Loading Operator',
    department: 'Logistics',
    status: 'on-duty',
    location: 'Truck Loading Terminal',
    currentTask: 'TASK-004',
    taskTitle: 'Prepare Truck Loading Bay',
    skills: ['Loading', 'Equipment Operation', 'Safety'],
    contact: '+62 818-7890-1234',
    schedule: '08:00 - 16:00',
    assignedTasks: 1,
    completedTasks: 4
  },
  {
    id: 'user-008',
    name: 'Hadi Santoso',
    avatar: '/images/avatars/8.png',
    role: 'Assistant',
    department: 'Logistics',
    status: 'on-duty',
    location: 'Truck Loading Terminal',
    currentTask: 'TASK-004',
    taskTitle: 'Prepare Truck Loading Bay',
    skills: ['Loading', 'Documentation', 'Safety'],
    contact: '+62 819-8901-2345',
    schedule: '08:00 - 16:00',
    assignedTasks: 1,
    completedTasks: 2
  },
  {
    id: 'user-009',
    name: 'Indah Permata',
    avatar: '/images/avatars/9.png',
    role: 'Inventory Specialist',
    department: 'Warehouse',
    status: 'available',
    location: 'Warehouse Section C',
    currentTask: null,
    taskTitle: null,
    skills: ['Inventory', 'Documentation', 'Audit'],
    contact: '+62 820-9012-3456',
    schedule: '08:00 - 16:00',
    assignedTasks: 0,
    completedTasks: 5
  },
  {
    id: 'user-010',
    name: 'Joko Widodo',
    avatar: '/images/avatars/10.png',
    role: 'Supervisor',
    department: 'Logistics',
    status: 'off-duty',
    location: null,
    currentTask: null,
    taskTitle: null,
    skills: ['Supervision', 'Logistics', 'Planning', 'Safety'],
    contact: '+62 821-0123-4567',
    schedule: '16:00 - 00:00',
    assignedTasks: 0,
    completedTasks: 8
  }
]

const StaffAssignment = () => {
  const [staff, setStaff] = useState(initialStaff)
  const [activeTab, setActiveTab] = useState('all')
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [assignTaskDialogOpen, setAssignTaskDialogOpen] = useState(false)
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }
  
  const handleOpenDetailsDialog = (staffMember) => {
    setSelectedStaff(staffMember)
    setDetailsDialogOpen(true)
  }
  
  const handleCloseDetailsDialog = () => {
    setDetailsDialogOpen(false)
  }
  
  const handleOpenAssignTaskDialog = () => {
    setAssignTaskDialogOpen(true)
    setDetailsDialogOpen(false)
  }
  
  const handleCloseAssignTaskDialog = () => {
    setAssignTaskDialogOpen(false)
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'on-duty':
        return 'success'
      case 'available':
        return 'info'
      case 'off-duty':
        return 'default'
      default:
        return 'default'
    }
  }
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-duty':
        return 'ri-user-follow-line'
      case 'available':
        return 'ri-user-line'
      case 'off-duty':
        return 'ri-user-unfollow-line'
      default:
        return 'ri-user-line'
    }
  }
  
  const filteredStaff = staff.filter(member => {
    if (activeTab === 'all') return true
    return member.status === activeTab
  })
  
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab 
              value="all" 
              label="All Staff" 
              icon={<i className="ri-team-line" />} 
              iconPosition="start"
              sx={{ '& .MuiTab-iconWrapper': { mr: 1 } }}
            />
            <Tab 
              value="on-duty" 
              label="On Duty" 
              icon={<i className="ri-user-follow-line" />} 
              iconPosition="start"
              sx={{ '& .MuiTab-iconWrapper': { mr: 1 } }}
            />
            <Tab 
              value="available" 
              label="Available" 
              icon={<i className="ri-user-line" />} 
              iconPosition="start"
              sx={{ '& .MuiTab-iconWrapper': { mr: 1 } }}
            />
            <Tab 
              value="off-duty" 
              label="Off Duty" 
              icon={<i className="ri-user-unfollow-line" />} 
              iconPosition="start"
              sx={{ '& .MuiTab-iconWrapper': { mr: 1 } }}
            />
          </Tabs>
          
          <Button 
            variant="contained" 
            startIcon={<i className="ri-user-add-line" />}
          >
            Add Staff
          </Button>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography color="text.secondary" variant="body2">Total Staff</Typography>
                      <Typography variant="h5">{staff.length}</Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <i className="ri-team-line" />
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
                      <Typography color="text.secondary" variant="body2">On Duty</Typography>
                      <Typography variant="h5">
                        {staff.filter(member => member.status === 'on-duty').length}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <i className="ri-user-follow-line" />
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
                      <Typography color="text.secondary" variant="body2">Available</Typography>
                      <Typography variant="h5">
                        {staff.filter(member => member.status === 'available').length}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <i className="ri-user-line" />
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
                      <Typography color="text.secondary" variant="body2">Off Duty</Typography>
                      <Typography variant="h5">
                        {staff.filter(member => member.status === 'off-duty').length}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'text.disabled' }}>
                      <i className="ri-user-unfollow-line" />
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
                <TableCell>Staff</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Current Task</TableCell>
                <TableCell>Skills</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStaff.map(member => (
                <TableRow key={member.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={member.avatar} alt={member.name} />
                      <Box>
                        <Typography variant="body2" fontWeight={500}>{member.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{member.id}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>
                    <Chip 
                      label={member.status.replace('-', ' ')} 
                      color={getStatusColor(member.status)} 
                      size="small" 
                      icon={<i className={getStatusIcon(member.status)} />}
                    />
                  </TableCell>
                  <TableCell>{member.location || 'Not on site'}</TableCell>
                  <TableCell>
                    {member.currentTask ? (
                      <Tooltip title={member.taskTitle}>
                        <Chip 
                          label={member.currentTask} 
                          size="small" 
                          color="warning"
                          variant="outlined"
                        />
                      </Tooltip>
                    ) : (
                      <Typography variant="body2" color="text.secondary">No active task</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {member.skills.slice(0, 2).map(skill => (
                        <Chip 
                          key={skill} 
                          label={skill} 
                          size="small" 
                          variant="outlined"
                        />
                      ))}
                      {member.skills.length > 2 && (
                        <Chip 
                          label={`+${member.skills.length - 2}`} 
                          size="small" 
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Tooltip title="View Details">
                        <IconButton size="small" onClick={() => handleOpenDetailsDialog(member)}>
                          <i className="ri-eye-line" />
                        </IconButton>
                      </Tooltip>
                      
                      {member.status !== 'off-duty' && (
                        <Tooltip title="Assign Task">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => {
                              setSelectedStaff(member)
                              setAssignTaskDialogOpen(true)
                            }}
                          >
                            <i className="ri-task-line" />
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
      </Box>
      
      {/* Staff Details Dialog */}
      <Dialog open={detailsDialogOpen} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
        {selectedStaff && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Staff Details</Typography>
                <Chip 
                  label={selectedStaff.status.replace('-', ' ')} 
                  color={getStatusColor(selectedStaff.status)} 
                  icon={<i className={getStatusIcon(selectedStaff.status)} />}
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                      src={selectedStaff.avatar} 
                      alt={selectedStaff.name}
                      sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h6">{selectedStaff.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{selectedStaff.role}</Typography>
                    <Typography variant="body2" color="text.secondary">{selectedStaff.department}</Typography>
                  </Box>
                  
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>Contact Information</Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <i className="ri-phone-line" style={{ marginRight: '8px' }} />
                      <Typography variant="body2">{selectedStaff.contact}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <i className="ri-time-line" style={{ marginRight: '8px' }} />
                      <Typography variant="body2">Shift: {selectedStaff.schedule}</Typography>
                    </Box>
                  </Paper>
                  
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Skills</Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {selectedStaff.skills.map(skill => (
                        <Chip 
                          key={skill} 
                          label={skill} 
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>Current Status</Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">Status</Typography>
                          <Chip 
                            label={selectedStaff.status.replace('-', ' ')} 
                            color={getStatusColor(selectedStaff.status)} 
                            size="small" 
                          />
                        </Box>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">Location</Typography>
                          <Typography variant="body2">{selectedStaff.location || 'Not on site'}</Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">Current Task</Typography>
                          {selectedStaff.currentTask ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Chip 
                                label={selectedStaff.currentTask} 
                                color="warning" 
                                size="small" 
                              />
                              <Typography variant="body2">{selectedStaff.taskTitle}</Typography>
                            </Box>
                          ) : (
                            <Typography variant="body2">No active task</Typography>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                  
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>Task Statistics</Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2 }}>
                          <Typography variant="h4" color="primary.main">{selectedStaff.assignedTasks}</Typography>
                          <Typography variant="body2" color="text.secondary">Currently Assigned</Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2 }}>
                          <Typography variant="h4" color="success.main">{selectedStaff.completedTasks}</Typography>
                          <Typography variant="body2" color="text.secondary">Completed Today</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                  
                  {selectedStaff.status !== 'off-duty' && (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        startIcon={<i className="ri-task-line" />}
                        onClick={handleOpenAssignTaskDialog}
                        fullWidth
                      >
                        Assign Task
                      </Button>
                      
                      <Button 
                        variant="outlined" 
                        color="warning" 
                        startIcon={<i className="ri-user-unfollow-line" />}
                        fullWidth
                      >
                        Set Off Duty
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailsDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Assign Task Dialog */}
      <Dialog open={assignTaskDialogOpen} onClose={handleCloseAssignTaskDialog} maxWidth="md" fullWidth>
        {selectedStaff && (
          <>
            <DialogTitle>Assign Task to {selectedStaff.name}</DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 0 }}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar src={selectedStaff.avatar} alt={selectedStaff.name} />
                    <Box>
                      <Typography variant="subtitle1">{selectedStaff.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedStaff.role} • {selectedStaff.department}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Select Task</InputLabel>
                    <Select
                      label="Select Task"
                      defaultValue=""
                    >
                      <MenuItem value="TASK-005">TASK-005: Inventory Count - Lubricant Section</MenuItem>
                      <MenuItem value="UNLOAD-002">UNLOAD-002: Truck Unloading - Chemical Truck</MenuItem>
                      <MenuItem value="LOAD-002">LOAD-002: Rail Car Loading - Diesel Fuel</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Or Create New Task</Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Task Title"
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Task Type</InputLabel>
                    <Select
                      label="Task Type"
                      defaultValue="loading"
                    >
                      <MenuItem value="loading">Loading Operation</MenuItem>
                      <MenuItem value="unloading">Unloading Operation</MenuItem>
                      <MenuItem value="inventory">Inventory Management</MenuItem>
                      <MenuItem value="maintenance">Maintenance</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Task Description"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Location"
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Due Date"
                    type="datetime-local"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      label="Priority"
                      defaultValue="medium"
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAssignTaskDialog}>Cancel</Button>
              <Button variant="contained" onClick={handleCloseAssignTaskDialog}>Assign Task</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  )
}

export default StaffAssignment
