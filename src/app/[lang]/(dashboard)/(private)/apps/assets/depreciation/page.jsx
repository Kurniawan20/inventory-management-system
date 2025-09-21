// React Imports
import { getDictionary } from '@/utils/getDictionary'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

// Component Imports
import AssetDepreciation from '@/views/apps/assets/depreciation/AssetDepreciation'

const AssetDepreciationPage = async ({ params }) => {
  // Vars
  const { lang: locale } = params
  const dictionary = await getDictionary(locale)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href={`/${locale}/dashboards/assets`} underline="hover" color="inherit">
              Asset Management
            </Link>
            <Typography color="text.primary">Asset Depreciation</Typography>
          </Breadcrumbs>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Asset Depreciation Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Kelola penyusutan aset, perhitungan nilai buku, dan jadwal depresiasi
          </Typography>
        </Box>
      </Grid>
      
      <Grid item xs={12}>
        <AssetDepreciation />
      </Grid>
    </Grid>
  )
}

export default AssetDepreciationPage
