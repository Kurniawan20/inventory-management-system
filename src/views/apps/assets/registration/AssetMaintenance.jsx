'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'

const AssetMaintenance = () => {
  const [formData, setFormData] = useState({
    maintenanceRequired: true,
    maintenanceType: '',
    frequency: '',
    frequencyValue: '',
    frequencyUnit: 'days',
    lastMaintenanceDate: '',
    nextMaintenanceDate: '',
    estimatedDuration: '',
    maintenanceTeam: '',
    skillsRequired: [],
    spareParts: [],
    maintenanceInstructions: '',
    safetyPrecautions: '',
    downtime: {
      planned: '',
      estimated: ''
    },
    cost: {
      estimated: '',
      currency: 'IDR'
    }
  })

  const [customSparePart, setCustomSparePart] = useState('')

  const handleChange = (field, subField = null) => (event, value) => {
    const newValue = value !== undefined ? value : event.target.value
    
    if (subField) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: newValue
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: newValue
      }))
    }
  }

  const handleSwitchChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked
    }))
  }

  const addSparePart = () => {
    if (customSparePart.trim()) {
      setFormData(prev => ({
        ...prev,
        spareParts: [...prev.spareParts, customSparePart.trim()]
      }))
      setCustomSparePart('')
    }
  }

  const removeSparePart = (partToRemove) => {
    setFormData(prev => ({
      ...prev,
      spareParts: prev.spareParts.filter(part => part !== partToRemove)
    }))
  }

  // Maintenance data
  const maintenanceTypes = [
    'Preventive Maintenance',
    'Predictive Maintenance',
    'Corrective Maintenance',
    'Condition-Based Maintenance',
    'Routine Inspection',
    'Overhaul',
    'Calibration',
    'Cleaning & Lubrication'
  ]

  const frequencies = [
    'Daily',
    'Weekly',
    'Monthly',
    'Quarterly',
    'Semi-Annual',
    'Annual',
    'Custom Interval'
  ]

  const frequencyUnits = [
    'hours',
    'days',
    'weeks',
    'months',
    'years',
    'operating hours',
    'cycles'
  ]

  const maintenanceTeams = [
    'Mechanical Team',
    'Electrical Team',
    'Instrumentation Team',
    'Process Team',
    'Safety Team',
    'External Contractor',
    'Multi-disciplinary Team'
  ]

  const skillsRequired = [
    'Mechanical Skills',
    'Electrical Skills',
    'Welding',
    'Instrumentation',
    'Safety Procedures',
    'Confined Space Entry',
    'Hot Work Permit',
    'Crane Operation',
    'Specialized Training',
    'Vendor Certification'
  ]

  const commonSpareParts = [
    'Gaskets & Seals',
    'Bearings',
    'Filters',
    'Belts',
    'Valves',
    'Sensors',
    'Electrical Components',
    'Lubricants',
    'Fasteners',
    'Pipes & Fittings'
  ]

  return (
    <Card>
      <CardHeader
        title='Maintenance Planning'
        subheader='Define maintenance requirements and scheduling for the asset'
      />
      <CardContent>
        <Grid container spacing={6}>
          {/* Maintenance Requirements */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.maintenanceRequired}
                  onChange={handleSwitchChange('maintenanceRequired')}
                />
              }
              label='This asset requires scheduled maintenance'
            />
          </Grid>

          {formData.maintenanceRequired && (
            <>
              {/* Maintenance Type & Frequency */}
              <Grid item xs={12}>
                <Typography variant='h6' className='mb-4'>
                  Maintenance Schedule
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Maintenance Type</InputLabel>
                  <Select
                    value={formData.maintenanceType}
                    onChange={handleChange('maintenanceType')}
                    label='Maintenance Type'
                  >
                    {maintenanceTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Frequency</InputLabel>
                  <Select
                    value={formData.frequency}
                    onChange={handleChange('frequency')}
                    label='Frequency'
                  >
                    {frequencies.map((freq) => (
                      <MenuItem key={freq} value={freq}>
                        {freq}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {formData.frequency === 'Custom Interval' && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Interval Value'
                      type='number'
                      value={formData.frequencyValue}
                      onChange={handleChange('frequencyValue')}
                      placeholder='e.g., 30'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Unit</InputLabel>
                      <Select
                        value={formData.frequencyUnit}
                        onChange={handleChange('frequencyUnit')}
                        label='Unit'
                      >
                        {frequencyUnits.map((unit) => (
                          <MenuItem key={unit} value={unit}>
                            {unit}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Maintenance Dates */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='date'
                  label='Last Maintenance Date'
                  value={formData.lastMaintenanceDate}
                  onChange={handleChange('lastMaintenanceDate')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='date'
                  label='Next Maintenance Date'
                  value={formData.nextMaintenanceDate}
                  onChange={handleChange('nextMaintenanceDate')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* Resource Requirements */}
              <Grid item xs={12}>
                <Typography variant='h6' className='mb-4'>
                  Resource Requirements
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Estimated Duration'
                  value={formData.estimatedDuration}
                  onChange={handleChange('estimatedDuration')}
                  placeholder='e.g., 4 hours, 2 days'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Maintenance Team</InputLabel>
                  <Select
                    value={formData.maintenanceTeam}
                    onChange={handleChange('maintenanceTeam')}
                    label='Maintenance Team'
                  >
                    {maintenanceTeams.map((team) => (
                      <MenuItem key={team} value={team}>
                        {team}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={skillsRequired}
                  value={formData.skillsRequired}
                  onChange={handleChange('skillsRequired')}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant='outlined'
                        label={option}
                        {...getTagProps({ index })}
                        key={option}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Skills Required'
                      placeholder='Select required skills'
                    />
                  )}
                />
              </Grid>

              {/* Spare Parts */}
              <Grid item xs={12}>
                <Typography variant='h6' className='mb-4'>
                  Spare Parts & Materials
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box className='flex gap-2 mb-4'>
                  <TextField
                    fullWidth
                    label='Add Spare Part'
                    value={customSparePart}
                    onChange={(e) => setCustomSparePart(e.target.value)}
                    placeholder='Enter spare part name'
                    onKeyPress={(e) => e.key === 'Enter' && addSparePart()}
                  />
                  <Button
                    variant='outlined'
                    onClick={addSparePart}
                    disabled={!customSparePart.trim()}
                  >
                    Add
                  </Button>
                </Box>

                <Box className='mb-4'>
                  <Typography variant='body2' color='text.secondary' className='mb-2'>
                    Common spare parts:
                  </Typography>
                  <Box className='flex flex-wrap gap-2'>
                    {commonSpareParts.map((part) => (
                      <Chip
                        key={part}
                        label={part}
                        size='small'
                        onClick={() => {
                          if (!formData.spareParts.includes(part)) {
                            setFormData(prev => ({
                              ...prev,
                              spareParts: [...prev.spareParts, part]
                            }))
                          }
                        }}
                        className='cursor-pointer'
                      />
                    ))}
                  </Box>
                </Box>

                {formData.spareParts.length > 0 && (
                  <Box>
                    <Typography variant='body2' className='mb-2'>
                      Selected spare parts:
                    </Typography>
                    <Box className='flex flex-wrap gap-2'>
                      {formData.spareParts.map((part) => (
                        <Chip
                          key={part}
                          label={part}
                          onDelete={() => removeSparePart(part)}
                          color='primary'
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Grid>

              {/* Cost & Downtime */}
              <Grid item xs={12}>
                <Typography variant='h6' className='mb-4'>
                  Cost & Downtime Estimates
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Estimated Cost'
                  type='number'
                  value={formData.cost.estimated}
                  onChange={handleChange('cost', 'estimated')}
                  InputProps={{
                    startAdornment: <span className='mr-2'>IDR</span>
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Estimated Downtime'
                  value={formData.downtime.estimated}
                  onChange={handleChange('downtime', 'estimated')}
                  placeholder='e.g., 2 hours, 1 day'
                />
              </Grid>

              {/* Instructions */}
              <Grid item xs={12}>
                <Typography variant='h6' className='mb-4'>
                  Maintenance Instructions
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label='Maintenance Instructions'
                  value={formData.maintenanceInstructions}
                  onChange={handleChange('maintenanceInstructions')}
                  placeholder='Detailed step-by-step maintenance procedures...'
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label='Safety Precautions'
                  value={formData.safetyPrecautions}
                  onChange={handleChange('safetyPrecautions')}
                  placeholder='Safety requirements, PPE, permits, isolation procedures...'
                />
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AssetMaintenance
