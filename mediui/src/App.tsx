// src/App.tsx
import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, IconButton, List, ListItem, ListItemText, CssBaseline, ThemeProvider, createTheme, ListItemIcon, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PodcastsIcon from '@mui/icons-material/Mic';
import SettingsIcon from '@mui/icons-material/Settings';
import MediaPlayer from './components/MediaPlayer';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Podcasts from './components/Podcasts';


const App: React.FC = () => {
  const [open, setOpen] = useState(false);

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
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <AppBar position="fixed" style={{ zIndex: 1301 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
            <h2>Medisa</h2>
            {/* Rest of the AppBar content */}
          </Toolbar>
        </AppBar>
        <Drawer variant="persistent" open={open} style={{ zIndex: 1300 }}>
          <div style={{ padding: '16px' }}>
            <Divider />
          </div>
          <List style={{ paddingTop: 64 }}>
            {menuItems.map((item, index) => (
              <Link to={item.path} key={item.text} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem button onClick={handleDrawerClose} style={{ padding: '16px' }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <main style={{ marginLeft: open ?240 : 0, marginTop: 64, paddingTop: 64, paddingLeft: 16 }}>
          <Routes>
            <Route path="/podcasts" element={<Podcasts />} />
            {/* Add other routes for Music, Video, and Settings here */}
          </Routes>
        </main >
      </BrowserRouter>
    </ThemeProvider >
  );
};

export default App;
