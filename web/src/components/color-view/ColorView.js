import React, { useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const ColorView = ({setColor}) => {
    const [color, setColorRef] = useState({
        r: 255,
        g: 0,
        b: 0,
    });

    const handleChange = (event, newValue, colorType) => {
      const newColor = { ...color, [colorType]: newValue };
      setColorRef(prev => ({ ...prev, [colorType]: newValue }));

      const colorString = `${newColor.r},${newColor.g},${newColor.b}`;
      setColor(colorString);
    };

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
                Color Picker
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                {['r', 'g', 'b'].map((colorKey) => (
                    <Box key={colorKey} sx={{ width: '80%' }}>
                        <Typography gutterBottom>{colorKey.toUpperCase()}</Typography>
                        <Slider
                            value={color[colorKey]}
                            onChange={(e, newValue) => handleChange(e, newValue, colorKey)}
                            aria-labelledby="continuous-slider"
                            min={0}
                            max={255}
                        />
                    </Box>
                ))}
                <Box sx={{
                    width: 100,
                    height: 100,
                    marginTop: 2,
                    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`
                }} />
            </Box>
        </Box>
    );
};

export default ColorView;
