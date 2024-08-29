import React, { useRef } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { StainedGlassPiece } from '../types';
import StainedGlassImage from './ModalStainedGlassImage';

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
        <div style={{ marginBottom: '2rem' }}>
            <Typography variant="h5" gutterBottom>{artist}</Typography>
            <div style={{ position: 'relative' }}>
                <div
                    ref={scrollContainerRef}
                    style={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        '&::-webkit-scrollbar': { display: 'none' }
                    }}
                >
                    {pieces.map(piece => (
                        <StainedGlassImage
                            key={piece.title}
                            piece={piece}
                            onClick={() => onImageClick(piece.small_thumbnail_url, piece.title)}
                        />
                    ))}
                </div>
                <IconButton
                    onClick={() => scroll('left')}
                    style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
                >
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton
                    onClick={() => scroll('right')}
                    style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                >
                    <ChevronRightIcon />
                </IconButton>
            </div>
            {!isLastSection && <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #eee' }} />}
        </div>
    );
};

export default ArtistSection;