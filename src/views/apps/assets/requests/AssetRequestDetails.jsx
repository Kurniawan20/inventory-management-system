'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'

// Component Imports
import TextField from '@mui/material/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

const AssetRequestDetails = () => {
  // States
  const [requestData, setRequestData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [comments, setComments] = useState('')

  const params = useParams()
  const requestId = params?.id

  // Sample data - replace with API call
  const sampleRequestData = {
    id: 'REQ-001',
    requestType: 'New Asset',
    assetName: 'Industrial Pump',
    category: 'Machinery',
    requestedBy: 'John Doe',
    department: 'Production',
    priority: 'High',
    status: 'Pending Approval',
    requestDate: '2024-01-15',
    expectedDate: '2024-02-15',
    budget: 15000000,
    description: 'Need new industrial pump for production line A. The current pump is showing signs of wear and needs replacement to maintain production efficiency.',
    specifications: {
      'Flow Rate': '500 L/min',
      'Pressure': '10 bar',
      'Power': '15 kW',
      'Material': 'Stainless Steel',
      'Certification': 'ISO 9001'
    },
    attachments: [
      { name: 'Technical_Specification.pdf', size: '2.5 MB', type: 'pdf' },
      { name: 'Budget_Justification.xlsx', size: '1.2 MB', type: 'excel' },
      { name: 'Current_Pump_Photo.jpg', size: '850 KB', type: 'image' }
    ],
    approvalHistory: [
      {
        id: 1,
        action: 'Request Created',
        user: 'John Doe',
        department: 'Production',
        date: '2024-01-15 09:30',
        status: 'Created',
        comments: 'Initial request submitted for new industrial pump'
      },
      {
        id: 2,
        action: 'Department Review',
        user: 'Mike Johnson',
        department: 'Maintenance',
        date: '2024-01-16 14:20',
        status: 'Under Review',
        comments: 'Technical specifications reviewed and approved by maintenance team'
      },
      {
        id: 3,
        action: 'Budget Review',
        user: 'Sarah Wilson',
        department: 'Finance',
        date: '2024-01-17 11:15',
        status: 'Pending Approval',
        comments: 'Budget allocation under review. Waiting for final approval from department head'
      }
    ]
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRequestData(sampleRequestData)
      setLoading(false)
    }, 1000)
  }, [requestId])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Approval':
        return 'warning'
      case 'Approved':
        return 'success'
      case 'In Progress':
        return 'info'
      case 'Rejected':
        return 'error'
      case 'Completed':
        return 'success'
      case 'Under Review':
        return 'info'
      case 'Created':
        return 'default'
      default:
        return 'default'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error'
      case 'Medium':
        return 'warning'
      case 'Low':
        return 'success'
      default:
        return 'default'
    }
  }

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return 'ri-file-pdf-line'
      case 'excel':
        return 'ri-file-excel-line'
      case 'image':
        return 'ri-image-line'
      default:
        return 'ri-file-line'
    }
  }

  const handleStatusUpdate = () => {
    // Handle status update logic here
    console.log('Updating status to:', newStatus, 'with comments:', comments)
    setStatusUpdateOpen(false)
    setNewStatus('')
    setComments('')
  }

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  if (!requestData) {
    return <Typography>Request not found</Typography>
  }

  return (
    <Grid container spacing={6}>
      {/* Request Details Card */}
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader
            title={
              <div className='flex items-center gap-2'>
                <Typography variant='h5'>Request Details</Typography>
                <Chip
                  label={requestData.status}
                  color={getStatusColor(requestData.status)}
                  variant='tonal'
                />
              </div>
            }
            action={
              <Button
                variant='contained'
                startIcon={<i className='ri-edit-line' />}
                onClick={() => setStatusUpdateOpen(true)}
              >
                Update Status
              </Button>
            }
          />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Request ID
                </Typography>
                <Typography variant='h6' color='primary'>
                  {requestData.id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Request Type
                </Typography>
                <Chip label={requestData.requestType} color='primary' variant='tonal' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Asset Name
                </Typography>
                <Typography variant='h6'>{requestData.assetName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Category
                </Typography>
                <Typography>{requestData.category}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Priority
                </Typography>
                <Chip
                  label={requestData.priority}
                  color={getPriorityColor(requestData.priority)}
                  variant='tonal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Budget
                </Typography>
                <Typography variant='h6'>
                  Rp {requestData.budget.toLocaleString('id-ID')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Request Date
                </Typography>
                <Typography>{new Date(requestData.requestDate).toLocaleDateString('id-ID')}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Expected Date
                </Typography>
                <Typography>{new Date(requestData.expectedDate).toLocaleDateString('id-ID')}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Description
                </Typography>
                <Typography>{requestData.description}</Typography>
              </Grid>
            </Grid>

            <Divider className='my-6' />

            {/* Technical Specifications */}
            <Typography variant='h6' className='mb-4'>
              Technical Specifications
            </Typography>
            <Grid container spacing={3}>
              {Object.entries(requestData.specifications).map(([key, value]) => (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <Typography variant='body2' color='text.secondary'>
                    {key}
                  </Typography>
                  <Typography variant='body1' className='font-medium'>
                    {value}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            <Divider className='my-6' />

            {/* Attachments */}
            <Typography variant='h6' className='mb-4'>
              Attachments
            </Typography>
            <Grid container spacing={2}>
              {requestData.attachments.map((file, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box className='flex items-center gap-3 p-3 border rounded'>
                    <i className={`${getFileIcon(file.type)} text-2xl`} />
                    <div className='flex-1'>
                      <Typography variant='body2' className='font-medium'>
                        {file.name}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {file.size}
                      </Typography>
                    </div>
                    <IconButton size='small'>
                      <i className='ri-download-line' />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Requester Info & Approval Timeline */}
      <Grid item xs={12} lg={4}>
        {/* Requester Information */}
        <Card className='mb-6'>
          <CardHeader title='Requester Information' />
          <CardContent>
            <div className='flex items-center gap-3 mb-4'>
              <CustomAvatar size={50}>
                {getInitials(requestData.requestedBy)}
              </CustomAvatar>
              <div>
                <Typography variant='h6'>{requestData.requestedBy}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  {requestData.department} Department
                </Typography>
              </div>
            </div>
            <Button variant='outlined' fullWidth startIcon={<i className='ri-mail-line' />}>
              Contact Requester
            </Button>
          </CardContent>
        </Card>

        {/* Approval Timeline */}
        <Card>
          <CardHeader title='Approval Timeline' />
          <CardContent>
            <Timeline>
              {requestData.approvalHistory.map((item, index) => (
                <TimelineItem key={item.id}>
                  <TimelineOppositeContent color='text.secondary' variant='caption'>
                    {item.date}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color={getStatusColor(item.status)} />
                    {index < requestData.approvalHistory.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant='body2' className='font-medium'>
                      {item.action}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      by {item.user} ({item.department})
                    </Typography>
                    <Typography variant='body2' className='mt-1'>
                      {item.comments}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      </Grid>

      {/* Status Update Dialog */}
      <Dialog open={statusUpdateOpen} onClose={() => setStatusUpdateOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Update Request Status</DialogTitle>
        <DialogContent>
          <Grid container spacing={4} className='pbs-5'>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>New Status</InputLabel>
                <Select
                  value={newStatus}
                  label='New Status'
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <MenuItem value='Under Review'>Under Review</MenuItem>
                  <MenuItem value='Approved'>Approved</MenuItem>
                  <MenuItem value='Rejected'>Rejected</MenuItem>
                  <MenuItem value='In Progress'>In Progress</MenuItem>
                  <MenuItem value='Completed'>Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Comments'
                placeholder='Add comments about this status update...'
                multiline
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusUpdateOpen(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleStatusUpdate}>
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default AssetRequestDetails
