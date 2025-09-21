// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import AssetOverviewCards from '@views/dashboards/assets/AssetOverviewCards'
import AssetStatusChart from '@views/dashboards/assets/AssetStatusChart'
import RecentAssetActivity from '@views/dashboards/assets/RecentAssetActivity'
import MaintenanceAlerts from '@views/dashboards/assets/MaintenanceAlerts'
import AssetLocationDistribution from '@views/dashboards/assets/AssetLocationDistribution'
import QuickAssetActions from '@views/dashboards/assets/QuickAssetActions'

// Server Actions
import { getAssetDashboardData } from '@/server/actions/getAssetDashboardData'

const AssetManagementDashboard = async () => {
  // Fetch dashboard data
  const data = await getAssetDashboardData()

  return (
    <Grid container spacing={6}>
      {/* Asset Overview KPI Cards */}
      <Grid item xs={12}>
        <AssetOverviewCards data={data.overview} />
      </Grid>

      {/* Asset Status Chart & Quick Actions */}
      <Grid item xs={12} md={8}>
        <AssetStatusChart data={data.statusChart} />
      </Grid>
      <Grid item xs={12} md={4}>
        <QuickAssetActions />
      </Grid>

      {/* Maintenance Alerts & Location Distribution */}
      <Grid item xs={12} md={6}>
        <MaintenanceAlerts data={data.maintenanceAlerts} />
      </Grid>
      <Grid item xs={12} md={6}>
        <AssetLocationDistribution data={data.locationData} />
      </Grid>

      {/* Recent Asset Activity */}
      <Grid item xs={12}>
        <RecentAssetActivity data={data.recentActivity} />
      </Grid>
    </Grid>
  )
}

export default AssetManagementDashboard
