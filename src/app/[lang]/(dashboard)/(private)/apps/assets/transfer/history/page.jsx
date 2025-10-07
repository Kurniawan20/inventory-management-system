'use client'

// Next Imports
import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

const MovementHistoryPage = () => {
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    // Redirect to the new Inventory Movement module
    router.replace(`/${params.lang}/apps/inventory/movements`)
  }, [router, params.lang])

  return null
}

export default MovementHistoryPage
