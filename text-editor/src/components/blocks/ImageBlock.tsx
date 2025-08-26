import React, { useState, useRef } from 'react';
import {
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Paper,
  TextField,
  Button,
  Typography,
  Slider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  PhotoCamera as UploadIcon,
  AspectRatio as ResizeIcon,
} from '@mui/icons-material';
import { ContentBlock, ImageData } from '../../types';

interface ImageBlockProps {
  block: ContentBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (content: ImageData) => void;
  onDelete: () => void;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({
  block,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
}) => {
  const [showControls, setShowControls] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const content = block.content as ImageData;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onUpdate({
          ...content,
          src: result,
          alt: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAltTextChange = (alt: string) => {
    onUpdate({
      ...content,
      alt,
    });
  };

  const handleSizeChange = (dimension: 'width' | 'height', value: number) => {
    onUpdate({
      ...content,
      [dimension]: value,
    });
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box
      sx={{
        mb: 2,
        border: isSelected ? '2px solid #1976d2' : '1px transparent solid',
        borderRadius: 1,
        position: 'relative',
        '&:hover': {
          border: '1px solid #ccc',
        },
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Image Toolbar */}
      {isSelected && (
        <Paper
          elevation={2}
          sx={{
            position: 'absolute',
            top: -60,
            left: 0,
            zIndex: 10,
            p: 1,
          }}
        >
          <Toolbar variant="dense" sx={{ minHeight: 'auto', gap: 1 }}>
            <Tooltip title="Upload Image">
              <IconButton size="small" onClick={triggerFileUpload}>
                <UploadIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Resize Options">
              <IconButton 
                size="small" 
                onClick={() => setShowControls(!showControls)}
                color={showControls ? 'primary' : 'default'}
              >
                <ResizeIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton size="small" onClick={onDelete} color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Paper>
      )}

      {/* Size Controls */}
      {isSelected && showControls && (
        <Paper
          elevation={2}
          sx={{
            position: 'absolute',
            top: -120,
            left: 0,
            zIndex: 10,
            p: 2,
            minWidth: 300,
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Image Properties
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Width: {content.width || 300}px
            </Typography>
            <Slider
              value={content.width || 300}
              onChange={(_, value) => handleSizeChange('width', value as number)}
              min={50}
              max={800}
              step={10}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Height: {content.height || 200}px
            </Typography>
            <Slider
              value={content.height || 200}
              onChange={(_, value) => handleSizeChange('height', value as number)}
              min={50}
              max={600}
              step={10}
              valueLabelDisplay="auto"
            />
          </Box>

          <TextField
            fullWidth
            size="small"
            label="Alt Text"
            value={content.alt}
            onChange={(e) => handleAltTextChange(e.target.value)}
            placeholder="Describe the image..."
          />
        </Paper>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />

      {/* Image Content */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        {content.src ? (
          <img
            src={content.src}
            alt={content.alt}
            style={{
              maxWidth: '100%',
              width: content.width || 300,
              height: content.height || 200,
              objectFit: 'contain',
              border: '1px solid #ddd',
              borderRadius: 4,
            }}
          />
        ) : (
          <Box
            sx={{
              width: content.width || 300,
              height: content.height || 200,
              border: '2px dashed #ccc',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
              mx: 'auto',
            }}
            onClick={triggerFileUpload}
          >
            <UploadIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Click to upload image
            </Typography>
          </Box>
        )}
        
        {content.alt && (
          <Typography 
            variant="caption" 
            display="block" 
            sx={{ mt: 1, fontStyle: 'italic', color: 'text.secondary' }}
          >
            {content.alt}
          </Typography>
        )}
      </Box>
    </Box>
  );
};