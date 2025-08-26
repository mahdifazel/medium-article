import React, { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
} from '@mui/material';
import {
  Add as AddIcon,
  TableChart as TableIcon,
  Image as ImageIcon,
  Functions as MathIcon,
  PictureAsPdf as PdfIcon,
  Save as SaveIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import EditorToolbar from './EditorToolbar';
import DocumentHeader from './DocumentHeader';
import DocumentBody from './DocumentBody';
import DocumentFooter from './DocumentFooter';
import PaginationControls from './PaginationControls';
import TableDialog from './TableDialog';
import ImageDialog from './ImageDialog';
import MathDialog from './MathDialog';
import PDFPreview from './PDFPreview';

export interface DocumentData {
  header: string;
  body: string;
  footer: string;
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
}

const TextEditor: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showTableDialog, setShowTableDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showMathDialog, setShowMathDialog] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  
  const [document, setDocument] = useState<DocumentData>({
    header: '',
    body: '',
    footer: '',
    tables: [],
    images: [],
    mathExpressions: [],
  });

  const documentRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    const dataStr = JSON.stringify(document, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'document.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddTable = (rows: number, cols: number) => {
    const newTable = {
      id: `table-${Date.now()}`,
      rows,
      cols,
      data: Array(rows).fill(null).map(() => Array(cols).fill('')),
      position: document.body.length,
    };
    
    setDocument(prev => ({
      ...prev,
      tables: [...prev.tables, newTable],
    }));
    setShowTableDialog(false);
  };

  const handleAddImage = (src: string, alt: string, width?: number, height?: number) => {
    const newImage = {
      id: `image-${Date.now()}`,
      src,
      alt,
      position: document.body.length,
      width,
      height,
    };
    
    setDocument(prev => ({
      ...prev,
      images: [...prev.images, newImage],
    }));
    setShowImageDialog(false);
  };

  const handleAddMath = (latex: string) => {
    const newMath = {
      id: `math-${Date.now()}`,
      latex,
      position: document.body.length,
    };
    
    setDocument(prev => ({
      ...prev,
      mathExpressions: [...prev.mathExpressions, newMath],
    }));
    setShowMathDialog(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Top App Bar */}
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Advanced Text Editor
          </Typography>
          <IconButton color="inherit" onClick={handleSave} title="Save Document">
            <SaveIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handlePrint} title="Print">
            <PrintIcon />
          </IconButton>
          <IconButton 
            color="inherit" 
            onClick={() => setShowPdfPreview(true)} 
            title="PDF Preview"
          >
            <PdfIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Editor Toolbar */}
      <EditorToolbar
        onAddTable={() => setShowTableDialog(true)}
        onAddImage={() => setShowImageDialog(true)}
        onAddMath={() => setShowMathDialog(true)}
      />

      {/* Document Container */}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Paper 
            ref={documentRef}
            sx={{ 
              minHeight: '800px',
              p: 3,
              mb: 2,
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              '@media print': {
                boxShadow: 'none',
                p: 0,
              }
            }}
          >
            {/* Document Header */}
            <DocumentHeader
              content={document.header}
              onChange={(content) => setDocument(prev => ({ ...prev, header: content }))}
            />

            <Divider sx={{ my: 2 }} />

            {/* Document Body */}
            <DocumentBody
              content={document.body}
              tables={document.tables}
              images={document.images}
              mathExpressions={document.mathExpressions}
              onChange={(content) => setDocument(prev => ({ ...prev, body: content }))}
              onUpdateTable={(tableId, data) => {
                setDocument(prev => ({
                  ...prev,
                  tables: prev.tables.map(table => 
                    table.id === tableId ? { ...table, data } : table
                  ),
                }));
              }}
            />

            <Divider sx={{ my: 2 }} />

            {/* Document Footer */}
            <DocumentFooter
              content={document.footer}
              onChange={(content) => setDocument(prev => ({ ...prev, footer: content }))}
            />
          </Paper>

          {/* Pagination Controls */}
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Document Info
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pages: {totalPages}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tables: {document.tables.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Images: {document.images.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Math Expressions: {document.mathExpressions.length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialogs */}
      <TableDialog
        open={showTableDialog}
        onClose={() => setShowTableDialog(false)}
        onAdd={handleAddTable}
      />

      <ImageDialog
        open={showImageDialog}
        onClose={() => setShowImageDialog(false)}
        onAdd={handleAddImage}
      />

      <MathDialog
        open={showMathDialog}
        onClose={() => setShowMathDialog(false)}
        onAdd={handleAddMath}
      />

      <PDFPreview
        open={showPdfPreview}
        onClose={() => setShowPdfPreview(false)}
        documentRef={documentRef}
        document={document}
      />
    </Box>
  );
};

export default TextEditor;