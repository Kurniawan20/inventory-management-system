// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import WarehouseOverviewCards from '@views/dashboards/warehouse/WarehouseOverviewCards'
import InventoryLevelsChart from '@views/dashboards/warehouse/InventoryLevelsChart'
import InboundOutboundActivity from '@views/dashboards/warehouse/InboundOutboundActivity'
import LowStockAlerts from '@views/dashboards/warehouse/LowStockAlerts'
import WarehouseUtilization from '@views/dashboards/warehouse/WarehouseUtilization'
import QuickWarehouseActions from '@views/dashboards/warehouse/QuickWarehouseActions'

// Server Actions
import { getWarehouseDashboardData } from '@/server/actions/getWarehouseDashboardData'

const WarehouseOperationsDashboard = async () => {
  // Fetch dashboard data
  const data = await getWarehouseDashboardData()

  return (
    <Grid container spacing={6}>
      {/* Warehouse Overview KPI Cards */}
      <Grid item xs={12}>
        <WarehouseOverviewCards data={data.overview} />
      </Grid>

      {/* Inventory Levels Chart & Quick Actions */}
      <Grid item xs={12} md={8}>
        <InventoryLevelsChart data={data.inventoryChart} />
      </Grid>
      <Grid item xs={12} md={4}>
        <QuickWarehouseActions />
      </Grid>

      {/* Low Stock Alerts & Warehouse Utilization */}
      <Grid item xs={12} md={6}>
        <LowStockAlerts data={data.lowStockAlerts} />
      </Grid>
      <Grid item xs={12} md={6}>
        <WarehouseUtilization data={data.utilizationData} />
      </Grid>

      {/* Inbound/Outbound Activity */}
      <Grid item xs={12}>
        <InboundOutboundActivity data={data.activityData} />
      </Grid>
    </Grid>
  )
}

export default WarehouseOperationsDashboard
