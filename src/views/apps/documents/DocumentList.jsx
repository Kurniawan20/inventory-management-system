'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Badge from '@mui/material/Badge'
import LinearProgress from '@mui/material/LinearProgress'

// Sample document data
const sampleDocuments = [
  {
    id: 'DOC-001',
    name: 'Safety Equipment Manual - Helmets & Protective Gear',
    type: 'PDF',
    category: 'safety-procedures',
    size: '2.4 MB',
    uploadedBy: 'Ahmad Rizki',
    uploadedAt: '2025-09-20T10:30:00',
    lastModified: '2025-09-21T14:20:00',
    version: '2.1',
    status: 'approved',
    tags: ['safety', 'equipment', 'manual'],
    description: 'Comprehensive manual for safety equipment usage and maintenance',
    downloadCount: 45,
    isRequired: true,
    expiryDate: '2026-09-20',
    department: 'Safety & Health'
  },
  {
    id: 'DOC-002',
    name: 'Motor Maintenance SOP',
    type: 'PDF',
    category: 'maintenance',
    size: '1.8 MB',
    uploadedBy: 'Siti Nurhaliza',
    uploadedAt: '2025-09-19T09:15:00',
    lastModified: '2025-09-19T09:15:00',
    version: '1.0',
    status: 'pending',
    tags: ['motor', 'maintenance', 'sop'],
    description: 'Standard operating procedures for motor maintenance and troubleshooting',
    downloadCount: 12,
    isRequired: false,
    expiryDate: null,
    department: 'Maintenance'
  },
  {
    id: 'DOC-003',
    name: 'Quality Control Checklist - Petroleum Products',
    type: 'XLSX',
    category: 'quality-control',
    size: '856 KB',
    uploadedBy: 'Budi Santoso',
    uploadedAt: '2025-09-18T16:45:00',
    lastModified: '2025-09-20T11:30:00',
    version: '3.2',
    status: 'approved',
    tags: ['quality', 'checklist', 'petroleum'],
    description: 'Quality control checklist for petroleum product testing and validation',
    downloadCount: 78,
    isRequired: true,
    expiryDate: '2025-12-31',
    department: 'Quality Assurance'
  },
  {
    id: 'DOC-004',
    name: 'Asset Registration Certificate - Pump Equipment',
    type: 'PDF',
    category: 'certificates',
    size: '1.2 MB',
    uploadedBy: 'Maya Sari',
    uploadedAt: '2025-09-17T13:20:00',
    lastModified: '2025-09-17T13:20:00',
    version: '1.0',
    status: 'approved',
    tags: ['certificate', 'pump', 'asset'],
    description: 'Official registration certificate for industrial pump equipment',
    downloadCount: 23,
    isRequired: true,
    expiryDate: '2027-09-17',
    department: 'Asset Management'
  },
  {
    id: 'DOC-005',
    name: 'Monthly Inventory Report - August 2025',
    type: 'PDF',
    category: 'reports',
    size: '3.1 MB',
    uploadedBy: 'Andi Wijaya',
    uploadedAt: '2025-09-15T08:00:00',
    lastModified: '2025-09-16T10:15:00',
    version: '1.1',
    status: 'approved',
    tags: ['report', 'inventory', 'monthly'],
    description: 'Comprehensive monthly inventory report with analysis and recommendations',
    downloadCount: 67,
    isRequired: false,
    expiryDate: null,
    department: 'Inventory Management'
  },
  {
    id: 'DOC-006',
    name: 'Training Material - Warehouse Safety Procedures',
    type: 'PPTX',
    category: 'training',
    size: '4.7 MB',
    uploadedBy: 'Dewi Lestari',
    uploadedAt: '2025-09-14T14:30:00',
    lastModified: '2025-09-15T09:45:00',
    version: '2.0',
    status: 'draft',
    tags: ['training', 'warehouse', 'safety'],
    description: 'Training presentation for warehouse safety procedures and protocols',
    downloadCount: 8,
    isRequired: false,
    expiryDate: null,
    department: 'Training & Development'
  }
]

const DocumentList = ({ activeTab, searchQuery, selectedCategory, onPreviewDocument }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedDoc, setSelectedDoc] = useState(null)
  
  // Filter documents based on active tab, search query, and category
  const filteredDocuments = useMemo(() => {
    let filtered = sampleDocuments
    
    // Filter by tab
    if (activeTab !== 'all') {
      const tabCategoryMap = {
        'sop': ['safety-procedures', 'maintenance'],
        'compliance': ['compliance', 'certificates'],
        'certificates': ['certificates'],
        'reports': ['reports']
      }
      
      if (tabCategoryMap[activeTab]) {
        filtered = filtered.filter(doc => tabCategoryMap[activeTab].includes(doc.category))
      }
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === selectedCategory)
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query)) ||
        doc.uploadedBy.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }, [activeTab, searchQuery, selectedCategory])
  
  const handleMenuOpen = (event, document) => {
    setAnchorEl(event.currentTarget)
    setSelectedDoc(document)
  }
  
  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedDoc(null)
  }
  
  const getFileIcon = (type) => {
    const iconMap = {
      'PDF': 'ri-file-pdf-line',
      'XLSX': 'ri-file-excel-line',
      'DOCX': 'ri-file-word-line',
      'PPTX': 'ri-file-ppt-line',
      'JPG': 'ri-image-line',
      'PNG': 'ri-image-line',
      'MP4': 'ri-video-line'
    }
    return iconMap[type] || 'ri-file-line'
  }
  
  const getStatusColor = (status) => {
    const colorMap = {
      'approved': 'success',
      'pending': 'warning',
      'draft': 'info',
      'rejected': 'error',
      'archived': 'default'
    }
    return colorMap[status] || 'default'
  }
  
  const formatFileSize = (size) => {
    return size
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const today = new Date()
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0
  }
  
  const isExpired = (expiryDate) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const today = new Date()
    return expiry < today
  }
  
  return (
    <>
      <Grid container spacing={3}>
        {filteredDocuments.map((document) => (
          <Grid item xs={12} sm={6} md={4} key={document.id}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                '&:hover': { boxShadow: 4 },
                border: document.isRequired ? '2px solid' : 'none',
                borderColor: document.isRequired ? 'primary.main' : 'transparent'
              }}
              onClick={() => onPreviewDocument(document)}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <i className={getFileIcon(document.type)} />
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {document.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {document.type} • {formatFileSize(document.size)}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {document.isRequired && (
                      <Tooltip title="Required Document">
                        <Badge color="error" variant="dot">
                          <i className="ri-star-line" style={{ color: '#ff9800' }} />
                        </Badge>
                      </Tooltip>
                    )}
                    
                    {isExpired(document.expiryDate) && (
                      <Tooltip title="Document Expired">
                        <i className="ri-error-warning-line" style={{ color: '#f44336' }} />
                      </Tooltip>
                    )}
                    
                    {isExpiringSoon(document.expiryDate) && !isExpired(document.expiryDate) && (
                      <Tooltip title="Expiring Soon">
                        <i className="ri-alarm-warning-line" style={{ color: '#ff9800' }} />
                      </Tooltip>
                    )}
                    
                    <IconButton 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMenuOpen(e, document)
                      }}
                    >
                      <i className="ri-more-2-line" />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {document.description}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {document.tags.slice(0, 3).map((tag) => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small" 
                      variant="outlined"
                    />
                  ))}
                  {document.tags.length > 3 && (
                    <Chip 
                      label={`+${document.tags.length - 3}`} 
                      size="small" 
                      variant="outlined"
                      color="primary"
                    />
                  )}
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Chip 
                    label={document.status} 
                    size="small" 
                    color={getStatusColor(document.status)}
                  />
                  <Typography variant="caption" color="text.secondary">
                    v{document.version}
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      By {document.uploadedBy}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {formatDate(document.uploadedAt)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <i className="ri-download-line" style={{ fontSize: '14px', color: '#666' }} />
                    <Typography variant="caption" color="text.secondary">
                      {document.downloadCount}
                    </Typography>
                  </Box>
                </Box>
                
                {document.expiryDate && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Expires: {formatDate(document.expiryDate)}
                    </Typography>
                    {isExpiringSoon(document.expiryDate) && !isExpired(document.expiryDate) && (
                      <LinearProgress 
                        variant="determinate" 
                        value={75} 
                        color="warning" 
                        sx={{ mt: 1, height: 4, borderRadius: 2 }}
                      />
                    )}
                    {isExpired(document.expiryDate) && (
                      <LinearProgress 
                        variant="determinate" 
                        value={100} 
                        color="error" 
                        sx={{ mt: 1, height: 4, borderRadius: 2 }}
                      />
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
        
        {filteredDocuments.length === 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 8 }}>
                <i className="ri-file-search-line" style={{ fontSize: '64px', color: '#ccc', marginBottom: '16px' }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No documents found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search criteria or upload new documents
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      
      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <i className="ri-eye-line" style={{ marginRight: 8 }} />
          Preview
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className="ri-download-line" style={{ marginRight: 8 }} />
          Download
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className="ri-share-line" style={{ marginRight: 8 }} />
          Share
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <i className="ri-edit-line" style={{ marginRight: 8 }} />
          Edit Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className="ri-history-line" style={{ marginRight: 8 }} />
          Version History
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <i className="ri-delete-bin-line" style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

export default DocumentList
