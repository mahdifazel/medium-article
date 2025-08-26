import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Toolbar,
  Tooltip,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  AddBox as AddRowIcon,
  IndeterminateCheckBox as RemoveRowIcon,
  ViewColumn as AddColumnIcon,
  ViewColumnOutlined as RemoveColumnIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { ContentBlock, TableData } from '../../types';

interface TableBlockProps {
  block: ContentBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (content: TableData) => void;
  onDelete: () => void;
}

export const TableBlock: React.FC<TableBlockProps> = ({
  block,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  const content = block.content as TableData;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const updateCellData = (row: number, col: number, value: string) => {
    const newData = [...content.data];
    newData[row][col] = value;
    onUpdate({
      ...content,
      data: newData,
    });
  };

  const updateHeader = (col: number, value: string) => {
    const newHeaders = [...(content.headers || [])];
    newHeaders[col] = value;
    onUpdate({
      ...content,
      headers: newHeaders,
    });
  };

  const addRow = () => {
    const newData = [...content.data, Array(content.cols).fill('')];
    onUpdate({
      ...content,
      rows: content.rows + 1,
      data: newData,
    });
    handleMenuClose();
  };

  const removeRow = () => {
    if (content.rows > 1) {
      const newData = content.data.slice(0, -1);
      onUpdate({
        ...content,
        rows: content.rows - 1,
        data: newData,
      });
    }
    handleMenuClose();
  };

  const addColumn = () => {
    const newData = content.data.map(row => [...row, '']);
    const newHeaders = [...(content.headers || []), ''];
    onUpdate({
      ...content,
      cols: content.cols + 1,
      data: newData,
      headers: newHeaders,
    });
    handleMenuClose();
  };

  const removeColumn = () => {
    if (content.cols > 1) {
      const newData = content.data.map(row => row.slice(0, -1));
      const newHeaders = (content.headers || []).slice(0, -1);
      onUpdate({
        ...content,
        cols: content.cols - 1,
        data: newData,
        headers: newHeaders,
      });
    }
    handleMenuClose();
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
      {/* Table Toolbar */}
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
            <Tooltip title="Table Options">
              <IconButton size="small" onClick={handleMenuOpen}>
                <MoreIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={addRow}>
                <AddRowIcon sx={{ mr: 1 }} />
                Add Row
              </MenuItem>
              <MenuItem onClick={removeRow} disabled={content.rows <= 1}>
                <RemoveRowIcon sx={{ mr: 1 }} />
                Remove Row
              </MenuItem>
              <MenuItem onClick={addColumn}>
                <AddColumnIcon sx={{ mr: 1 }} />
                Add Column
              </MenuItem>
              <MenuItem onClick={removeColumn} disabled={content.cols <= 1}>
                <RemoveColumnIcon sx={{ mr: 1 }} />
                Remove Column
              </MenuItem>
            </Menu>

            <Tooltip title="Delete Table">
              <IconButton size="small" onClick={onDelete} color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Paper>
      )}

      {/* Table Content */}
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          {/* Table Header */}
          <TableHead>
            <TableRow>
              {Array.from({ length: content.cols }, (_, colIndex) => (
                <TableCell key={colIndex} sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="standard"
                    value={content.headers?.[colIndex] || ''}
                    onChange={(e) => updateHeader(colIndex, e.target.value)}
                    placeholder={`Header ${colIndex + 1}`}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {content.data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <TableCell key={colIndex}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="standard"
                      value={cell}
                      onChange={(e) => updateCellData(rowIndex, colIndex, e.target.value)}
                      placeholder={`Cell ${rowIndex + 1},${colIndex + 1}`}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      onFocus={() => setEditingCell({ row: rowIndex, col: colIndex })}
                      onBlur={() => setEditingCell(null)}
                      sx={{
                        '& .MuiInputBase-input': {
                          p: 1,
                          backgroundColor: editingCell?.row === rowIndex && editingCell?.col === colIndex 
                            ? '#f0f8ff' 
                            : 'transparent',
                        },
                      }}
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
};