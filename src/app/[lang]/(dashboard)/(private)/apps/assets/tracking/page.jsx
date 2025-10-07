// Component Imports
import AssetTrackingTabs from '@views/apps/assets/tracking/AssetTrackingTabs'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const AssetTrackingPage = () => {
  // Vars
  const mode = getServerMode()

  return <AssetTrackingTabs />
}

export default AssetTrackingPage
