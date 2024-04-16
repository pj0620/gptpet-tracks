import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function Post(props) {
  const { skill } = props;

  return (
    <CardActionArea component="a" href="#">
      <Card sx={{ display: 'flex', width: "100%" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="subtitle1" color="text.secondary">
            Task: {skill.task}
          </Typography>
          <Typography variant="body1" paragraph>
            {skill.code}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

export default Post;

