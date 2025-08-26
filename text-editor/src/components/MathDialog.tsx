import React, { useState } from 'react';
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
  Chip,
} from '@mui/material';
import { 
  Functions as MathIcon,
  Code as LatexIcon,
  Apps as SymbolIcon 
} from '@mui/icons-material';
import { BlockMath } from 'react-katex';

interface MathDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (latex: string) => void;
}

const MathDialog: React.FC<MathDialogProps> = ({ open, onClose, onAdd }) => {
  const [tabValue, setTabValue] = useState(0);
  const [latexInput, setLatexInput] = useState('');
  const [error, setError] = useState('');

  // Common math symbols and their LaTeX
  const mathSymbols = [
    { symbol: '∑', latex: '\\sum', category: 'Operators' },
    { symbol: '∫', latex: '\\int', category: 'Operators' },
    { symbol: '∏', latex: '\\prod', category: 'Operators' },
    { symbol: '√', latex: '\\sqrt{}', category: 'Operators' },
    { symbol: '∞', latex: '\\infty', category: 'Symbols' },
    { symbol: '±', latex: '\\pm', category: 'Symbols' },
    { symbol: '≤', latex: '\\leq', category: 'Relations' },
    { symbol: '≥', latex: '\\geq', category: 'Relations' },
    { symbol: '≠', latex: '\\neq', category: 'Relations' },
    { symbol: '≈', latex: '\\approx', category: 'Relations' },
    { symbol: 'α', latex: '\\alpha', category: 'Greek' },
    { symbol: 'β', latex: '\\beta', category: 'Greek' },
    { symbol: 'γ', latex: '\\gamma', category: 'Greek' },
    { symbol: 'δ', latex: '\\delta', category: 'Greek' },
    { symbol: 'π', latex: '\\pi', category: 'Greek' },
    { symbol: 'θ', latex: '\\theta', category: 'Greek' },
    { symbol: 'λ', latex: '\\lambda', category: 'Greek' },
    { symbol: 'μ', latex: '\\mu', category: 'Greek' },
    { symbol: 'σ', latex: '\\sigma', category: 'Greek' },
    { symbol: 'Φ', latex: '\\Phi', category: 'Greek' },
  ];

  // Common formulas
  const commonFormulas = [
    { name: 'Quadratic Formula', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
    { name: 'Pythagorean Theorem', latex: 'a^2 + b^2 = c^2' },
    { name: 'Euler\'s Identity', latex: 'e^{i\\pi} + 1 = 0' },
    { name: 'Integral', latex: '\\int_{a}^{b} f(x) dx' },
    { name: 'Summation', latex: '\\sum_{i=1}^{n} x_i' },
    { name: 'Fraction', latex: '\\frac{a}{b}' },
    { name: 'Matrix', latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
    { name: 'Limit', latex: '\\lim_{x \\to \\infty} f(x)' },
  ];

  const handleSymbolClick = (latex: string) => {
    setLatexInput(latexInput + latex);
  };

  const handleFormulaClick = (latex: string) => {
    setLatexInput(latex);
  };

  const handleAdd = () => {
    if (latexInput.trim()) {
      onAdd(latexInput.trim());
      handleClose();
    } else {
      setError('Please enter a LaTeX expression.');
    }
  };

  const handleClose = () => {
    setTabValue(0);
    setLatexInput('');
    setError('');
    onClose();
  };

  const renderPreview = () => {
    if (!latexInput.trim()) return null;

    try {
      return <BlockMath math={latexInput} />;
    } catch (error) {
      return (
        <Alert severity="error" sx={{ mt: 2 }}>
          Invalid LaTeX syntax
        </Alert>
      );
    }
  };

  const groupedSymbols = mathSymbols.reduce((groups, symbol) => {
    const category = symbol.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(symbol);
    return groups;
  }, {} as Record<string, typeof mathSymbols>);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <MathIcon color="primary" />
        Insert Math Expression
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Tabs value={tabValue} onChange={(_, value) => setTabValue(value)} sx={{ mb: 3 }}>
            <Tab icon={<SymbolIcon />} label="Symbols" />
            <Tab icon={<LatexIcon />} label="Formulas" />
            <Tab icon={<MathIcon />} label="Custom" />
          </Tabs>

          {/* Symbols Tab */}
          {tabValue === 0 && (
            <Box>
              {Object.entries(groupedSymbols).map(([category, symbols]) => (
                <Box key={category} sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom color="primary">
                    {category}
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Grid container spacing={1}>
                      {symbols.map((item, index) => (
                        <Grid item key={index}>
                          <Button
                            variant="outlined"
                            onClick={() => handleSymbolClick(item.latex)}
                            sx={{
                              minWidth: '50px',
                              height: '50px',
                              fontSize: '1.2rem',
                              fontFamily: 'serif',
                            }}
                          >
                            {item.symbol}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Box>
              ))}
            </Box>
          )}

          {/* Formulas Tab */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom color="primary">
                Common Formulas
              </Typography>
              <Grid container spacing={2}>
                {commonFormulas.map((formula, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'action.hover',
                          borderColor: 'primary.main',
                        }
                      }}
                      onClick={() => handleFormulaClick(formula.latex)}
                    >
                      <Typography variant="subtitle2" gutterBottom>
                        {formula.name}
                      </Typography>
                      <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <BlockMath math={formula.latex} />
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Custom Tab */}
          {tabValue === 2 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom color="primary">
                LaTeX Examples
              </Typography>
              <Box sx={{ mb: 2 }}>
                {[
                  '\\frac{a}{b}',
                  'x^2',
                  'x_1',
                  '\\sqrt{x}',
                  '\\sum_{i=1}^n',
                  '\\int_a^b',
                ].map((example, index) => (
                  <Chip
                    key={index}
                    label={example}
                    onClick={() => handleSymbolClick(example)}
                    sx={{ mr: 1, mb: 1 }}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* LaTeX Input */}
          <Box sx={{ mt: 3 }}>
            <TextField
              label="LaTeX Expression"
              placeholder="Enter LaTeX code (e.g., \\frac{a}{b} or x^2 + y^2 = z^2)"
              value={latexInput}
              onChange={(e) => setLatexInput(e.target.value)}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              helperText="Use LaTeX syntax to create mathematical expressions"
            />
          </Box>

          {/* Preview */}
          {latexInput && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Preview:
              </Typography>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  bgcolor: '#fafafa',
                  minHeight: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {renderPreview()}
              </Paper>
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
          startIcon={<MathIcon />}
          disabled={!latexInput.trim()}
        >
          Insert Math
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MathDialog;