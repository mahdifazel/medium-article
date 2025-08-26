import React, { useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { InlineMath, BlockMath } from 'react-katex';

interface DocumentBodyProps {
  content: string;
  tables: Array<{
    id: string;
    rows: number;
    cols: number;
    data: string[][];
    position: number;
  }>;
  images: Array<{
    id: string;
    src: string;
    alt: string;
    position: number;
    width?: number;
    height?: number;
  }>;
  mathExpressions: Array<{
    id: string;
    latex: string;
    position: number;
  }>;
  onChange: (content: string) => void;
  onUpdateTable: (tableId: string, data: string[][]) => void;
}

const DocumentBody: React.FC<DocumentBodyProps> = ({
  content,
  tables,
  images,
  mathExpressions,
  onChange,
  onUpdateTable,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleTableCellChange = (tableId: string, rowIndex: number, colIndex: number, value: string) => {
    const table = tables.find(t => t.id === tableId);
    if (table) {
      const newData = table.data.map((row, rIdx) =>
        row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
      );
      onUpdateTable(tableId, newData);
    }
  };

  const renderTable = (table: { id: string; rows: number; cols: number; data: string[][] }) => (
    <Box key={table.id} sx={{ my: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle2" color="primary">
          Table
        </Typography>
        <Tooltip title="Delete Table">
          <IconButton size="small" sx={{ ml: 1 }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              {Array.from({ length: table.cols }, (_, colIndex) => (
                <TableCell key={colIndex} sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }}>
                  <TextField
                    size="small"
                    variant="standard"
                    placeholder={`Header ${colIndex + 1}`}
                    value={table.data[0]?.[colIndex] || ''}
                    onChange={(e) => handleTableCellChange(table.id, 0, colIndex, e.target.value)}
                    InputProps={{ disableUnderline: true }}
                    sx={{ width: '100%' }}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: table.rows - 1 }, (_, rowIndex) => (
              <TableRow key={rowIndex + 1}>
                {Array.from({ length: table.cols }, (_, colIndex) => (
                  <TableCell key={colIndex}>
                    <TextField
                      size="small"
                      variant="standard"
                      multiline
                      placeholder="Enter data..."
                      value={table.data[rowIndex + 1]?.[colIndex] || ''}
                      onChange={(e) => handleTableCellChange(table.id, rowIndex + 1, colIndex, e.target.value)}
                      InputProps={{ disableUnderline: true }}
                      sx={{ width: '100%' }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderImage = (image: { id: string; src: string; alt: string; width?: number; height?: number }) => (
    <Box key={image.id} sx={{ my: 3, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
        <Typography variant="subtitle2" color="primary">
          Image
        </Typography>
        <Tooltip title="Delete Image">
          <IconButton size="small" sx={{ ml: 1 }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <img
        src={image.src}
        alt={image.alt}
        style={{
          maxWidth: image.width || '100%',
          maxHeight: image.height || 'auto',
          border: '1px solid #ddd',
          borderRadius: '4px',
        }}
      />
      <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
        {image.alt}
      </Typography>
    </Box>
  );

  const renderMathExpression = (math: { id: string; latex: string }) => (
    <Box key={math.id} sx={{ my: 2, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
        <Typography variant="subtitle2" color="primary">
          Math Expression
        </Typography>
        <Tooltip title="Delete Math">
          <IconButton size="small" sx={{ ml: 1 }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Paper variant="outlined" sx={{ p: 2, display: 'inline-block', bgcolor: '#fafafa' }}>
        <BlockMath math={math.latex} />
      </Paper>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h6" color="primary" gutterBottom>
        Document Body
      </Typography>
      
      {/* Rich Text Editor */}
      <Box
        ref={editorRef}
        sx={{
          minHeight: '400px',
          border: '1px solid #ddd',
          borderRadius: 1,
          p: 2,
          bgcolor: 'white',
          '&:focus-within': {
            borderColor: 'primary.main',
          }
        }}
      >
        <TextField
          fullWidth
          multiline
          variant="standard"
          placeholder="Start writing your document content here..."
          value={content}
          onChange={(e) => onChange(e.target.value)}
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: '1rem',
              lineHeight: 1.6,
            }
          }}
          sx={{
            '& .MuiInputBase-input': {
              minHeight: '350px',
            }
          }}
        />
      </Box>

      {/* Render Tables */}
      {tables.map(renderTable)}

      {/* Render Images */}
      {images.map(renderImage)}

      {/* Render Math Expressions */}
      {mathExpressions.map(renderMathExpression)}
    </Box>
  );
};

export default DocumentBody;