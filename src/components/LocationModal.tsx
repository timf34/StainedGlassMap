import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { LocationWithDetails } from '../types';

interface LocationModalProps {
    location: LocationWithDetails;
    open: boolean;
    onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ location, open, onClose }) => {
    const renderStainedGlassPieces = () => {
        const artists = Array.from(new Set(location.stained_glass_pieces.map(piece => piece.artist.name)));
        return artists.map((artist, index) => (
            <div key={index} style={{ marginBottom: '1.5rem' }}>
                <Typography variant="h6" gutterBottom>{artist}</Typography>
                <Grid container spacing={2}>
                    {location.stained_glass_pieces.filter(piece => piece.artist.name === artist).map(piece => (
                        <Grid item xs={6} sm={4} md={3} key={piece.title}>
                            <img src={piece.small_thumbnail_url} alt={piece.title} style={{ width: '100%', borderRadius: '4px' }} />
                            <Typography align="center">{piece.title} ({piece.year_created})</Typography>
                        </Grid>
                    ))}
                </Grid>
                {index < artists.length - 1 && <hr style={{ margin: '1.5rem 0' }} />}
            </div>
        ));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {location.name}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="subtitle1" gutterBottom>{location.address}</Typography>
                <Typography variant="subtitle1" gutterBottom>
                    <a href={location.google_maps_link} target="_blank" rel="noopener noreferrer" style={{ color: '#3f51b5', textDecoration: 'underline' }}>View on Google Maps</a>
                </Typography>
                {renderStainedGlassPieces()}
            </DialogContent>
        </Dialog>
    );
};

export default LocationModal;
