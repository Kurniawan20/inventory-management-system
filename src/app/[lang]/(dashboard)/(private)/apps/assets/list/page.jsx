// React Imports
import { Suspense } from 'react'

// Component Imports
import AssetListView from '@views/apps/assets/list/AssetListView'

// Server Action Imports
import { getAssetList, getAssetCategories, getAssetStatistics } from '@/server/actions/getAssetData'

const AssetListPage = async ({ searchParams }) => {
  // Get initial data
  const [assetsResult, categoriesResult, statsResult] = await Promise.all([
    getAssetList(searchParams),
    getAssetCategories(),
    getAssetStatistics()
  ])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AssetListView
        initialAssets={assetsResult.data || []}
        categories={categoriesResult.data || {}}
        statistics={statsResult.data || {}}
        initialFilters={searchParams || {}}
      />
    </Suspense>
  )
}

export default AssetListPage
