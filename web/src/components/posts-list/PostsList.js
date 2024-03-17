import { Merge } from "@mui/icons-material";
import { AppBar, Button, CircularProgress, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import Post from "components/post/Post";
import React from 'react';
import { useQuery } from "react-query";

function PostsList() {
  const fetchPosts = async () => {
    if (!process.env.REACT_APP_GPTPET_TRACKS_API_URL) {
      throw new Error("REACT_APP_GPTPET_TRACKS_API_URL is not defined");
    }
    console.log('calling ' + process.env.REACT_APP_GPTPET_TRACKS_API_URL + "/posts?limit=10&offset=0")
    const response = await fetch(process.env.REACT_APP_GPTPET_TRACKS_API_URL + "/posts?limit=10&offset=0");
    return response.json();
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

