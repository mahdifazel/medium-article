import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

interface DocumentHeaderProps {
  content: string;
  onChange: (content: string) => void;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({ content, onChange }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Document Header
      </Typography>
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          minHeight: '80px',
          bgcolor: '#f8f9fa',
          border: '2px dashed #dee2e6',
          '&:hover': {
            borderColor: '#1976d2',
          }
        }}
      >
        <TextField
          fullWidth
          multiline
          variant="standard"
          placeholder="Enter header content (e.g., document title, author, date)..."
          value={content}
          onChange={(e) => onChange(e.target.value)}
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: '1.1rem',
              fontWeight: 500,
              textAlign: 'center',
            }
          }}
          sx={{
            '& .MuiInputBase-input': {
              textAlign: 'center',
            }
          }}
        />
      </Paper>
    </Box>
  );
};

export default DocumentHeader;