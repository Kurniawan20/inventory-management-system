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
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

// Component Imports
import TextField from '@mui/material/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

const AssetTrackingDetails = () => {
  // States
  const [assetData, setAssetData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [locationUpdateOpen, setLocationUpdateOpen] = useState(false)
  const [transferDialogOpen, setTransferDialogOpen] = useState(false)
  const [newLocation, setNewLocation] = useState('')
  const [transferTo, setTransferTo] = useState('')
  const [comments, setComments] = useState('')

  const params = useParams()
  const assetId = params?.id

  // Sample data - replace with API call
  const sampleAssetData = {
    id: 'AST-001',
    assetCode: 'PMP-2024-001',
    assetName: 'Industrial Pump Unit A',
    category: 'Machinery',
    currentLocation: 'Production Floor - Line A',
    assignedTo: 'John Doe',
    department: 'Production',
    status: 'Active',
    condition: 'Good',
    lastUpdated: '2024-01-20 14:30',
    coordinates: '-6.2088, 106.8456',
    qrCode: 'QR001234567890',
    rfidTag: 'RFID001234567890',
    maintenanceStatus: 'Up to Date',
    nextMaintenance: '2024-03-15',
    specifications: {
      'Serial Number': 'PMP-SN-001234',
      'Manufacturer': 'Grundfos',
      'Model': 'CR 64-2-2',
      'Year': '2023',
      'Flow Rate': '500 L/min',
      'Pressure': '10 bar',
      'Power': '15 kW',
      'Material': 'Stainless Steel'
    },
    locationHistory: [
      {
        id: 1,
        location: 'Production Floor - Line A',
        assignedTo: 'John Doe',
        department: 'Production',
        movedDate: '2024-01-20 14:30',
        movedBy: 'Mike Johnson',
        reason: 'Operational requirement',
        coordinates: '-6.2088, 106.8456'
      },
      {
        id: 2,
        location: 'Maintenance Workshop',
        assignedTo: 'Mike Johnson',
        department: 'Maintenance',
        movedDate: '2024-01-15 09:15',
        movedBy: 'Sarah Wilson',
        reason: 'Scheduled maintenance',
        coordinates: '-6.2090, 106.8458'
      },
      {
        id: 3,
        location: 'Storage Warehouse B',
        assignedTo: 'Storage Team',
        department: 'Logistics',
        movedDate: '2024-01-10 16:45',
        movedBy: 'John Doe',
        reason: 'Initial storage after procurement',
        coordinates: '-6.2092, 106.8460'
      }
    ],
    maintenanceHistory: [
      {
        id: 1,
        type: 'Preventive Maintenance',
        description: 'Regular inspection and lubrication',
        performedBy: 'Mike Johnson',
        date: '2024-01-15',
        status: 'Completed',
        nextDue: '2024-03-15',
        cost: 2500000
      },
      {
        id: 2,
        type: 'Repair',
        description: 'Replaced worn gasket',
        performedBy: 'Technical Team',
        date: '2023-12-20',
        status: 'Completed',
        nextDue: 'N/A',
        cost: 1200000
      }
    ],
    documents: [
      { name: 'Installation_Manual.pdf', size: '3.2 MB', type: 'pdf', uploadDate: '2024-01-10' },
      { name: 'Maintenance_Log.xlsx', size: '1.8 MB', type: 'excel', uploadDate: '2024-01-15' },
      { name: 'Asset_Photo.jpg', size: '2.1 MB', type: 'image', uploadDate: '2024-01-20' }
    ]
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAssetData(sampleAssetData)
      setLoading(false)
    }, 1000)
  }, [assetId])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Available':
        return 'info'
      case 'Under Maintenance':
        return 'warning'
      case 'Out of Service':
        return 'error'
      case 'Disposed':
        return 'default'
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
      case 'excel':
        return 'ri-file-excel-line'
      case 'image':
        return 'ri-image-line'
      default:
        return 'ri-file-line'
    }
  }

  const handleLocationUpdate = () => {
    // Handle location update logic here
    console.log('Updating location to:', newLocation, 'with comments:', comments)
    setLocationUpdateOpen(false)
    setNewLocation('')
    setComments('')
  }

  const handleTransfer = () => {
    // Handle asset transfer logic here
    console.log('Transferring asset to:', transferTo, 'with comments:', comments)
    setTransferDialogOpen(false)
    setTransferTo('')
    setComments('')
  }

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  if (!assetData) {
    return <Typography>Asset not found</Typography>
  }

  return (
    <Grid container spacing={6}>
      {/* Asset Details Card */}
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader
            title={
              <div className='flex items-center gap-2'>
                <Typography variant='h5'>Asset Details</Typography>
                <Chip
                  label={assetData.status}
                  color={getStatusColor(assetData.status)}
                  variant='tonal'
                />
              </div>
            }
            action={
              <div className='flex gap-2'>
                <Button
                  variant='outlined'
                  startIcon={<i className='ri-map-pin-line' />}
                  onClick={() => setLocationUpdateOpen(true)}
                >
                  Update Location
                </Button>
                <Button
                  variant='contained'
                  startIcon={<i className='ri-exchange-line' />}
                  onClick={() => setTransferDialogOpen(true)}
                >
                  Transfer Asset
                </Button>
              </div>
            }
          />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Asset Code
                </Typography>
                <Typography variant='h6' color='primary'>
                  {assetData.assetCode}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Asset Name
                </Typography>
                <Typography variant='h6'>{assetData.assetName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Category
                </Typography>
                <Typography>{assetData.category}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Condition
                </Typography>
                <Chip
                  label={assetData.condition}
                  color={getConditionColor(assetData.condition)}
                  variant='tonal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Current Location
                </Typography>
                <Typography className='font-medium'>{assetData.currentLocation}</Typography>
                <Typography variant='caption' color='text.secondary'>
                  {assetData.coordinates}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Last Updated
                </Typography>
                <Typography>{new Date(assetData.lastUpdated).toLocaleString('id-ID')}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  QR Code
                </Typography>
                <Typography className='font-mono'>{assetData.qrCode}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  RFID Tag
                </Typography>
                <Typography className='font-mono'>{assetData.rfidTag}</Typography>
              </Grid>
            </Grid>

            <Divider className='my-6' />

            {/* Technical Specifications */}
            <Typography variant='h6' className='mb-4'>
              Technical Specifications
            </Typography>
            <Grid container spacing={3}>
              {Object.entries(assetData.specifications).map(([key, value]) => (
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

            {/* Documents */}
            <Typography variant='h6' className='mb-4'>
              Documents & Attachments
            </Typography>
            <Grid container spacing={2}>
              {assetData.documents.map((file, index) => (
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

        {/* Maintenance History */}
        <Card className='mt-6'>
          <CardHeader title='Maintenance History' />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Performed By</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assetData.maintenanceHistory.map((maintenance) => (
                    <TableRow key={maintenance.id}>
                      <TableCell>
                        <Chip label={maintenance.type} size='small' variant='tonal' />
                      </TableCell>
                      <TableCell>{maintenance.description}</TableCell>
                      <TableCell>{maintenance.performedBy}</TableCell>
                      <TableCell>{new Date(maintenance.date).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell>Rp {maintenance.cost.toLocaleString('id-ID')}</TableCell>
                      <TableCell>
                        <Chip label={maintenance.status} size='small' color='success' variant='tonal' />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Assigned User & Location History */}
      <Grid item xs={12} lg={4}>
        {/* Current Assignment */}
        <Card className='mb-6'>
          <CardHeader title='Current Assignment' />
          <CardContent>
            <div className='flex items-center gap-3 mb-4'>
              <CustomAvatar size={50}>
                {getInitials(assetData.assignedTo)}
              </CustomAvatar>
              <div>
                <Typography variant='h6'>{assetData.assignedTo}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  {assetData.department} Department
                </Typography>
              </div>
            </div>
            <Button variant='outlined' fullWidth startIcon={<i className='ri-mail-line' />}>
              Contact User
            </Button>
          </CardContent>
        </Card>

        {/* Location History */}
        <Card>
          <CardHeader title='Location History' />
          <CardContent>
            <Timeline>
              {assetData.locationHistory.map((location, index) => (
                <TimelineItem key={location.id}>
                  <TimelineOppositeContent color='text.secondary' variant='caption'>
                    {new Date(location.movedDate).toLocaleDateString('id-ID')}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color='primary' />
                    {index < assetData.locationHistory.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant='body2' className='font-medium'>
                      {location.location}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Assigned to {location.assignedTo} ({location.department})
                    </Typography>
                    <Typography variant='body2' className='mt-1'>
                      Moved by {location.movedBy}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Reason: {location.reason}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      </Grid>

      {/* Location Update Dialog */}
      <Dialog open={locationUpdateOpen} onClose={() => setLocationUpdateOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Update Asset Location</DialogTitle>
        <DialogContent>
          <Grid container spacing={4} className='pbs-5'>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='New Location'
                placeholder='Enter new location'
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='GPS Coordinates'
                placeholder='Enter coordinates or use current location'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Comments'
                placeholder='Add comments about this location update...'
                multiline
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLocationUpdateOpen(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleLocationUpdate}>
            Update Location
          </Button>
        </DialogActions>
      </Dialog>

      {/* Transfer Asset Dialog */}
      <Dialog open={transferDialogOpen} onClose={() => setTransferDialogOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Transfer Asset</DialogTitle>
        <DialogContent>
          <Grid container spacing={4} className='pbs-5'>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Transfer To</InputLabel>
                <Select
                  value={transferTo}
                  label='Transfer To'
                  onChange={(e) => setTransferTo(e.target.value)}
                >
                  <MenuItem value='John Doe'>John Doe (Production)</MenuItem>
                  <MenuItem value='Jane Smith'>Jane Smith (Safety)</MenuItem>
                  <MenuItem value='Mike Johnson'>Mike Johnson (Maintenance)</MenuItem>
                  <MenuItem value='Sarah Wilson'>Sarah Wilson (IT)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='New Location'
                placeholder='Enter destination location'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Transfer Reason'
                placeholder='Reason for transfer...'
                multiline
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransferDialogOpen(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleTransfer}>
            Transfer Asset
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default AssetTrackingDetails
