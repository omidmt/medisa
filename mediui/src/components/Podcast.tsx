// Detail of individual podcast and its episodes
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GetAppIcon from '@mui/icons-material/GetApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


interface PodcastDetails {
  description: string;
  html_url: string;
  image_url: string;
  name: string;
  title: string;
}

interface Episode {
  description: string;
  downloaded: number;
  id: number;
  image_url: string;
  link: string;
  pub_date: string;
  title: string;
  url: string;
}

interface PodcastResponse {
  episodes: Episode[];
  podcast: PodcastDetails;
}

const podcastBackendUrl = 'http://localhost:5000';

const Podcast: React.FC = () => {
  const { podcastId } = useParams();

  const [podcast, setPodcast] = useState<PodcastDetails | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    fetch(`${podcastBackendUrl}/podcast/${podcastId}`)
      .then((res) => res.json())
      .then((data: PodcastResponse) => {
        setPodcast(data.podcast);
        setEpisodes(data.episodes);
      })
      .catch((error) => console.error(error));
  }, [podcastId]);

  const handleDownload = (episodeId: number, isDownloaded: boolean, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!isDownloaded) {
      // TODO: Start download process
    }
  };

  const handlePlay = (episodeId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the click event from propagating to the accordion
    event.stopPropagation();
    // Play logic here...
  };

  return (
    <div>
      {podcast && (
        <div className="podcast-header">
          <img src={podcast.image_url} alt={podcast.name} style={{ width: 256, height: 256 }} />
          <h1>{podcast.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: podcast.description }} />
        </div>
      )}
      <hr />
      <div className="episodes-list">
        {episodes.map((episode) => (
          <div key={episode.id} className="episode">
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ display: 'flex', alignItems: 'center' }}>
                <img src={episode.image_url} alt={episode.title} style={{ width: 48, height: 48 }} />
                <div className="episode-details" style={{ flexGrow: 1, marginLeft: 10 }}>
                  <h3 style={{ margin: 0 }}>{episode.title}</h3>
                  <p style={{ margin: 0 }}>{new Date(episode.pub_date).toLocaleString()}</p>
                </div>
                <div className="episode-actions">
                  <IconButton onClick={(event) => handlePlay(episode.id, event)}>
                    <PlayArrowIcon />
                  </IconButton>
                  <IconButton onClick={(event) => handleDownload(episode.id, episode.downloaded === 1, event)}>
                    {episode.downloaded === 0 ? <GetAppIcon /> : <CheckCircleIcon />}
                  </IconButton>
                </div>
              </AccordionSummary>

              <AccordionDetails>
                <div dangerouslySetInnerHTML={{ __html: episode.description }} />
              </AccordionDetails>
            </Accordion>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcast;
