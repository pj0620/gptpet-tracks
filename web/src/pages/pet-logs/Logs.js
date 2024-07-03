// import { Search } from "@mui/icons-material";
import { Box, Button, CircularProgress, FormControlLabel, InputBase, Switch, Typography, alpha, styled } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import SearchIcon from '@mui/icons-material/Search';
import './Logs.css';
import { PostsList } from "components/posts-list/PostsList";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(3),
  //   width: 'auto',
  // },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white'
}));

function Logs() {
  const [count, setCount] = React.useState(10);
  const [autoRefresh, setAutoRefresh] = React.useState(false);
  const [countdown, setCountdown] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async () => {
    if (!process.env.REACT_APP_GPTPET_TRACKS_API_URL) {
      throw new Error("REACT_APP_GPTPET_TRACKS_API_URL is not defined");
    }
    const searchStr = searchTerm ? `&search=${searchTerm}` : '';
    const response = await fetch(process.env.REACT_APP_GPTPET_TRACKS_API_URL + `/posts?limit=${count}&offset=0${searchStr}`);
    return response.json();
  };

  const { data, status, refetch } = useQuery("get-posts", fetchPosts);

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            refetch();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
      setCountdown(5); // Reset countdown to 5 when autoRefresh stops
    }
    return () => clearInterval(interval);
  }, [autoRefresh, refetch]);

  useEffect(() => {
    if (!refetch) {
      return;
    }
    refetch();
  }, [count, refetch, searchTerm]);

  const loadMore = () => {
    setCount(count + 10);
  }

  return (<>
    <Box sx={{ flexDirection: 'row', alignItems: 'center' }}
      style={{ marginBottom: "1rem", display: "flex" }}>
      <Button
        onClick={() => { refetch() }}
        variant="contained"
        disabled={autoRefresh}
      >Refresh</Button>
      <FormControlLabel
        control={
          <Switch checked={autoRefresh} onChange={() => setAutoRefresh(!autoRefresh)} name="Auto-Refresh" />
        }
        label="Auto-Refresh"
        style={{ marginLeft: "2rem" }}
      />
      <Typography>
        {autoRefresh && <p style={{ marginTop: 0, marginBottom: 0 }}>Refreshing in {countdown}</p>}
      </Typography>
    </Box>
    <Search style={{ marginBottom: "1rem" }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        className="w-100"
        onChange={(e) => {setSearchTerm(e.target.value)}}
      />
    </Search>
    {status === "loading" && <CircularProgress />}
    {status === "error" && <div style={{ color: "red" }}>Error</div>}
    {(status === "success" && !!data.posts?.length) && <>
      <PostsList posts={data.posts}/>
      <Button
        onClick={() => { loadMore() }}
        variant="contained"
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
      >Load More</Button>
    </>}
    {(status === "success" && !data.posts?.length) && <Typography>No posts found</Typography>}
  </>);
}

export default Logs;

