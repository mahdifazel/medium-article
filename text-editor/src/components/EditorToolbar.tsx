import React from 'react';
import {
  Paper,
  Toolbar,
  IconButton,
  Tooltip,
  Divider,
  ButtonGroup,
} from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatListBulleted,
  FormatListNumbered,
  TableChart,
  Image,
  Functions,
  Undo,
  Redo,
} from '@mui/icons-material';

interface EditorToolbarProps {
  onAddTable: () => void;
  onAddImage: () => void;
  onAddMath: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onAddTable,
  onAddImage,
  onAddMath,
}) => {
  const handleFormatting = (command: string) => {
    document.execCommand(command, false);
  };

  return (
    <Paper sx={{ mb: 2, p: 1 }}>
      <Toolbar variant="dense" sx={{ minHeight: 48 }}>
        {/* Text Formatting */}
        <ButtonGroup size="small" sx={{ mr: 2 }}>
          <Tooltip title="Bold">
            <IconButton onClick={() => handleFormatting('bold')}>
              <FormatBold />
            </IconButton>
          </Tooltip>
          <Tooltip title="Italic">
            <IconButton onClick={() => handleFormatting('italic')}>
              <FormatItalic />
            </IconButton>
          </Tooltip>
          <Tooltip title="Underline">
            <IconButton onClick={() => handleFormatting('underline')}>
              <FormatUnderlined />
            </IconButton>
          </Tooltip>
        </ButtonGroup>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Alignment */}
        <ButtonGroup size="small" sx={{ mr: 2 }}>
          <Tooltip title="Align Left">
            <IconButton onClick={() => handleFormatting('justifyLeft')}>
              <FormatAlignLeft />
            </IconButton>
          </Tooltip>
          <Tooltip title="Align Center">
            <IconButton onClick={() => handleFormatting('justifyCenter')}>
              <FormatAlignCenter />
            </IconButton>
          </Tooltip>
          <Tooltip title="Align Right">
            <IconButton onClick={() => handleFormatting('justifyRight')}>
              <FormatAlignRight />
            </IconButton>
          </Tooltip>
        </ButtonGroup>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Lists */}
        <ButtonGroup size="small" sx={{ mr: 2 }}>
          <Tooltip title="Bullet List">
            <IconButton onClick={() => handleFormatting('insertUnorderedList')}>
              <FormatListBulleted />
            </IconButton>
          </Tooltip>
          <Tooltip title="Numbered List">
            <IconButton onClick={() => handleFormatting('insertOrderedList')}>
              <FormatListNumbered />
            </IconButton>
          </Tooltip>
        </ButtonGroup>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Insert Elements */}
        <ButtonGroup size="small" sx={{ mr: 2 }}>
          <Tooltip title="Insert Table">
            <IconButton onClick={onAddTable} color="primary">
              <TableChart />
            </IconButton>
          </Tooltip>
          <Tooltip title="Insert Image">
            <IconButton onClick={onAddImage} color="primary">
              <Image />
            </IconButton>
          </Tooltip>
          <Tooltip title="Insert Math">
            <IconButton onClick={onAddMath} color="primary">
              <Functions />
            </IconButton>
          </Tooltip>
        </ButtonGroup>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Undo/Redo */}
        <ButtonGroup size="small">
          <Tooltip title="Undo">
            <IconButton onClick={() => handleFormatting('undo')}>
              <Undo />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo">
            <IconButton onClick={() => handleFormatting('redo')}>
              <Redo />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Toolbar>
    </Paper>
  );
};

export default EditorToolbar;