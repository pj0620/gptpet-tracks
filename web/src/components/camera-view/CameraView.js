import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const CameraView = ({ base64Image }) => {

    // React doesn't require this component to update the state as per your description,
    // so I'm not adding any state-updating logic here.

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
                Camera View
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <img
                    src={`data:image/jpeg;base64,${base64Image}`}
                    alt="Camera View"
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
                />
            </Box>
        </Box>
    );
};

export default CameraView;
