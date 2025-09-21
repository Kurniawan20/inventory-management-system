'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import IconButton from '@mui/material/IconButton'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const MaintenanceAlerts = ({ data }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'error'
      case 'high':
        return 'warning'
      case 'medium':
        return 'info'
      default:
        return 'default'
    }
  }

  const getPriorityIcon = (type) => {
    switch (type) {
      case 'Preventive Maintenance':
        return 'ri-calendar-check-line'
      case 'Corrective Maintenance':
        return 'ri-tools-line'
      case 'Inspection':
        return 'ri-search-eye-line'
      default:
        return 'ri-alert-line'
    }
  }

  return (
    <Card className='h-full'>
      <CardHeader
        title='Maintenance Alerts'
        subheader='Upcoming and overdue maintenance tasks'
        action={
          <IconButton size='small'>
            <i className='ri-more-2-line' />
          </IconButton>
        }
      />
      <CardContent className='p-0'>
        <List>
          {data?.map((alert, index) => (
            <ListItem key={alert.id} divider={index < data.length - 1}>
              <ListItemAvatar>
                <CustomAvatar
                  variant='rounded'
                  color={getPriorityColor(alert.priority)}
                  size={40}
                >
                  <i className={getPriorityIcon(alert.type)} />
                </CustomAvatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div className='flex items-center justify-between'>
                    <Typography variant='body1' className='font-medium'>
                      {alert.assetName}
                    </Typography>
                    <Chip
                      label={alert.priority}
                      color={getPriorityColor(alert.priority)}
                      size='small'
                      variant='tonal'
                    />
                  </div>
                }
                secondary={
                  <div className='flex flex-col gap-1 mt-1'>
                    <Typography variant='body2' color='text.secondary'>
                      {alert.type} • Due: {alert.dueDate}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      <i className='ri-map-pin-line text-xs mr-1' />
                      {alert.location}
                    </Typography>
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default MaintenanceAlerts
