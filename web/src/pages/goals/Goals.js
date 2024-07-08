import { CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import Goal from "components/goal/Goal";
import React from 'react';
import { useQuery } from "react-query";

function Goals() {
  const graphqlQuery = {
    query: `
      {
        Get {
          Goal {
            goal_text
            completed
          }
        }
      }
    `,
  };

  const graphql_url = process.env.REACT_APP_WEAVIATE_GRAPHQL_URL;
  const fetchGoals = async () => {
    const response = await axios.post(graphql_url, graphqlQuery, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    return response.data.data["Get"]["Goals"];
  }

  const { data, status } = useQuery("fetch-goals", fetchGoals);

  return (<>
    {status === "loading" && <CircularProgress />}
    {status === "error" && <div style={{color: "red"}}>Error</div>}
    {(status === "success" && !!data?.length) && <>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        >
        {data.map((goal, index) => 
        <Grid item xs={12} style={{width: "100%"}}>
          <Goal goal={goal} key={index}/>
        </Grid>)}
      </Grid>
    </>}
    {(status === "success" && !data?.length) && <Typography>No Skills found</Typography>}
  </>);
}

export default Goals;

