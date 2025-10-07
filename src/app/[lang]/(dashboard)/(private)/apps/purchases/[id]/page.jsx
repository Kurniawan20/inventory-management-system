'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

// Component Imports
import PurchaseDetailView from '@views/apps/purchases/PurchaseDetailView'

// Server Actions
import { getPurchaseById } from '@/server/actions/getPurchaseData'

// Next Imports
import NextLink from 'next/link'

const PurchaseDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const [purchase, setPurchase] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const purchaseId = params.id

  useEffect(() => {
    const loadPurchase = async () => {
      try {
        setLoading(true)
        setError('')
        const purchaseData = await getPurchaseById(purchaseId)
        setPurchase(purchaseData)
      } catch (err) {
        setError(err.message || 'Failed to load purchase details')
        console.error('Error loading purchase:', err)
      } finally {
        setLoading(false)
      }
    }

    if (purchaseId) {
      loadPurchase()
    }
  }, [purchaseId])

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-96">
        <CircularProgress size={40} />
      </Box>
    )
  }

  if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
          <Button
            variant="outlined"
            startIcon={<i className="ri-arrow-left-line" />}
            onClick={() => router.back()}
          >
            Back to Purchases
          </Button>
        </Grid>
      </Grid>
    )
  }

  if (!purchase) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity="warning" sx={{ mb: 4 }}>
            Purchase not found
          </Alert>
          <Button
            variant="outlined"
            startIcon={<i className="ri-arrow-left-line" />}
            onClick={() => router.back()}
          >
            Back to Purchases
          </Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={6}>
      {/* Breadcrumbs */}
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <NextLink href={`/${params.lang}/apps/purchases`} passHref>
            <Link underline="hover" color="inherit">
              Purchase Management
            </Link>
          </NextLink>
          <Typography color="text.primary">{purchase.purchase_id}</Typography>
        </Breadcrumbs>
      </Grid>

      {/* Purchase Detail View */}
      <Grid item xs={12}>
        <PurchaseDetailView purchase={purchase} />
      </Grid>
    </Grid>
  )
}

export default PurchaseDetailPage
