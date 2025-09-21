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

const RecentAssetActivity = ({ data }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'registration':
        return 'ri-add-circle-line'
      case 'transfer':
        return 'ri-exchange-line'
      case 'maintenance':
        return 'ri-tools-line'
      case 'disposal':
        return 'ri-delete-bin-line'
      default:
        return 'ri-file-line'
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'registration':
        return 'success'
      case 'transfer':
        return 'info'
      case 'maintenance':
        return 'warning'
      case 'disposal':
        return 'error'
      default:
        return 'primary'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'in_progress':
        return 'info'
      default:
        return 'default'
    }
  }

  return (
    <Card>
      <CardHeader
        title='Recent Asset Activity'
        subheader='Latest asset management activities'
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
                <TableCell>Asset</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>User</TableCell>
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
                          {activity.assetName}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {activity.assetCode}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>
                      {activity.action}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>
                      {activity.user}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' color='text.secondary'>
                      {activity.timestamp}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={activity.status}
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

export default RecentAssetActivity
