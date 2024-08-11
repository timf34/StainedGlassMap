import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

interface ImageModalProps {
    open: boolean;
    onClose: () => void;
    imageUrl: string;
    title: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ open, onClose, imageUrl, title }) => {
    const [loadedImageUrl, setLoadedImageUrl] = useState('');

    useEffect(() => {
        if (open) {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => setLoadedImageUrl(imageUrl);
        } else {
            setLoadedImageUrl('');
        }
    }, [open, imageUrl]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            fullWidth
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    overflow: 'hidden',
                },
            }}
        >
            <DialogContent
                style={{
                    position: 'relative',
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        color: '#fff',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {loadedImageUrl ? (
                    <img
                        src={loadedImageUrl}
                        alt={title}
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90vh',
                            objectFit: 'contain',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                        }}
                    />
                ) : (
                    <CircularProgress />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ImageModal;