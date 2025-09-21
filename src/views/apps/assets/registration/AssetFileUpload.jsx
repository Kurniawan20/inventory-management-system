'use client'

// React Imports
import { useState, useCallback } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'

// Hook Imports
import { useAssetRegistration } from './AssetRegistrationProvider'

// Component Imports
import OCRTextDialog from '@/components/dialogs/OCRTextDialog'

const AssetFileUpload = () => {
  const { formData, updateFormData, updateFormDataByPath, errors } = useAssetRegistration()
  const [uploadProgress, setUploadProgress] = useState({})
  const [dragOver, setDragOver] = useState(false)
  const [ocrDialog, setOcrDialog] = useState({ open: false, file: null, type: 'general' })

  // File type configurations
  const fileTypes = {
    documents: {
      label: 'Documents',
      accept: '.pdf,.doc,.docx,.txt,.xls,.xlsx',
      maxSize: 10 * 1024 * 1024, // 10MB
      icon: 'ri-file-text-line',
      description: 'Upload manuals, certificates, warranties (PDF, DOC, XLS)'
    },
    images: {
      label: 'Images',
      accept: '.jpg,.jpeg,.png,.gif,.bmp,.webp',
      maxSize: 5 * 1024 * 1024, // 5MB
      icon: 'ri-image-line',
      description: 'Upload photos, diagrams, QR codes (JPG, PNG, GIF)'
    }
  }

  const handleFileSelect = useCallback((type, files) => {
    const fileArray = Array.from(files)
    const validFiles = []
    const errors = []

    fileArray.forEach(file => {
      // Check file size
      if (file.size > fileTypes[type].maxSize) {
        errors.push(`${file.name}: File too large (max ${fileTypes[type].maxSize / 1024 / 1024}MB)`)
        return
      }

      // Check file type
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
      if (!fileTypes[type].accept.includes(fileExtension)) {
        errors.push(`${file.name}: Invalid file type`)
        return
      }

      validFiles.push({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        status: 'pending'
      })
    })

    if (errors.length > 0) {
      // In a real app, show these errors in a snackbar or alert
      console.error('File upload errors:', errors)
    }

    if (validFiles.length > 0) {
      const currentFiles = formData.files?.[type] || []
      updateFormDataByPath(`files.${type}`, [...currentFiles, ...validFiles])
      
      // Simulate upload progress
      validFiles.forEach(fileObj => {
        simulateUpload(fileObj.id, type)
      })
    }
  }, [formData.files, updateFormData])

  const simulateUpload = (fileId, type) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        
        // Update file status to completed
        const currentFiles = formData.files?.[type] || []
        const updatedFiles = currentFiles.map(file => 
          file.id === fileId ? { ...file, status: 'completed' } : file
        )
        updateFormDataByPath(`files.${type}`, updatedFiles)
        
        setUploadProgress(prev => {
          const newProgress = { ...prev }
          delete newProgress[fileId]
          return newProgress
        })
      } else {
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }))
      }
    }, 200)
  }

  const handleFileRemove = (type, fileId) => {
    const currentFiles = formData.files?.[type] || []
    const updatedFiles = currentFiles.filter(file => file.id !== fileId)
    updateFormDataByPath(`files.${type}`, updatedFiles)
    
    // Remove from upload progress
    setUploadProgress(prev => {
      const newProgress = { ...prev }
      delete newProgress[fileId]
      return newProgress
    })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (type) => (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(type, files)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleOCRClick = (fileObj, ocrType = 'general') => {
    setOcrDialog({
      open: true,
      file: fileObj.file,
      type: ocrType
    })
  }

  const handleOCRClose = () => {
    setOcrDialog({ open: false, file: null, type: 'general' })
  }

  const handleOCRTextExtracted = (ocrResult) => {
    // Auto-populate form fields based on OCR results
    if (ocrResult.parsedData) {
      const { parsedData, assetType } = ocrResult
      
      // Update common form data fields
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
      if (parsedData.year) {
        updateFormData('manufacturingYear', parsedData.year)
      }
      
      // Update technical specifications
      if (parsedData.voltage) {
        updateFormDataByPath('specifications.voltage', parsedData.voltage)
      }
      if (parsedData.power) {
        updateFormDataByPath('specifications.powerRating', parsedData.power)
      }
      if (parsedData.capacity) {
        updateFormDataByPath('specifications.capacity', parsedData.capacity)
      }
      
      // Handle PPE-specific fields
      if (assetType === 'ppe' || parsedData.size || parsedData.material || parsedData.color || parsedData.standards) {
        // Set category if it's PPE
        updateFormDataByPath('category.primary', 'Safety Equipment')
        updateFormDataByPath('category.sub', 'Personal Protective Equipment')
        
        // Update PPE-specific fields
        if (parsedData.size) {
          updateFormDataByPath('specifications.size', parsedData.size)
        }
        if (parsedData.material) {
          updateFormDataByPath('specifications.material', parsedData.material)
        }
        if (parsedData.color) {
          updateFormDataByPath('specifications.color', parsedData.color)
        }
        if (parsedData.standards) {
          updateFormDataByPath('specifications.standards', parsedData.standards)
        }
      }
      
      // Handle Pump-specific fields
      else if (assetType === 'pump' || parsedData.flowRate || parsedData.pressure || parsedData.rpm) {
        // Set category if it's a pump
        updateFormDataByPath('category.primary', 'Production Equipment')
        updateFormDataByPath('category.sub', 'Pumps & Compressors')
        
        // Update pump-specific fields
        if (parsedData.flowRate) {
          updateFormDataByPath('specifications.flowRate', parsedData.flowRate)
        }
        if (parsedData.pressure) {
          updateFormDataByPath('specifications.pressure', parsedData.pressure)
        }
        if (parsedData.rpm) {
          updateFormDataByPath('specifications.rpm', parsedData.rpm)
        }
      }
      
      // Handle IT equipment-specific fields
      else if (assetType === 'it' || parsedData.macAddress || parsedData.ipAddress || parsedData.operatingSystem) {
        // Set category if it's IT equipment
        updateFormDataByPath('category.primary', 'IT & Telecommunications')
        
        // Update IT-specific fields
        if (parsedData.macAddress) {
          updateFormData('macAddress', parsedData.macAddress)
        }
        if (parsedData.ipAddress) {
          updateFormData('ipAddress', parsedData.ipAddress)
        }
        if (parsedData.operatingSystem) {
          updateFormDataByPath('specifications.operatingSystem', parsedData.operatingSystem)
        }
      }
    }
    
    // Store OCR result in form data for reference
    const currentOcrResults = formData.ocrResults || []
    updateFormData('ocrResults', [...currentOcrResults, {
      fileName: ocrDialog.file?.name,
      text: ocrResult.text,
      confidence: ocrResult.confidence,
      parsedData: ocrResult.parsedData,
      timestamp: new Date().toISOString()
    }])
  }

  const isImageFile = (fileName) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
    const extension = '.' + fileName.split('.').pop().toLowerCase()
    return imageExtensions.includes(extension)
  }

  const renderFileList = (type) => {
    const files = formData.files?.[type] || []
    
    if (files.length === 0) {
      return (
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          No {fileTypes[type].label.toLowerCase()} uploaded yet
        </Typography>
      )
    }

    return (
      <Box sx={{ mt: 2 }}>
        {files.map((fileObj) => (
          <Box
            key={fileObj.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              mb: 1,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              bgcolor: 'background.paper'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <i className={fileTypes[type].icon} style={{ marginRight: 8, fontSize: 20 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {fileObj.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatFileSize(fileObj.size)} • {new Date(fileObj.uploadedAt).toLocaleDateString()}
                </Typography>
                {uploadProgress[fileObj.id] !== undefined && (
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress[fileObj.id]}
                    sx={{ mt: 1, height: 4, borderRadius: 2 }}
                  />
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {fileObj.status === 'completed' && (
                <Chip
                  label="Uploaded"
                  size="small"
                  color="success"
                  variant="outlined"
                />
              )}
              {fileObj.status === 'pending' && (
                <Chip
                  label="Uploading..."
                  size="small"
                  color="info"
                  variant="outlined"
                />
              )}
              {/* OCR Button for Images */}
              {type === 'images' && fileObj.status === 'completed' && (
                <Tooltip title="Extract text with OCR">
                  <IconButton
                    size="small"
                    onClick={() => handleOCRClick(fileObj, 'nameplate')}
                    color="primary"
                    sx={{ bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main' } }}
                  >
                    <i className="ri-file-text-line" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Remove file">
                <IconButton
                  size="small"
                  onClick={() => handleFileRemove(type, fileObj.id)}
                  color="error"
                >
                  <i className="ri-delete-bin-line" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </Box>
    )
  }

  const renderUploadArea = (type) => (
    <Box
      sx={{
        border: '2px dashed',
        borderColor: dragOver ? 'primary.main' : 'divider',
        borderRadius: 2,
        p: 3,
        textAlign: 'center',
        bgcolor: dragOver ? 'action.hover' : 'background.paper',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'action.hover'
        }
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop(type)}
      onClick={() => document.getElementById(`file-input-${type}`).click()}
    >
      <i className={fileTypes[type].icon} style={{ fontSize: 48, color: 'var(--mui-palette-text-secondary)' }} />
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Upload {fileTypes[type].label}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {fileTypes[type].description}
      </Typography>
      <Button variant="outlined" component="span">
        Choose Files
      </Button>
      <Typography variant="caption" display="block" sx={{ mt: 1 }} color="text.secondary">
        or drag and drop files here
      </Typography>
      <input
        id={`file-input-${type}`}
        type="file"
        multiple
        accept={fileTypes[type].accept}
        style={{ display: 'none' }}
        onChange={(e) => handleFileSelect(type, e.target.files)}
      />
    </Box>
  )

  return (
    <Card>
      <CardHeader
        title='File Uploads'
        subheader='Upload asset documents, images, and related files'
      />
      <CardContent>
        <Grid container spacing={4}>
          {/* Documents Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <i className="ri-file-text-line" style={{ marginRight: 8 }} />
              Documents
            </Typography>
            {renderUploadArea('documents')}
            {renderFileList('documents')}
          </Grid>

          {/* Images Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <i className="ri-image-line" style={{ marginRight: 8 }} />
              Images
            </Typography>
            {renderUploadArea('images')}
            {renderFileList('images')}
          </Grid>

          {/* Upload Summary */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Total files: {(formData.files?.documents?.length || 0) + (formData.files?.images?.length || 0)}
              </Typography>
              {errors.files && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errors.files}
                </Alert>
              )}
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

export default AssetFileUpload
