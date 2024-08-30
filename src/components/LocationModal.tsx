import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';
import { LocationWithDetails } from '../types';
import ModalHeader from './ModalHeader';
import ArtistSection from './ModalArtistSection';
import ImageModal from './ImageModal';

interface LocationModalProps {
    location: LocationWithDetails;
    open: boolean;
    onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ location, open, onClose }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

    const handleImageClick = (url: string, title: string) => {
        setSelectedImage({ url, title });
    };

    const handleCloseImageModal = () => {
        setSelectedImage(null);
    };

    const artists = Array.from(new Set(location.stained_glass_pieces.map(piece => piece.artist.name)));

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
                transitionDuration={{ enter: 400, exit: 400 }}
            >
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
                    <CloseIcon />
                </IconButton>
                <ModalHeader location={location} isMobile={isMobile} />
                <DialogContent dividers style={{ padding: 0 }}>
                    {artists.map((artist, index) => (
                        <ArtistSection
                            key={artist}
                            artist={artist}
                            pieces={location.stained_glass_pieces.filter(piece => piece.artist.name === artist)}
                            onImageClick={handleImageClick}
                            isLastSection={index === artists.length - 1}
                        />
                    ))}
                </DialogContent>
            </Dialog>
            {selectedImage && (
                <ImageModal
                    open={!!selectedImage}
                    onClose={handleCloseImageModal}
                    imageUrl={selectedImage.url}
                    title={selectedImage.title}
                />
            )}
        </>
    );
};

export default LocationModal;