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
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'

const DocumentCategories = () => {
  const [categories, setCategories] = useState([
    {
      id: 'asset-manuals',
      name: 'Asset Manuals',
      description: 'Equipment manuals and technical documentation',
      documentCount: 45,
      color: '#1976d2'
    },
    {
      id: 'safety-procedures',
      name: 'Safety Procedures',
      description: 'Safety protocols and emergency procedures',
      documentCount: 32,
      color: '#d32f2f'
    },
    {
      id: 'quality-control',
      name: 'Quality Control',
      description: 'Quality assurance and testing procedures',
      documentCount: 28,
      color: '#388e3c'
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      description: 'Maintenance schedules and repair procedures',
      documentCount: 67,
      color: '#f57c00'
    },
    {
      id: 'compliance',
      name: 'Compliance',
      description: 'Regulatory compliance and audit documents',
      documentCount: 23,
      color: '#7b1fa2'
    },
    {
      id: 'training',
      name: 'Training Materials',
      description: 'Training resources and educational content',
      documentCount: 19,
      color: '#0288d1'
    },
    {
      id: 'reports',
      name: 'Reports',
      description: 'Operational and analytical reports',
      documentCount: 156,
      color: '#5d4037'
    },
    {
      id: 'certificates',
      name: 'Certificates',
      description: 'Certifications and official documents',
      documentCount: 34,
      color: '#689f38'
    }
  ])
  
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#1976d2'
  })
  
  const handleAddCategory = () => {
    setEditingCategory(null)
    setFormData({
      name: '',
      description: '',
      color: '#1976d2'
    })
    setDialogOpen(true)
  }
  
  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color
    })
    setDialogOpen(true)
  }
  
  const handleDeleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId))
  }
  
  const handleSaveCategory = () => {
    if (editingCategory) {
      // Update existing category
      setCategories(prev => 
        prev.map(cat => 
          cat.id === editingCategory.id 
            ? { ...cat, ...formData }
            : cat
        )
      )
    } else {
      // Add new category
      const newCategory = {
        id: formData.name.toLowerCase().replace(/\s+/g, '-'),
        ...formData,
        documentCount: 0
      }
      setCategories(prev => [...prev, newCategory])
    }
    
    setDialogOpen(false)
    setEditingCategory(null)
    setFormData({
      name: '',
      description: '',
      color: '#1976d2'
    })
  }
  
  const handleFormChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    })
  }
  
  const predefinedColors = [
    '#1976d2', '#d32f2f', '#388e3c', '#f57c00',
    '#7b1fa2', '#0288d1', '#5d4037', '#689f38',
    '#455a64', '#e91e63', '#ff5722', '#795548'
  ]
  
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h5" gutterBottom>
              Document Categories
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage document categories and organization structure
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<i className="ri-add-line" />}
            onClick={handleAddCategory}
          >
            Add Category
          </Button>
        </Box>
      </Grid>
      
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: category.color, width: 48, height: 48 }}>
                      <i className="ri-folder-line" />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {category.name}
                      </Typography>
                      <Chip 
                        label={`${category.documentCount} documents`} 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {category.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEditCategory(category)}
                    >
                      Edit
                    </Button>
                    
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteCategory(category.id)}
                      disabled={category.documentCount > 0}
                    >
                      <i className="ri-delete-bin-line" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      
      {/* Add/Edit Category Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingCategory ? 'Edit Category' : 'Add New Category'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Category Name"
                fullWidth
                value={formData.name}
                onChange={handleFormChange('name')}
                placeholder="Enter category name"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={handleFormChange('description')}
                placeholder="Enter category description"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Category Color
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {predefinedColors.map((color) => (
                  <Box
                    key={color}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: color,
                      borderRadius: 1,
                      cursor: 'pointer',
                      border: formData.color === color ? '3px solid #000' : '1px solid #ddd',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                    onClick={() => setFormData({ ...formData, color })}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveCategory}
            disabled={!formData.name.trim()}
          >
            {editingCategory ? 'Update' : 'Add'} Category
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default DocumentCategories
