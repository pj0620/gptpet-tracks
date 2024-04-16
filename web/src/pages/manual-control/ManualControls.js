import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import Object from "../../components/object/Object";
import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import MovementButtons from "components/movement-buttons/MovementButtons";
import SensorView from "components/sensor-view/SensorView";

function ManualControls() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [measurements, setMeasurements] = useState({
    ahead: 'unknown',
    back: 'unknown',
    left: 'unknown',
    right: 'unknown',
  });
  
  const gptpet_url = process.env.REACT_APP_GPTPET_CLIENT_HOSTNAME;
  const doMove = async (direction) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${gptpet_url}/move/${direction}`)
      return response.data;
    } catch (error) {
      setErrorMessage('error while calling move endpoint: ' + error.message)
      return;
    } finally {
      setIsLoading(false);
    }
  }

  

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`${gptpet_url}/proximity-measurements`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setMeasurements(data);
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }, 1000); // Poll every 1000 milliseconds (1 second)

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <div onClick={() => setErrorMessage('')}>
      <Stack direction="row" spacing={2}>
        <MovementButtons doMove={doMove}/>
        <SensorView measurements={measurements}/>
      </Stack>
    </div>
    <h2 style={{color: 'red', background: 'black'}}>{errorMessage}</h2>
    {isLoading && <CircularProgress />}
    </>
  );
}

export default ManualControls;

