'use client'

import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'

const PickingManagementPage = () => {
  const pickingTasks = [
    { pick_id: 'PICK-001', order_id: 'SO-2024-001', items: 5, picked: 5, picker: 'John Picker', status: 'completed', priority: 'high', location: 'Zone A', progress: 100 },
    { pick_id: 'PICK-002', order_id: 'SO-2024-002', items: 8, picked: 3, picker: 'Jane Picker', status: 'in-progress', priority: 'medium', location: 'Zone B', progress: 38 },
    { pick_id: 'PICK-003', order_id: 'SO-2024-003', items: 3, picked: 0, picker: null, status: 'pending', priority: 'high', location: 'Zone A', progress: 0 }
  ]

  const getStatusChip = (status) => {
    const configs = {
      'pending': { color: 'warning', label: 'Pending' },
      'in-progress': { color: 'info', label: 'In Progress' },
      'completed': { color: 'success', label: 'Completed' }
    }
    return <Chip {...configs[status]} size='small' />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={
            <Box className='flex items-center gap-2'>
              <i className='ri-shopping-basket-line text-2xl' />
              <Box>
                <Typography variant='h5'>Picking Management</Typography>
                <Typography variant='body2' color='text.secondary'>Manage order picking tasks and assignments</Typography>
              </Box>
            </Box>
          } />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Pick ID</TableCell>
                    <TableCell>Order</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Picker</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pickingTasks.map(task => (
                    <TableRow key={task.pick_id} hover>
                      <TableCell><Typography variant='body2' className='font-medium'>{task.pick_id}</Typography></TableCell>
                      <TableCell>{task.order_id}</TableCell>
                      <TableCell><Chip label={task.location} size='small' variant='outlined' /></TableCell>
                      <TableCell>{task.picker || '-'}</TableCell>
                      <TableCell>
                        <Box className='flex items-center gap-2'>
                          <LinearProgress variant='determinate' value={task.progress} className='w-24' />
                          <Typography variant='caption'>{task.picked}/{task.items}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell><Chip label={task.priority.toUpperCase()} color={task.priority === 'high' ? 'error' : 'default'} size='small' /></TableCell>
                      <TableCell>{getStatusChip(task.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PickingManagementPage
