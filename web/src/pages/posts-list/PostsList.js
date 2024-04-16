import { Merge } from "@mui/icons-material";
import { AppBar, Button, CircularProgress, Grid, IconButton, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import Post from "components/post/Post";
import React from 'react';
import { useQuery } from "react-query";

function PostsList() {
  const [count, setCount] = React.useState(10);

  const fetchPosts = async () => {
    if (!process.env.REACT_APP_GPTPET_TRACKS_API_URL) {
      throw new Error("REACT_APP_GPTPET_TRACKS_API_URL is not defined");
    }
    const response = await fetch(process.env.REACT_APP_GPTPET_TRACKS_API_URL + `/posts?limit=${count}&offset=0`);
    return response.json();
  };

  const { data, status, refetch } = useQuery("get-posts", fetchPosts);

  const loadMore = () => {
    setCount(count + 10);
    refetch();
  }

  return (<>
    {status === "loading" && <CircularProgress />}
    {status === "error" && <div style={{color: "red"}}>Error</div>}
    {(status === "success" && !!data.posts?.length) && <>
      <Button
        onClick={() => {refetch()}}
        variant="contained"
        style={{marginBottom: "2rem"}}
      >Refresh</Button>
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
      <Button
        onClick={() => {loadMore()}}
        variant="contained"
        style={{marginTop: "2rem", marginBottom: "2rem"}}
      >Load More</Button>
    </>}
    {(status === "success" && !data.posts?.length) && <Typography>No posts found</Typography>}
  </>);
}

export default PostsList;

