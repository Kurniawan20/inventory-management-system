'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

// OCR Service Import
import { extractTextFromImage, parseAssetInformation, validateOCRResult } from '@/utils/ocrService'

const OCRTextDialog = ({ 
  open, 
  onClose, 
  imageFile, 
  onTextExtracted,
  ocrType = 'general' 
}) => {
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [ocrResult, setOcrResult] = useState(null)
  const [extractedText, setExtractedText] = useState('')
  const [parsedData, setParsedData] = useState(null)
  const [validation, setValidation] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [error, setError] = useState(null)

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open && imageFile) {
      setProcessing(false)
      setProgress(0)
      setOcrResult(null)
      setExtractedText('')
      setParsedData(null)
      setValidation(null)
      setActiveTab(0)
      setError(null)
    }
  }, [open, imageFile])

  const handleStartOCR = async () => {
    if (!imageFile) return

    setProcessing(true)
    setProgress(0)
    setError(null)

    try {
      const result = await extractTextFromImage(
        imageFile, 
        ocrType, 
        (progressValue) => setProgress(progressValue)
      )

      if (result.success) {
        setOcrResult(result)
        setExtractedText(result.text)
        
        // Parse asset information if it's a nameplate or document
        if (ocrType === 'nameplate' || ocrType === 'document') {
          const parsed = parseAssetInformation(result.text)
          setParsedData(parsed)
        }
        
        // Validate OCR result
        const validationResult = validateOCRResult(result.confidence, result.text)
        setValidation(validationResult)
        
        setActiveTab(1) // Switch to extracted text tab
      } else {
        setError(result.error || 'OCR processing failed')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  const handleTextChange = (event) => {
    setExtractedText(event.target.value)
    
    // Re-parse if text changes and we're in nameplate/document mode
    if ((ocrType === 'nameplate' || ocrType === 'document') && event.target.value) {
      const parsed = parseAssetInformation(event.target.value)
      setParsedData(parsed)
    }
  }

  const handleApply = () => {
    // Determine asset type based on parsed data and image content
    let assetType = ocrType
    
    // Try to detect asset type from parsed data
    if (parsedData) {
      if (parsedData.size && parsedData.material) {
        assetType = 'ppe'
      } else if (parsedData.flowRate || parsedData.pressure) {
        assetType = 'pump'
      } else if (parsedData.macAddress || parsedData.ipAddress) {
        assetType = 'it'
      }
    }
    
    // Pass extracted text, parsed data, and detected type back to parent
    onTextExtracted({
      text: extractedText,
      parsedData,
      confidence: ocrResult?.confidence || 0,
      assetType
    })
    onClose()
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const renderImagePreview = () => (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
      <img
        src={URL.createObjectURL(imageFile)}
        alt="OCR Source"
        style={{
          maxWidth: '100%',
          maxHeight: '300px',
          objectFit: 'contain',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '8px'
        }}
      />
      <Typography variant="caption" display="block" sx={{ mt: 1 }} color="text.secondary">
        {imageFile.name} ({Math.round(imageFile.size / 1024)} KB)
      </Typography>
    </Box>
  )

  const renderOCRProgress = () => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Processing image with OCR... {progress}%
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  )

  const renderExtractedText = () => (
    <Box>
      {validation && (
        <Alert 
          severity={validation.isReliable ? 'success' : 'warning'} 
          sx={{ mb: 2 }}
        >
          <Typography variant="body2">
            <strong>Confidence: {ocrResult?.confidence?.toFixed(1)}%</strong>
          </Typography>
          {validation.suggestions.map((suggestion, index) => (
            <Typography key={index} variant="body2" sx={{ mt: 0.5 }}>
              • {suggestion}
            </Typography>
          ))}
        </Alert>
      )}
      
      <TextField
        fullWidth
        multiline
        rows={8}
        label="Extracted Text"
        value={extractedText}
        onChange={handleTextChange}
        placeholder="Extracted text will appear here..."
        helperText="You can edit the extracted text before applying it"
      />
    </Box>
  )

  const renderParsedData = () => {
    if (!parsedData) return null

    const fields = Object.entries(parsedData).filter(([key, value]) => value !== null)
    
    if (fields.length === 0) {
      return (
        <Alert severity="info">
          No asset information could be automatically parsed from the text.
        </Alert>
      )
    }

    return (
      <Grid container spacing={2}>
        {fields.map(([key, value]) => (
          <Grid item xs={12} sm={6} key={key}>
            <Card variant="outlined">
              <CardContent sx={{ py: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { minHeight: '600px' }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <i className="ri-text-scan-line" style={{ marginRight: 8, fontSize: 24 }} />
          OCR Text Extraction
          <Chip 
            label={ocrType} 
            size="small" 
            sx={{ ml: 2, textTransform: 'capitalize' }}
            color="primary"
            variant="outlined"
          />
        </Box>
        <IconButton onClick={onClose}>
          <i className="ri-close-line" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {imageFile && renderImagePreview()}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {processing && renderOCRProgress()}

        {!processing && !ocrResult && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Click "Start OCR" to extract text from the image
            </Typography>
            <Button
              variant="contained"
              onClick={handleStartOCR}
              startIcon={<i className="ri-text-scan-line" />}
              disabled={!imageFile}
            >
              Start OCR Processing
            </Button>
          </Box>
        )}

        {ocrResult && (
          <Box>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="Extracted Text" />
              {parsedData && <Tab label="Parsed Data" />}
            </Tabs>

            <Divider sx={{ mb: 2 }} />

            {activeTab === 0 && renderExtractedText()}
            {activeTab === 1 && renderParsedData()}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        {!processing && ocrResult && (
          <Button
            onClick={handleApply}
            variant="contained"
            disabled={!extractedText.trim()}
            startIcon={<i className="ri-check-line" />}
          >
            Apply Text
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default OCRTextDialog
