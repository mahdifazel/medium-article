# Advanced Text Editor with React and MUI

A comprehensive text editor built with React, TypeScript, and Material-UI that supports rich text editing, tables, images, mathematical expressions, and PDF generation.

## Features

### 📝 Document Structure
- **Header Section**: Customizable document header with styling
- **Body Section**: Rich text editing area with full formatting support
- **Footer Section**: Document footer for page numbers, copyright, etc.

### 🔧 Rich Text Editing
- Bold, italic, underline formatting
- Text alignment (left, center, right)
- Bulleted and numbered lists
- Undo/Redo functionality

### 📊 Tables
- Create tables with customizable rows and columns (up to 10x8)
- Editable table cells with real-time updates
- Interactive table creation dialog with preview
- Professional table styling

### 🖼️ Images
- Upload images from local files
- Insert images from URLs
- Custom image sizing controls
- Alt text support for accessibility
- Drag-and-drop file upload interface

### 🧮 Mathematical Expressions
- LaTeX math expression support
- Symbol picker with categorized math symbols
- Common formula templates
- Live preview of math expressions
- Support for fractions, integrals, summations, and more

### 📄 Pagination
- Multi-page document support
- Page navigation controls
- Current page indicator

### 📋 PDF Export
- Generate PDF previews of documents
- Download documents as PDF files
- Print functionality
- Maintains formatting and layout

### 🎨 Modern UI
- Material-UI design system
- Responsive layout for all screen sizes
- Dark/light theme support
- Professional toolbar interface
- Smooth animations and transitions

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd text-editor
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Dependencies

### Core Dependencies
- **React 19.1.1**: Latest React framework
- **TypeScript**: Type safety and better development experience
- **Material-UI (@mui/material)**: Component library for modern UI
- **@emotion/react & @emotion/styled**: CSS-in-JS styling

### Math and PDF Support
- **react-katex**: LaTeX math rendering
- **katex**: Mathematics typesetting library
- **html2canvas**: HTML to canvas conversion
- **jspdf**: PDF generation library

### Additional Libraries
- **@mui/icons-material**: Material Design icons
- **@mui/lab**: Experimental MUI components

## Usage Guide

### Creating a Document

1. **Add Header**: Click on the header section to add a title, author, or date
2. **Write Content**: Use the body section for your main document content
3. **Add Footer**: Include page numbers, copyright, or contact information

### Formatting Text

Use the toolbar to format your text:
- **Bold/Italic/Underline**: Select text and click formatting buttons
- **Alignment**: Choose left, center, or right alignment
- **Lists**: Create bulleted or numbered lists

### Inserting Tables

1. Click the **Table** icon in the toolbar
2. Select the number of rows and columns using sliders or input fields
3. Preview the table layout
4. Click **Insert Table** to add it to your document
5. Click on table cells to edit content

### Adding Images

1. Click the **Image** icon in the toolbar
2. Choose between **URL** or **Upload** tabs:
   - **URL**: Enter the image URL and click preview
   - **Upload**: Click to select a file from your computer
3. Add descriptive alt text for accessibility
4. Optionally set custom dimensions
5. Click **Insert Image**

### Mathematical Expressions

1. Click the **Functions** icon in the toolbar
2. Choose from three tabs:
   - **Symbols**: Click on mathematical symbols to add them
   - **Formulas**: Select from common mathematical formulas
   - **Custom**: Enter custom LaTeX expressions
3. Preview your expression in real-time
4. Click **Insert Math** to add it to your document

### Exporting and Saving

- **Save**: Click the save icon to download document data as JSON
- **PDF Preview**: Click the PDF icon to generate and preview a PDF
- **Print**: Use the print icon for direct printing
- **Download PDF**: Generate and download a PDF file

## Technical Architecture

### Component Structure
```
src/
├── components/
│   ├── TextEditor.tsx          # Main editor component
│   ├── EditorToolbar.tsx       # Formatting toolbar
│   ├── DocumentHeader.tsx     # Header section
│   ├── DocumentBody.tsx       # Main content area
│   ├── DocumentFooter.tsx     # Footer section
│   ├── TableDialog.tsx        # Table creation dialog
│   ├── ImageDialog.tsx        # Image insertion dialog
│   ├── MathDialog.tsx         # Math expression dialog
│   ├── PaginationControls.tsx # Page navigation
│   └── PDFPreview.tsx         # PDF generation and preview
├── App.tsx                    # Root application component
└── index.tsx                  # Application entry point
```

### Data Structure
```typescript
interface DocumentData {
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
```

## Styling and Theming

The application uses Material-UI's theming system with a custom color palette:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});
```

### Print Styles
Comprehensive print styles ensure documents look professional when printed:
- Removes UI elements (toolbars, buttons)
- Optimizes spacing and layout
- Maintains typography and formatting

## Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## Performance Considerations

- **Lazy Loading**: Components are optimized for performance
- **Memoization**: React.memo used for expensive components
- **Bundle Optimization**: Tree shaking and code splitting
- **Image Optimization**: Efficient image handling and resizing

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Common Issues

1. **PDF Generation Fails**
   - Ensure all images are loaded before generating PDF
   - Check browser console for errors
   - Try regenerating the PDF

2. **Math Expressions Not Rendering**
   - Verify LaTeX syntax is correct
   - Check that KaTeX CSS is loaded
   - Use the preview feature to test expressions

3. **Images Not Displaying**
   - Verify image URLs are accessible
   - Check image file formats are supported
   - Ensure proper alt text is provided

### Performance Tips

- Limit table size for better performance
- Optimize image sizes before upload
- Use vector formats (SVG) when possible
- Regular browser cache clearing for development

## Future Enhancements

- [ ] Real-time collaborative editing
- [ ] Document templates
- [ ] Advanced table formatting
- [ ] Chart and graph insertion
- [ ] Version history
- [ ] Cloud storage integration
- [ ] Mobile app version
- [ ] Plugin system for extensions
