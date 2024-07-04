import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import ImageView from "components/image-view/ImageView";
import { PostsList } from "components/posts-list/PostsList";
import React, { useEffect } from "react";
import { useState } from "react";
import io from 'socket.io-client';

function PetView() {
  const [errorMessage, setErrorMessage] = useState('');
  const [petView, setPetView] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const gptpet_tracks_url = process.env.REACT_APP_GPTPET_TRACKS_API_URL;
    const socket = io(gptpet_tracks_url);
    socket.connect();
    socket.on('metrics', (data) => {
      console.log('new data', data)
      if (data?.image) {
        setPetView(data.image);
      }
      if (data?.task) {
        setTasks((prevTasks) => [{
          text: data?.task?.task,
          date: data?.task?.date
        }, ...prevTasks]);
      }
      if (data?.goal) {
        setGoals((prevGoals) => [{
          text: data?.goal?.description,
          date: data?.goal?.date
        }, ...prevGoals]);
      }
    });
    return () => {socket.off('metrics')};
  }, [setPetView, setTasks, setGoals]);

  return (
    <>
    <div onClick={() => setErrorMessage('')}>
      <Stack direction="row" spacing={2}>
        <div style={{ width: "100%" }}>
          <Typography variant="h4" component="h2" sx={{ color: grey[50], mb: 2, justifyContent: 'center', display: 'flex' }}>Tasks</Typography>
          <PostsList posts={tasks}/>
        </div>
        <div style={{minWidth: '50vw'}}>
          <ImageView base64Image={petView} title={'Pet Camera'} skipWrap/>
        </div>
        <div style={{ width: "100%" }}>
          <Typography variant="h4" component="h2" sx={{ color: grey[50], mb: 2, justifyContent: 'center', display: 'flex' }}>Goals</Typography>
          <PostsList posts={goals}/>
        </div>
      </Stack>
    </div>
    <h2 style={{color: 'red', background: 'black'}}>{errorMessage}</h2>
    </>
  );
}

export default PetView;

