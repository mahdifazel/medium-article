import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Alert,
  Slider,
} from '@mui/material';
import { 
  Image as ImageIcon, 
  CloudUpload as UploadIcon,
  Link as LinkIcon,
  Close as CloseIcon 
} from '@mui/icons-material';

interface ImageDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (src: string, alt: string, width?: number, height?: number) => void;
}

const ImageDialog: React.FC<ImageDialogProps> = ({ open, onClose, onAdd }) => {
  const [tabValue, setTabValue] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [customWidth, setCustomWidth] = useState(300);
  const [customHeight, setCustomHeight] = useState(200);
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        setError('');
      } else {
        setError('Please select a valid image file.');
      }
    }
  };

  const handleUrlPreview = () => {
    if (imageUrl) {
      setImagePreview(imageUrl);
      setError('');
    }
  };

  const handleAdd = () => {
    let src = '';
    
    if (tabValue === 0 && imageUrl) {
      src = imageUrl;
    } else if (tabValue === 1 && imagePreview) {
      src = imagePreview;
    }
    
    if (src && altText) {
      onAdd(
        src, 
        altText, 
        useCustomSize ? customWidth : undefined, 
        useCustomSize ? customHeight : undefined
      );
      handleClose();
    } else {
      setError('Please provide both image source and alt text.');
    }
  };

  const handleClose = () => {
    setTabValue(0);
    setImageUrl('');
    setAltText('');
    setImageFile(null);
    setImagePreview('');
    setCustomWidth(300);
    setCustomHeight(200);
    setUseCustomSize(false);
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ImageIcon color="primary" />
        Insert Image
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Tabs value={tabValue} onChange={(_, value) => setTabValue(value)} sx={{ mb: 3 }}>
            <Tab icon={<LinkIcon />} label="URL" />
            <Tab icon={<UploadIcon />} label="Upload" />
          </Tabs>

          {/* URL Tab */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Image URL"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="outlined" 
                  onClick={handleUrlPreview}
                  disabled={!imageUrl}
                  fullWidth
                >
                  Preview Image
                </Button>
              </Grid>
            </Grid>
          )}

          {/* Upload Tab */}
          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: '2px dashed #ccc',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'action.hover',
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="h6" color="text.secondary">
                    Click to upload image
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Supports JPG, PNG, GIF
                  </Typography>
                  {imageFile && (
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                      Selected: {imageFile.name}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Alt Text */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Alt Text (Description)"
                placeholder="Describe the image for accessibility"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                fullWidth
                variant="outlined"
                required
              />
            </Grid>
          </Grid>

          {/* Custom Size Controls */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  variant={useCustomSize ? "contained" : "outlined"}
                  onClick={() => setUseCustomSize(!useCustomSize)}
                  size="small"
                >
                  Custom Size
                </Button>
              </Box>
            </Grid>
            {useCustomSize && (
              <>
                <Grid item xs={6}>
                  <Typography gutterBottom>Width: {customWidth}px</Typography>
                  <Slider
                    value={customWidth}
                    onChange={(_, value) => setCustomWidth(value as number)}
                    min={50}
                    max={800}
                    valueLabelDisplay="auto"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Height: {customHeight}px</Typography>
                  <Slider
                    value={customHeight}
                    onChange={(_, value) => setCustomHeight(value as number)}
                    min={50}
                    max={600}
                    valueLabelDisplay="auto"
                  />
                </Grid>
              </>
            )}
          </Grid>

          {/* Image Preview */}
          {imagePreview && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Preview:
              </Typography>
              <Box sx={{ textAlign: 'center', position: 'relative' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: useCustomSize ? `${customWidth}px` : '100%',
                    maxHeight: useCustomSize ? `${customHeight}px` : '300px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => setImagePreview('')}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'background.paper' }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          )}

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleAdd} 
          variant="contained" 
          startIcon={<ImageIcon />}
          disabled={!imagePreview || !altText}
        >
          Insert Image
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageDialog;