import React from 'react';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  TextField,
  Divider,
} from '@mui/material';
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
} from '@mui/icons-material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [inputPage, setInputPage] = React.useState(currentPage.toString());

  React.useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  const handlePageInputChange = (value: string) => {
    setInputPage(value);
  };

  const handlePageInputSubmit = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    } else {
      setInputPage(currentPage.toString());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handlePageInputSubmit();
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        backgroundColor: '#fafafa',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      {/* First Page */}
      <IconButton
        size="small"
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        sx={{ color: 'text.secondary' }}
      >
        <FirstPageIcon />
      </IconButton>

      {/* Previous Page */}
      <IconButton
        size="small"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        sx={{ color: 'text.secondary' }}
      >
        <PrevIcon />
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      {/* Page Input */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Page
        </Typography>
        <TextField
          size="small"
          value={inputPage}
          onChange={(e) => handlePageInputChange(e.target.value)}
          onBlur={handlePageInputSubmit}
          onKeyPress={handleKeyPress}
          sx={{
            width: 60,
            '& .MuiInputBase-input': {
              textAlign: 'center',
              py: 0.5,
            },
          }}
          inputProps={{
            min: 1,
            max: totalPages,
            type: 'number',
          }}
        />
        <Typography variant="body2" color="text.secondary">
          of {totalPages}
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      {/* Next Page */}
      <IconButton
        size="small"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        sx={{ color: 'text.secondary' }}
      >
        <NextIcon />
      </IconButton>

      {/* Last Page */}
      <IconButton
        size="small"
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
        sx={{ color: 'text.secondary' }}
      >
        <LastPageIcon />
      </IconButton>
    </Paper>
  );
};