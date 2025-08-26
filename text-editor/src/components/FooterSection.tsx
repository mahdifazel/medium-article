import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

interface FooterSectionProps {
  content: string;
  onChange: (content: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  content,
  onChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ flexGrow: 1 }}>
          Footer
        </Typography>
        <IconButton size="small" onClick={handleToggle}>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      
      <Collapse in={isExpanded}>
        <TextField
          multiline
          fullWidth
          minRows={2}
          maxRows={4}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter footer content..."
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
      </Collapse>
      
      {!isExpanded && content && (
        <Box
          sx={{
            minHeight: 32,
            p: 1,
            border: '1px dashed #ccc',
            borderRadius: 1,
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',
          }}
          onClick={handleToggle}
        >
          <Typography variant="body2" color="text.secondary" noWrap>
            {content || 'Click to add footer...'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};