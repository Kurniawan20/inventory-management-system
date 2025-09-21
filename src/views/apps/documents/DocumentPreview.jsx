'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const DocumentPreview = ({ document }) => {
  const [activeTab, setActiveTab] = useState('preview')
  
  if (!document) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No document selected
        </Typography>
      </Box>
    )
  }
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
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
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const isExpired = (expiryDate) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const today = new Date()
    return expiry < today
  }
  
  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const today = new Date()
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0
  }
  
  // Sample version history
  const versionHistory = [
    {
      version: '2.1',
      date: '2025-09-21T14:20:00',
      author: 'Ahmad Rizki',
      changes: 'Updated safety protocols and added new equipment specifications',
      status: 'current'
    },
    {
      version: '2.0',
      date: '2025-08-15T10:30:00',
      author: 'Siti Nurhaliza',
      changes: 'Major revision with updated compliance requirements',
      status: 'archived'
    },
    {
      version: '1.5',
      date: '2025-07-10T16:45:00',
      author: 'Ahmad Rizki',
      changes: 'Minor corrections and formatting improvements',
      status: 'archived'
    }
  ]
  
  // Sample access log
  const accessLog = [
    {
      user: 'Budi Santoso',
      action: 'Downloaded',
      date: '2025-09-22T08:30:00',
      department: 'Quality Assurance'
    },
    {
      user: 'Maya Sari',
      action: 'Viewed',
      date: '2025-09-21T15:20:00',
      department: 'Asset Management'
    },
    {
      user: 'Andi Wijaya',
      action: 'Downloaded',
      date: '2025-09-20T11:45:00',
      department: 'Inventory Management'
    }
  ]
  
  const renderPreview = () => {
    if (document.type === 'PDF') {
      return (
        <Box sx={{ height: 600, border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden' }}>
          <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: '#f5f5f5'
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <i className="ri-file-pdf-line" style={{ fontSize: '64px', color: '#d32f2f', marginBottom: '16px' }} />
              <Typography variant="h6" gutterBottom>
                PDF Preview
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {document.name}
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }}>
                Open in New Tab
              </Button>
            </Box>
          </Box>
        </Box>
      )
    }
    
    if (document.type === 'JPG' || document.type === 'PNG') {
      return (
        <Box sx={{ height: 600, border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden' }}>
          <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: '#f5f5f5'
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <i className="ri-image-line" style={{ fontSize: '64px', color: '#2196f3', marginBottom: '16px' }} />
              <Typography variant="h6" gutterBottom>
                Image Preview
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {document.name}
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }}>
                View Full Size
              </Button>
            </Box>
          </Box>
        </Box>
      )
    }
    
    return (
      <Box sx={{ height: 600, border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden' }}>
        <Box sx={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: '#f5f5f5'
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <i className={getFileIcon(document.type)} style={{ fontSize: '64px', color: '#666', marginBottom: '16px' }} />
            <Typography variant="h6" gutterBottom>
              Preview Not Available
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              This file type cannot be previewed in the browser
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              Download to View
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }
  
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Preview" value="preview" />
            <Tab label="Details" value="details" />
            <Tab label="Version History" value="versions" />
            <Tab label="Access Log" value="access" />
          </Tabs>
        </Box>
      </Grid>
      
      {activeTab === 'preview' && (
        <>
          <Grid item xs={12} md={8}>
            {renderPreview()}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    <i className={getFileIcon(document.type)} style={{ fontSize: '24px' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {document.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {document.type} • {document.size}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  <Chip 
                    label={document.status} 
                    color={getStatusColor(document.status)}
                    size="small"
                  />
                  {document.isRequired && (
                    <Chip 
                      label="Required" 
                      color="warning"
                      size="small"
                    />
                  )}
                  <Chip 
                    label={`v${document.version}`} 
                    variant="outlined"
                    size="small"
                  />
                </Box>
                
                {(isExpired(document.expiryDate) || isExpiringSoon(document.expiryDate)) && (
                  <Alert 
                    severity={isExpired(document.expiryDate) ? "error" : "warning"} 
                    sx={{ mb: 3 }}
                  >
                    {isExpired(document.expiryDate) 
                      ? "This document has expired" 
                      : "This document expires soon"
                    }
                  </Alert>
                )}
                
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Department" 
                      secondary={document.department} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Uploaded By" 
                      secondary={document.uploadedBy} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Upload Date" 
                      secondary={formatDate(document.uploadedAt)} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Last Modified" 
                      secondary={formatDate(document.lastModified)} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Downloads" 
                      secondary={`${document.downloadCount} times`} 
                    />
                  </ListItem>
                  {document.expiryDate && (
                    <ListItem>
                      <ListItemText 
                        primary="Expires" 
                        secondary={formatDate(document.expiryDate)} 
                      />
                    </ListItem>
                  )}
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {document.tags.map((tag) => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small" 
                      variant="outlined"
                    />
                  ))}
                </Box>
                
                <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                  <Button variant="contained" fullWidth startIcon={<i className="ri-download-line" />}>
                    Download
                  </Button>
                  <Button variant="outlined" fullWidth startIcon={<i className="ri-share-line" />}>
                    Share
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
      
      {activeTab === 'details' && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Document Details
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Basic Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Name" secondary={document.name} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Description" secondary={document.description} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Category" secondary={document.category} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="File Type" secondary={document.type} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="File Size" secondary={document.size} />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Management Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Department" secondary={document.department} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Status" secondary={document.status} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Version" secondary={document.version} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Required Document" secondary={document.isRequired ? 'Yes' : 'No'} />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Expiry Date" 
                        secondary={document.expiryDate ? formatDate(document.expiryDate) : 'No expiry'} 
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
      
      {activeTab === 'versions' && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Version History
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Version</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>Changes</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {versionHistory.map((version) => (
                      <TableRow key={version.version}>
                        <TableCell>
                          <Typography variant="subtitle2">
                            v{version.version}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {formatDate(version.date)}
                        </TableCell>
                        <TableCell>{version.author}</TableCell>
                        <TableCell>{version.changes}</TableCell>
                        <TableCell>
                          <Chip 
                            label={version.status} 
                            color={version.status === 'current' ? 'primary' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="small" variant="outlined">
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      )}
      
      {activeTab === 'access' && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Access Log
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Department</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accessLog.map((log, index) => (
                      <TableRow key={index}>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>
                          <Chip 
                            label={log.action} 
                            color={log.action === 'Downloaded' ? 'primary' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{formatDate(log.date)}</TableCell>
                        <TableCell>{log.department}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default DocumentPreview
