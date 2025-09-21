'use client'

// React Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

// Component Imports
import DocumentCategories from '@/views/apps/documents/DocumentCategories'

const DocumentCategoriesPage = () => {
  const router = useRouter()
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/en/dashboards/warehouse" underline="hover" color="inherit">
              Dashboard
            </Link>
            <Link href="/en/apps/documents" underline="hover" color="inherit">
              Document Management
            </Link>
            <Typography color="text.primary">Categories</Typography>
          </Breadcrumbs>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Box>
              <Typography variant="h4">
                Document Categories
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Organize and manage document categories for better classification
              </Typography>
            </Box>
            
            <Button
              variant="outlined"
              startIcon={<i className="ri-arrow-left-line" />}
              onClick={() => router.back()}
            >
              Back to Documents
            </Button>
          </Box>
        </Box>
      </Grid>
      
      <Grid item xs={12}>
        <DocumentCategories />
      </Grid>
    </Grid>
  )
}

export default DocumentCategoriesPage
