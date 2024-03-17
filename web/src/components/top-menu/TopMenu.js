import { Merge } from "@mui/icons-material";
import { AppBar, Avatar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from 'react';
import pet from './gptpet1.jpeg';

function TopMenu() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          color="secondary"
          startIcon={<Avatar src={pet} style={{width: "6rem", height: "6rem"}}/>}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GPTPet Tracks
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopMenu;

