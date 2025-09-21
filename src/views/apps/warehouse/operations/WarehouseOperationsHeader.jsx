'use client'

// React Imports
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

const WarehouseOperationsHeader = () => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleClose = () => {
    setAnchorEl(null)
  }
  
  const activeWarehouseId = 'WH-CILACAP-001'
  const activeWarehouseName = 'Pertamina Refinery Cilacap'
  
  return (
    <>
      <Box className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
        <div>
          <Typography variant='h4' className='mb-1'>
            Warehouse Operations
          </Typography>
          <Box className='flex items-center gap-2'>
            <Typography>
              Monitor and manage warehouse activities in real-time
            </Typography>
            <Chip 
              label={`Active: ${activeWarehouseName}`}
              color="primary"
              size="small"
              variant="outlined"
              icon={<i className="ri-warehouse-line" />}
            />
          </Box>
        </div>
        <div className='flex flex-wrap max-sm:flex-col gap-4'>
          <Button 
            variant='outlined' 
            color='primary'
            onClick={handleClick}
            startIcon={<i className='ri-warehouse-line' />}
          >
            Switch Warehouse
          </Button>
          <Button 
            variant='contained'
            startIcon={<i className='ri-add-line' />}
            onClick={() => router.push('/en/apps/warehouse/operations/create-task')}
          >
            Create New Task
          </Button>
        </div>
      </Box>
      
      <Box className='flex flex-wrap items-center justify-between gap-4 mt-6 mb-1'>
        <Box className='flex items-center gap-3'>
          <Tooltip title="Active Tasks">
            <Chip 
              label="12 Active Tasks" 
              color="warning" 
              icon={<i className="ri-time-line" />} 
            />
          </Tooltip>
          <Tooltip title="Completed Today">
            <Chip 
              label="24 Completed" 
              color="success" 
              icon={<i className="ri-check-double-line" />} 
            />
          </Tooltip>
          <Tooltip title="Staff On Duty">
            <Chip 
              label="8 Staff On Duty" 
              color="info" 
              icon={<i className="ri-user-line" />} 
            />
          </Tooltip>
        </Box>
        <Box className='flex items-center gap-2'>
          <Tooltip title="Refresh Data">
            <IconButton size="small">
              <i className="ri-refresh-line" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter">
            <IconButton size="small">
              <i className="ri-filter-3-line" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton size="small">
              <i className="ri-settings-3-line" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem selected>
          <ListItemIcon>
            <i className="ri-warehouse-line" style={{ fontSize: '1.25rem' }} />
          </ListItemIcon>
          <ListItemText>Pertamina Refinery Cilacap</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <i className="ri-warehouse-line" style={{ fontSize: '1.25rem' }} />
          </ListItemIcon>
          <ListItemText>Pertamina Refinery Balikpapan</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <i className="ri-warehouse-line" style={{ fontSize: '1.25rem' }} />
          </ListItemIcon>
          <ListItemText>Pertamina Refinery Dumai</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <i className="ri-settings-line" style={{ fontSize: '1.25rem' }} />
          </ListItemIcon>
          <ListItemText>Manage Warehouses</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default WarehouseOperationsHeader
