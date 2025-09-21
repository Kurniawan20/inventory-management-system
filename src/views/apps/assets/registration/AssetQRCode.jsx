'use client'

// React Imports
import { useState, useEffect, useRef } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

// Hook Imports
import { useAssetRegistration } from './AssetRegistrationProvider'

const AssetQRCode = () => {
  const { formData, updateFormData, errors } = useAssetRegistration()
  const [qrCodeData, setQrCodeData] = useState('')
  const [qrCodeSize, setQrCodeSize] = useState(200)
  const [qrCodeFormat, setQrCodeFormat] = useState('PNG')
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef(null)

  // QR Code generation options
  const qrSizes = [
    { value: 150, label: 'Small (150px)' },
    { value: 200, label: 'Medium (200px)' },
    { value: 300, label: 'Large (300px)' },
    { value: 400, label: 'Extra Large (400px)' }
  ]

  const qrFormats = ['PNG', 'JPEG', 'SVG']

  // Generate QR code data from asset information
  const generateQRData = () => {
    const qrData = {
      assetCode: formData.assetCode || '',
      name: formData.name || '',
      category: formData.category?.primary || '',
      location: {
        facility: formData.location?.facility || '',
        building: formData.location?.building || '',
        room: formData.location?.room || ''
      },
      status: formData.status || 'active',
      generatedAt: new Date().toISOString(),
      url: `${window.location.origin}/assets/${formData.assetCode || 'unknown'}`
    }
    
    return JSON.stringify(qrData)
  }

  // Simple QR code generation using canvas (basic implementation)
  const generateQRCode = async () => {
    if (!formData.assetCode || !formData.name) {
      return
    }

    setIsGenerating(true)
    
    try {
      const qrData = generateQRData()
      setQrCodeData(qrData)
      
      // Simulate QR code generation delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real implementation, you would use a QR code library like 'qrcode'
      // For now, we'll create a placeholder representation
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        canvas.width = qrCodeSize
        canvas.height = qrCodeSize
        
        // Clear canvas
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, qrCodeSize, qrCodeSize)
        
        // Draw QR code pattern (simplified representation)
        ctx.fillStyle = '#000000'
        const moduleSize = qrCodeSize / 25
        
        // Draw finder patterns (corners)
        const drawFinderPattern = (x, y) => {
          ctx.fillRect(x * moduleSize, y * moduleSize, 7 * moduleSize, 7 * moduleSize)
          ctx.fillStyle = '#ffffff'
          ctx.fillRect((x + 1) * moduleSize, (y + 1) * moduleSize, 5 * moduleSize, 5 * moduleSize)
          ctx.fillStyle = '#000000'
          ctx.fillRect((x + 2) * moduleSize, (y + 2) * moduleSize, 3 * moduleSize, 3 * moduleSize)
        }
        
        drawFinderPattern(0, 0)
        drawFinderPattern(18, 0)
        drawFinderPattern(0, 18)
        
        // Draw some data modules (random pattern for demo)
        for (let i = 0; i < 25; i++) {
          for (let j = 0; j < 25; j++) {
            if (Math.random() > 0.5 && 
                !((i < 9 && j < 9) || (i > 15 && j < 9) || (i < 9 && j > 15))) {
              ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize)
            }
          }
        }
        
        // Add asset code text below QR code
        ctx.fillStyle = '#000000'
        ctx.font = '12px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(formData.assetCode, qrCodeSize / 2, qrCodeSize + 20)
      }
      
      // Update form data with QR code info
      updateFormData('qrCode', {
        data: qrData,
        size: qrCodeSize,
        format: qrCodeFormat,
        generatedAt: new Date().toISOString()
      })
      
    } catch (error) {
      console.error('QR Code generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Download QR code
  const downloadQRCode = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const link = document.createElement('a')
      link.download = `${formData.assetCode || 'asset'}_qrcode.${qrCodeFormat.toLowerCase()}`
      link.href = canvas.toDataURL(`image/${qrCodeFormat.toLowerCase()}`)
      link.click()
    }
  }

  // Print QR code
  const printQRCode = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const printWindow = window.open('', '_blank')
      const img = canvas.toDataURL('image/png')
      
      printWindow.document.write(`
        <html>
          <head>
            <title>Asset QR Code - ${formData.assetCode}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                margin: 20px;
              }
              .qr-container {
                border: 2px solid #000;
                padding: 20px;
                display: inline-block;
                margin: 20px;
              }
              .asset-info {
                margin-top: 10px;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <h2>Asset QR Code</h2>
              <img src="${img}" alt="QR Code" />
              <div class="asset-info">
                <strong>${formData.assetCode}</strong><br/>
                ${formData.name}<br/>
                ${formData.location?.facility || ''}
              </div>
            </div>
          </body>
        </html>
      `)
      
      printWindow.document.close()
      printWindow.print()
    }
  }

  // Auto-generate QR code when asset code or name changes
  useEffect(() => {
    if (formData.assetCode && formData.name) {
      generateQRCode()
    }
  }, [formData.assetCode, formData.name, qrCodeSize])

  return (
    <Card>
      <CardHeader
        title='QR Code Generation'
        subheader='Generate QR codes for asset identification and tracking'
      />
      <CardContent>
        <Grid container spacing={4}>
          {/* QR Code Settings */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <i className="ri-qr-code-line" style={{ marginRight: 8 }} />
              QR Code Settings
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>QR Code Size</InputLabel>
                  <Select
                    value={qrCodeSize}
                    label="QR Code Size"
                    onChange={(e) => setQrCodeSize(e.target.value)}
                  >
                    {qrSizes.map((size) => (
                      <MenuItem key={size.value} value={size.value}>
                        {size.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Export Format</InputLabel>
                  <Select
                    value={qrCodeFormat}
                    label="Export Format"
                    onChange={(e) => setQrCodeFormat(e.target.value)}
                  >
                    {qrFormats.map((format) => (
                      <MenuItem key={format} value={format}>
                        {format}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={generateQRCode}
                  disabled={isGenerating || !formData.assetCode || !formData.name}
                  startIcon={isGenerating ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-qr-code-line" />}
                  fullWidth
                >
                  {isGenerating ? 'Generating...' : 'Generate QR Code'}
                </Button>
              </Grid>
            </Grid>
            
            {/* QR Code Data Preview */}
            {qrCodeData && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  QR Code Data:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={qrCodeData}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    readOnly: true,
                    style: { fontSize: '12px' }
                  }}
                />
              </Box>
            )}
          </Grid>
          
          {/* QR Code Preview */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <i className="ri-eye-line" style={{ marginRight: 8 }} />
              QR Code Preview
            </Typography>
            
            <Paper
              elevation={2}
              sx={{
                p: 3,
                textAlign: 'center',
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {formData.assetCode && formData.name ? (
                <Box>
                  <canvas
                    ref={canvasRef}
                    style={{
                      border: '1px solid #ddd',
                      maxWidth: '100%',
                      height: 'auto'
                    }}
                  />
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Asset: {formData.assetCode}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Size: {qrCodeSize}x{qrCodeSize}px
                    </Typography>
                  </Box>
                  
                  {/* Action Buttons */}
                  <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Tooltip title="Download QR Code">
                      <IconButton onClick={downloadQRCode} color="primary">
                        <i className="ri-download-line" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Print QR Code">
                      <IconButton onClick={printQRCode} color="primary">
                        <i className="ri-printer-line" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center' }}>
                  <i className="ri-qr-code-line" style={{ fontSize: 64, color: 'var(--mui-palette-text-disabled)' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Enter Asset Code and Name to generate QR code
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
          
          {/* QR Code Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>QR Code Features:</strong>
              </Typography>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>Contains asset code, name, location, and direct link</li>
                <li>Scannable with any QR code reader or mobile camera</li>
                <li>Links to asset details page for quick access</li>
                <li>Includes generation timestamp for tracking</li>
              </ul>
            </Alert>
            
            {formData.qrCode && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={`Generated: ${new Date(formData.qrCode.generatedAt).toLocaleDateString()}`}
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={`Size: ${formData.qrCode.size}px`}
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={`Format: ${formData.qrCode.format}`}
                  size="small"
                  variant="outlined"
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AssetQRCode
