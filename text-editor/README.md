# Advanced Text Editor

A comprehensive React-based text editor with support for headers, footers, tables, images, math symbols, pagination, and PDF preview. Built with Material-UI for a modern and responsive design.

## Features

### ✨ Core Features
- **Rich Text Editing**: Full-featured text editing with formatting options
- **Headers & Footers**: Collapsible header and footer sections
- **Document Structure**: Clean, paginated document layout
- **PDF Preview**: Print-ready preview with proper formatting
- **Real-time Editing**: Live preview of all changes

### 📝 Content Types Supported

#### 1. Text Blocks
- **Formatting**: Bold, italic, underline
- **Font Sizes**: 12px to 24px
- **Text Alignment**: Left, center, right, justify
- **Interactive Editing**: Double-click to edit, toolbar for formatting

#### 2. Tables
- **Dynamic Tables**: Add/remove rows and columns
- **Editable Headers**: Customizable column headers
- **Cell Editing**: Click to edit individual cells
- **Table Management**: Context menu for table operations

#### 3. Images
- **Image Upload**: Support for all image formats
- **Resize Controls**: Adjustable width and height with sliders
- **Alt Text**: Accessibility-compliant alt text support
- **Drag & Drop**: Easy image insertion

#### 4. Math Expressions
- **LaTeX Support**: Full LaTeX math expression support
- **Symbol Palette**: Quick access to common math symbols
- **Inline & Display**: Both inline and display math modes
- **Greek Letters**: α, β, γ, δ, ε, π, σ, θ, λ, μ
- **Operators**: ∞, ∑, ∏, ∫, ≤, ≥, ≠, ≈, ±, ×
- **Functions**: Fractions, square roots, superscripts, subscripts

### 🎨 User Interface

#### Modern Design
- **Material-UI Components**: Professional, accessible interface
- **Responsive Layout**: Works on desktop and tablet
- **Speed Dial**: Floating action button for quick content addition
- **Toolbar**: Context-sensitive formatting tools

#### Navigation
- **Pagination**: Multi-page document support
- **Page Controls**: First, previous, next, last page navigation
- **Page Input**: Direct page number entry

### 🖨️ Export & Print

#### PDF Preview
- **Print Layout**: Accurate print preview
- **Professional Formatting**: Clean, document-ready output
- **Header/Footer Support**: Proper page structure
- **Page Numbers**: Automatic page numbering

#### Print Functionality
- **Browser Print**: Native browser print dialog
- **Print Styles**: Optimized for printing
- **Page Breaks**: Proper page break handling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd text-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage Guide

### Creating Content

1. **Adding Text**
   - Click the floating + button
   - Select "Add Text"
   - Double-click to edit
   - Use toolbar for formatting

2. **Adding Tables**
   - Click the floating + button
   - Select "Add Table"
   - Click the gear icon for table options
   - Add/remove rows and columns as needed

3. **Adding Images**
   - Click the floating + button
   - Select "Add Image"
   - Click the upload icon or click the placeholder
   - Use resize controls to adjust dimensions

4. **Adding Math**
   - Click the floating + button
   - Select "Add Math"
   - Use the symbol palette for quick insertion
   - Toggle between inline and display modes

### Formatting Options

#### Text Formatting
- **Bold**: Ctrl+B or toolbar button
- **Italic**: Ctrl+I or toolbar button
- **Underline**: Ctrl+U or toolbar button
- **Font Size**: Dropdown in toolbar
- **Alignment**: Alignment buttons in toolbar

#### Document Structure
- **Header**: Click to expand header section
- **Footer**: Click to expand footer section
- **Page Navigation**: Use pagination controls at bottom

### Preview & Print

1. **Preview Mode**
   - Click the preview icon in the top toolbar
   - View document as it will appear when printed
   - Navigate between pages

2. **Printing**
   - In preview mode, click "Print"
   - Use browser's print dialog
   - Select printer and options

## Technical Stack

### Frontend
- **React 18**: Modern React with TypeScript
- **Material-UI v5**: Component library and theming
- **TypeScript**: Type-safe development

### Dependencies
- **@mui/material**: Core Material-UI components
- **@mui/icons-material**: Material Design icons
- **@emotion/react**: CSS-in-JS styling
- **katex**: Math expression rendering
- **react-to-print**: Print functionality
- **html2canvas**: Canvas rendering for export

### Project Structure
```
src/
├── components/
│   ├── blocks/           # Content block components
│   │   ├── TextBlock.tsx
│   │   ├── TableBlock.tsx
│   │   ├── ImageBlock.tsx
│   │   └── MathBlock.tsx
│   ├── TextEditor.tsx    # Main editor component
│   ├── HeaderSection.tsx
│   ├── FooterSection.tsx
│   ├── BodyContent.tsx
│   ├── Pagination.tsx
│   └── PDFPreview.tsx
├── hooks/
│   └── useTextEditor.ts  # Editor state management
├── types/
│   └── index.ts          # TypeScript type definitions
└── App.tsx               # Main application component
```

## Keyboard Shortcuts

- **Ctrl+B**: Bold text
- **Ctrl+I**: Italic text
- **Ctrl+U**: Underline text
- **Escape**: Exit edit mode
- **Double-click**: Edit text or math blocks

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] Collaborative editing
- [ ] Cloud storage integration
- [ ] More export formats (Word, etc.)
- [ ] Advanced table features (merge cells, etc.)
- [ ] Custom themes
- [ ] Plugin system
- [ ] Auto-save functionality
- [ ] Template library

## Support

For questions or issues, please create an issue in the repository or contact the development team.
