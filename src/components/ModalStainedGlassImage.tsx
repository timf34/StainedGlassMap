import React from 'react';
import Typography from '@mui/material/Typography';
import { StainedGlassPiece } from '../types';

interface StainedGlassImageProps {
    piece: StainedGlassPiece;
    onClick: () => void;
}

const StainedGlassImage: React.FC<StainedGlassImageProps> = ({ piece, onClick }) => {
    return (
        <div style={{ margin: '0 10px', flexShrink: 0 }}>
            <div
                style={{
                    width: '200px',
                    height: '200px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer'
                }}
                onClick={onClick}
            >
                <img
                    src={piece.small_thumbnail_url}
                    alt={piece.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>
            <Typography align="center" style={{ marginTop: '0.5rem', width: '200px' }}>
                {piece.title} ({piece.year_created})
            </Typography>
        </div>
    );
};

export default StainedGlassImage;