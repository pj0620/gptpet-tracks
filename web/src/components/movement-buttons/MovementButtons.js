import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StopIcon from '@mui/icons-material/Stop';
import Typography from '@mui/material/Typography';
import { blue, red, grey } from '@mui/material/colors';

export default function MovementButtons({doMove}) {
  return (
    <Box sx={{
      backgroundColor: grey[900], // Dark background
      color: grey[50], // White text
      padding: 3,
      borderRadius: 2,
      textAlign: 'center',
      maxWidth: 400,
      margin: '0 auto',
    }}>
      <Typography variant="h4" component="h2" sx={{ color: grey[50], mb: 2 }}>
        Motor Control
      </Typography>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Button variant="contained" color="primary" onClick={() => doMove('ahead')}>
          <ArrowUpwardIcon />
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', '& > :not(style)': { m: 1 } }}>
        <Button variant="contained" color="primary" onClick={() => doMove('left')}>
          <ArrowBackIcon />
        </Button>
        <Button variant="contained" color="primary" onClick={() => doMove('right')}>
          <ArrowForwardIcon />
        </Button>
      </Box>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Button variant="contained" color="primary" onClick={() => doMove('back')}>
          <ArrowDownwardIcon />
        </Button>
      </Box>
    </Box>
  );
}
