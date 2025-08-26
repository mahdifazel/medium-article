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
  Slider,
} from '@mui/material';
import { TableChart } from '@mui/icons-material';

interface TableDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (rows: number, cols: number) => void;
}

const TableDialog: React.FC<TableDialogProps> = ({ open, onClose, onAdd }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  const handleAdd = () => {
    onAdd(rows, cols);
    setRows(3);
    setCols(3);
  };

  const handleClose = () => {
    onClose();
    setRows(3);
    setCols(3);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TableChart color="primary" />
        Insert Table
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography gutterBottom>
                Rows: {rows}
              </Typography>
              <Slider
                value={rows}
                onChange={(_, value) => setRows(value as number)}
                min={1}
                max={10}
                marks
                valueLabelDisplay="auto"
                color="primary"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                Columns: {cols}
              </Typography>
              <Slider
                value={cols}
                onChange={(_, value) => setCols(value as number)}
                min={1}
                max={8}
                marks
                valueLabelDisplay="auto"
                color="primary"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Rows"
                type="number"
                value={rows}
                onChange={(e) => setRows(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                inputProps={{ min: 1, max: 10 }}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Columns"
                type="number"
                value={cols}
                onChange={(e) => setCols(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
                inputProps={{ min: 1, max: 8 }}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>

          {/* Table Preview */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Preview:
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: 1,
                border: '1px solid #ddd',
                borderRadius: 1,
                p: 1,
                bgcolor: '#f9f9f9',
              }}
            >
              {Array.from({ length: rows * cols }, (_, index) => (
                <Box
                  key={index}
                  sx={{
                    minHeight: '30px',
                    border: '1px solid #ccc',
                    borderRadius: '2px',
                    bgcolor: index < cols ? '#e3f2fd' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                  }}
                >
                  {index < cols ? `H${index + 1}` : `R${Math.floor(index / cols)}C${(index % cols) + 1}`}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained" startIcon={<TableChart />}>
          Insert Table
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TableDialog;