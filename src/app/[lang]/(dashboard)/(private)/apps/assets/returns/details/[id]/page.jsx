// Component Imports
import AssetReturnsDetails from '@views/apps/assets/returns/AssetReturnsDetails'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const AssetReturnsDetailsPage = () => {
  // Vars
  const mode = getServerMode()

  return <AssetReturnsDetails />
}

export default AssetReturnsDetailsPage
