import React from 'react';
import { Box } from '@mui/material';
import { ContentBlock } from '../types';
import { TextBlock } from './blocks/TextBlock';
import { TableBlock } from './blocks/TableBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { MathBlock } from './blocks/MathBlock';

interface BodyContentProps {
  blocks: ContentBlock[];
  selectedBlock?: string;
  onSelectBlock: (blockId?: string) => void;
  onUpdateBlock: (blockId: string, content: any) => void;
  onDeleteBlock: (blockId: string) => void;
}

export const BodyContent: React.FC<BodyContentProps> = ({
  blocks,
  selectedBlock,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
}) => {
  const renderBlock = (block: ContentBlock) => {
    const isSelected = selectedBlock === block.id;

    const blockProps = {
      key: block.id,
      block,
      isSelected,
      onSelect: () => onSelectBlock(block.id),
      onUpdate: (content: any) => onUpdateBlock(block.id, content),
      onDelete: () => onDeleteBlock(block.id),
    };

    switch (block.type) {
      case 'text':
        return <TextBlock {...blockProps} />;
      case 'table':
        return <TableBlock {...blockProps} />;
      case 'image':
        return <ImageBlock {...blockProps} />;
      case 'math':
        return <MathBlock {...blockProps} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100%',
        p: 2,
        cursor: 'text',
      }}
      onClick={() => onSelectBlock(undefined)}
    >
      {blocks.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
            border: '2px dashed #ccc',
            borderRadius: 2,
            color: 'text.secondary',
            fontSize: '1.1rem',
          }}
        >
          Click the + button to add content
        </Box>
      ) : (
        blocks.map(renderBlock)
      )}
    </Box>
  );
};