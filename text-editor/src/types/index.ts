export interface DocumentContent {
  header: string;
  footer: string;
  body: ContentBlock[];
  currentPage: number;
  totalPages: number;
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'table' | 'image' | 'math';
  content: any;
  position: {
    x: number;
    y: number;
  };
}

export interface TableData {
  rows: number;
  cols: number;
  data: string[][];
  headers?: string[];
}

export interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface MathData {
  expression: string;
  display: boolean; // inline or block display
}

export interface TextData {
  content: string;
  formatting: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    fontSize?: number;
    color?: string;
    align?: 'left' | 'center' | 'right' | 'justify';
  };
}

export interface EditorState {
  document: DocumentContent;
  selectedBlock?: string;
  isEditing: boolean;
  showPreview: boolean;
}