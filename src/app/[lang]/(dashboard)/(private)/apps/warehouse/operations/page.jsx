'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

// Component Imports
import WarehouseOperationsHeader from '@views/apps/warehouse/operations/WarehouseOperationsHeader'
import TaskManagement from '@views/apps/warehouse/operations/TaskManagement'
import LoadingUnloading from '@views/apps/warehouse/operations/LoadingUnloading'
import StaffAssignment from '@views/apps/warehouse/operations/StaffAssignment'
import SalesOrderIntegration from '@views/apps/warehouse/operations/SalesOrderIntegration'

const WarehouseOperations = () => {
  const [activeTab, setActiveTab] = useState('tasks')

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <WarehouseOperationsHeader />
      </Grid>
      
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title="Warehouse Operations Tracking" 
            subheader="Monitor and manage warehouse activities and staff tasks"
          />
          <CardContent>
            <TabContext value={activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                <TabList onChange={handleTabChange} aria-label="warehouse operations tabs">
                  <Tab 
                    label="Task Management" 
                    value="tasks" 
                    icon={<i className="ri-task-line" />} 
                    iconPosition="start"
                  />
                  <Tab 
                    label="Loading/Unloading" 
                    value="loading" 
                    icon={<i className="ri-truck-line" />} 
                    iconPosition="start"
                  />
                  <Tab 
                    label="Staff Assignment" 
                    value="staff" 
                    icon={<i className="ri-user-settings-line" />} 
                    iconPosition="start"
                  />
                  <Tab 
                    label="Sales Orders" 
                    value="orders" 
                    icon={<i className="ri-file-list-3-line" />} 
                    iconPosition="start"
                  />
                </TabList>
              </Box>
              
              <TabPanel value="tasks" sx={{ p: 0 }}>
                <TaskManagement />
              </TabPanel>
              
              <TabPanel value="loading" sx={{ p: 0 }}>
                <LoadingUnloading />
              </TabPanel>
              
              <TabPanel value="staff" sx={{ p: 0 }}>
                <StaffAssignment />
              </TabPanel>
              
              <TabPanel value="orders" sx={{ p: 0 }}>
                <SalesOrderIntegration />
              </TabPanel>
            </TabContext>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default WarehouseOperations
