import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import OutlinedButton from './outlinedButton';
import Button from '@mui/material/Button';

export default function BasicTooltip() {
  return (
    <Tooltip title="Add" placement="right-end">
    <Button>right-end</Button>
    </Tooltip>
  );
}