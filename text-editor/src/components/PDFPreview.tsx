import React, { useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Button,
} from '@mui/material';
import {
  Close as CloseIcon,
  Print as PrintIcon,
  GetApp as DownloadIcon,
} from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';
import { DocumentContent, ContentBlock, TextData, TableData, ImageData, MathData } from '../types';

interface PDFPreviewProps {
  document: DocumentContent;
  onClose: () => void;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ document, onClose }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Document Preview',
  });

  const renderTextBlock = (block: ContentBlock) => {
    const content = block.content as TextData;
    const style = {
      fontWeight: content.formatting.bold ? 'bold' : 'normal',
      fontStyle: content.formatting.italic ? 'italic' : 'normal',
      textDecoration: content.formatting.underline ? 'underline' : 'none',
      fontSize: content.formatting.fontSize || 14,
      color: content.formatting.color || '#000000',
      textAlign: content.formatting.align || 'left',
      marginBottom: '16px',
    };

    return (
      <div key={block.id} style={style}>
        {content.content}
      </div>
    );
  };

  const renderTableBlock = (block: ContentBlock) => {
    const content = block.content as TableData;
    
    return (
      <div key={block.id} style={{ marginBottom: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              {content.headers?.map((header, index) => (
                <th
                  key={index}
                  style={{
                    border: '1px solid #ccc',
                    padding: '8px',
                    textAlign: 'left',
                    fontWeight: 'bold',
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      border: '1px solid #ccc',
                      padding: '8px',
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderImageBlock = (block: ContentBlock) => {
    const content = block.content as ImageData;
    
    return (
      <div key={block.id} style={{ marginBottom: '16px', textAlign: 'center' }}>
        <img
          src={content.src}
          alt={content.alt}
          style={{
            maxWidth: '100%',
            width: content.width || 300,
            height: content.height || 200,
            objectFit: 'contain',
          }}
        />
        {content.alt && (
          <div style={{ fontSize: '12px', fontStyle: 'italic', color: '#666', marginTop: '4px' }}>
            {content.alt}
          </div>
        )}
      </div>
    );
  };

  const renderMathBlock = (block: ContentBlock) => {
    const content = block.content as MathData;
    
    return (
      <div 
        key={block.id} 
        style={{ 
          marginBottom: '16px',
          textAlign: content.display ? 'center' : 'left',
          fontFamily: 'serif',
          fontSize: content.display ? '1.2em' : '1em',
          fontStyle: 'italic',
          padding: content.display ? '16px' : '4px',
          border: content.display ? '1px solid #ddd' : 'none',
          backgroundColor: content.display ? '#f9f9f9' : 'transparent',
        }}
      >
        {content.expression}
      </div>
    );
  };

  const renderBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return renderTextBlock(block);
      case 'table':
        return renderTableBlock(block);
      case 'image':
        return renderImageBlock(block);
      case 'math':
        return renderMathBlock(block);
      default:
        return null;
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Preview Toolbar */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Document Preview
          </Typography>
          <Button 
            color="inherit" 
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            sx={{ mr: 1 }}
          >
            Print
          </Button>
          <IconButton color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Preview Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2, backgroundColor: '#f5f5f5' }}>
        <Paper
          ref={componentRef}
          elevation={3}
          sx={{
            maxWidth: '8.5in',
            minHeight: '11in',
            margin: '0 auto',
            p: 3,
            backgroundColor: 'white',
            '@media print': {
              margin: 0,
              padding: '1in',
              boxShadow: 'none',
              maxWidth: 'none',
            },
          }}
        >
          {/* Header */}
          {document.header && (
            <>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  marginBottom: '16px',
                  borderBottom: '1px solid #eee',
                  paddingBottom: '8px',
                }}
              >
                {document.header}
              </div>
            </>
          )}

          {/* Body Content */}
          <div style={{ minHeight: '8in' }}>
            {document.body.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                color: '#999', 
                fontSize: '18px',
                marginTop: '100px' 
              }}>
                No content to preview
              </div>
            ) : (
              document.body.map(renderBlock)
            )}
          </div>

          {/* Footer */}
          {document.footer && (
            <>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  marginTop: '16px',
                  borderTop: '1px solid #eee',
                  paddingTop: '8px',
                }}
              >
                {document.footer}
              </div>
            </>
          )}

          {/* Page Number */}
          <div
            style={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#666',
              marginTop: '16px',
            }}
          >
            Page {document.currentPage} of {document.totalPages}
          </div>
        </Paper>
      </Box>
    </Box>
  );
};