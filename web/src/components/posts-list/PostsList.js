import { Merge } from "@mui/icons-material";
import { AppBar, Button, CircularProgress, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import Post from "components/post/Post";
import React from 'react';
import { useQuery } from "react-query";

function PostsList() {
  const fetchPosts = async () => {
    // const response = await fetch("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    // return response.json();
    return {
      posts: [{
        title: "Text",
        date: "3/15/2024 10:00AM",
        text_body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut al"
      },
      {
        title: "Bar",
        date: "3/17/2024 11:28AM",
        text_body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi"
      }]
    };
  };

  const { data, status } = useQuery("get-posts", fetchPosts);

  return (<>
    {status === "loading" && <CircularProgress />}
    {status === "error" && <div style={{color: "red"}}>Error</div>}
    {status === "success" && 
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        >
        {data.posts.map((post, index) => 
        <Grid item xs={12} style={{width: "100%"}}>
          <Post post={post} key={index}/>
        </Grid>)}
      </Grid>
    }
  </>);
}

export default PostsList;

