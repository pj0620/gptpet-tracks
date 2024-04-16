import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

function Object(props) {
  const { object } = props;

  return (
    <CardActionArea component="a" href="#">
      <Card sx={{ display: 'flex', width: "100%" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="subtitle1" color="text.secondary">
            Name: {object.object_name}
          </Typography>
          <Typography variant="body1" paragraph>
            Description: {object.object_description}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

export default Object;

