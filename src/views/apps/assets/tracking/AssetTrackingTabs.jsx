'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'

// Component Imports
import AssetTrackingList from './AssetTrackingList'
import AssetRequestTracking from './AssetRequestTracking'

const AssetTrackingTabs = () => {
  // States
  const [activeTab, setActiveTab] = useState('asset-tracking')

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box className='flex items-center gap-2 mb-4'>
              <i className='ri-radar-line text-2xl text-primary-main' />
              <Typography variant='h5' className='font-bold'>
                Asset Management & Tracking
              </Typography>
            </Box>
            
            <TabContext value={activeTab}>
              <TabList 
                onChange={handleTabChange} 
                aria-label='asset tracking tabs'
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab 
                  value='asset-tracking' 
                  label={
                    <Box className='flex items-center gap-2'>
                      <i className='ri-qr-scan-line' />
                      Asset Tracking
                    </Box>
                  }
                />
                <Tab 
                  value='request-tracking' 
                  label={
                    <Box className='flex items-center gap-2'>
                      <i className='ri-file-list-line' />
                      Request Tracking
                    </Box>
                  }
                />
              </TabList>
              
              <TabPanel value='asset-tracking' sx={{ p: 0, pt: 3 }}>
                <AssetTrackingList />
              </TabPanel>
              
              <TabPanel value='request-tracking' sx={{ p: 0, pt: 3 }}>
                <AssetRequestTracking />
              </TabPanel>
            </TabContext>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AssetTrackingTabs
