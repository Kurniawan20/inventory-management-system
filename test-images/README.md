# OCR Test Images for Pertamina Asset Management

This directory contains sample equipment nameplate images for testing the OCR functionality.

## How to Generate Test Images

1. **Open HTML files in your browser:**
   - `pump-nameplate.html` - KSB Centrifugal Pump nameplate
   - `motor-nameplate.html` - Siemens Motor nameplate  
   - `valve-nameplate.html` - Flowserve Gate Valve nameplate

2. **Save as images:**
   - Right-click on the nameplate
   - Select "Save Image As" or take a screenshot
   - Save as PNG or JPG format
   - Recommended size: 800x600 pixels minimum

## Expected OCR Results

### KSB Pump Nameplate:
- **Model**: ETANORM-G 065-050-200
- **Serial Number**: KSB-2023-P-45678
- **Manufacturer**: KSB
- **Power**: 75 kW
- **Voltage**: 380V
- **Capacity**: 500 L/min
- **Pressure**: 16 bar
- **Year**: 2023

### Siemens Motor Nameplate:
- **Model**: 1LA7130-4AA60
- **Serial Number**: SIE-2023-M-98765
- **Manufacturer**: SIEMENS
- **Power**: 11 kW
- **Voltage**: 400V
- **Current**: 22.1 A
- **Frequency**: 50 Hz
- **Speed**: 1450 rpm
- **Year**: 2023

### Flowserve Valve Nameplate:
- **Model**: DURCO MK3-6-150
- **Serial Number**: FLS-2023-V-12345
- **Manufacturer**: FLOWSERVE
- **Size**: 6 INCH
- **Pressure**: 150 PSI
- **Temperature**: -20°C to 200°C
- **Material**: SS316
- **Year**: 2023

## Testing Instructions

1. Start the development server: `npm run dev`
2. Navigate to Asset Registration page
3. Upload one of the generated nameplate images
4. Click the OCR scan button (📄)
5. Verify that the extracted data matches the expected results above
6. Check that form fields are auto-populated correctly

## Tips for Best Results

- Use high contrast images (dark text on light background)
- Ensure text is horizontal and clearly readable
- Avoid reflections or shadows on the nameplate
- Crop images tightly around the text area
- Use PNG format for best quality

The OCR system should automatically detect and parse the equipment information from these standardized nameplate formats.
