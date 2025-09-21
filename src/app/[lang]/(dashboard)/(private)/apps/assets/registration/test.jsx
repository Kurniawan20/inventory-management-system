'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const AssetRegistrationTest = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Asset Registration Test" />
          <CardContent>
            <Typography>
              This is a test page to verify the routing is working correctly.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AssetRegistrationTest
