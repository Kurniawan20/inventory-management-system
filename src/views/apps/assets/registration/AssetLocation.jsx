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
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// Hook Imports
import { useAssetRegistration } from './AssetRegistrationProvider'

const AssetLocation = () => {
  const { formData, updateNestedFormData, errors } = useAssetRegistration()
  const [currentLocation, setCurrentLocation] = useState(null)

  const handleChange = (field, subField = null) => (event, value) => {
    const newValue = value !== undefined ? value : event.target.value
    
    if (subField) {
      updateNestedFormData('location', field, {
        ...formData.location[field],
        [subField]: newValue
      })
    } else {
      updateNestedFormData('location', field, newValue)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          updateNestedFormData('location', 'coordinates', {
            latitude: latitude.toString(),
            longitude: longitude.toString()
          })
          setCurrentLocation({ latitude, longitude })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  // Mock data for dropdowns
  const facilities = [
    'Pertamina Refinery Cilacap',
    'Pertamina Refinery Balikpapan',
    'Pertamina Refinery Dumai',
    'Pertamina Terminal Tanjung Priok',
    'Pertamina Office Jakarta'
  ]

  const buildings = [
    'Main Processing Unit',
    'Administration Building',
    'Warehouse A',
    'Warehouse B',
    'Maintenance Workshop',
    'Control Room Building'
  ]

  const departments = [
    'Operations',
    'Maintenance',
    'Engineering',
    'Safety & Environment',
    'Quality Control',
    'Administration',
    'IT & Telecommunications'
  ]

  const responsiblePersons = [
    'Ahmad Suryanto',
    'Siti Nurhaliza',
    'Budi Santoso',
    'Dewi Kartika',
    'Eko Prasetyo',
    'Fitri Handayani'
  ]

  const provinces = [
    'DKI Jakarta',
    'Jawa Barat',
    'Jawa Tengah',
    'Jawa Timur',
    'Kalimantan Timur',
    'Sumatera Utara',
    'Riau'
  ]

  return (
    <Card>
      <CardHeader
        title='Asset Location & Assignment'
        subheader='Specify the physical location and responsible parties for this asset'
      />
      <CardContent>
        <Grid container spacing={6}>
          {/* Facility Information */}
          <Grid item xs={12}>
            <Typography variant='h6' className='mb-4'>
              Facility Information
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={facilities}
              value={formData.location.facility}
              onChange={handleChange('facility')}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label='Facility/Site' 
                  fullWidth 
                  required
                  error={!!errors.facility}
                  helperText={errors.facility}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={buildings}
              value={formData.location.building}
              onChange={handleChange('building')}
              renderInput={(params) => (
                <TextField {...params} label='Building/Unit' fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label='Floor/Level'
              value={formData.location.floor}
              onChange={handleChange('floor')}
              placeholder='e.g., Ground Floor, Level 2'
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label='Room/Area'
              value={formData.location.room}
              onChange={handleChange('room')}
              placeholder='e.g., Room 101, Control Room'
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label='Zone/Section'
              value={formData.location.zone}
              onChange={handleChange('zone')}
              placeholder='e.g., Zone A, Production Area'
            />
          </Grid>

          {/* GPS Coordinates */}
          <Grid item xs={12}>
            <Typography variant='h6' className='mb-4'>
              GPS Coordinates
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label='Latitude'
              value={formData.location.coordinates.latitude}
              onChange={handleChange('coordinates', 'latitude')}
              placeholder='-6.2088'
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label='Longitude'
              value={formData.location.coordinates.longitude}
              onChange={handleChange('coordinates', 'longitude')}
              placeholder='106.8456'
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant='outlined'
              onClick={getCurrentLocation}
              startIcon={<i className='ri-map-pin-line' />}
              sx={{ height: '56px' }}
            >
              Get Current
            </Button>
          </Grid>

          {currentLocation && (
            <Grid item xs={12}>
              <Box className='p-4 bg-green-50 rounded-lg'>
                <Typography variant='body2' color='success.main'>
                  <i className='ri-check-line mr-2' />
                  Location captured: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                </Typography>
              </Box>
            </Grid>
          )}

          {/* Address Information */}
          <Grid item xs={12}>
            <Typography variant='h6' className='mb-4'>
              Address Information
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Street Address'
              value={formData.location.address.street}
              onChange={handleChange('address', 'street')}
              placeholder='Enter complete street address'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='City'
              value={formData.location.address.city}
              onChange={handleChange('address', 'city')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={provinces}
              value={formData.location.address.province}
              onChange={handleChange('address', 'province')}
              renderInput={(params) => (
                <TextField {...params} label='Province' fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Postal Code'
              value={formData.location.address.postalCode}
              onChange={handleChange('address', 'postalCode')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Country'
              value={formData.location.address.country}
              onChange={handleChange('address', 'country')}
              disabled
            />
          </Grid>

          {/* Storage & Warehouse Details */}
          <Grid item xs={12}>
            <Typography variant='h6' className='mb-4'>
              Storage & Warehouse Details
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Location ID'
              value={formData.location.location_id}
              onChange={handleChange('location_id')}
              placeholder='e.g., WH-001, GDG-A01'
              helperText='ID lokasi/gudang'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Location Name'
              value={formData.location.location_name}
              onChange={handleChange('location_name')}
              placeholder='e.g., Gudang A, WH-01, Ruang Server'
              helperText='Nama lokasi'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Rack Number'
              value={formData.location.rack}
              onChange={handleChange('rack')}
              placeholder='e.g., R-001, Rack-A1'
              helperText='Nomor rak penyimpanan'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Bin Location'
              value={formData.location.bin_location}
              onChange={handleChange('bin_location')}
              placeholder='e.g., A1-B2, Slot-001'
              helperText='Slot/bin lokasi penyimpanan'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Contact Person'
              value={formData.location.contact_person}
              onChange={handleChange('contact_person')}
              placeholder='e.g., Ahmad Warehouse'
              helperText='Penanggung jawab lokasi'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* Spacer for layout */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label='Storage Notes'
              value={formData.location.notes}
              onChange={handleChange('notes')}
              placeholder='Additional notes about storage location, handling instructions, etc.'
              helperText='Catatan tambahan'
            />
          </Grid>

          {/* Responsibility Assignment */}
          <Grid item xs={12}>
            <Typography variant='h6' className='mb-4'>
              Responsibility Assignment
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={responsiblePersons}
              value={formData.location.responsiblePerson}
              onChange={handleChange('responsiblePerson')}
              renderInput={(params) => (
                <TextField {...params} label='Responsible Person' fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={departments}
              value={formData.location.department}
              onChange={handleChange('department')}
              renderInput={(params) => (
                <TextField {...params} label='Department' fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Cost Center'
              value={formData.location.costCenter}
              onChange={handleChange('costCenter')}
              placeholder='e.g., CC-001, PROD-2024'
            />
          </Grid>

          {/* Location Summary */}
          {(formData.location.facility || formData.location.building) && (
            <Grid item xs={12}>
              <Box className='p-4 bg-blue-50 rounded-lg'>
                <Typography variant='subtitle2' className='mb-2'>
                  Location Summary:
                </Typography>
                <Box className='flex flex-wrap gap-2'>
                  {formData.location.facility && (
                    <Chip label={formData.location.facility} size='small' color='primary' />
                  )}
                  {formData.location.building && (
                    <Chip label={formData.location.building} size='small' color='secondary' />
                  )}
                  {formData.location.floor && (
                    <Chip label={`Floor: ${formData.location.floor}`} size='small' />
                  )}
                  {formData.location.room && (
                    <Chip label={`Room: ${formData.location.room}`} size='small' />
                  )}
                  {formData.location.department && (
                    <Chip label={formData.location.department} size='small' color='success' />
                  )}
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AssetLocation
