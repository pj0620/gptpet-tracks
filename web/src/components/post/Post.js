import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function Post(props) {
  const { post } = props;

  return (
    <CardActionArea component="a" href="#" style={{width: "100%"}}>
      <Card sx={{ display: 'flex', width: "100%" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="subtitle1" color="text.secondary">
            {post.date}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {post.text_body}
          </Typography>
        </CardContent>
        {
          post.image && (<CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />)
        }
      </Card>
    </CardActionArea>
  );
}

export default Post;

