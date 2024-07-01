import * as React from 'react';
import Grid from '@mui/material/Grid';
import Post from 'components/post/Post';

export function PostsList({ posts }) {

  return (
    <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
      >
      {!!posts?.length && posts.map((post, index) =>
        <Grid item xs={12} style={{ width: "100%" }} key={index}>
          <Post post={post} />
        </Grid>)}
      {!posts?.length && <Grid item xs={12} style={{ width: "100%" }}>
          <Post post={{
            text: 'Nothing Yet...'
          }} />
        </Grid>}
    </Grid>
  );
}

