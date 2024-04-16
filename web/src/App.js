import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home.js';
import TopMenu from './components/top-menu/TopMenu';
import React from 'react';
import PostsList from 'pages/posts-list/PostsList';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Skills from 'pages/skills/Skills';
import Objects from 'pages/objects/Objects';
import ManualControls from 'pages/manual-control/ManualControls';

function App() {
  const client = new QueryClient();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <QueryClientProvider client={client}>
            <TopMenu />
            <Container style={{marginTop: "2rem", minWidth: "90%"}}>
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="logs" element={<PostsList />} />
                  <Route path="skills" element={<Skills />} />
                  <Route path="objects" element={<Objects />} />
                  <Route path="manual-control" element={<ManualControls />} />
                  <Route path="*" element={<h1 style={{color: 'red'}}>Page Not Found</h1>} />
                </Route>
              </Routes>
            </Container>
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
