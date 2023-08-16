// src/App.tsx
import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, IconButton, List, ListItem, ListItemText, CssBaseline, ThemeProvider, createTheme, ListItemIcon, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PodcastsIcon from '@mui/icons-material/Mic';
import SettingsIcon from '@mui/icons-material/Settings';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Podcasts from './components/Podcasts';
import { ErrorProvider } from './components/ErrorContext';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => (
  <div style={{ position: 'fixed', bottom: 20, right: 20, background: '#f44336', color: 'white', padding: '10px', borderRadius: '5px' }}>
    <span>{message}</span>
    <button onClick={onClose} style={{ marginLeft: '10px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>X</button>
  </div>
);

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const showError = (message: string) => setErrorMessage(message);
  const hideError = () => setErrorMessage(null);

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Podcasts', icon: <PodcastsIcon />, path: '/podcasts' },
    { text: 'Music', icon: <MusicNoteIcon />, path: '/musics' },
    { text: 'Video', icon: <VideoLibraryIcon />, path: '/videos' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <ErrorProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <AppBar position="fixed" style={{ zIndex: 1301 }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                <MenuIcon />
              </IconButton>
              <h2>Medisa</h2>
              {errorMessage && <ErrorMessage message={errorMessage} onClose={hideError} />}
            </Toolbar>
          </AppBar>
          <Drawer variant="persistent" open={open} style={{ zIndex: 1300 }}>
            <div style={{ padding: '16px' }}>
              <Divider />
            </div>
            <List style={{ paddingTop: 64 }}>
              {menuItems.map((item, index) => (
                <Link to={item.path} key={item.text} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button style={{ padding: '16px' }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
          <main style={{ marginLeft: open ? 240 : 0, marginTop: 64, paddingTop: 64, paddingLeft: 16 }}>
            <Routes>
              <Route path="/podcasts" element={<Podcasts />} />
              {/* Add other routes for Music, Video, and Settings here */}
            </Routes>
          </main >
        </BrowserRouter>
      </ThemeProvider >
    </ErrorProvider>
  );
};

export default App;
