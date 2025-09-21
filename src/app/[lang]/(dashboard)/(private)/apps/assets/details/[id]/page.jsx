// React Imports
import { Suspense } from 'react'

// Component Imports
import AssetDetailView from '@views/apps/assets/details/AssetDetailView'

// Server Action Imports
import { getAssetById } from '@/server/actions/getAssetData'

const AssetDetailPage = async ({ params }) => {
  const { id } = params
  
  // Get asset data
  const assetResult = await getAssetById(id)
  
  if (!assetResult.success || !assetResult.data) {
    return (
      <div>
        <h1>Asset Not Found</h1>
        <p>The requested asset could not be found.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<div>Loading asset details...</div>}>
      <AssetDetailView asset={assetResult.data} />
    </Suspense>
  )
}

export default AssetDetailPage
