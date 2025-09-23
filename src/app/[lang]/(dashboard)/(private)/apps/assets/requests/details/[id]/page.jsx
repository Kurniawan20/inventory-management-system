// Component Imports
import AssetRequestDetails from '@views/apps/assets/requests/AssetRequestDetails'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const AssetRequestDetailsPage = () => {
  // Vars
  const mode = getServerMode()

  return <AssetRequestDetails />
}

export default AssetRequestDetailsPage
