import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Toolbar,
  Tooltip,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatUnderlined as UnderlineIcon,
  FormatAlignLeft as AlignLeftIcon,
  FormatAlignCenter as AlignCenterIcon,
  FormatAlignRight as AlignRightIcon,
  FormatAlignJustify as AlignJustifyIcon,
} from '@mui/icons-material';
import { ContentBlock, TextData } from '../../types';

interface TextBlockProps {
  block: ContentBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (content: TextData) => void;
  onDelete: () => void;
}

export const TextBlock: React.FC<TextBlockProps> = ({
  block,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const textFieldRef = useRef<HTMLInputElement>(null);
  const content = block.content as TextData;

  useEffect(() => {
    if (isEditing && textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [isEditing]);

  const handleContentChange = (newContent: string) => {
    onUpdate({
      ...content,
      content: newContent,
    });
  };

  const handleFormattingChange = (property: keyof TextData['formatting'], value: any) => {
    onUpdate({
      ...content,
      formatting: {
        ...content.formatting,
        [property]: value,
      },
    });
  };

  const formatValue = (formats: string[]) => {
    const result: string[] = [];
    if (content.formatting.bold) result.push('bold');
    if (content.formatting.italic) result.push('italic');
    if (content.formatting.underline) result.push('underline');
    return result;
  };

  const handleFormatChange = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    handleFormattingChange('bold', newFormats.includes('bold'));
    handleFormattingChange('italic', newFormats.includes('italic'));
    handleFormattingChange('underline', newFormats.includes('underline'));
  };

  const getTextStyle = () => ({
    fontWeight: content.formatting.bold ? 'bold' : 'normal',
    fontStyle: content.formatting.italic ? 'italic' : 'normal',
    textDecoration: content.formatting.underline ? 'underline' : 'none',
    fontSize: content.formatting.fontSize || 14,
    color: content.formatting.color || '#000000',
    textAlign: content.formatting.align || 'left',
  });

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
      {/* Formatting Toolbar */}
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
            <ToggleButtonGroup
              value={formatValue([])}
              onChange={handleFormatChange}
              size="small"
            >
              <ToggleButton value="bold">
                <BoldIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="italic">
                <ItalicIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="underline">
                <UnderlineIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>

            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={content.formatting.fontSize || 14}
                onChange={(e) => handleFormattingChange('fontSize', e.target.value)}
              >
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={24}>24</MenuItem>
              </Select>
            </FormControl>

            <ToggleButtonGroup
              value={content.formatting.align || 'left'}
              exclusive
              onChange={(e, value) => value && handleFormattingChange('align', value)}
              size="small"
            >
              <ToggleButton value="left">
                <AlignLeftIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="center">
                <AlignCenterIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="right">
                <AlignRightIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="justify">
                <AlignJustifyIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>

            <Tooltip title="Delete">
              <IconButton size="small" onClick={onDelete} color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Paper>
      )}

      {/* Text Content */}
      {isEditing ? (
        <TextField
          ref={textFieldRef}
          multiline
          fullWidth
          value={content.content}
          onChange={(e) => handleContentChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsEditing(false);
            }
          }}
          variant="outlined"
          placeholder="Enter text..."
          sx={{
            '& .MuiInputBase-input': getTextStyle(),
          }}
        />
      ) : (
        <Box
          sx={{
            minHeight: 40,
            p: 2,
            cursor: 'text',
            ...getTextStyle(),
          }}
          onDoubleClick={() => setIsEditing(true)}
        >
          {content.content || 'Double-click to edit text...'}
        </Box>
      )}
    </Box>
  );
};