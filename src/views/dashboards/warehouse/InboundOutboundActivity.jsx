'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const InboundOutboundActivity = ({ data }) => {
  const getActivityIcon = (type) => {
    return type === 'inbound' ? 'ri-download-line' : 'ri-upload-line'
  }

  const getActivityColor = (type) => {
    return type === 'inbound' ? 'success' : 'info'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'received':
      case 'dispatched':
        return 'success'
      case 'quality_check':
      case 'packed':
        return 'warning'
      case 'pending':
        return 'info'
      default:
        return 'default'
    }
  }

  return (
    <Card>
      <CardHeader
        title='Recent Warehouse Activity'
        subheader='Latest inbound and outbound operations'
        action={
          <IconButton size='small'>
            <i className='ri-more-2-line' />
          </IconButton>
        }
      />
      <CardContent className='p-0'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Source/Destination</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <CustomAvatar
                        variant='rounded'
                        color={getActivityColor(activity.type)}
                        size={36}
                      >
                        <i className={getActivityIcon(activity.type)} />
                      </CustomAvatar>
                      <div className='flex flex-col'>
                        <Typography variant='body2' className='font-medium'>
                          {activity.itemName}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {activity.type === 'inbound' ? 'Inbound' : 'Outbound'}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>
                      {activity.quantity.toLocaleString()} {activity.unit}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>
                      {activity.supplier || activity.destination}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' color='text.secondary'>
                      {activity.timestamp}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={activity.status.replace('_', ' ')}
                      color={getStatusColor(activity.status)}
                      size='small'
                      variant='tonal'
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default InboundOutboundActivity
