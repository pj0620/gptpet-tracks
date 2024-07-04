// @ts-nocheck
/* eslint-disable jsx-a11y/no-distracting-elements */
import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import image from './home_image.jpeg'
import './home.css'

function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to GPTPet Tracks!
        </Typography>
        <marquee><div className="animated_rainbow_3">Your journey with your AI companion starts HERE!!</div></marquee>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Discover the joy of having a digital pet that grows, learns, and interacts with you in unique ways. GPTPet Tracks is your gateway to an extraordinary companion experience, offering you the tools to monitor and engage with your AI pet's development.
          </Typography>
          <Box
            component="img"
            sx={{
              width: '50vw',
              mb: 4,
            }}
            alt="The digital pet"
            src={image} // Placeholder for an image; make sure to replace it with an actual path
          />
          <Typography variant="body1" sx={{ mb: 2 }}>
            Explore menus, track progress, and immerse yourself in the life of your digital companion. Let's embark on this journey together!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
