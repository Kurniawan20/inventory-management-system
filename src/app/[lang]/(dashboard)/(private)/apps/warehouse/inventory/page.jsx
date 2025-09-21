// React Imports
import { Suspense } from 'react'

// Component Imports
import WarehouseInventoryView from '@views/apps/warehouse/inventory/WarehouseInventoryView'

// Server Action Imports
import { getInventoryList, getWarehouseList, getWarehouseStatistics } from '@/server/actions/getWarehouseData'

const WarehouseInventoryPage = async ({ searchParams }) => {
  // Get initial data
  const [inventoryResult, warehousesResult, statsResult] = await Promise.all([
    getInventoryList(searchParams),
    getWarehouseList(),
    getWarehouseStatistics()
  ])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WarehouseInventoryView 
        initialInventory={inventoryResult.data || []}
        warehouses={warehousesResult.data || []}
        statistics={statsResult.data || {}}
        initialFilters={searchParams || {}}
      />
    </Suspense>
  )
}

export default WarehouseInventoryPage
