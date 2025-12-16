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

// Component Imports
import QualityCheckTable from '@views/apps/warehouse/inbound/quality-check/QualityCheckTable'
import QualityCheckStats from '@views/apps/warehouse/inbound/quality-check/QualityCheckStats'

// Server Actions
import { getQualityCheckList, getQualityCheckSummary } from '@/server/actions/getQualityCheckData'

const QualityCheckPage = () => {
  const router = useRouter()
  const params = useParams()
  const { lang: locale } = params

  const [inspections, setInspections] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [totalInspections, setTotalInspections] = useState(0)

  // Load inspections and summary
  const loadInspections = async (filters = {}) => {
    try {
      setLoading(true)
      const [inspectionsResult, summaryResult] = await Promise.all([
        getQualityCheckList({
          search: searchTerm,
          status: statusFilter,
          priority: priorityFilter,
          ...filters
        }),
        getQualityCheckSummary()
      ])
      
      setInspections(inspectionsResult.inspections)
      setTotalInspections(inspectionsResult.total)
      setSummary(summaryResult)
    } catch (error) {
      console.error('Error loading inspections:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    loadInspections()
  }, [])

  // Search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadInspections()
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [searchTerm, statusFilter, priorityFilter])

  const handleAddInspection = () => {
    router.push(`/${locale}/apps/warehouse/inbound/quality-check/create`)
  }

  const handleEditInspection = (inspection) => {
    router.push(`/${locale}/apps/warehouse/inbound/quality-check/${inspection.qc_id}`)
  }

  const handleDeleteInspection = async (qcId) => {
    await loadInspections()
  }

  return (
    <Grid container spacing={6}>
      {/* Statistics Cards */}
      {summary && (
        <Grid item xs={12}>
          <QualityCheckStats summary={summary} />
        </Grid>
      )}

      {/* Main Content */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box className='flex items-center gap-2'>
                <i className='ri-shield-check-line text-2xl' />
                <Box>
                  <Typography variant='h5'>Quality Check</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Perform quality check on received goods
                  </Typography>
                </Box>
              </Box>
            }
            action={
              <Box className='flex items-center gap-4'>
                <Chip 
                  label={`${totalInspections} Inspections`} 
                  color='primary' 
                  variant='tonal'
                />
                <Button
                  variant='contained'
                  startIcon={<i className='ri-add-line' />}
                  onClick={handleAddInspection}
                >
                  Create Inspection
                </Button>
              </Box>
            }
          />
          <CardContent>
            <Box className='flex items-center justify-between gap-4 mb-6 flex-wrap'>
              <Box className='flex items-center gap-4 flex-wrap'>
                <TextField
                  size='small'
                  placeholder='Search inspections...'
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
                    <MenuItem value='in-progress'>In Progress</MenuItem>
                    <MenuItem value='passed'>Passed</MenuItem>
                    <MenuItem value='failed'>Failed</MenuItem>
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
              <Box className='flex items-center gap-2'>
                <Button
                  variant='outlined'
                  startIcon={<i className='ri-download-line' />}
                  size='small'
                >
                  Export
                </Button>
              </Box>
            </Box>

            <QualityCheckTable
              inspections={inspections}
              loading={loading}
              onEdit={handleEditInspection}
              onDelete={handleDeleteInspection}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default QualityCheckPage
