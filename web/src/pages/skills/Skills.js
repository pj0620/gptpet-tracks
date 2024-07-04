import { CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import Skill from "components/skill/Skill";
import React from 'react';
import { useQuery } from "react-query";

function Skills() {
  const graphqlQuery = {
    query: `
      {
        Get {
          Skill {
            task
            code
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

    return response.data.data["Get"]["Skill"];
  }

  const { data, status } = useQuery("fetch-skills", fetchSkills);

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
        {data.map((skill, index) => 
        <Grid item xs={12} style={{width: "100%"}}>
          <Skill skill={skill} key={index}/>
        </Grid>)}
      </Grid>
    </>}
    {(status === "success" && !data?.length) && <Typography>No Skills found</Typography>}
  </>);
}

export default Skills;

