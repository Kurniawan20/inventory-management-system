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
import InputAdornment from '@mui/material/InputAdornment'

const AssetSpecifications = () => {
  const [formData, setFormData] = useState({
    dimensions: {
      length: '',
      width: '',
      height: '',
      unit: 'cm'
    },
    weight: '',
    weightUnit: 'kg',
    powerRating: '',
    powerUnit: 'kW',
    voltage: '',
    frequency: '',
    capacity: '',
    capacityUnit: 'L',
    operatingTemp: {
      min: '',
      max: ''
    },
    pressure: '',
    pressureUnit: 'bar',
    specifications: ''
  })

  const handleChange = (field, subField = null) => (event) => {
    if (subField) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: event.target.value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value
      }))
    }
  }

  const unitOptions = {
    dimension: ['mm', 'cm', 'm'],
    weight: ['g', 'kg', 'ton'],
    power: ['W', 'kW', 'MW', 'HP'],
    capacity: ['mL', 'L', 'm³', 'gal'],
    pressure: ['Pa', 'kPa', 'bar', 'psi']
  }

  return (
    <Card>
      <CardHeader
        title='Technical Specifications'
        subheader='Enter detailed technical specifications and measurements'
      />
      <CardContent>
        <Grid container spacing={6}>
          {/* Dimensions */}
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label='Length'
                  value={formData.dimensions.length}
                  onChange={handleChange('dimensions', 'length')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <FormControl variant='standard' sx={{ minWidth: 50 }}>
                          <Select
                            value={formData.dimensions.unit}
                            onChange={handleChange('dimensions', 'unit')}
                            size='small'
                          >
                            {unitOptions.dimension.map((unit) => (
                              <MenuItem key={unit} value={unit}>
                                {unit}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label='Width'
                  value={formData.dimensions.width}
                  onChange={handleChange('dimensions', 'width')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        {formData.dimensions.unit}
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label='Height'
                  value={formData.dimensions.height}
                  onChange={handleChange('dimensions', 'height')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        {formData.dimensions.unit}
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label='Weight'
                  value={formData.weight}
                  onChange={handleChange('weight')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <FormControl variant='standard' sx={{ minWidth: 50 }}>
                          <Select
                            value={formData.weightUnit}
                            onChange={handleChange('weightUnit')}
                            size='small'
                          >
                            {unitOptions.weight.map((unit) => (
                              <MenuItem key={unit} value={unit}>
                                {unit}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Power & Electrical */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Power Rating'
              value={formData.powerRating}
              onChange={handleChange('powerRating')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <FormControl variant='standard' sx={{ minWidth: 60 }}>
                      <Select
                        value={formData.powerUnit}
                        onChange={handleChange('powerUnit')}
                        size='small'
                      >
                        {unitOptions.power.map((unit) => (
                          <MenuItem key={unit} value={unit}>
                            {unit}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Voltage'
              value={formData.voltage}
              onChange={handleChange('voltage')}
              InputProps={{
                endAdornment: <InputAdornment position='end'>V</InputAdornment>
              }}
            />
          </Grid>

          {/* Operating Parameters */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Frequency'
              value={formData.frequency}
              onChange={handleChange('frequency')}
              InputProps={{
                endAdornment: <InputAdornment position='end'>Hz</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Capacity'
              value={formData.capacity}
              onChange={handleChange('capacity')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <FormControl variant='standard' sx={{ minWidth: 50 }}>
                      <Select
                        value={formData.capacityUnit}
                        onChange={handleChange('capacityUnit')}
                        size='small'
                      >
                        {unitOptions.capacity.map((unit) => (
                          <MenuItem key={unit} value={unit}>
                            {unit}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          {/* Temperature Range */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Min Operating Temperature'
              value={formData.operatingTemp.min}
              onChange={handleChange('operatingTemp', 'min')}
              InputProps={{
                endAdornment: <InputAdornment position='end'>°C</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Max Operating Temperature'
              value={formData.operatingTemp.max}
              onChange={handleChange('operatingTemp', 'max')}
              InputProps={{
                endAdornment: <InputAdornment position='end'>°C</InputAdornment>
              }}
            />
          </Grid>

          {/* Pressure */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Operating Pressure'
              value={formData.pressure}
              onChange={handleChange('pressure')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <FormControl variant='standard' sx={{ minWidth: 50 }}>
                      <Select
                        value={formData.pressureUnit}
                        onChange={handleChange('pressureUnit')}
                        size='small'
                      >
                        {unitOptions.pressure.map((unit) => (
                          <MenuItem key={unit} value={unit}>
                            {unit}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          {/* Additional Specifications */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label='Additional Specifications'
              placeholder='Enter any additional technical specifications, certifications, or special requirements...'
              value={formData.specifications}
              onChange={handleChange('specifications')}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AssetSpecifications
