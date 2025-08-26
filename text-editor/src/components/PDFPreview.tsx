import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  Toolbar,
  Divider,
} from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DocumentData } from './TextEditor';

interface PDFPreviewProps {
  open: boolean;
  onClose: () => void;
  documentRef: React.RefObject<HTMLDivElement>;
  document: DocumentData;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({
  open,
  onClose,
  documentRef,
  document,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [error, setError] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!documentRef.current) return;

    setIsGenerating(true);
    setError('');

    try {
      // Create a temporary element for PDF generation
      const tempElement = document.createElement('div');
      tempElement.style.position = 'absolute';
      tempElement.style.left = '-9999px';
      tempElement.style.top = '-9999px';
      tempElement.style.width = '794px'; // A4 width in pixels at 96 DPI
      tempElement.style.padding = '40px';
      tempElement.style.backgroundColor = 'white';
      tempElement.style.fontFamily = 'Arial, sans-serif';
      tempElement.style.fontSize = '14px';
      tempElement.style.lineHeight = '1.6';

      // Generate document content
      let content = '';
      
      // Add header
      if (document.header) {
        content += `
          <div style="text-align: center; font-weight: bold; font-size: 18px; margin-bottom: 30px; padding-bottom: 15px; border-bottom: 2px solid #ddd;">
            ${document.header}
          </div>
        `;
      }

      // Add body content
      if (document.body) {
        content += `
          <div style="margin-bottom: 30px; text-align: justify;">
            ${document.body.replace(/\n/g, '<br>')}
          </div>
        `;
      }

      // Add tables
      document.tables.forEach(table => {
        content += `
          <div style="margin: 20px 0;">
            <h4 style="color: #1976d2; margin-bottom: 10px;">Table</h4>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  ${table.data[0]?.map(cell => `<th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-weight: bold;">${cell || `Header ${table.data[0].indexOf(cell) + 1}`}</th>`).join('') || ''}
                </tr>
              </thead>
              <tbody>
                ${table.data.slice(1).map(row => `
                  <tr>
                    ${row.map(cell => `<td style="border: 1px solid #ddd; padding: 8px;">${cell || ''}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      });

      // Add images
      document.images.forEach(image => {
        content += `
          <div style="margin: 20px 0; text-align: center;">
            <h4 style="color: #1976d2; margin-bottom: 10px;">Image</h4>
            <img src="${image.src}" alt="${image.alt}" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 4px;" />
            <p style="font-size: 12px; color: #666; margin-top: 5px;">${image.alt}</p>
          </div>
        `;
      });

      // Add math expressions
      document.mathExpressions.forEach(math => {
        content += `
          <div style="margin: 20px 0; text-align: center;">
            <h4 style="color: #1976d2; margin-bottom: 10px;">Math Expression</h4>
            <div style="padding: 15px; background-color: #fafafa; border: 1px solid #ddd; border-radius: 4px; font-family: 'Times New Roman', serif;">
              ${math.latex}
            </div>
          </div>
        `;
      });

      // Add footer
      if (document.footer) {
        content += `
          <div style="text-align: center; font-size: 12px; color: #666; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd;">
            ${document.footer}
          </div>
        `;
      }

      tempElement.innerHTML = content;
      document.body.appendChild(tempElement);

      // Generate canvas from HTML
      const canvas = await html2canvas(tempElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      // Remove temporary element
      document.body.removeChild(tempElement);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Create blob URL for preview
      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

    } catch (err) {
      setError('Failed to generate PDF. Please try again.');
      console.error('PDF generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = async () => {
    if (!documentRef.current) return;

    setIsGenerating(true);
    try {
      // Similar PDF generation logic but for download
      const tempElement = document.createElement('div');
      tempElement.style.position = 'absolute';
      tempElement.style.left = '-9999px';
      tempElement.style.top = '-9999px';
      tempElement.style.width = '794px';
      tempElement.style.padding = '40px';
      tempElement.style.backgroundColor = 'white';

      let content = '';
      if (document.header) content += `<div style="text-align: center; font-weight: bold; font-size: 18px; margin-bottom: 30px;">${document.header}</div>`;
      if (document.body) content += `<div style="margin-bottom: 30px;">${document.body.replace(/\n/g, '<br>')}</div>`;
      if (document.footer) content += `<div style="text-align: center; font-size: 12px; margin-top: 30px;">${document.footer}</div>`;

      tempElement.innerHTML = content;
      document.body.appendChild(tempElement);

      const canvas = await html2canvas(tempElement, { scale: 2, backgroundColor: '#ffffff' });
      document.body.removeChild(tempElement);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('document.pdf');
    } catch (err) {
      setError('Failed to download PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl('');
    }
    setError('');
    onClose();
  };

  React.useEffect(() => {
    if (open && !pdfUrl && !isGenerating) {
      generatePDF();
    }
  }, [open]);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: { height: '90vh' }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
        <PdfIcon color="primary" />
        PDF Preview
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <Toolbar variant="dense" sx={{ minHeight: 48 }}>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={downloadPDF}
          disabled={isGenerating}
          size="small"
        >
          Download PDF
        </Button>
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={() => window.print()}
          disabled={isGenerating}
          size="small"
          sx={{ ml: 1 }}
        >
          Print
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          onClick={generatePDF}
          disabled={isGenerating}
          size="small"
        >
          Regenerate
        </Button>
      </Toolbar>

      <Divider />

      <DialogContent sx={{ p: 0, flex: 1, overflow: 'hidden' }}>
        {isGenerating && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <CircularProgress size={60} />
            <Typography variant="h6" color="text.secondary">
              Generating PDF...
            </Typography>
          </Box>
        )}

        {error && (
          <Box sx={{ p: 3 }}>
            <Alert severity="error" action={
              <Button onClick={generatePDF} size="small">
                Retry
              </Button>
            }>
              {error}
            </Alert>
          </Box>
        )}

        {pdfUrl && !isGenerating && (
          <iframe
            src={pdfUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title="PDF Preview"
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PDFPreview;