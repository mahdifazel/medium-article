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
  Typography,
  Popover,
  Grid,
  Button,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Functions as MathIcon,
  AspectRatio as DisplayIcon,
} from '@mui/icons-material';
import { ContentBlock, MathData } from '../../types';
import 'katex/dist/katex.min.css';

// Since we can't import react-katex directly in this environment, 
// I'll create a simple math renderer component
const MathRenderer: React.FC<{ expression: string; display: boolean }> = ({ expression, display }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    // In a real implementation, this would use KaTeX
    // For now, we'll show the raw expression in a math-like format
    try {
      // This is a placeholder - in real implementation you'd use:
      // const katex = require('katex');
      // const rendered = katex.renderToString(expression, { displayMode: display });
      // setHtml(rendered);
      
      setHtml(expression); // Placeholder
    } catch (error) {
      setHtml(expression);
    }
  }, [expression, display]);

  return (
    <Box
      sx={{
        fontFamily: 'KaTeX_Main, "Times New Roman", serif',
        fontSize: display ? '1.2em' : '1em',
        textAlign: display ? 'center' : 'inherit',
        p: display ? 2 : 0.5,
        border: display ? '1px solid #ddd' : 'none',
        borderRadius: display ? 1 : 0,
        backgroundColor: display ? '#f9f9f9' : 'transparent',
        fontStyle: 'italic',
      }}
    >
      {html || expression}
    </Box>
  );
};

interface MathBlockProps {
  block: ContentBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (content: MathData) => void;
  onDelete: () => void;
}

export const MathBlock: React.FC<MathBlockProps> = ({
  block,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);
  const content = block.content as MathData;

  // Common math symbols and expressions
  const mathSymbols = [
    { symbol: '\\alpha', label: 'α' },
    { symbol: '\\beta', label: 'β' },
    { symbol: '\\gamma', label: 'γ' },
    { symbol: '\\delta', label: 'δ' },
    { symbol: '\\epsilon', label: 'ε' },
    { symbol: '\\pi', label: 'π' },
    { symbol: '\\sigma', label: 'σ' },
    { symbol: '\\theta', label: 'θ' },
    { symbol: '\\lambda', label: 'λ' },
    { symbol: '\\mu', label: 'μ' },
    { symbol: '\\infty', label: '∞' },
    { symbol: '\\sum', label: '∑' },
    { symbol: '\\prod', label: '∏' },
    { symbol: '\\int', label: '∫' },
    { symbol: '\\frac{a}{b}', label: 'a/b' },
    { symbol: '\\sqrt{x}', label: '√x' },
    { symbol: 'x^{2}', label: 'x²' },
    { symbol: 'x_{1}', label: 'x₁' },
    { symbol: '\\leq', label: '≤' },
    { symbol: '\\geq', label: '≥' },
    { symbol: '\\neq', label: '≠' },
    { symbol: '\\approx', label: '≈' },
    { symbol: '\\pm', label: '±' },
    { symbol: '\\times', label: '×' },
  ];

  useEffect(() => {
    if (isEditing && textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [isEditing]);

  const handleExpressionChange = (newExpression: string) => {
    onUpdate({
      ...content,
      expression: newExpression,
    });
  };

  const handleDisplayChange = (display: boolean) => {
    onUpdate({
      ...content,
      display,
    });
  };

  const handleSymbolInsert = (symbol: string) => {
    const currentExpression = content.expression;
    const newExpression = currentExpression + symbol;
    handleExpressionChange(newExpression);
    setAnchorEl(null);
  };

  const handleSymbolPaletteOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSymbolPaletteClose = () => {
    setAnchorEl(null);
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
      {/* Math Toolbar */}
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
              value={content.display ? 'display' : 'inline'}
              exclusive
              onChange={(e, value) => handleDisplayChange(value === 'display')}
              size="small"
            >
              <ToggleButton value="inline">
                <Tooltip title="Inline Math">
                  <span>Inline</span>
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="display">
                <Tooltip title="Display Math">
                  <DisplayIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>

            <Tooltip title="Math Symbols">
              <IconButton size="small" onClick={handleSymbolPaletteOpen}>
                <MathIcon fontSize="small" />
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

      {/* Symbol Palette Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleSymbolPaletteClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Paper sx={{ p: 2, maxWidth: 400 }}>
          <Typography variant="subtitle2" gutterBottom>
            Math Symbols
          </Typography>
          <Grid container spacing={1}>
            {mathSymbols.map((item, index) => (
              <Grid item key={index}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleSymbolInsert(item.symbol)}
                  sx={{ 
                    minWidth: 40, 
                    height: 40,
                    fontFamily: 'serif',
                    fontSize: '1.1em',
                  }}
                >
                  {item.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Popover>

      {/* Math Content */}
      <Box sx={{ p: 2 }}>
        {isEditing ? (
          <TextField
            ref={textFieldRef}
            multiline
            fullWidth
            value={content.expression}
            onChange={(e) => handleExpressionChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsEditing(false);
              }
            }}
            placeholder="Enter LaTeX expression (e.g., E = mc^2, \\frac{1}{2}, \\alpha + \\beta)"
            variant="outlined"
            helperText="Use LaTeX syntax for mathematical expressions"
          />
        ) : (
          <Box
            sx={{ 
              minHeight: 40, 
              cursor: 'text',
              display: 'flex',
              alignItems: 'center',
              justifyContent: content.display ? 'center' : 'flex-start',
            }}
            onDoubleClick={() => setIsEditing(true)}
          >
            {content.expression ? (
              <MathRenderer expression={content.expression} display={content.display} />
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Double-click to add math expression...
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};