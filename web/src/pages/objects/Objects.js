import { CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import Object from "../../components/object/Object";
import React from 'react';
import { useQuery } from "react-query";

function Skills() {
  const graphqlQuery = {
    query: `
      {
        Get {
          Object {
            object_name
            object_description
          }
        }
      }
    `,
  };

  const graphql_url = process.env.REACT_APP_WEAVIATE_GRAPHQL_URL;
  const fetchSkills = async () => {
    const response = await axios.post(graphql_url, graphqlQuery, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    return response.data.data["Get"]["Object"];
  }

  const { data, status, refetch } = useQuery("fetch-objects", fetchSkills);

  return (<>
    {status === "loading" && <CircularProgress />}
    {status === "error" && <div style={{ color: "red" }}>Error</div>}
    {(status === "success" && !!data?.length) && <>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
      >
        {data.map((object, index) =>
          <Grid item xs={12} style={{ width: "100%" }}>
            <Object object={object} key={index} />
          </Grid>)}
      </Grid>
    </>}
    {(status === "success" && !data?.length) && <Typography>No Objects found</Typography>}
  </>);
}

export default Skills;

