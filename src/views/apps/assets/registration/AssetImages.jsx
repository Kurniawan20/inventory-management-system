'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OCRTextDialog from '@/components/dialogs/OCRTextDialog'

// Hook Imports
import { useAssetRegistration } from './AssetRegistrationProvider'

const AssetImages = () => {
  const { updateFormData } = useAssetRegistration()
  const [uploadedImages, setUploadedImages] = useState([])
  const [ocrDialog, setOcrDialog] = useState({ open: false, file: null, type: 'nameplate' })

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      file: file
    }))
    setUploadedImages(prev => [...prev, ...newImages])
  }

  const removeImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleOCRClick = (image) => {
    setOcrDialog({
      open: true,
      file: image.file,
      type: 'nameplate'
    })
  }

  const handleOCRClose = () => {
    setOcrDialog({ open: false, file: null, type: 'nameplate' })
  }

  const handleOCRTextExtracted = (ocrResult) => {
    // Auto-populate form fields based on OCR results
    if (ocrResult.parsedData) {
      const { parsedData } = ocrResult
      
      // Update form data with parsed information
      if (parsedData.serialNumber) {
        updateFormData('serialNumber', parsedData.serialNumber)
      }
      if (parsedData.model) {
        updateFormData('model', parsedData.model)
      }
      if (parsedData.manufacturer) {
        updateFormData('manufacturer', parsedData.manufacturer)
      }
      if (parsedData.partNumber) {
        updateFormData('partNumber', parsedData.partNumber)
      }
      if (parsedData.voltage) {
        updateFormData('specifications.voltage', parsedData.voltage)
      }
      if (parsedData.power) {
        updateFormData('specifications.powerRating', parsedData.power)
      }
      if (parsedData.capacity) {
        updateFormData('specifications.capacity', parsedData.capacity)
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Asset Images & Documents'
        subheader='Upload photos and relevant documents for the asset'
      />
      <CardContent>
        <Grid container spacing={6}>
          {/* Upload Area */}
          <Grid item xs={12}>
            <Box
              className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer'
              component='label'
            >
              <input
                type='file'
                multiple
                accept='image/*,.pdf,.doc,.docx'
                onChange={handleImageUpload}
                className='hidden'
              />
              <CustomAvatar
                variant='rounded'
                color='primary'
                size={48}
                className='mx-auto mb-4'
              >
                <i className='ri-upload-cloud-line text-2xl' />
              </CustomAvatar>
              <Typography variant='h6' className='mb-2'>
                Drop files here or click to upload
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Supported formats: JPG, PNG, PDF, DOC, DOCX (Max 10MB each)
              </Typography>
            </Box>
          </Grid>

          {/* Uploaded Files */}
          {uploadedImages.length > 0 && (
            <Grid item xs={12}>
              <Typography variant='h6' className='mb-4'>
                Uploaded Files ({uploadedImages.length})
              </Typography>
              <Grid container spacing={4}>
                {uploadedImages.map((image) => (
                  <Grid key={image.id} item xs={12} sm={6} md={4}>
                    <Card variant='outlined' className='relative'>
                      <CardContent className='p-4'>
                        <div className='flex items-center gap-3'>
                          {image.url && image.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                            <img
                              src={image.url}
                              alt={image.name}
                              className='w-12 h-12 object-cover rounded'
                            />
                          ) : (
                            <CustomAvatar
                              variant='rounded'
                              color='secondary'
                              size={48}
                            >
                              <i className='ri-file-line' />
                            </CustomAvatar>
                          )}
                          <div className='flex-1 min-w-0'>
                            <Typography
                              variant='body2'
                              className='font-medium truncate'
                            >
                              {image.name}
                            </Typography>
                            <Typography variant='caption' color='text.secondary'>
                              {formatFileSize(image.size)}
                            </Typography>
                          </div>
                          <IconButton
                            size='small'
                            color='primary'
                            onClick={() => handleOCRClick(image)}
                            title="Extract text with OCR"
                          >
                            <i className='ri-text-scan-line' />
                          </IconButton>
                          <IconButton
                            size='small'
                            color='error'
                            onClick={() => removeImage(image.id)}
                          >
                            <i className='ri-close-line' />
                          </IconButton>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Box className='flex gap-4 flex-wrap'>
              <Button
                variant='outlined'
                startIcon={<i className='ri-camera-line' />}
                component='label'
              >
                Take Photo
                <input
                  type='file'
                  accept='image/*'
                  capture='environment'
                  onChange={handleImageUpload}
                  className='hidden'
                />
              </Button>
              <Button
                variant='outlined'
                startIcon={<i className='ri-qr-code-line' />}
              >
                Generate QR Code
              </Button>
              <Button
                variant='outlined'
                startIcon={<i className='ri-barcode-line' />}
              >
                Generate Barcode
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      {/* OCR Dialog */}
      <OCRTextDialog
        open={ocrDialog.open}
        onClose={handleOCRClose}
        imageFile={ocrDialog.file}
        ocrType={ocrDialog.type}
        onTextExtracted={handleOCRTextExtracted}
      />
    </Card>
  )
}

export default AssetImages
