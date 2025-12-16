'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

// MUI Imports  
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LinearProgress from '@mui/material/LinearProgress'

// Component Imports
import PutawayStats from '@views/apps/warehouse/inbound/putaway/PutawayStats'

// Server Actions
import { getPutawayList, getPutawaySummary } from '@/server/actions/getPutawayData'

const PutawayPage = () => {
  const router = useRouter()
  const params = useParams()
  const { lang: locale } = params

  const [tasks, setTasks] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [totalTasks, setTotalTasks] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const loadTasks = async (filters = {}) => {
    try {
      setLoading(true)
      const [tasksResult, summaryResult] = await Promise.all([
        getPutawayList({
          search: searchTerm,
          status: statusFilter,
          priority: priorityFilter,
          ...filters
        }),
        getPutawaySummary()
      ])
      
      setTasks(tasksResult.tasks)
      setTotalTasks(tasksResult.total)
      setSummary(summaryResult)
    } catch (error) {
      console.error('Error loading tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadTasks()
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [searchTerm, statusFilter, priorityFilter])

  const getStatusConfig = (status) => {
    const configs = {
      'pending': { color: 'warning', label: 'Pending', icon: 'ri-time-line' },
      'assigned': { color: 'info', label: 'Assigned', icon: 'ri-user-line' },
      'in-progress': { color: 'primary', label: 'In Progress', icon: 'ri-loader-4-line' },
      'completed': { color: 'success', label: 'Completed', icon: 'ri-checkbox-circle-line' }
    }
    return configs[status] || configs['pending']
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  }

  const paginatedTasks = tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Grid container spacing={6}>
      {summary && (
        <Grid item xs={12}>
          <PutawayStats summary={summary} />
        </Grid>
      )}

      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box className='flex items-center gap-2'>
                <i className='ri-archive-stack-line text-2xl' />
                <Box>
                  <Typography variant='h5'>Putaway Management</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Manage warehouse putaway tasks and storage assignments
                  </Typography>
                </Box>
              </Box>
            }
            action={
              <Chip 
                label={`${totalTasks} Tasks`} 
                color='primary' 
                variant='tonal'
              />
            }
          />
          <CardContent>
            <Box className='flex items-center justify-between gap-4 mb-6 flex-wrap'>
              <Box className='flex items-center gap-4 flex-wrap'>
                <TextField
                  size='small'
                  placeholder='Search tasks...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='min-w-64'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-search-line' />
                      </InputAdornment>
                    )
                  }}
                />
                <FormControl size='small' className='min-w-40'>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label='Status'
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value=''>All Status</MenuItem>
                    <MenuItem value='pending'>Pending</MenuItem>
                    <MenuItem value='assigned'>Assigned</MenuItem>
                    <MenuItem value='in-progress'>In Progress</MenuItem>
                    <MenuItem value='completed'>Completed</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size='small' className='min-w-40'>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={priorityFilter}
                    label='Priority'
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <MenuItem value=''>All Priority</MenuItem>
                    <MenuItem value='low'>Low</MenuItem>
                    <MenuItem value='medium'>Medium</MenuItem>
                    <MenuItem value='high'>High</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button
                variant='outlined'
                startIcon={<i className='ri-download-line' />}
                size='small'
              >
                Export
              </Button>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Putaway ID</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>From → To</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell align='right'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8}>
                        <LinearProgress />
                      </TableCell>
                    </TableRow>
                  ) : paginatedTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align='center'>
                        <Box className='flex flex-col items-center justify-center py-8'>
                          <i className='ri-archive-line text-6xl text-textSecondary mb-2' />
                          <Typography variant='body1' color='text.secondary'>
                            No putaway tasks found
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedTasks.map((task) => {
                      const statusConfig = getStatusConfig(task.status)
                      
                      return (
                        <TableRow key={task.putaway_id} hover>
                          <TableCell>
                            <Typography variant='body2' className='font-medium'>
                              {task.putaway_id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant='body2'>
                              {task.item_name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={task.quantity} size='small' variant='outlined' />
                          </TableCell>
                          <TableCell>
                            <Box className='flex items-center gap-1'>
                              <Typography variant='caption' className='text-xs'>
                                {task.from_location}
                              </Typography>
                              <i className='ri-arrow-right-line text-sm' />
                              <Typography variant='caption' className='text-xs font-medium'>
                                {task.to_location}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant='body2' className='text-xs'>
                              {task.assigned_to || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={statusConfig.label}
                              color={statusConfig.color}
                              size='small'
                              variant='tonal'
                              icon={<i className={statusConfig.icon} />}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={task.priority.toUpperCase()}
                              color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'info' : 'default'}
                              size='small'
                            />
                          </TableCell>
                          <TableCell align='right'>
                            <Tooltip title='View Details'>
                              <IconButton size='small'>
                                <i className='ri-eye-line' />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component='div'
                count={tasks.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10))
                  setPage(0)
                }}
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PutawayPage
