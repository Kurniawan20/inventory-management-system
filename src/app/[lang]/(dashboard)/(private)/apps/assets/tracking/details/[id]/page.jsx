// Component Imports
import AssetTrackingDetails from '@views/apps/assets/tracking/AssetTrackingDetails'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const AssetTrackingDetailsPage = () => {
  // Vars
  const mode = getServerMode()

  return <AssetTrackingDetails />
}

export default AssetTrackingDetailsPage
