import { Box, Button, Stack, Typography } from "@mui/material";
import { grey, blue } from "@mui/material/colors";
import React from "react";
import { roundNum } from "utils";

const SensorView = ({measurements}) => {
  // Render the buttons in a grid layout similar to the image provided
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
        Proximity Sensors
      </Typography>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Button variant="contained" color="secondary" disabled style={{background: 'lightblue'}}>
          <Typography variant="h6" component="p" sx={{ color: 'black', mt: 0 }}>
            {roundNum(measurements.ahead)}
          </Typography>
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', '& > :not(style)': { m: 1 } }}>
        <Button variant="contained" color="primary" disabled style={{background: 'lightblue'}}>
          <Typography variant="h6" component="p" sx={{ color: 'black', mt: 0 }}>
            {roundNum(measurements.left)}
          </Typography>
        </Button>
        <Button variant="contained" color="primary" disabled style={{background: 'lightblue'}}>
          <Typography variant="h6" component="p" sx={{ color: 'black', mt: 0 }}>
            {roundNum(measurements.right)}
          </Typography>
        </Button>
      </Box>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Button variant="contained" color="primary" disabled style={{background: 'lightblue'}}>
          <Typography variant="h6" component="p" sx={{ color: 'black', mt: 0 }}>
            {roundNum(measurements.back)}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default SensorView;