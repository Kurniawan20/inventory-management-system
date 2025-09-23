// Component Imports
import AssetTrackingList from '@views/apps/assets/tracking/AssetTrackingList'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const AssetTrackingPage = () => {
  // Vars
  const mode = getServerMode()

  return <AssetTrackingList />
}

export default AssetTrackingPage
