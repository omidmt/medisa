// src/components/MediaPlayer.tsx
import React from 'react';
import ReactPlayer from 'react-player';

interface MediaPlayerProps {
  url: string;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ url }) => {
  return <ReactPlayer url={url} controls />;
};

export default MediaPlayer;
