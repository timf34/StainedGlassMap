import React, { useRef } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { StainedGlassPiece } from '../types';
import StainedGlassImage from './ModalStainedGlassImage';
import { Box } from '@mui/material';

interface ArtistSectionProps {
    artist: string;
    pieces: StainedGlassPiece[];
    onImageClick: (url: string, title: string) => void;
    isLastSection: boolean;
}

const ArtistSection: React.FC<ArtistSectionProps> = ({ artist, pieces, onImageClick, isLastSection }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <Box sx={{ marginBottom: '1rem' }}>
            <Typography variant="h5" gutterBottom>{artist}</Typography>
            <Box sx={{ position: 'relative' }}>
                <Box
                    ref={scrollContainerRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        '&::-webkit-scrollbar': { display: 'none' },
                    }}
                >
                    {pieces.map(piece => (
                        <StainedGlassImage
                            key={piece.title}
                            piece={piece}
                            onClick={() => onImageClick(piece.small_thumbnail_url, piece.title)}
                        />
                    ))}
                </Box>
                <IconButton
                    onClick={() => scroll('left')}
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                    }}
                >
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton
                    onClick={() => scroll('right')}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                    }}
                >
                    <ChevronRightIcon />
                </IconButton>
            </Box>
            {!isLastSection && <Box sx={{ margin: '1rem 0', borderTop: '1px solid #eee' }} />}
        </Box>
    );
};

export default ArtistSection;