import React, { useEffect, useState } from 'react';
import { Snackbar, Grid, IconButton } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const podcastBackendUrl = 'http://localhost:5000';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Podcast {
  id: number;
  name: string;
  image_url: string;
  html_url: string;
}

const Podcasts: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`${podcastBackendUrl}/api/podcasts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        return res.json();
      })
      .then((data) => setPodcasts(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleClose = (event: React.SyntheticEvent<any> | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(null);
  };

  return (
    <div>
      <Grid container spacing={3}>
        {podcasts.map((podcast) => (
          <Grid item xs={12} sm={6} md={4} key={podcast.id}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={podcast.image_url}
                alt={podcast.name}
                style={{ width: '100%', maxWidth: '200px', height: 'auto' }}
              />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h3>{podcast.name}</h3>
              <IconButton
                  size="small"
                  onClick={() => window.open(podcast.html_url, '_blank')}
                  aria-label="Open in new tab"
                >
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </div>
              {/* You can add a player or link to the podcast here */}
            </div>
          </Grid>
        ))}
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error || 'An unexpected error occurred'}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Podcasts;
