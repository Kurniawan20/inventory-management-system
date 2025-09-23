// Component Imports
import AssetReturnsList from '@views/apps/assets/returns/AssetReturnsList'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const AssetReturnsPage = () => {
  // Vars
  const mode = getServerMode()

  return <AssetReturnsList />
}

export default AssetReturnsPage
