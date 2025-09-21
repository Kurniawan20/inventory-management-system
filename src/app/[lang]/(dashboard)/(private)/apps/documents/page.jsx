'use client'

// React Imports
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
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
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import InputAdornment from '@mui/material/InputAdornment'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Menu from '@mui/material/Menu'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Divider from '@mui/material/Divider'
import Badge from '@mui/material/Badge'

// Component Imports
import DocumentUpload from '@/views/apps/documents/DocumentUpload'
import DocumentList from '@/views/apps/documents/DocumentList'
import DocumentPreview from '@/views/apps/documents/DocumentPreview'
import DocumentCategories from '@/views/apps/documents/DocumentCategories'

const DocumentManagementPage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  
  // Sample document statistics
  const documentStats = {
    total: 1247,
    recent: 23,
    pending: 8,
    archived: 156
  }
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }
  
  const handleUploadClick = () => {
    setUploadDialogOpen(true)
  }
  
  const handleUploadClose = () => {
    setUploadDialogOpen(false)
  }
  
  const handlePreviewDocument = (document) => {
    setSelectedDocument(document)
    setPreviewDialogOpen(true)
  }
  
  const handlePreviewClose = () => {
    setPreviewDialogOpen(false)
    setSelectedDocument(null)
  }
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/en/dashboards/warehouse" underline="hover" color="inherit">
              Dashboard
            </Link>
            <Typography color="text.primary">Document Management</Typography>
          </Breadcrumbs>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Box>
              <Typography variant="h4">
                Document Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage all documents, SOPs, manuals, and compliance files
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<i className="ri-folder-line" />}
                onClick={() => router.push('/en/apps/documents/categories')}
              >
                Manage Categories
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<i className="ri-more-line" />}
                onClick={handleMenuOpen}
              >
                More Actions
              </Button>
              
              <Button
                variant="contained"
                startIcon={<i className="ri-upload-line" />}
                onClick={handleUploadClick}
              >
                Upload Document
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      
      {/* Statistics Cards */}
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 50, height: 50 }}>
                    <i className="ri-file-text-line" style={{ fontSize: '24px' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h4">{documentStats.total}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Documents
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'success.main', width: 50, height: 50 }}>
                    <i className="ri-time-line" style={{ fontSize: '24px' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h4">{documentStats.recent}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recent Uploads
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'warning.main', width: 50, height: 50 }}>
                    <i className="ri-hourglass-line" style={{ fontSize: '24px' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h4">{documentStats.pending}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending Review
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'info.main', width: 50, height: 50 }}>
                    <i className="ri-archive-line" style={{ fontSize: '24px' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h4">{documentStats.archived}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Archived
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      
      {/* Filters and Search */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab 
                  value="all" 
                  label="All Documents" 
                  icon={<i className="ri-file-list-line" />} 
                  iconPosition="start"
                />
                <Tab 
                  value="sop" 
                  label="SOPs & Manuals" 
                  icon={<i className="ri-book-line" />} 
                  iconPosition="start"
                />
                <Tab 
                  value="compliance" 
                  label="Compliance" 
                  icon={<i className="ri-shield-check-line" />} 
                  iconPosition="start"
                />
                <Tab 
                  value="certificates" 
                  label="Certificates" 
                  icon={<i className="ri-award-line" />} 
                  iconPosition="start"
                />
                <Tab 
                  value="reports" 
                  label="Reports" 
                  icon={<i className="ri-bar-chart-line" />} 
                  iconPosition="start"
                />
              </Tabs>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                placeholder="Search documents..."
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ minWidth: 300 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="ri-search-line" />
                    </InputAdornment>
                  )
                }}
              />
              
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="asset-manuals">Asset Manuals</MenuItem>
                  <MenuItem value="safety-procedures">Safety Procedures</MenuItem>
                  <MenuItem value="quality-control">Quality Control</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                  <MenuItem value="compliance">Compliance</MenuItem>
                  <MenuItem value="training">Training Materials</MenuItem>
                  <MenuItem value="reports">Reports</MenuItem>
                </Select>
              </FormControl>
              
              <Button
                variant="outlined"
                startIcon={<i className="ri-filter-line" />}
              >
                Advanced Filters
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      {/* Document List */}
      <Grid item xs={12}>
        <DocumentList
          activeTab={activeTab}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onPreviewDocument={handlePreviewDocument}
        />
      </Grid>
      
      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={handleUploadClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <i className="ri-upload-line" />
            Upload Document
          </Box>
        </DialogTitle>
        <DialogContent>
          <DocumentUpload onClose={handleUploadClose} />
        </DialogContent>
      </Dialog>
      
      {/* Preview Dialog */}
      <Dialog
        open={previewDialogOpen}
        onClose={handlePreviewClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <i className="ri-eye-line" />
              Document Preview
            </Box>
            <IconButton onClick={handlePreviewClose}>
              <i className="ri-close-line" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DocumentPreview document={selectedDocument} />
        </DialogContent>
      </Dialog>
      
      {/* More Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <i className="ri-download-line" style={{ marginRight: 8 }} />
          Bulk Download
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className="ri-delete-bin-line" style={{ marginRight: 8 }} />
          Bulk Delete
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <i className="ri-settings-line" style={{ marginRight: 8 }} />
          Document Settings
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <i className="ri-bar-chart-line" style={{ marginRight: 8 }} />
          Usage Analytics
        </MenuItem>
      </Menu>
    </Grid>
  )
}

export default DocumentManagementPage
