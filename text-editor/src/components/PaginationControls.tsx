import React from 'react';
import {
  Box,
  Pagination,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
} from '@mui/icons-material';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Paper 
      sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        bottom: 0,
        zIndex: 1,
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="First Page">
          <span>
            <IconButton
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              size="small"
            >
              <FirstPage />
            </IconButton>
          </span>
        </Tooltip>
        
        <Tooltip title="Previous Page">
          <span>
            <IconButton
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              size="small"
            >
              <NavigateBefore />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Page {currentPage} of {totalPages}
        </Typography>
        
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          size="small"
          variant="outlined"
          shape="rounded"
          showFirstButton={false}
          showLastButton={false}
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Next Page">
          <span>
            <IconButton
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              size="small"
            >
              <NavigateNext />
            </IconButton>
          </span>
        </Tooltip>
        
        <Tooltip title="Last Page">
          <span>
            <IconButton
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              size="small"
            >
              <LastPage />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default PaginationControls;