import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import ImageModal from './ImageModal';
import {useMediaQuery} from '@mui/material';
import {LocationWithDetails} from '../types';

interface LocationModalProps {
    location: LocationWithDetails;
    open: boolean;
    onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({location, open, onClose}) => {
    const isMobile = useMediaQuery('(max-width:600px)');

    const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
    const handleImageClick = (url: string, title: string) => {
        setSelectedImage({url, title});
    };
    // I don't think the below is entirely necessary... will come back to this
    const handleCloseImageModal = () => {
        setSelectedImage(null);
    };

    const renderStainedGlassPieces = () => {
        const artists = Array.from(new Set(location.stained_glass_pieces.map(piece => piece.artist.name)));
        return artists.map((artist, index) => (
            <div key={index} style={{marginBottom: '2rem'}}>
                <Typography variant="h5" gutterBottom>{artist}</Typography>
                <Grid container spacing={3}>
                    {location.stained_glass_pieces.filter(piece => piece.artist.name === artist).map(piece => (
                        <Grid item xs={6} sm={4} md={3} key={piece.title}>
                            <div
                                style={{
                                    overflow: 'hidden',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleImageClick(piece.small_thumbnail_url, piece.title)}
                            >
                                <img
                                    src={piece.small_thumbnail_url}
                                    alt={piece.title}
                                    style={{width: '100%', transition: 'transform 0.3s'}}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                            <Typography align="center"
                                        style={{marginTop: '0.5rem'}}>{piece.title} ({piece.year_created})</Typography>
                        </Grid>
                    ))}
                </Grid>
                {index < artists.length - 1 &&
                    <hr style={{margin: '2rem 0', border: 'none', borderTop: '1px solid #eee'}}/>}
            </div>
        ));
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        padding: '2rem',
                        borderRadius: '12px',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                        background: '#fafafa'
                    }
                }}
                transitionDuration={{enter: 400, exit: 400}}
            >
                <DialogTitle style={{position: 'relative', paddingBottom: '1rem'}}>
                    <Typography variant={isMobile ? 'h6' : 'h5'} style={{fontWeight: 200}}>
                        {location.name}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: '#888'
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers style={{paddingTop: 0}}>
                    <Typography variant="subtitle1" gutterBottom>{location.address}</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <a
                            href={location.google_maps_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{color: '#007BFF', textDecoration: 'underline'}}
                            onMouseOver={(e) => e.currentTarget.style.color = '#0056b3'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#007BFF'}
                        >
                            View on Google Maps
                        </a>
                    </Typography>
                    {renderStainedGlassPieces()}
                </DialogContent>
            </Dialog>
            {
                selectedImage && (
                    <ImageModal
                        open={!!selectedImage}
                        onClose={handleCloseImageModal}
                        imageUrl={selectedImage.url}
                        title={selectedImage.title}
                    />
                )
            }
        </>
    )
        ;
};

export default LocationModal;
