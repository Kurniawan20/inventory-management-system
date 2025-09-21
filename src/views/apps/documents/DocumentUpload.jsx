'use client'

// React Imports
import { useState, useRef } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Autocomplete from '@mui/material/Autocomplete'
import Divider from '@mui/material/Divider'

const DocumentUpload = ({ onClose }) => {
  const fileInputRef = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [isDragActive, setIsDragActive] = useState(false)
  const [formData, setFormData] = useState({
    category: '',
    tags: [],
    description: '',
    isRequired: false,
    expiryDate: '',
    department: '',
    accessLevel: 'internal'
  })
  const [errors, setErrors] = useState({})
  
  // Available categories
  const categories = [
    { value: 'asset-manuals', label: 'Asset Manuals' },
    { value: 'safety-procedures', label: 'Safety Procedures' },
    { value: 'quality-control', label: 'Quality Control' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'training', label: 'Training Materials' },
    { value: 'reports', label: 'Reports' },
    { value: 'certificates', label: 'Certificates' }
  ]
  
  // Available departments
  const departments = [
    'Asset Management',
    'Safety & Health',
    'Quality Assurance',
    'Maintenance',
    'Training & Development',
    'Inventory Management',
    'Warehouse Operations',
    'Compliance'
  ]
  
  // Available tags
  const availableTags = [
    'safety', 'equipment', 'manual', 'sop', 'maintenance', 'quality',
    'training', 'compliance', 'certificate', 'report', 'procedure',
    'inspection', 'audit', 'petroleum', 'chemical', 'warehouse'
  ]
  
  const maxFileSize = 10 * 1024 * 1024 // 10MB
  const acceptedTypes = ['.pdf', '.docx', '.xlsx', '.pptx', '.jpg', '.jpeg', '.png', '.mp4']
  
  const handleFileSelect = (files) => {
    const fileArray = Array.from(files)
    const validFiles = []
    const rejectedFiles = []
    
    fileArray.forEach(file => {
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
      
      if (!acceptedTypes.includes(fileExtension)) {
        rejectedFiles.push(`${file.name}: File type not supported`)
      } else if (file.size > maxFileSize) {
        rejectedFiles.push(`${file.name}: File is too large (max 10MB)`)
      } else {
        validFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'pending'
        })
      }
    })
    
    if (rejectedFiles.length > 0) {
      setErrors({
        ...errors,
        files: rejectedFiles
      })
    } else if (errors.files) {
      setErrors({
        ...errors,
        files: null
      })
    }
    
    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles])
    }
  }
  
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragActive(true)
  }
  
  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragActive(false)
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragActive(false)
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }
  
  const handleFileInputChange = (e) => {
    const files = e.target.files
    if (files) {
      handleFileSelect(files)
    }
  }
  
  const handleUploadAreaClick = () => {
    fileInputRef.current?.click()
  }
  
  const handleRemoveFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
  }
  
  const handleFormChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    })
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      })
    }
  }
  
  const handleSwitchChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.checked
    })
  }
  
  const handleTagsChange = (event, value) => {
    setFormData({
      ...formData,
      tags: value
    })
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (uploadedFiles.length === 0) {
      newErrors.files = ['Please select at least one file to upload']
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    if (!formData.description) {
      newErrors.description = 'Description is required'
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const simulateUpload = (file) => {
    return new Promise((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          resolve()
        }
        
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, progress, status: progress === 100 ? 'completed' : 'uploading' }
              : f
          )
        )
      }, 200)
    })
  }
  
  const handleUpload = async () => {
    if (!validateForm()) {
      return
    }
    
    setUploading(true)
    
    try {
      // Update all files to uploading status
      setUploadedFiles(prev => 
        prev.map(file => ({ ...file, status: 'uploading' }))
      )
      
      // Simulate upload for each file
      await Promise.all(
        uploadedFiles.map(file => simulateUpload(file))
      )
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Success - close dialog
      onClose()
    } catch (error) {
      console.error('Upload error:', error)
      setUploadedFiles(prev => 
        prev.map(file => ({ ...file, status: 'error' }))
      )
    } finally {
      setUploading(false)
    }
  }
  
  const getFileIcon = (type) => {
    if (type.includes('pdf')) return 'ri-file-pdf-line'
    if (type.includes('word')) return 'ri-file-word-line'
    if (type.includes('excel') || type.includes('sheet')) return 'ri-file-excel-line'
    if (type.includes('presentation')) return 'ri-file-ppt-line'
    if (type.includes('image')) return 'ri-image-line'
    if (type.includes('video')) return 'ri-video-line'
    return 'ri-file-line'
  }
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  return (
    <Grid container spacing={4}>
      {/* File Upload Area */}
      <Grid item xs={12}>
        <Card
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadAreaClick}
          sx={{
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'grey.300',
            bgcolor: isDragActive ? 'primary.50' : 'background.paper',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'primary.50'
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <i 
              className="ri-upload-cloud-line" 
              style={{ fontSize: '64px', color: '#1976d2', marginBottom: '16px' }} 
            />
            <Typography variant="h6" gutterBottom>
              {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              or click to browse files
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Supported formats: PDF, DOCX, XLSX, PPTX, JPG, PNG, MP4 (Max 10MB each)
            </Typography>
          </CardContent>
        </Card>
        
        {errors.files && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Upload Errors:</Typography>
            {errors.files.map((error, index) => (
              <Typography key={index} variant="body2">• {error}</Typography>
            ))}
          </Alert>
        )}
      </Grid>
      
      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Selected Files ({uploadedFiles.length})
          </Typography>
          <List>
            {uploadedFiles.map((file) => (
              <ListItem key={file.id} divider>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <i className={getFileIcon(file.type)} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.name}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {formatFileSize(file.size)}
                      </Typography>
                      {file.status === 'uploading' && (
                        <LinearProgress 
                          variant="determinate" 
                          value={file.progress} 
                          sx={{ mt: 1 }}
                        />
                      )}
                      {file.status === 'completed' && (
                        <Chip 
                          label="Uploaded" 
                          color="success" 
                          size="small" 
                          sx={{ mt: 1 }}
                        />
                      )}
                      {file.status === 'error' && (
                        <Chip 
                          label="Error" 
                          color="error" 
                          size="small" 
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  {file.status === 'pending' && (
                    <IconButton 
                      edge="end" 
                      onClick={() => handleRemoveFile(file.id)}
                      disabled={uploading}
                    >
                      <i className="ri-delete-bin-line" />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
      
      {/* Document Details Form */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Document Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(errors.category)}>
              <InputLabel>Category *</InputLabel>
              <Select
                value={formData.category}
                onChange={handleFormChange('category')}
                label="Category *"
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography variant="caption" color="error">
                  {errors.category}
                </Typography>
              )}
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(errors.department)}>
              <InputLabel>Department *</InputLabel>
              <Select
                value={formData.department}
                onChange={handleFormChange('department')}
                label="Department *"
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
              {errors.department && (
                <Typography variant="caption" color="error">
                  {errors.department}
                </Typography>
              )}
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Description *"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={handleFormChange('description')}
              error={Boolean(errors.description)}
              helperText={errors.description}
              placeholder="Provide a detailed description of the document content and purpose"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={availableTags}
              value={formData.tags}
              onChange={handleTagsChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} key={option} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tags"
                  placeholder="Add tags to help categorize and search documents"
                />
              )}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Access Level</InputLabel>
              <Select
                value={formData.accessLevel}
                onChange={handleFormChange('accessLevel')}
                label="Access Level"
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="internal">Internal</MenuItem>
                <MenuItem value="restricted">Restricted</MenuItem>
                <MenuItem value="confidential">Confidential</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Expiry Date"
              type="date"
              fullWidth
              value={formData.expiryDate}
              onChange={handleFormChange('expiryDate')}
              InputLabelProps={{ shrink: true }}
              helperText="Leave empty if document doesn't expire"
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isRequired}
                  onChange={handleSwitchChange('isRequired')}
                />
              }
              label="Mark as Required Document"
            />
          </Grid>
        </Grid>
      </Grid>
      
      <Grid item xs={12}>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={uploading}
          >
            Cancel
          </Button>
          
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={uploading || uploadedFiles.length === 0}
            startIcon={uploading ? <i className="ri-loader-line" /> : <i className="ri-upload-line" />}
          >
            {uploading ? 'Uploading...' : `Upload ${uploadedFiles.length} File(s)`}
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default DocumentUpload
