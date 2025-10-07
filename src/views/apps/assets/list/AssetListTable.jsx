'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const AssetListTable = ({ assets, loading }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedAsset, setSelectedAsset] = useState(null)
  const params = useParams()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleMenuClick = (event, asset) => {
    setAnchorEl(event.currentTarget)
    setSelectedAsset(asset)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedAsset(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'tersedia':
        return 'success'
      case 'dipakai':
        return 'info'
      case 'rusak':
        return 'error'
      case 'habis':
        return 'warning'
      case 'dipensiunkan':
        return 'secondary'
      case 'Active':
        return 'success'
      case 'Under Maintenance':
        return 'warning'
      case 'Inactive':
        return 'secondary'
      case 'Disposed':
        return 'error'
      default:
        return 'default'
    }
  }

  const getCriticalityColor = (criticality) => {
    switch (criticality) {
      case 'Very High':
        return 'error'
      case 'High':
        return 'warning'
      case 'Medium':
        return 'info'
      case 'Low':
        return 'success'
      default:
        return 'default'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Production Equipment':
        return 'ri-settings-3-line'
      case 'Processing Units':
        return 'ri-cpu-line'
      case 'Storage & Tanks':
        return 'ri-database-2-line'
      case 'Transportation':
        return 'ri-truck-line'
      case 'Safety Equipment':
        return 'ri-shield-check-line'
      default:
        return 'ri-tools-line'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const paginatedAssets = assets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  if (loading) {
    return (
      <Card>
        <Box className='flex justify-center items-center p-8'>
          <CircularProgress />
        </Box>
      </Card>
    )
  }

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>UOM</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Storage</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAssets.map((asset) => (
              <TableRow key={asset.id} hover>
                <TableCell>
                  <Box className='flex items-center gap-3'>
                    <CustomAvatar
                      variant='rounded'
                      color='primary'
                      size={40}
                    >
                      <i className={getCategoryIcon(asset.category.primary)} />
                    </CustomAvatar>
                    <Box>
                      <Link 
                        href={`/${params.lang}/apps/assets/details/${asset.id}`}
                        className='no-underline'
                      >
                        <Typography 
                          variant='body2' 
                          className='font-medium text-primary cursor-pointer hover:text-primary-dark'
                        >
                          {asset.name}
                        </Typography>
                      </Link>
                      <Typography variant='caption' color='text.secondary'>
                        {asset.assetCode} • {asset.manufacturer}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' className='font-medium'>
                    {asset.type || '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box className='flex items-center gap-2'>
                    {asset.color && (
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          backgroundColor: asset.color.toLowerCase(),
                          border: '1px solid #ddd'
                        }}
                      />
                    )}
                    <Typography variant='body2'>
                      {asset.color || '-'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant='body2'>
                    {asset.size || '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={asset.uom || 'pcs'}
                    size='small'
                    variant='outlined'
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={asset.status}
                    color={getStatusColor(asset.status)}
                    size='small'
                    variant='tonal'
                  />
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant='body2' className='font-medium'>
                      {asset.location?.location_name || asset.location?.facility || '-'}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {asset.location?.location_id || '-'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant='body2' className='font-medium'>
                      {asset.location?.rack || '-'}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {asset.location?.bin_location || '-'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant='body2' className='font-medium'>
                      {asset.category?.primary || '-'}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {asset.category?.sub || '-'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align='center'>
                  <IconButton
                    size='small'
                    onClick={(e) => handleMenuClick(e, asset)}
                  >
                    <i className='ri-more-2-line' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        component='div'
        count={assets.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem 
          onClick={handleMenuClose}
          component={Link}
          href={`/${params.lang}/apps/assets/details/${selectedAsset?.id}`}
        >
          <i className='ri-eye-line mr-2' />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className='ri-edit-line mr-2' />
          Edit Asset
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className='ri-map-pin-line mr-2' />
          Track Location
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className='ri-tools-line mr-2' />
          Schedule Maintenance
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className='ri-qr-code-line mr-2' />
          Generate QR Code
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className='ri-file-download-line mr-2' />
          Export Data
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <i className='ri-delete-bin-line mr-2' />
          Delete Asset
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default AssetListTable
