import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import {
  Close as CloseIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon
} from '@mui/icons-material';
import SkeuomorphicPaper from './SkeuomorphicPaper';
import { MediaFile } from '../../types';

interface MediaPreviewProps {
  mediaFile: MediaFile;
  onRemove: () => void;
  onPlay?: () => void;
  isPlaying?: boolean;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({
  mediaFile,
  onRemove,
  onPlay,
  isPlaying = false
}) => {
  const renderPreview = () => {
    switch (mediaFile.type) {
      case 'image':
        return (
          <Box sx={{ position: 'relative' }}>
            <img
              src={mediaFile.preview}
              alt={mediaFile.file.name}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 8,
                maxHeight: 200
              }}
            />
            <IconButton
              onClick={onRemove}
              size="small"
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)'
                }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      
      case 'audio':
        return (
          <SkeuomorphicPaper
            variant="inset"
            depth="shallow"
            padding="medium"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              minWidth: 200
            }}
          >
            <IconButton
              onClick={onPlay}
              size="small"
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark'
                }
              }}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                {mediaFile.file.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Audio file
              </Typography>
            </Box>
            
            <IconButton
              onClick={onRemove}
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)'
                }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </SkeuomorphicPaper>
        );
      
      case 'document':
        return (
          <SkeuomorphicPaper
            variant="inset"
            depth="shallow"
            padding="medium"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              minWidth: 200
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}
            >
              {mediaFile.file.name.split('.').pop()?.toUpperCase() || 'DOC'}
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                {mediaFile.file.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {(mediaFile.file.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
            </Box>
            
            <IconButton
              onClick={onRemove}
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)'
                }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </SkeuomorphicPaper>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'inline-block' }}>
      {renderPreview()}
    </Box>
  );
};

export default MediaPreview; 