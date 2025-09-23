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
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

// Component Imports
import TextField from '@mui/material/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

const AssetReturnsDetails = () => {
  // States
  const [returnData, setReturnData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false)
  const [inspectionDialogOpen, setInspectionDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [inspectionNotes, setInspectionNotes] = useState('')
  const [comments, setComments] = useState('')

  const params = useParams()
  const returnId = params?.id

  // Sample data - replace with API call
  const sampleReturnData = {
    id: 'RET-001',
    returnType: 'Asset Return',
    assetCode: 'LAP-2024-004',
    assetName: 'Laptop Computer Dell',
    category: 'IT Equipment',
    returnedBy: 'Sarah Wilson',
    department: 'IT',
    returnDate: '2024-01-20',
    expectedReturnDate: '2024-01-18',
    status: 'Returned',
    condition: 'Good',
    returnReason: 'Project completion - laptop no longer needed for current assignment',
    borrowDuration: '30 days',
    isOverdue: true,
    overdueDays: 2,
    borrowDate: '2023-12-21',
    originalCondition: 'Excellent',
    assetDetails: {
      serialNumber: 'LAP-SN-004567',
      manufacturer: 'Dell',
      model: 'Latitude 5520',
      year: '2023',
      specifications: {
        'Processor': 'Intel Core i7-1165G7',
        'RAM': '16GB DDR4',
        'Storage': '512GB SSD',
        'Display': '15.6" FHD',
        'OS': 'Windows 11 Pro'
      }
    },
    inspectionResults: {
      physicalCondition: 'Good',
      functionalTest: 'Passed',
      dataWipe: 'Completed',
      accessories: 'Complete',
      damages: [
        'Minor scratches on lid',
        'Keyboard shows normal wear'
      ],
      repairNeeded: false,
      estimatedRepairCost: 0
    },
    returnHistory: [
      {
        id: 1,
        action: 'Asset Returned',
        user: 'Sarah Wilson',
        department: 'IT',
        date: '2024-01-20 14:30',
        status: 'Returned',
        comments: 'Asset returned in good condition. Project completed successfully.'
      },
      {
        id: 2,
        action: 'Initial Inspection',
        user: 'IT Support Team',
        department: 'IT',
        date: '2024-01-20 15:15',
        status: 'Under Inspection',
        comments: 'Physical inspection completed. Minor cosmetic wear noted but within acceptable limits.'
      },
      {
        id: 3,
        action: 'Functional Testing',
        user: 'Technical Team',
        department: 'IT',
        date: '2024-01-20 16:00',
        status: 'Testing Complete',
        comments: 'All hardware components tested and functioning properly. Data wipe completed.'
      }
    ],
    attachments: [
      { name: 'Return_Condition_Photos.zip', size: '5.2 MB', type: 'archive', uploadDate: '2024-01-20' },
      { name: 'Inspection_Report.pdf', size: '1.1 MB', type: 'pdf', uploadDate: '2024-01-20' },
      { name: 'Data_Wipe_Certificate.pdf', size: '850 KB', type: 'pdf', uploadDate: '2024-01-20' }
    ],
    borrowHistory: {
      borrowDate: '2023-12-21',
      borrowReason: 'Software development project',
      approvedBy: 'John Manager',
      originalDueDate: '2024-01-18',
      extensionRequests: [
        {
          requestDate: '2024-01-15',
          newDueDate: '2024-01-25',
          reason: 'Project deadline extended',
          status: 'Denied'
        }
      ]
    }
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReturnData(sampleReturnData)
      setLoading(false)
    }, 1000)
  }, [returnId])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Returned':
        return 'success'
      case 'Pending Inspection':
        return 'warning'
      case 'Under Inspection':
        return 'info'
      case 'Inspection Failed':
        return 'error'
      case 'Approved':
        return 'success'
      case 'Rejected':
        return 'error'
      case 'Testing Complete':
        return 'info'
      default:
        return 'default'
    }
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent':
        return 'success'
      case 'Good':
        return 'info'
      case 'Fair':
        return 'warning'
      case 'Poor':
        return 'error'
      default:
        return 'default'
    }
  }

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return 'ri-file-pdf-line'
      case 'archive':
        return 'ri-file-zip-line'
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

  const handleInspectionComplete = () => {
    // Handle inspection completion logic here
    console.log('Completing inspection with notes:', inspectionNotes)
    setInspectionDialogOpen(false)
    setInspectionNotes('')
  }

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  if (!returnData) {
    return <Typography>Return record not found</Typography>
  }

  return (
    <Grid container spacing={6}>
      {/* Return Details Card */}
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader
            title={
              <div className='flex items-center gap-2'>
                <Typography variant='h5'>Return Details</Typography>
                <Chip
                  label={returnData.status}
                  color={getStatusColor(returnData.status)}
                  variant='tonal'
                />
                {returnData.isOverdue && (
                  <Chip
                    label={`${returnData.overdueDays} days overdue`}
                    color='error'
                    variant='tonal'
                    size='small'
                  />
                )}
              </div>
            }
            action={
              <div className='flex gap-2'>
                <Button
                  variant='outlined'
                  startIcon={<i className='ri-search-eye-line' />}
                  onClick={() => setInspectionDialogOpen(true)}
                >
                  Inspect Asset
                </Button>
                <Button
                  variant='contained'
                  startIcon={<i className='ri-edit-line' />}
                  onClick={() => setStatusUpdateOpen(true)}
                >
                  Update Status
                </Button>
              </div>
            }
          />
          <CardContent>
            {returnData.isOverdue && (
              <Alert severity='warning' className='mb-4'>
                <AlertTitle>Overdue Return</AlertTitle>
                This asset was returned {returnData.overdueDays} days after the expected return date. 
                Please review the return conditions and apply any applicable penalties.
              </Alert>
            )}

            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Return ID
                </Typography>
                <Typography variant='h6' color='primary'>
                  {returnData.id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Return Type
                </Typography>
                <Chip label={returnData.returnType} color='primary' variant='tonal' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Asset Code
                </Typography>
                <Typography variant='h6'>{returnData.assetCode}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Asset Name
                </Typography>
                <Typography variant='h6'>{returnData.assetName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Return Date
                </Typography>
                <Typography>{new Date(returnData.returnDate).toLocaleDateString('id-ID')}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Expected Return Date
                </Typography>
                <Typography color={returnData.isOverdue ? 'error' : 'text.primary'}>
                  {new Date(returnData.expectedReturnDate).toLocaleDateString('id-ID')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Borrow Duration
                </Typography>
                <Typography>{returnData.borrowDuration}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Current Condition
                </Typography>
                <Chip
                  label={returnData.condition}
                  color={getConditionColor(returnData.condition)}
                  variant='tonal'
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Return Reason
                </Typography>
                <Typography>{returnData.returnReason}</Typography>
              </Grid>
            </Grid>

            <Divider className='my-6' />

            {/* Asset Specifications */}
            <Typography variant='h6' className='mb-4'>
              Asset Specifications
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body2' color='text.secondary'>
                  Serial Number
                </Typography>
                <Typography variant='body1' className='font-medium'>
                  {returnData.assetDetails.serialNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body2' color='text.secondary'>
                  Manufacturer
                </Typography>
                <Typography variant='body1' className='font-medium'>
                  {returnData.assetDetails.manufacturer}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body2' color='text.secondary'>
                  Model
                </Typography>
                <Typography variant='body1' className='font-medium'>
                  {returnData.assetDetails.model}
                </Typography>
              </Grid>
              {Object.entries(returnData.assetDetails.specifications).map(([key, value]) => (
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

            {/* Inspection Results */}
            <Typography variant='h6' className='mb-4'>
              Inspection Results
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant='body2' color='text.secondary'>
                  Physical Condition
                </Typography>
                <Chip
                  label={returnData.inspectionResults.physicalCondition}
                  color={getConditionColor(returnData.inspectionResults.physicalCondition)}
                  variant='tonal'
                  size='small'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant='body2' color='text.secondary'>
                  Functional Test
                </Typography>
                <Chip
                  label={returnData.inspectionResults.functionalTest}
                  color='success'
                  variant='tonal'
                  size='small'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant='body2' color='text.secondary'>
                  Data Wipe
                </Typography>
                <Chip
                  label={returnData.inspectionResults.dataWipe}
                  color='success'
                  variant='tonal'
                  size='small'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant='body2' color='text.secondary'>
                  Accessories
                </Typography>
                <Chip
                  label={returnData.inspectionResults.accessories}
                  color='success'
                  variant='tonal'
                  size='small'
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' color='text.secondary' className='mb-2'>
                  Noted Damages
                </Typography>
                {returnData.inspectionResults.damages.map((damage, index) => (
                  <Typography key={index} variant='body2' className='mb-1'>
                    • {damage}
                  </Typography>
                ))}
              </Grid>
            </Grid>

            <Divider className='my-6' />

            {/* Attachments */}
            <Typography variant='h6' className='mb-4'>
              Documents & Photos
            </Typography>
            <Grid container spacing={2}>
              {returnData.attachments.map((file, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box className='flex items-center gap-3 p-3 border rounded'>
                    <i className={`${getFileIcon(file.type)} text-2xl`} />
                    <div className='flex-1'>
                      <Typography variant='body2' className='font-medium'>
                        {file.name}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {file.size} • {new Date(file.uploadDate).toLocaleDateString('id-ID')}
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

      {/* Returner Info & Return Timeline */}
      <Grid item xs={12} lg={4}>
        {/* Returner Information */}
        <Card className='mb-6'>
          <CardHeader title='Returner Information' />
          <CardContent>
            <div className='flex items-center gap-3 mb-4'>
              <CustomAvatar size={50}>
                {getInitials(returnData.returnedBy)}
              </CustomAvatar>
              <div>
                <Typography variant='h6'>{returnData.returnedBy}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  {returnData.department} Department
                </Typography>
              </div>
            </div>
            <Typography variant='body2' color='text.secondary' className='mb-2'>
              Borrow Period
            </Typography>
            <Typography variant='body2' className='mb-1'>
              From: {new Date(returnData.borrowDate).toLocaleDateString('id-ID')}
            </Typography>
            <Typography variant='body2' className='mb-3'>
              To: {new Date(returnData.returnDate).toLocaleDateString('id-ID')}
            </Typography>
            <Button variant='outlined' fullWidth startIcon={<i className='ri-mail-line' />}>
              Contact Returner
            </Button>
          </CardContent>
        </Card>

        {/* Return Timeline */}
        <Card>
          <CardHeader title='Return Timeline' />
          <CardContent>
            <Timeline>
              {returnData.returnHistory.map((item, index) => (
                <TimelineItem key={item.id}>
                  <TimelineOppositeContent color='text.secondary' variant='caption'>
                    {new Date(item.date).toLocaleString('id-ID')}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color={getStatusColor(item.status)} />
                    {index < returnData.returnHistory.length - 1 && <TimelineConnector />}
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
        <DialogTitle>Update Return Status</DialogTitle>
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
                  <MenuItem value='Pending Inspection'>Pending Inspection</MenuItem>
                  <MenuItem value='Under Inspection'>Under Inspection</MenuItem>
                  <MenuItem value='Approved'>Approved</MenuItem>
                  <MenuItem value='Rejected'>Rejected</MenuItem>
                  <MenuItem value='Requires Repair'>Requires Repair</MenuItem>
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

      {/* Inspection Dialog */}
      <Dialog open={inspectionDialogOpen} onClose={() => setInspectionDialogOpen(false)} maxWidth='md' fullWidth>
        <DialogTitle>Asset Inspection</DialogTitle>
        <DialogContent>
          <Grid container spacing={4} className='pbs-5'>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Physical Condition</InputLabel>
                <Select label='Physical Condition'>
                  <MenuItem value='Excellent'>Excellent</MenuItem>
                  <MenuItem value='Good'>Good</MenuItem>
                  <MenuItem value='Fair'>Fair</MenuItem>
                  <MenuItem value='Poor'>Poor</MenuItem>
                  <MenuItem value='Damaged'>Damaged</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Functional Test</InputLabel>
                <Select label='Functional Test'>
                  <MenuItem value='Passed'>Passed</MenuItem>
                  <MenuItem value='Failed'>Failed</MenuItem>
                  <MenuItem value='Partial'>Partial</MenuItem>
                  <MenuItem value='Not Tested'>Not Tested</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Inspection Notes'
                placeholder='Detailed inspection findings...'
                multiline
                rows={4}
                value={inspectionNotes}
                onChange={(e) => setInspectionNotes(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Box className='flex items-center gap-2 p-4 border-2 border-dashed rounded'>
                <i className='ri-camera-line text-2xl text-gray-400' />
                <div>
                  <Typography variant='body2' className='font-medium'>
                    Upload Inspection Photos
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Take photos of any damages or issues found
                  </Typography>
                </div>
                <Button variant='outlined' size='small'>
                  Browse Files
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInspectionDialogOpen(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleInspectionComplete}>
            Complete Inspection
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default AssetReturnsDetails
