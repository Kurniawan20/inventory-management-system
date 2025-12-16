'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
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

const FoodIngredientsPage = () => {
  const ingredients = [
    { id: 'ING-001', name: 'Premium Coffee Beans', category: 'Beverage', qty: 250, unit: 'kg', expiry: '2024-06-15', temp: '15-20°C', daysToExpiry: 45, status: 'good' },
    { id: 'ING-002', name: 'Organic Sugar', category: 'Sweetener', qty: 500, unit: 'kg', expiry: '2025-12-31', temp: 'Room Temp', daysToExpiry: 600, status: 'good' },
    { id: 'ING-003', name: 'Fresh Milk', category: 'Dairy', qty: 100, unit: 'L', expiry: '2024-03-25', temp: '2-4°C', daysToExpiry: 5, status: 'critical' },
    { id: 'ING-004', name: 'Chocolate Powder', category: 'Beverage', qty: 75, unit: 'kg', expiry: '2024-09-01', temp: 'Room Temp', daysToExpiry: 120, status: 'warning' }
  ]

  const getStatusColor = (status) => {
    if (status === 'critical') return 'error'
    if (status === 'warning') return 'warning'
    return 'success'
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box className='mb-4'>
          <Typography variant='h5'>Food Ingredients Inventory</Typography>
          <Typography variant='body2' color='text.secondary'>Track food ingredients with expiry and temperature monitoring</Typography>
        </Box>
        
        <Grid container spacing={4} className='mb-6'>
          <Grid item xs={12} sm={4}>
            <Card><CardContent sx={{ minHeight: '100px' }}>
              <Typography variant='h4'>4</Typography>
              <Typography variant='body2' color='text.secondary'>Total Ingredients</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card><CardContent sx={{ minHeight: '100px' }}>
              <Typography variant='h4' color='error'>1</Typography>
              <Typography variant='body2' color='text.secondary'>Critical Expiry</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card><CardContent sx={{ minHeight: '100px' }}>
              <Typography variant='h4'>925</Typography>
              <Typography variant='body2' color='text.secondary'>Total Quantity (kg/L)</Typography>
            </CardContent></Card>
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ingredient</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Storage Temp</TableCell>
                    <TableCell>Days to Expiry</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredients.map(ing => (
                    <TableRow key={ing.id} hover>
                      <TableCell><Typography variant='body2' className='font-medium'>{ing.name}</Typography></TableCell>
                      <TableCell><Chip label={ing.category} size='small' variant='outlined' /></TableCell>
                      <TableCell>{ing.qty} {ing.unit}</TableCell>
                      <TableCell><Typography variant='caption'>{new Date(ing.expiry).toLocaleDateString()}</Typography></TableCell>
                      <TableCell><Chip label={ing.temp} size='small' /></TableCell>
                      <TableCell>
                        <Box className='flex items-center gap-2'>
                          <LinearProgress variant='determinate' value={Math.min((ing.daysToExpiry / 365) * 100, 100)} className='w-20' color={getStatusColor(ing.status)} />
                          <Typography variant='caption'>{ing.daysToExpiry} days</Typography>
                        </Box>
                      </TableCell>
                      <TableCell><Chip label={ing.status === 'critical' ? 'Critical' : ing.status === 'warning' ? 'Warning' : 'Good'} color={getStatusColor(ing.status)} size='small' /></TableCell>
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

export default FoodIngredientsPage
