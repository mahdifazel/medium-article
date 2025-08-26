import React from 'react';
import {
  Box,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  TextFields as TextIcon,
  Table as TableIcon,
  Image as ImageIcon,
  Functions as MathIcon,
  Preview as PreviewIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import { useTextEditor } from '../hooks/useTextEditor';
import { HeaderSection } from './HeaderSection';
import { FooterSection } from './FooterSection';
import { BodyContent } from './BodyContent';
import { Pagination } from './Pagination';
import { PDFPreview } from './PDFPreview';

export const TextEditor: React.FC = () => {
  const { state, actions } = useTextEditor();
  const [speedDialOpen, setSpeedDialOpen] = React.useState(false);

  const handleSpeedDialOpen = () => setSpeedDialOpen(true);
  const handleSpeedDialClose = () => setSpeedDialOpen(false);

  const speedDialActions = [
    {
      icon: <TextIcon />,
      name: 'Add Text',
      onClick: () => {
        actions.addTextBlock('');
        setSpeedDialOpen(false);
      },
    },
    {
      icon: <TableIcon />,
      name: 'Add Table',
      onClick: () => {
        actions.addTableBlock();
        setSpeedDialOpen(false);
      },
    },
    {
      icon: <ImageIcon />,
      name: 'Add Image',
      onClick: () => {
        // For demo purposes, we'll add a placeholder image
        actions.addImageBlock('https://via.placeholder.com/300x200', 'Placeholder Image');
        setSpeedDialOpen(false);
      },
    },
    {
      icon: <MathIcon />,
      name: 'Add Math',
      onClick: () => {
        actions.addMathBlock('E = mc^2');
        setSpeedDialOpen(false);
      },
    },
  ];

  if (state.showPreview) {
    return <PDFPreview document={state.document} onClose={actions.togglePreview} />;
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* App Bar */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Advanced Text Editor
          </Typography>
          <IconButton color="inherit" onClick={actions.togglePreview}>
            <PreviewIcon />
          </IconButton>
          <IconButton color="inherit" onClick={actions.togglePreview}>
            <PrintIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Document Container */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2, backgroundColor: '#f5f5f5' }}>
          <Paper
            elevation={3}
            sx={{
              maxWidth: '8.5in',
              minHeight: '11in',
              margin: '0 auto',
              p: 3,
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header Section */}
            <HeaderSection
              content={state.document.header}
              onChange={actions.updateHeader}
            />

            <Divider sx={{ my: 2 }} />

            {/* Body Content */}
            <Box sx={{ flex: 1, minHeight: '8in' }}>
              <BodyContent
                blocks={state.document.body}
                selectedBlock={state.selectedBlock}
                onSelectBlock={actions.selectBlock}
                onUpdateBlock={actions.updateBlock}
                onDeleteBlock={actions.deleteBlock}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Footer Section */}
            <FooterSection
              content={state.document.footer}
              onChange={actions.updateFooter}
            />
          </Paper>
        </Box>

        {/* Pagination */}
        <Pagination
          currentPage={state.document.currentPage}
          totalPages={state.document.totalPages}
          onPageChange={actions.setCurrentPage}
        />
      </Box>

      {/* Speed Dial for adding content */}
      <SpeedDial
        ariaLabel="Add content"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleSpeedDialClose}
        onOpen={handleSpeedDialOpen}
        open={speedDialOpen}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};