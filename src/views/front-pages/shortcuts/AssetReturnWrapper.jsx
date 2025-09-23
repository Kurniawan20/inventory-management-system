'use client'

// React Imports
import { useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import AssetReturnView from '@/views/apps/assets/return'
import { useSettings } from '@core/hooks/useSettings'

// Styles Imports
import frontCommonStyles from '../styles.module.css'

const AssetReturnWrapper = () => {
  // Hooks
  const { updatePageSettings } = useSettings()

  // For Page specific settings
  useEffect(() => {
    return updatePageSettings({
      skin: 'default'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className={classnames('md:plb-[100px] plb-6', frontCommonStyles.layoutSpacing)}>
      <Card>
        <CardContent>
          <AssetReturnView />
        </CardContent>
      </Card>
    </section>
  )
}

export default AssetReturnWrapper
