// React Imports
import { getDictionary } from '@/utils/getDictionary'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

// Component Imports
import DepreciationReports from '@/views/apps/assets/depreciation/DepreciationReports'

const DepreciationReportsPage = async ({ params }) => {
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
            <Link href={`/${locale}/apps/assets/depreciation`} underline="hover" color="inherit">
              Asset Depreciation
            </Link>
            <Typography color="text.primary">Reports</Typography>
          </Breadcrumbs>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Depreciation Reports & Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Laporan komprehensif dan analisis penyusutan aset
          </Typography>
        </Box>
      </Grid>
      
      <Grid item xs={12}>
        <DepreciationReports />
      </Grid>
    </Grid>
  )
}

export default DepreciationReportsPage
