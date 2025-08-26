import { useState, useCallback } from 'react';
import { EditorState, DocumentContent, ContentBlock, TableData, ImageData, MathData, TextData } from '../types';

const initialDocument: DocumentContent = {
  header: '',
  footer: '',
  body: [],
  currentPage: 1,
  totalPages: 1,
};

const initialState: EditorState = {
  document: initialDocument,
  selectedBlock: undefined,
  isEditing: false,
  showPreview: false,
};

export const useTextEditor = () => {
  const [state, setState] = useState<EditorState>(initialState);

  const updateHeader = useCallback((header: string) => {
    setState(prev => ({
      ...prev,
      document: {
        ...prev.document,
        header,
      },
    }));
  }, []);

  const updateFooter = useCallback((footer: string) => {
    setState(prev => ({
      ...prev,
      document: {
        ...prev.document,
        footer,
      },
    }));
  }, []);

  const addTextBlock = useCallback((content: string = '') => {
    const newBlock: ContentBlock = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: {
        content,
        formatting: {
          fontSize: 14,
          color: '#000000',
          align: 'left',
        },
      } as TextData,
      position: { x: 0, y: 0 },
    };

    setState(prev => ({
      ...prev,
      document: {
        ...prev.document,
        body: [...prev.document.body, newBlock],
      },
    }));

    return newBlock.id;
  }, []);

  const addTableBlock = useCallback((rows: number = 3, cols: number = 3) => {
    const tableData: TableData = {
      rows,
      cols,
      data: Array(rows).fill(null).map(() => Array(cols).fill('')),
      headers: Array(cols).fill(''),
    };

    const newBlock: ContentBlock = {
      id: `table-${Date.now()}`,
      type: 'table',
      content: tableData,
      position: { x: 0, y: 0 },
    };

    setState(prev => ({
      ...prev,
      document: {
        ...prev.document,
        body: [...prev.document.body, newBlock],
      },
    }));

    return newBlock.id;
  }, []);

  const addImageBlock = useCallback((src: string, alt: string = '') => {
    const imageData: ImageData = {
      src,
      alt,
      width: 300,
      height: 200,
    };

    const newBlock: ContentBlock = {
      id: `image-${Date.now()}`,
      type: 'image',
      content: imageData,
      position: { x: 0, y: 0 },
    };

    setState(prev => ({
      ...prev,
      document: {
        ...prev.document,
        body: [...prev.document.body, newBlock],
      },
    }));

    return newBlock.id;
  }, []);

  const addMathBlock = useCallback((expression: string = '', display: boolean = false) => {
    const mathData: MathData = {
      expression,
      display,
    };

    const newBlock: ContentBlock = {
      id: `math-${Date.now()}`,
      type: 'math',
      content: mathData,
      position: { x: 0, y: 0 },
    };

    setState(prev => ({
      ...prev,
      document: {
        ...prev.document,
        body: [...prev.document.body, newBlock],
      },
    }));

    return newBlock.id;
  }, []);

  const updateBlock = useCallback((blockId: string, content: any) => {
    setState(prev => ({
      ...prev,
      document: {
        ...prev.document,
        body: prev.document.body.map(block =>
          block.id === blockId ? { ...block, content } : block
        ),
      },
    }));
  }, []);

  const deleteBlock = useCallback((blockId: string) => {
    setState(prev => ({
      ...prev,
      document: {
        ...prev.document,
        body: prev.document.body.filter(block => block.id !== blockId),
      },
    }));
  }, []);

  const selectBlock = useCallback((blockId?: string) => {
    setState(prev => ({ ...prev, selectedBlock: blockId }));
  }, []);

  const togglePreview = useCallback(() => {
    setState(prev => ({ ...prev, showPreview: !prev.showPreview }));
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    setState(prev => ({
      ...prev,
      document: {
        ...prev.document,
        currentPage: Math.max(1, Math.min(page, prev.document.totalPages)),
      },
    }));
  }, []);

  return {
    state,
    actions: {
      updateHeader,
      updateFooter,
      addTextBlock,
      addTableBlock,
      addImageBlock,
      addMathBlock,
      updateBlock,
      deleteBlock,
      selectBlock,
      togglePreview,
      setCurrentPage,
    },
  };
};