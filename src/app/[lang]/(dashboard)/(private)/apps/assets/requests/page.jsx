// Component Imports
import AssetRequestsList from '@views/apps/assets/requests/AssetRequestsList'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const AssetRequestsPage = () => {
  // Vars
  const mode = getServerMode()

  return <AssetRequestsList />
}

export default AssetRequestsPage
