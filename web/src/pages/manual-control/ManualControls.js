import { CircularProgress, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import MovementButtons from "components/movement-buttons/MovementButtons";
import SensorView from "components/sensor-view/SensorView";
import ColorView from "components/color-view/ColorView";
import ImageView from "components/image-view/ImageView";

function ManualControls() {
  const [loadingView, setLoadingView] = useState(false);
  const [loadingDepthView, setLoadingDepthView] = useState(false);
  const [loadingLabeledView, setLoadingLabeledView] = useState(false);
  const [loadingMeasurements, setLoadingMeasurements] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [measurements, setMeasurements] = useState({
    ahead: 'unknown',
    back: 'unknown',
    left: 'unknown',
    right: 'unknown',
  });
  const [cameraView, setCameraView] = useState('');
  const [depthCameraView, setDepthCameraView] = useState('');
  const [labeledView, setLabeledCameraView] = useState('');
  
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
  const doRotate = async (degrees) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${gptpet_url}/rotate/${degrees}`)
      return response.data;
    } catch (error) {
      setErrorMessage('error while calling rotate endpoint: ' + error.message)
      return;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (loadingMeasurements) {
        return
      }
      setLoadingMeasurements(true);

      fetch(`${gptpet_url}/proximity-measurements`)
        .then((response) => {
          setLoadingMeasurements(false);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setMeasurements(data);
        })
        .catch((error) => {
          setLoadingMeasurements(false);
          console.error('There has been a problem with your fetch operation:', error);
        });
    }, 2000); // Poll every 1000 milliseconds (1 second)

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [gptpet_url, loadingMeasurements]);

  useEffect(() => {
    console.log('loadingView is true, exiting')
    if (loadingView) {
      return
    }
    setLoadingView(true);

    const intervalId = setInterval(() => {
      console.log('getting current view')
      fetch(`${gptpet_url}/current-view`)
        .then((response) => {
          setLoadingView(false);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setCameraView(data?.image);
        })
        .catch((error) => {
          setLoadingView(false);
          console.error('There has been a problem with your fetch operation:', error);
        });
    }, 2000); // Poll every 1000 milliseconds (1 second)

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [gptpet_url, loadingView]);

  useEffect(() => {
    if (loadingDepthView) {
      return;
    }
    setLoadingDepthView(true);

    const intervalId = setInterval(() => {
      fetch(`${gptpet_url}/current-depth-view`)
        .then((response) => {
          setLoadingDepthView(false);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setDepthCameraView(data?.image);
        })
        .catch((error) => {
          setLoadingDepthView(false);
          console.error('There has been a problem with your fetch operation:', error);
        });
    }, 2000); // Poll every 1000 milliseconds (1 second)

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [gptpet_url, loadingDepthView]);

  useEffect(() => {
    if (loadingLabeledView) {
      return;
    }
    setLoadingLabeledView(true);

    const intervalId = setInterval(() => {
      fetch(`${gptpet_url}/current-labeled-view`)
        .then((response) => {
          setLoadingLabeledView(false);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setLabeledCameraView(data?.image);
        })
        .catch((error) => {
          setLoadingLabeledView(false);
          console.error('There has been a problem with your fetch operation:', error);
        });
    }, 2000); // Poll every 1000 milliseconds (1 second)

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [gptpet_url, loadingLabeledView]);

  const setColor = async (color) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${gptpet_url}/color`,
        color
      )
      return response.data;
    } catch (error) {
      setErrorMessage('error while calling move endpoint: ' + error.message)
      return;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    <div onClick={() => setErrorMessage('')}>
      <Stack direction="row" spacing={2}>
        <ImageView base64Image={cameraView} title={'Camera View'}/>
        <ImageView base64Image={depthCameraView} title={'Depth Camera View'}/>
        <ImageView base64Image={labeledView} title={'Labeled View'}/>
      </Stack>
      <Stack direction="row" spacing={2} style={{marginTop: '2rem'}}>
        <MovementButtons doMove={doMove} doRotate={doRotate}/>
        <SensorView measurements={measurements}/>
        <ColorView setColor={setColor}/>
      </Stack>
    </div>
    <h2 style={{color: 'red', background: 'black'}}>{errorMessage}</h2>
    {isLoading && <CircularProgress />}
    </>
  );
}

export default ManualControls;

