import React, { useEffect, useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { useError } from './ErrorContext';
import { Link } from 'react-router-dom';
const podcastBackendUrl = 'http://localhost:5000';

interface Podcast {
  id: number;
  name: string;
  image_url: string;
  html_url: string;
}

const Podcasts: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const { showError } = useError();

  useEffect(() => {
    fetch(`${podcastBackendUrl}/api/podcasts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        return res.json();
      })
      .then((data) => {
        setPodcasts(data);
      })
      .catch((err) => {
        showError(err.message || 'An unexpected error occurred');
      });
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        {podcasts.map((podcast) => (
          <Grid item xs={12} sm={6} md={4} key={podcast.id}>
            <div style={{ textAlign: 'center' }}>
              <Link to={`/podcast/${podcast.id}`}>
                <img
                  src={podcast.image_url}
                  alt={podcast.name}
                  style={{ width: '100%', maxWidth: '200px', height: 'auto' }}
                />
              </Link>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link to={`/podcast/${podcast.id}`}>
                  <h3>{podcast.name}</h3>
                </Link>
                <IconButton
                  size="small"
                  onClick={() => window.open(podcast.html_url, '_blank')}
                  aria-label="Open in new tab"
                >
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Podcasts;
