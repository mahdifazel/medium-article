import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

interface DocumentFooterProps {
  content: string;
  onChange: (content: string) => void;
}

const DocumentFooter: React.FC<DocumentFooterProps> = ({ content, onChange }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Document Footer
      </Typography>
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          minHeight: '60px',
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
          placeholder="Enter footer content (e.g., page numbers, copyright, contact info)..."
          value={content}
          onChange={(e) => onChange(e.target.value)}
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: '0.9rem',
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

export default DocumentFooter;