import { Merge } from "@mui/icons-material";
import { AppBar, Avatar, Button, IconButton, Link, Toolbar, Typography } from "@mui/material";
import React from 'react';
import pet from './gptpet1.jpeg';

function TopMenu() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <Avatar src={pet} style={{width: "6rem", height: "6rem"}}/>
        </Link>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1 }} 
          style={{
            marginLeft: '2rem', 
            marginRight: '2rem'
          }}>
          GPTPet Tracks
        </Typography>
        <Link href="/manual-control" underline="none">
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1 }} 
            style={{
              marginLeft: '2rem', 
              marginRight: '2rem'
            }}>
            Manual Control
          </Typography>
        </Link>
        <Link href="/goals" underline="none">
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1 }} 
            style={{
              marginLeft: '2rem', 
              marginRight: '2rem'
            }}>
            Goals
          </Typography>
        </Link>
        <Link href="/objects" underline="none">
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1 }} 
            style={{
              marginLeft: '2rem', 
              marginRight: '2rem'
            }}>
            Objects
          </Typography>
        </Link>
        <Link href="/skills" underline="none">
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1 }} 
            style={{
              marginLeft: '2rem', 
              marginRight: '2rem'
            }}>
            Skills
          </Typography>
        </Link>
        <Link href="/logs" underline="none">
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1 }} 
            style={{
              marginLeft: '2rem', 
              marginRight: '2rem'
            }}>
            Logs
          </Typography>
        </Link>
        <Link href="/pet-view" underline="none">
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1 }} 
            style={{
              marginLeft: '2rem', 
              marginRight: '2rem'
            }}>
            Pet View
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default TopMenu;

