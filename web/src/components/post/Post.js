import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function Post(props) {
  const { post } = props;

  return (
    <CardActionArea component="a" href="#" 
      style={{
        width: "100%",
        backgroundColor: post.text === "Geworfenheit" ? '#8B8000' : undefined
      }}>
      <Card sx={{ display: 'flex', width: "100%" }} 
        style={{
          backgroundColor: post.text === "Geworfenheit" ? '#8B8000' : undefined
        }}>
        <CardContent sx={{ flex: 1 }} style={{
          backgroundColor: post.text === "Geworfenheit" ? '#8B8000' : undefined
        }}>
          <Typography variant="subtitle1" color="text.secondary">
            {post.date || '(unknown)'}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {post.text}
          </Typography>
          {
            post.image && (<CardMedia
              component="img"
              sx={{ width: "50%", display: { xs: 'none', sm: 'block' } }}
              image={post.image}
              alt={post.imageLabel}
            />)
          }
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

export default Post;

