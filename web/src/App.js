import logo from './logo.svg';
import './App.css';
import TopMenu from './components/top-menu/TopMenu';
import React from 'react';
import PostsList from 'components/posts-list/PostsList';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container, ThemeProvider, createTheme } from '@mui/material';

function App() {
  const client = new QueryClient();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={client}>
        <TopMenu />
        <Container style={{marginTop: "2rem", minWidth: "90%"}}>
          <PostsList/>
        </Container>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
