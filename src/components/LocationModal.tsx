import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { LocationWithDetails } from '../types';

interface LocationModalProps {
    location: LocationWithDetails;
    open: boolean;
    onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ location, open, onClose }) => {
    const renderStainedGlassPieces = () => {
        const artists = Array.from(new Set(location.stained_glass_pieces.flatMap(piece => piece.artists.name)));
        return artists.map((artist, index) => (
            <div key={index}>
                <Typography variant="h6">{artist}</Typography>
                <Grid container spacing={2}>
                    {location.stained_glass_pieces.filter(piece => piece.artists.name === artist).map(piece => (
                        <Grid item xs={6} sm={4} md={3} key={piece.title}>
                            <img src={piece.small_thumbnail_url} alt={piece.title} style={{ width: '100%' }} />
                            <Typography>{piece.title}</Typography>
                        </Grid>
                    ))}
                </Grid>
                {index < artists.length - 1 && <hr />}
            </div>
        ));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{location.name}</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1">{location.address}</Typography>
                <Typography variant="subtitle1">
                    <a href={location.google_maps_link} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                </Typography>
                <div>
                    {renderStainedGlassPieces()}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LocationModal;